  #include 'AE_Shape_Auto-follow_object.jsx'
  
      {
        // create an undo group
        app.beginUndoGroup("Set Expressions");
        var mySX = mySX || {};
        mySX.adminMode = "off";
        mySX.errorMsgs = "off ";
        mySX.myItem = app.project.activeItem;
        mySX.wurd = "booty";
        mySX.setIt = sX();

        // close the undo group
        app.endUndoGroup();
    }