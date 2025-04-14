sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/webc/main/Panel",
    "sap/m/Text",
    "sap/m/VBox"
  ], function (Controller, WebcPanel, Text, VBox) {
    "use strict";
  
    return Controller.extend("poetries.controller.homePage", {
      onInit() {},
  
      onShowPoems: function () {
        const oModel = this.getOwnerComponent().getModel();
        const oContainer = this.byId("poemCardContainer");
        oContainer.removeAllItems();
  
        oModel.bindList("/Poems").requestContexts().then(aContexts => {
          aContexts.forEach(oContext => {
            const poem = oContext.getObject();
  
            // Wrap the panel in a VBox to allow margin without custom CSS
            const oBox = new VBox({
              items: [
                new WebcPanel({
                  headerText: poem.title,
                  content: new Text({
                    text: poem.content,
                    wrapping: true
                  })
                })
              ]
            }).addStyleClass("sapUiSmallMargin");
  
            oContainer.addItem(oBox);
          });
        });
      }
    });
  });
  