function shp(){

    myShp.isCompActive = function(){
        var compActive = false;
        if (myShp.myItem == null || !(myShp.myItem instanceof CompItem)){
            alert("Please establish a comp as the active item and run the script again");
        } else {
            compActive =  true;
        }
        return compActive;
    }

    myShp.isShapeLayerSelected = function(){
        var layerActive = false;
        if (myShp.myItem.selectedLayers.length > 1){
            alert("Multiple layers selected. Please select a single layer.")
        } else {
            myShp.curLayer = myShp.myItem.selectedLayers[0];
            if (myShp.curLayer == null) {
                alert("No layer is selected. Please select a single shape layer and run the script again.");
            } else {
                if (myShp.curLayer.matchName == "ADBE Vector Layer"){
                    layerActive = true;
                } else {
                    alert("You must select a single shape layer.");
                }
            }
        }
        return layerActive;
    }

    myShp.hasShapeGroups = function(){
        var thisHasShapes = false;
        try{
                var shapeCheck = myShp.curLayer.property(2)(1);
                thisHasShapes = true;
                if (myShp.adminMode == "on") alert("It has at least one group.");
            } catch (e) {
                 if (myShp.errorMsgs == "on") alert(e.name + ": " + e.message + ": " + e.lineNumber);
                 alert("This layer has no shape groups.");
                 thisHasShapes = false;
            }
        return thisHasShapes;
    }

    myShp.isSelectedLayerValid = function(){
        var isLayerValid = false;
//~         var isItComp = myShp.isCompActive();
        var compStat = "No";
        var layerStat = "No";
        var groupStat = "No";
        if (myShp.isCompActive() === true){
            compStat = "Yes";
//~             var isItShapeLayer = myShp.isShapeLayerSelected();
            if (myShp.isShapeLayerSelected() === true){
                layerStat = "Yes";
//~                 var hasGroups = myShp.hasShapeGroups();
                if(myShp.hasShapeGroups() === true){
                    myShp.contents = myShp.curLayer.property(2);
                    groupStat = "Yes";
                    isLayerValid = true;
                }
            }
        }
        if (myShp.adminMode == "on") alert("Comp? " + compStat + ", Shape Layer? " + layerStat + ", Groups? " + groupStat){
            return isLayerValid;
        }
    }

    myShp.sortie = function(){
        var shapes = [];
        myShp.shapesCount = myShp.contents.numProperties;

        for (var i = 1; i <= myShp.shapesCount; i++){
            var thisShape = myShp.contents.property(i);
            shapes.push(thisShape);
        }
        shapes.sort(function (a,b) {
            return b.transform.position.value[0] - a.transform.position.value[0];
        });

        var  shapeLen = shapes.length;
        myShp.shapeNames = [];
        for(var o = 0; o < shapes.length; o++){
            myShp.shapeNames[o] = shapes[o].name;
            }
        
        for (var r = 0; r < shapeLen; r++){
            var thisName = myShp.shapeNames[r];
            myShp.contents.property(thisName).moveTo(r + 1);
            
        }
    }

    if(myShp.isSelectedLayerValid() === true){
        myShp.sortie();
    }
}
