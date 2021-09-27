function txlk(){
    
        myTxlk.isCompActive = function(){
        var compActive = false;
        if (myTxlk.myItem == null || !(myTxlk.myItem instanceof CompItem)){
            // if no comp selected, display an alert
            alert("Please establish a comp as the active item and run the script again");
        } else {
            compActive =  true;
        }
        return compActive;
    }

    myTxlk.isShapeLayerSelected = function(){
        var layerActive = false;
        myTxlk.curLayer = myTxlk.myItem.selectedLayers[0];
        if (myTxlk.curLayer == null) {
            alert("No layer is selected.");
        } else {
            if (myTxlk.curLayer.property(2).matchName == "ADBE Root Vectors Group"){
                layerActive = true;
            } else {
                alert("You must select a shape layer with shapes.");
            }
        }
        return layerActive;
    }

    myTxlk.hasShapeGroups = function(){
        var thisHasShapes = false;
        try{
                var shapeCheck = myTxlk.curLayer.property(2)(1);
                thisHasShapes = true;
                if (myTxlk.adminMode == "on") alert("It has at least one group.");
            } catch (e) {
                 if (myTxlk.errorMsgs == "on") alert(e.name + ": " + e.message + ": " + e.lineNumber);
                 alert("This layer has no shape groups.");
                thisHasShapes = false;
            }
        return thisHasShapes;
    }

    myTxlk.isSelectedLayerValid = function(){
        var isLayerValid = false;
        var isItComp = myTxlk.isCompActive();
        var compStat = "No";
        var layerStat = "No";
        var groupStat = "No";
        if (isItComp == true){
            compStat = "Yes";
            var isItShapeLayer = myTxlk.isShapeLayerSelected();
            if (isItShapeLayer == true){
                layerStat = "Yes";
                var hasGroups = myTxlk.hasShapeGroups();
                if(hasGroups == true){
                    myTxlk.contents = myTxlk.curLayer.property(2);
                    groupStat = "Yes";
                    isLayerValid = hasGroups;
                }
            }
        }
        if (myTxlk.adminMode == "on") alert("Comp? " + compStat + ", Shape Layer? " + layerStat + ", Groups? " + groupStat)
        return isLayerValid;
    }

    myTxlk.getShapeData = function(thisShape){
        var numProps = thisShape.numProperties;
        var verts = [];
        for(var s = 1; s <= numProps; s++) {
            if (thisShape.property(s).matchName == "ADBE Vectors Group"){
                verts.push.apply(verts, thisShape.property(s).property(1).property(2).value.vertices);
            }
        }
        var maxY = verts[0][1];
        var minY = verts[0][1];
        var thisData = [];
        var numVerts = verts.length;
        for (var i = 0; i < numVerts; i++) {
            var v = verts[i][1];
            if (v > maxY) {
                maxY = v;
            }
            if (v < minY) {
                minY = v;
            }
        }
        thisData[0] = [maxY, minY];
        thisData[1] = thisShape.property("Transform").property("Position").value;
        thisData[2] = thisShape.property("Transform").property("Anchor Point").value;
        return thisData;
    }

    // get shape groups to isolate and retrieve reference shape data
    myTxlk.getRefData = function(){
        var isRefShape = false;
        myTxlk.shapesCount = myTxlk.contents.numProperties;
        for (var m = 1; m <= myTxlk.shapesCount; m++) {   //get em data 
            var thisGroup = myTxlk.contents.property(m);
            try {
                if (thisGroup.name.charAt(0) == 1) {
                    isRefShape = true;
                    myTxlk.emRef = myTxlk.getShapeData(thisGroup);
                    myTxlk.emYPos = myTxlk.emRef[1][1];
                    myTxlk.emBaseLine = myTxlk.emYPos - myTxlk.emRef[0][1];
                }
            } catch (e) {
                alert("error in func getRefData: " + e.name + ": " + e.message + ": " + e.lineNumber)
            }
        }
        if (!isRefShape) alert("No reference shape has been specified.");
        return isRefShape;
    }

    // Loop through all shapes and set anchor and position
    myTxlk.setPos = function(){
        myTxlk.leadShape = myTxlk.contents.property(myTxlk.shapesCount);
        for (var r = 1; r <= myTxlk.shapesCount; r++) {
            var myGroup = myTxlk.contents.property(r);
            var myData = myTxlk.getShapeData(myGroup);
            var transforms =  myGroup.property("Transform");
            if (myGroup.name.charAt(0) != "x"){ // only do groups that are not excluded
                var oldPos = myData[1];
                var oldAnch = myData[2];
                var offSet = myTxlk.emBaseLine - oldPos[1];
                transforms.property("Position").setValue(oldPos + [0, offSet]);
                transforms.property("Anchor Point").setValue(oldAnch + [0, offSet]);
                if (r == myTxlk.shapesCount) { // this is the master shape so it gets keyframes
                    var keyf1 = transforms.property("Scale").setValueAtTime(myTxlk.curLayer.inPoint, [100, 0]);
                    var keyf2 = transforms.property("Scale").setValueAtTime(myTxlk.curLayer.inPoint + (8 * myTxlk.myItem.frameDuration), [100, 115]);
                    var keyf3 = transforms.property("Scale").setValueAtTime(myTxlk.curLayer.inPoint + (13 * myTxlk.myItem.frameDuration), [100, 100]);
                    transforms.property("Scale").setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER);
                    transforms.property("Scale").setInterpolationTypeAtKey(2, KeyframeInterpolationType.BEZIER);
                    transforms.property("Scale").setInterpolationTypeAtKey(3, KeyframeInterpolationType.BEZIER);
                } else {
                    if (myTxlk.mode == "a"){
                        var mult = myTxlk.shapesCount - myGroup.propertyIndex;
                        transforms.property("Scale").expression = "var idx = thisProperty.propertyGroup(2).propertyIndex;\r\nvar numProps = thisProperty.propertyGroup(3).numProperties;\r\nvar mult = numProps - idx;\r\nthisLayer(\"Contents\")(numProps)(\"Transform\")(\"Scale\").valueAtTime(time - (mult * (effect(\"Time Offset (Frames)\")(\"Slider\") / (1/thisComp.frameDuration))))";
                    } else {
                        var keyf4 = transforms.property("Scale").setValueAtTime(myTxlk.curLayer.inPoint, transforms.property("Scale").value);
                        transforms.property("Scale").expression = "var numProps = thisProperty.propertyGroup(3).numProperties;\r\nvar tOffset = nearestKey(time).time - thisLayer.inPoint;\r\nthisLayer(\"Contents\")(numProps)(\"Transform\")(\"Scale\").valueAtTime(time - tOffset)";
                    }
                }
            }
        }
        if (myTxlk.mode == "a"){
            myTxlk.addSlider();
        }
    }

    myTxlk.addSlider = function() {
        // add a slider control for time offset(frames)
        var frOffset = myTxlk.curLayer.Effects.addProperty("ADBE Slider Control");
        frOffset.name = "Time Offset (Frames)";
        frOffset.property("Slider").setValue(1);
    }


    myTxlk.getModeFromUser = function(){
        var rerun = false;
        do {
            myTxlk.mode = prompt("To have shapes auto-follow in time, enter \"A\".\r\nTo have each shape scale relative to its own keyframe, enter \"K\".\r\nDefault is auto-follow.", "A");
            if (myTxlk.mode.toLowerCase() == "a" || myTxlk.mode.toLowerCase() == "k") {
                myTxlk.mode = myTxlk.mode.toLowerCase();
                rerun = true;
            }
        }
        while (rerun == false);
    }

    if(myTxlk.isSelectedLayerValid() == true){
        myTxlk.getModeFromUser();
        if (myTxlk.getRefData()) myTxlk.setPos();
        if (myTxlk.adminMode == "on") alert("Reference Y position = " + myTxlk.emYPos);
//        if (myTxlk.adminMode == "on") alert("This House is Clean");        
    }
}
