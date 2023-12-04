function myScript(thisObj) {
    function myScript_buildUI(thisObj) {
      var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "TextFlow", undefined, {resizable: true, closeButton: true});
  
      var res = "group{orientation:'column',\
                explText: StaticText{text:'Change expression preferences to Javascript.'},\
                groupOne: Group{orientation:'row',\
                mainButton: Button {text:'Create'},\
        },\
                groupThree: Group{orientation:'row',\
                closeButton: Button{text:'Close'},\
        },\
      }";
  
      myPanel.grp = myPanel.add(res);
        
      // Default / Functionality
      
      myPanel.grp.groupOne.mainButton.onClick = function () {
        mainFunction();
      };
        myPanel.grp.groupThree.closeButton.onClick = function () {
        myPanel.close();
      };
        myPanel.layout.layout(true);
      return myPanel;
    }
 
    

    function mainFunction() {
        app.beginUndoGroup("Create TextFlow");
        // Check if any layers are selected
        if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
            var selectedLayers = app.project.activeItem.selectedLayers;
    
            // Check if there are selected layers
            if (selectedLayers.length > 0) {
                // Find the first selected text layer
                var firstTextLayer = null;
                for (var i = 0; i < selectedLayers.length; i++) {
                    if (selectedLayers[i] instanceof TextLayer) {
                        //setLeftAlignment(selectedLayers[i]);
                        firstTextLayer = selectedLayers[i];
                        firstTextLayer.name = "*" + firstTextLayer.name;
                        break;
                    }
                }
    
                // Check if a text layer is found
                if (firstTextLayer) {
                    // Call the function to create a separated dimension for the text
                    separateTextDimensions(firstTextLayer);
                } else {
                    alert("No text layers found in the selected composition.");
                }
            } else {
                alert("No layers selected. Please select a text layer.");
            }
        } else {
            alert("Please select a composition with text layers.");
        }
        app.endUndoGroup();
    }
 
    /*
    cw= thisComp.width;
n=effect("Number of text layers")("Slider");
//n=thisComp.numLayers;

switch(true){
	
	case (n==1):
		lw1= thisLayer.sourceRectAtTime(10).width;
		w= lw1;
		(cw/2)-(w/2);
		break;
	
	
	case (n==2):
		lw1= thisLayer.sourceRectAtTime(10).width;
		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);
		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;
		w= lw1+lw2+lm2;
		(cw/2)-(w/2);
		break;

    case (n==3):
		lw1= thisLayer.sourceRectAtTime(10).width;
		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);
		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;
        lw3=(thisComp.layer(index+2).sourceRectAtTime(10).width);
		lm3=(thisComp.layer(index+2).text.sourceText.style.fontSize)*50*.45/100;
		w= lw1+lw2+lm2+lw3+lm3;
		(cw/2)-(w/2);
		break;

     case (n==4):
		lw1= thisLayer.sourceRectAtTime(10).width;
		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);
		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;
        lw3=(thisComp.layer(index+2).sourceRectAtTime(10).width);
		lm3=(thisComp.layer(index+2).text.sourceText.style.fontSize)*50*.45/100;
        lw4=(thisComp.layer(index+3).sourceRectAtTime(10).width);
		lm4=(thisComp.layer(index+3).text.sourceText.style.fontSize)*50*.45/100;
		w= lw1+lw2+lm2+lw3+lm3+lw4+lm4;
		(cw/2)-(w/2);
		break;
    
     case (n==5):
		lw1= thisLayer.sourceRectAtTime(10).width;
		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);
		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;
        lw3=(thisComp.layer(index+2).sourceRectAtTime(10).width);
		lm3=(thisComp.layer(index+2).text.sourceText.style.fontSize)*50*.45/100;
        lw4=(thisComp.layer(index+3).sourceRectAtTime(10).width);
		lm4=(thisComp.layer(index+3).text.sourceText.style.fontSize)*50*.45/100;
        lw5=(thisComp.layer(index+4).sourceRectAtTime(10).width);
		lm5=(thisComp.layer(index+4).text.sourceText.style.fontSize)*50*.45/100;
		w= lw1+lw2+lm2+lw3+lm3+lw4+lm4+lw5+lm5;
		(cw/2)-(w/2);
		break;


	 default:
		 value;
}

*/
    function setLeftAlignment(textLayer) {
        // Set paragraph justification to left-aligned
        textLayer.propety("Source Text").value.justification = ParagraphJustification.LEFT_JUSTIFY;
    }
        var wordsNumCtrl;
// Function to create a separated dimension for the text
function separateTextDimensions(textLayer) {
        textLayer.property("Position").dimensionsSeparated = true;
        wordsNumCtrl = textLayer.Effects.addProperty("ADBE Slider Control");
        wordsNumCtrl.name = "Number of words";
        textLayer.property("ADBE Transform Group").property("ADBE Position_0").expression = ' cw= thisComp.width;\r n=effect("Number of words")("Slider");\r//n=thisComp.numLayers;\r switch(true){\r	case (n==1):\r		lw1= thisLayer.sourceRectAtTime(10).width;\r		w= lw1;\r		(cw/2)-(w/2);\r		break;\r	case (n==2):\r		lw1= thisLayer.sourceRectAtTime(10).width;\r		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);\r		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;\r		w= lw1+lw2+lm2;\r		(cw/2)-(w/2);\r		break;\r	case (n==3):\r		lw1= thisLayer.sourceRectAtTime(10).width;\r		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);\r		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;\r        lw3=(thisComp.layer(index+2).sourceRectAtTime(10).width);\r		lm3=(thisComp.layer(index+2).text.sourceText.style.fontSize)*50*.45/100;\r		w= lw1+lw2+lm2+lw3+lm3;\r		(cw/2)-(w/2);\r		break;\r     case (n==4):\r		lw1= thisLayer.sourceRectAtTime(10).width;\r		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);\r		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;\r        lw3=(thisComp.layer(index+2).sourceRectAtTime(10).width);\r		lm3=(thisComp.layer(index+2).text.sourceText.style.fontSize)*50*.45/100;\r        lw4=(thisComp.layer(index+3).sourceRectAtTime(10).width);\r		lm4=(thisComp.layer(index+3).text.sourceText.style.fontSize)*50*.45/100;\r		w= lw1+lw2+lm2+lw3+lm3+lw4+lm4;\r		(cw/2)-(w/2);\r		break;\r     case (n==5):\r		lw1= thisLayer.sourceRectAtTime(10).width;\r		lw2=(thisComp.layer(index+1).sourceRectAtTime(10).width);\r		lm2=(thisComp.layer(index+1).text.sourceText.style.fontSize)*50*.45/100;\r        lw3=(thisComp.layer(index+2).sourceRectAtTime(10).width);\r		lm3=(thisComp.layer(index+2).text.sourceText.style.fontSize)*50*.45/100;\r        lw4=(thisComp.layer(index+3).sourceRectAtTime(10).width);\r		lm4=(thisComp.layer(index+3).text.sourceText.style.fontSize)*50*.45/100;\r        lw5=(thisComp.layer(index+4).sourceRectAtTime(10).width);\r		lm5=(thisComp.layer(index+4).text.sourceText.style.fontSize)*50*.45/100;\r		w= lw1+lw2+lm2+lw3+lm3+lw4+lm4+lw5+lm5;\r		(cw/2)-(w/2);\r		break; \r        default:\r	 value;\r}';


    for (var i = 1; i < app.project.activeItem.selectedLayers.length; i++) {
        var currentLayer = app.project.activeItem.selectedLayers[i];

        // Check if the layer is a text layer
        if (currentLayer instanceof TextLayer) {
            // Add a sample expression to the position property
            currentLayer.property("Position").expression = 's = thisComp.layer(index-1);\r  w = s.sourceRectAtTime().width;\r   x = s.transform.position[0];\r  y = s.transform.position[1];\r  f = s.text.sourceText.style.fontSize;\r finalmargin = f*.45*50/100;\r   [x+w+finalmargin,y]';
        }
    }
}
    

    var myScriptPal = myScript_buildUI(thisObj);
    if (myScriptPal != null && myScriptPal instanceof Window) {
      myScriptPal.center();
      myScriptPal.show();
    }
    
  }
  
  myScript(this);





  /*
  s = thisComp.layer(index-1);
w = s.sourceRectAtTime().width;
x = s.transform.position[0];
y = s.transform.position[1];
f = s.text.sourceText.style.fontSize; 
finalmargin = f*.45*50/100;
[x+w+finalmargin,y]

*/