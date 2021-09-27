function makeSorter(){
    var sorter = sorter || {}; // Create new object
    
//~     Properties
    sorter.direction = myPanel.direction;
    sorter.comp = app.project.activeItem;
    sorter.adminMode = myPanel.admin;
    sorter.errorMsgs = myPanel.errmsg;
    
//~     Methods
    sorter.isCompActive = function(){
        var compActive = false;
        if (sorter.comp == null || !(sorter.comp instanceof CompItem)){
            // if no comp selected, display an alert
            alert("Please establish a comp as the active item and run the script again");
        } else {
            compActive =  true;
        }
        return compActive;
    }

    sorter.isShapeLayerSelected = function(){
        var layerActive = false;
        sorter.curLayer = sorter.comp.selectedLayers[0];
        if (sorter.curLayer == null) {
            alert("No layer is selected.");
        } else {
            if (sorter.curLayer.property(2).matchName == "ADBE Root Vectors Group"){
                layerActive = true;
            } else {
                alert("You must select a shape layer with shapes.");
            }
        }
        return layerActive;
    }

    sorter.hasShapeGroups = function(){
        var thisHasShapes = false;
        try{
                var shapeCheck = sorter.curLayer.property(2)(1);
                thisHasShapes = true;
                if (sorter.adminMode == "on") alert("It has at least one group.");
            } catch (e) {
                 if (sorter.errorMsgs == "on") alert(e.name + ": " + e.message + ": " + e.lineNumber);
                 alert("This layer has no shape groups.");
                thisHasShapes = false;
            }
        return thisHasShapes;
    }

    sorter.isSelectedLayerValid = function(){
        var isLayerValid = false;
        var compStat = "No";
        var layerStat = "No";
        var groupStat = "No";
        if (sorter.isCompActive() === true){
            compStat = "Yes";
            if (sorter.isShapeLayerSelected() === true){
                layerStat = "Yes";
                if(sorter.hasShapeGroups() === true){
                    sorter.contents = sorter.curLayer.property(2);
                    groupStat = "Yes";
                    isLayerValid = true;
                }
            }
        }
        if (sorter.adminMode == "on") alert("Comp? " + compStat + ", Shape Layer? " + layerStat + ", Groups? " + groupStat){
            return isLayerValid;
        }
    }

    sorter.sortShapes = function(){
        var shapes = [];
        sorter.shapesCount = sorter.contents.numProperties;

        for (var i = 1; i <= sorter.shapesCount; i++){
            var thisShape = sorter.contents.property(i);
            shapes.push(thisShape);
        }

        switch (sorter.direction) {
            case 0:
                shapes.sort(function (a,b) {
                    return b.transform.position.value[0] - a.transform.position.value[0];
                });
            break;
            case 1:
                shapes.sort(function (a,b) {
                    return a.transform.position.value[0] - b.transform.position.value[0];
                });
            break;
            case 2:
                shapes.sort(function (a,b) {
                    return a.transform.position.value[1] - b.transform.position.value[1];
                });
            break;
            case 3:
                shapes.sort(function (a,b) {
                    return b.transform.position.value[1] - a.transform.position.value[1];
                });
            break;
        }

var  shapeLen = shapes.length;
        sorter.shapeNames = [];
        for(var o = 0; o < shapes.length; o++){
            sorter.shapeNames[o] = shapes[o].name;
            }
        
        for (var r = 0; r < shapeLen; r++){
            var thisName = sorter.shapeNames[r];
            sorter.contents.property(thisName).moveTo(r + 1);
        }
    }
    myPanel.mySort = sorter;
}
