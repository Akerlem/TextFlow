function myScript(thisObj) {
    function myScript_buildUI(thisObj) {
      var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "ExportImport", undefined, {resizable: true, closeButton: false});
  
      var res = "group{orientation:'column',\
                 groupOne: Group{orientation:'row',\
          mainButton: Button {text:'Craete'},\
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
        // Check if any layers are selected
        if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
            var selectedLayers = app.project.activeItem.selectedLayers;
    
            // Check if there are selected layers
            if (selectedLayers.length > 0) {
                // Find the first selected text layer
                var firstTextLayer = null;
                for (var i = 0; i < selectedLayers.length; i++) {
                    if (selectedLayers[i] instanceof TextLayer) {
                        firstTextLayer = selectedLayers[i];
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
	 default:
		 
	 value;
}

*/
    

// Function to create a separated dimension for the text
function separateTextDimensions(textLayer) {
        textLayer.property("Position").dimensionsSeparated = true;
        textLayer.property("ADBE Transform Group").property("ADBE Position_0").expression = '11111';
     
    for (var i = 1; i < app.project.activeItem.selectedLayers.length; i++) {
        var currentLayer = app.project.activeItem.selectedLayers[i];

        // Check if the layer is a text layer
        if (currentLayer instanceof TextLayer) {
            // Add a sample expression to the position property
            currentLayer.property("Position").expression = 's = thisComp.layer(index-1);\rw = s.sourceRectAtTime().width;\rx = s.transform.position[0];\ry = s.transform.position[1];\rf = s.text.sourceText.style.fontSize;\rfinalmargin = f*.45*50/100;\r[x+w+finalmargin,y]';
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