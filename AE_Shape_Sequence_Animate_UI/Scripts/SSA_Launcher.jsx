{
    function myLauncher(thisObj){
        function myLauncher_buildUI(thisObj){
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", "Shape Sequence Launcher", undefined, {resizeable: true});
            
            res = "group{\
                orientation: 'column',\
                alignment: ['middle', 'fill'],\
                mainGroup: Group{\
                    orientation: 'column',\
                    alignment: ['middle', 'fill'],\
                    spacing:4,\
                    myText: StaticText{text: 'Select Task:', alignment: ['middle', 'top']},\
                    sortButt: Button{text: 'Sort Shapes', alignment: ['fill', 'top']},\
                    baseButt: Button{text: 'Set Baseline', alignment: ['fill', 'top']},\
                    seqButt: Button{text: 'Animate Sequence'},\
                },\
            };"
            myPanel.grp = myPanel.add(res);
            
            myPanel.grp.mainGroup.seqButt.onClick = function() {
                #include '../Shape_Sequence_Animate_UI.jsx'
            }
        
            myPanel.layout.layout(true);
            return myPanel;
        }
        var myLnch = myLauncher_buildUI(thisObj);
        if ((myLnch != null) && (myLnch instanceof Window)) {
            myLnch.center();
            myLnch.show();
        }
    }
    myLauncher(this);
}