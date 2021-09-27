  #include 'AE_Shapes_Textlike_v2_object.jsx'
  
      {
        // create an undo group
        app.beginUndoGroup("Textlike");
        var myTxlk = myTxlk || {};
        myTxlk.adminMode = "off";
        myTxlk.errorMsgs = "off ";
        myTxlk.myItem = app.project.activeItem;

        myTxlk.makelikeText = txlk();

        // close the undo group
        app.endUndoGroup();
    }