/**
* @@@BUILDINFO@@@ Shape_Sequence_Animate_UI_v0.4.jsx !Version 0.4! Tue Sep 28 2021 13:30:05 GMT+0400
*/

/* To do: Enable/disable buttons code, logic
    Add other shape properties - stroke, fill, trimpaths etc
    Logic: Add checks for optional properties; offer to add optional properties if needed
    PROPERTIES: Trim Paths (start, end, offset), stroke width, stroke offset, cap type, stroke color, Fill color
    Globalizer for options ?? Like expression controls?
    Animation Presets
    Position - same start point (x,y, xy) same distance (x,y,xy)
    Priority: Simple version (transforms only, TL only
    Lead shape selector list generation
    Position offset logic
    */
{
    function myScript(thisObj){
        function myScript_buildUI(thisObj){
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("dialog", "Shape Sequence Animate", undefined, {resizeable: true});
            
            res = "group{\
                            orientation: 'column',\
                            introTxt: StaticText{text: 'Layer Selection'}\
                            layerGroup: Group{\
                                orientation: 'row',\
                                choiceGroup: Group{\
                                    orientation: 'row',\
                                    alignment: ['fill', 'fill'],\
                                    cRBGroup: Group{\
                                        orientation: 'column',\
                                        alignChildren: 'left',\
                                        allRB: RadioButton {text: 'From All Viable Shape Layers', justify: 'left', enabled: false},\
                                        subRB: RadioButton {text: 'From Selected Viable Shape Layers', justify: 'left', enabled: false},\
                                        selRB: RadioButton {text: 'Single Selected Viable Shape Layer', justify: 'left', enabled: false}\
                                    },\
                                    cDDGroup:Group{\
                                        orientation: 'column',\
                                        allDropDown: DropDownList{size: [200, 21], enabled: false},\
                                        subDropDown: DropDownList{size: [200, 21], enabled: false},\
                                        selTxt: StaticText{text: 'None Selected'}\
                                    },\
                                },\
                                lyrSelBtn: Button{text:'Select Layer', enabled: false}\
                            },\
                            feedbackPanel: Panel{\
                                alignment: ['fill', 'top'],\
                                text: 'Messages:',\
                                fbBox:StaticText{alignment: ['fill', 'fill'], text:'Default Text'}\
                            },\
                            setupGroup: Group{\
                                orientation: 'row',\
                                alignment: ['left', 'top'],\
                                propGroup: Group{\
                                    orientation: 'column',\
                                    spacing:10,\
                                    alignment: ['left', 'top'],\
                                    alignChildren: ['left', 'center'],\
                                    lProp: StaticText{text: 'Property'},\
                                    aCheck: Checkbox {text: 'Anchor', enabled: false},\
                                    pCheck: Checkbox {text: 'Position', enabled: false},\
                                    sCheck: Checkbox {text: 'Scale', enabled: false},\
                                    rCheck: Checkbox {text: 'Rotation', enabled: false},\
                                    tCheck: Checkbox {text: 'Opacity', enabled: false}\
                                },\
                                modeGroup: Group{\
                                    orientation: 'column',\
                                    alignment: ['left', 'top'],\
                                    alignChildren: ['center', 'center'],\
                                    lMode: StaticText{text: 'Auto/Manual', alignment: ['top', 'left']},\
                                    aRadioGroup: Group {\
                                        orientation: 'row',\
                                        aRadioA: RadioButton{value: true, enabled: false},\
                                        aRadioM: RadioButton{enabled: false}\
                                    },\
                                    pRadioGroup: Group {\
                                        orientation: 'row',\
                                        pRadioA: RadioButton{value: true, enabled: false},\
                                        pRadioM: RadioButton{enabled: false}\
                                    },\
                                    sRadioGroup: Group {\
                                        orientation: 'row',\
                                        sRadioA: RadioButton{value: true, enabled: false},\
                                        sRadioM: RadioButton{enabled: false}\
                                    },\
                                    rRadioGroup: Group {\
                                        orientation: 'row',\
                                        rRadioA: RadioButton{value: true, enabled: false},\
                                        rRadioM: RadioButton{enabled: false}\
                                    },\
                                    tRadioGroup: Group {\
                                        orientation: 'row',\
                                        tRadioA: RadioButton{value: true, enabled: false},\
                                        tRadioM: RadioButton{enabled: false}\
                                    }\
                                },\
                                timeGroup:Group{\
                                    orientation: 'column',\
                                    alignment: ['left', 'top'],\
                                    alignChildren: ['center', 'center'],\
                                    spacing: 8,\
                                    lOffset: StaticText {text: 'Time Offset'},\
                                    aOffset: EditText {text:1, size: [26, 21], enabled: false},\
                                    pOffset: EditText {text:1, size: [26, 21], enabled: false},\
                                    sOffset: EditText {text:1, size: [26, 21], enabled: false},\
                                    rOffset: EditText {text:1, size: [26, 21], enabled: false},\
                                    tOffset: EditText {text:1, size: [26, 21], enabled: false},\
                                },\
                                animGroup:Group{\
                                    orientation: 'column',\
                                    alignment: ['left', 'top'],\
                                    alignChildren: ['center', 'center'],\
                                    spacing: 8,\
                                    lAnim: StaticText {text: 'Base Animation'},\
                                    aAnim:DropDownList{properties: {items: ['None', 'Fly-In Left', 'Fly-In Top', 'Fly-In Right', 'Fly-In Bottom']}, size: [120, 21], enabled: false},\
                                    pAnim:DropDownList{properties: {items: ['None', 'Fly-In Left', 'Fly-In Top', 'Fly-In Right', 'Fly-In Bottom']}, size: [120, 21], enabled: false},\
                                    sAnim:DropDownList{properties: {items: ['None', 'Scale-In X', 'Scale-In Y', 'Scale-In Uniform']}, size: [120, 21], enabled: false},\
                                    rAnim:DropDownList{properties: {items: ['None', 'Rotate In Clockwise', 'Rotate In Counter-Clockwise']}, size: [120, 21], enabled: false},\
                                    tAnim:DropDownList{properties: {items: ['None', 'Fade In']}, size: [120, 21], enabled: false}\
                                },\
                                leadGroup:Group{\
                                    orientation: 'column',\
                                    alignment: ['left', 'top'],\
                                    alignChildren: ['center', 'center'],\
                                    spacing: 8,\
                                    lLead: StaticText {text: 'Lead Shape'},\
                                    aLead:DropDownList{size: [90, 21], enabled: false},\
                                    pLead:DropDownList{size: [90, 21], enabled: false},\
                                    sLead:DropDownList{size: [90, 21], enabled: false},\
                                    rLead:DropDownList{size: [90, 21], enabled: false},\
                                    tLead:DropDownList{size: [90, 21], enabled: false},\
                                },\
                                overGroup: Group{\
                                    orientation: 'column',\
                                    spacing:11,\
                                    alignment: ['left', 'top'],\
                                    alignChildren: ['center', 'center'],\
                                    lOver: StaticText{text: 'Overshoot'},\
                                    aOver: Checkbox {enabled: false},\
                                    pOver: Checkbox {enabled: false},\
                                    sOver: Checkbox {enabled: false},\
                                    rOver: Checkbox {enabled: false}\
                                }\
                            }\
                       };"
            
            myPanel.grp = myPanel.add(res);
            var fG = myPanel.grp.feedbackPanel;
            var yG = myPanel.grp.layerGroup;
            var yGRB = myPanel.grp.layerGroup.choiceGroup.cRBGroup;
            var yGDD = myPanel.grp.layerGroup.choiceGroup.cDDGroup;
            var pG = myPanel.grp.setupGroup.propGroup;
            var mG = myPanel.grp.setupGroup.modeGroup;
            var tG = myPanel.grp.setupGroup.timeGroup;
            var aG = myPanel.grp.setupGroup.animGroup;
            var lG = myPanel.grp.setupGroup.leadGroup;
            var oG = myPanel.grp.setupGroup.overGroup;
            
            myPanel.genAllLyrLists = function(){
                var myComp  = app.project.activeItem
                if (myComp == null || !(myComp instanceof CompItem)){ // check active item is a comp
                    fG.fbBox.text = "Please establish a comp as the active item and try again"; // message if activeitemis not a comp
                } else { // check if comp has layers
                    var compLyrs = myComp.layers;
                    var numLyrs = compLyrs.length;
                    if (numLyrs == 0){
                        fG.fbBox.text = 'This comp has no layers. This script will only work if the comp has at least one Shape Layer containing at least two Shape Groups.';
                    } else {
                        var selLyrs = myComp.selectedLayers; // 0 based array of selected layers
                        var allViable = myPanel.genLyrList("all", compLyrs);
                        var selViable = (selLyrs.length > 0) ? myPanel.genLyrList("sel", selLyrs) : 0;
                        if((allViable + selViable) > 0){
                            yG.lyrSelBtn.enabled = true;
                            if(yGRB.selRB.enabled == true){
                                yGRB.selRB.value = true;
                            } else {
                                if(yGRB.subRB.enabled == true){
                                    yGRB.subRB.value = true;
                                } else {
                                    yGRB.allRB.value = true;
                                }
                            }
                            fG.fbBox.text = 'Select a layer and click the "Select Layer" button.';
                        } else {
                            fG.fbBox.text = 'There are no viable Shape Layers in this comp. Shape Layers must contain at least two Shape Groups.';
                        }
                    }
                }
            }
            myPanel.genLyrList = function(lyrType, lyrs){
                var ddList = (lyrType == "all") ? yGDD.allDropDown : yGDD.subDropDown;
                var rButt = (lyrType == "all") ? yGRB.allRB : yGRB.subRB;
                ddList.removeAll();
                var lyrCt = lyrs.length;
                var viableLayers = 0;
                var lyrNames = [];
                var minLyrs = (lyrType == "all") ? 0 : 1;
                var loffset = (lyrType == "all") ? 0 : 1;
                for(var i = 1 - loffset; i <= lyrCt-loffset; i++) {
                    if (myPanel.validateShapeLayer(lyrs[i]) === true){
                        lyrNames.push(lyrs[i].name);
                        viableLayers++;
                    }
                }
                if(viableLayers > minLyrs){
                    var ddItems = lyrNames.length;
                    for(var n = 0; n < ddItems; n++){
                        ddList.add('item', lyrNames[n]);
                    }
                    ddList.selection = 0;
                    ddList.enabled = true;
                    rButt.enabled = true;
                } 
                if(viableLayers === minLyrs && lyrType != "all"){
                    yGDD.selTxt.text = lyrNames[0];
                    yGRB.selRB.enabled = true;
                }
                return viableLayers;
            }
        
            myPanel.validateShapeLayer = function(thisLayer){ // Verify that specified layer is a shape layer with shape groups
                var viableShapeLayer = false;
                if (thisLayer.matchName == "ADBE Vector Layer"){ // Make sure the passed layer is a shape layer
//~                     alert(thisLayer.name);
                    var shapeCheck = thisLayer.property("Contents").numProperties; // Count the number of properties in the Contents property
//~                     alert(shapeCheck);
                    viableShapeLayer = shapeCheck >= 2 ? true : false; // Valid if enough properties to justify follow
                }
                return viableShapeLayer;
            }
        
            yG.lyrSelBtn.onClick = function(){
                pG.aCheck.enabled = true;
                pG.pCheck.enabled = true;
                pG.sCheck.enabled = true;
                pG.rCheck.enabled = true;
                pG.tCheck.enabled = true;
                yG.lyrSelBtn.enabled = false;
                fG.fbBox.text = 'Set up your animations below, then click the "Commit" button.'
            }
            yGDD.allDropDown.onChange = function(){
                pG.aCheck.enabled = false;
                pG.pCheck.enabled = false;
                pG.sCheck.enabled = false;
                pG.rCheck.enabled = false;
                pG.tCheck.enabled = false;
                yG.lyrSelBtn.enabled = true;
                yGRB.allRB.value = true;
                fG.fbBox.text = 'Click "Select Layer" to confirm new layer selection.'
            }
        
            yGDD.subDropDown.onChange = function(){
                pG.aCheck.enabled = false;
                pG.pCheck.enabled = false;
                pG.sCheck.enabled = false;
                pG.rCheck.enabled = false;
                pG.tCheck.enabled = false;
                yG.lyrSelBtn.enabled = true;
                yGRB.subRB.value = true;
                fG.fbBox.text = 'Click "Select Layer" to confirm new layer selection.'
            }
            // Set default animation selections to None
            aG.aAnim.selection = 0;
            aG.pAnim.selection = 0;
            aG.sAnim.selection = 0;
            aG.rAnim.selection = 0;
            aG.tAnim.selection = 0;
            
            myPanel.getSelected = function(theList){ // get value of selected list item
                var thisSel = theList.items;
                var iLen = thisSel.length;
                var selItem = "";
                for (var iL = 0; iL < iLen; iL++) {
                    if (thisSel[iL].selected === true){
                        selItem = thisSel[iL].toString();
                    }
                }
                return selItem;
            }

            pG.aCheck.onClick = function(){
                var trueVal = pG.aCheck.value;
                mG.aRadioGroup.aRadioA.enabled = trueVal; 
                mG.aRadioGroup.aRadioM.enabled = trueVal; 
                tG.aOffset.enabled = mG.aRadioGroup.aRadioM.value === true ? false : trueVal;
                aG.aAnim.enabled = trueVal;
                lG.aLead.enabled = trueVal;
                oG.aOver.enabled = myPanel.getSelected(aG.aAnim) == 'None' ? false : trueVal;
            }
            pG.pCheck.onClick = function(){
                var trueVal = pG.pCheck.value;
                mG.pRadioGroup.pRadioA.enabled = trueVal; 
                mG.pRadioGroup.pRadioM.enabled = trueVal; 
                tG.pOffset.enabled = mG.pRadioGroup.pRadioM.value === true ? false : trueVal;
                aG.pAnim.enabled = trueVal;
                lG.pLead.enabled = trueVal;
                oG.pOver.enabled = myPanel.getSelected(aG.pAnim) == 'None' ? false : trueVal;
            }
            pG.sCheck.onClick = function(){
                var trueVal = pG.sCheck.value;
                mG.sRadioGroup.sRadioA.enabled = trueVal; 
                mG.sRadioGroup.sRadioM.enabled = trueVal; 
                tG.sOffset.enabled = mG.sRadioGroup.sRadioM.value === true ? false : trueVal;
                aG.sAnim.enabled = trueVal;
                lG.sLead.enabled = trueVal;
                oG.sOver.enabled = myPanel.getSelected(aG.sAnim) == 'None' ? false : trueVal;
            }
            pG.rCheck.onClick = function(){
                var trueVal = pG.rCheck.value;
                mG.rRadioGroup.rRadioA.enabled = trueVal; 
                mG.rRadioGroup.rRadioM.enabled = trueVal; 
                tG.rOffset.enabled = mG.rRadioGroup.rRadioM.value === true ? false : trueVal;
                aG.rAnim.enabled = trueVal;
                lG.rLead.enabled = trueVal;
                oG.rOver.enabled = myPanel.getSelected(aG.rAnim) == 'None' ? false : trueVal;
            }
            pG.tCheck.onClick = function(){
                var trueVal = pG.tCheck.value;
                mG.tRadioGroup.tRadioA.enabled = trueVal; 
                mG.tRadioGroup.tRadioM.enabled = trueVal; 
                tG.tOffset.enabled = mG.tRadioGroup.tRadioM.value === true ? false : trueVal;
                aG.tAnim.enabled = trueVal;
                lG.tLead.enabled = trueVal;
            }

// Radio buttons enable/disable Time Offset control
            mG.aRadioGroup.aRadioA.onClick = function(){
                tG.aOffset.enabled = pG.aCheck.value === true ?  true : false;
            }
            mG.aRadioGroup.aRadioM.onClick = function() {
                tG.aOffset.enabled = false;
           }
            mG.pRadioGroup.pRadioA.onClick = function(){
                tG.pOffset.enabled = pG.pCheck.value === true ?  true : false;
            }
            mG.pRadioGroup.pRadioM.onClick = function() {
                tG.pOffset.enabled = false;
           }
            mG.sRadioGroup.sRadioA.onClick = function(){
                tG.sOffset.enabled = pG.sCheck.value === true ?  true : false;
            }
            mG.sRadioGroup.sRadioM.onClick = function() {
                tG.sOffset.enabled = false;
           }
            mG.rRadioGroup.rRadioA.onClick = function(){
                tG.rOffset.enabled = pG.rCheck.value === true ?  true : false;
            }
            mG.rRadioGroup.rRadioM.onClick = function() {
                tG.rOffset.enabled = false;
           }
            mG.tRadioGroup.tRadioA.onClick = function(){
                tG.tOffset.enabled = pG.tCheck.value === true ?  true : false;
            }
            mG.tRadioGroup.tRadioM.onClick = function() {
                tG.tOffset.enabled = false;
           }
            
// Animation dropdown disable/enable Overshoot 
            aG.aAnim.onChange = function(){
                var mySel = myPanel.getSelected(aG.aAnim);
                if(pG.aCheck.value === false || mySel == 'None'){
                    oG.aOver.enabled = false;
                } else {
                    oG.aOver.enabled = true;
                }
            }

            aG.pAnim.onChange = function(){
                var mySel = myPanel.getSelected(aG.pAnim);
                if(pG.pCheck.value === false || mySel == 'None'){
                    oG.pOver.enabled = false;
                } else {
                    oG.pOver.enabled = true;
                }
            }

            aG.sAnim.onChange = function(){
                var mySel = myPanel.getSelected(aG.sAnim);
                if(pG.sCheck.value === false || mySel == 'None'){
                    oG.sOver.enabled = false;
                } else {
                    oG.sOver.enabled = true;
                }
            }

            aG.rAnim.onChange = function(){
                var mySel = myPanel.getSelected(aG.rAnim);
                if(pG.rCheck.value === false || mySel == 'None'){
                    oG.rOver.enabled = false;
                } else {
                    oG.rOver.enabled = true;
                }
            }
        
        
            myPanel.genAllLyrLists();
            myPanel.layout.layout(true);
            return myPanel;
        }
        var myScriptPal = myScript_buildUI(thisObj);
        if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
            myScriptPal.center();
            myScriptPal.show();
        }
    }
    myScript(this);
}

