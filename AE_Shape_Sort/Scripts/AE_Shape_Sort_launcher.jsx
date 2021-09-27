  #include 'AE_Shape_Sort_object.jsx'
  
      {
        // create an undo group
        app.beginUndoGroup("Shape Sort");
        var myShp = myShp || {};
        myShp.adminMode = "off";
        myShp.errorMsgs = "off ";
        myShp.myItem = app.project.activeItem;

        myShp.makelikeText = shp();

        // close the undo group
        app.endUndoGroup();
    }