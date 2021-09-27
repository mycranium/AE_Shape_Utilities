function sX(){

    mySX.isCompActive = function(){
        var compActive = false;
        if (mySX.myItem == null || !(mySX.myItem instanceof CompItem)){
            // if no comp selected, display an alert
            alert("Please establish a comp as the active item and run the script again");
        } else {
            compActive =  true;
        }
        return compActive;
    }

    mySX.isShapeLayerSelected = function(){
        var layerActive = false;
        mySX.curLayer = mySX.myItem.selectedLayers[0];
        if (mySX.curLayer == null) {
            alert("No layer is selected.");
        } else {
            if (mySX.curLayer.property(2).matchName == "ADBE Root Vectors Group"){
                layerActive = true;
            } else {
                alert("You must select a shape layer with shapes.");
            }
        }
        return layerActive;
    }

    mySX.hasShapeGroups = function(){
        var thisHasShapes = false;
        try{
                var shapeCheck = mySX.curLayer.property(2)(1);
                thisHasShapes = true;
                if (mySX.adminMode == "on") alert("It has at least one group.");
            } catch (e) {
                 if (mySX.errorMsgs == "on") alert(e.name + ": " + e.message + ": " + e.lineNumber);
                 alert("This layer has no shape groups.");
                thisHasShapes = false;
            }
        return thisHasShapes;
    }

    mySX.isSelectedLayerValid = function(){
        var isLayerValid = false;
        var isItComp = mySX.isCompActive();
        var compStat = "No";
        var layerStat = "No";
        var groupStat = "No";
        if (isItComp == true){
            compStat = "Yes";
            var isItShapeLayer = mySX.isShapeLayerSelected();
            if (isItShapeLayer == true){
                layerStat = "Yes";
                var hasGroups = mySX.hasShapeGroups();
                if(hasGroups == true){
                    mySX.contents = mySX.curLayer.property(2);
                    groupStat = "Yes";
                    isLayerValid = hasGroups;
                }
            }
        }
        if (mySX.adminMode == "on") alert("Comp? " + compStat + ", Shape Layer? " + layerStat + ", Groups? " + groupStat)
        return isLayerValid;
    }

    // Loop through all shapes and set anchor and position
    mySX.setExp = function(){
        mySX.shapesCount = mySX.contents.numProperties; // this should be the number of shape groups
        mySX.addSlider();
        var myGroup = mySX.contents.property(mySX.shapesCount); // The bottom shape group in the stack (?)
        if(myGroup.name != "Lead"){myGroup.name = "Lead";} // Set the bottom shape group name to Lead if it isn't already
        for (var r = 1; r <= mySX.shapesCount; r++) { // loop shapes
            var myGroup = mySX.contents.property(r);
            if (myGroup.name != "Lead"){ // do stuff if it isn't the Lead layer
                var transforms =  myGroup.property("Transform");
                var mult = mySX.shapesCount - myGroup.propertyIndex;

                transforms.property(mySX.myProp).expression = "var idx = thisProperty.propertyGroup(2).propertyIndex;\r\nvar numProps = thisProperty.propertyGroup(3).numProperties;\r\nvar mult = numProps - idx;\r\nthisLayer(\"Contents\")(\"Lead\")(\"Transform\")(\"" +  mySX.myProp + "\").valueAtTime(time - (mult * (effect(\"Time Offset (Frames) - " + mySX.myProp + "\")(\"Slider\") / (1/thisComp.frameDuration))))";
            }
        }
    }

    mySX.addSlider = function() {
        // add a slider control for time offset(frames)
        var frOffset = mySX.curLayer.Effects.addProperty("ADBE Slider Control");
        frOffset.name = "Time Offset (Frames) - " + mySX.myProp;
        frOffset.property("Slider").setValue(1);
    }


    mySX.getModeFromUser = function(){
        var rerun = false;
        mySX.myProp = "";
        do {
            mySX.mode = prompt("Type a letter for the transform property you want to operate on. \r\nAnchor Point: a,  Position: p, Rotation: r, Scale: s, Opacity: t\r\nDefault is Scale.", "s");
            switch (mySX.mode){
                case null:
                    alert("You've canceled the operation.");
                    return false;
                    break;
                case "a":
                    mySX.myProp = "Anchor Point";
                    rerun = true;
                    break;
                case "p":
                    mySX.myProp = "Position";
                    rerun = true;
                    break;
                case "s":
                    mySX.myProp = "Scale";
                    rerun = true;
                    break;
                case "r":
                    mySX.myProp = "Rotation";
                    rerun = true;
                    break;
                case "t":
                    mySX.myProp = "Opacity";
                    rerun = true;
                    break;
            }
        return true;
        }
        while (rerun == false);
    }

    if(mySX.isSelectedLayerValid() == true){
        mySX.getModeFromUser()
        if(mySX.myProp){
            mySX.setExp()
        } else {
            alert("No valid property selected. Operation canceled.");
        }
    }
}