sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/webc/main/Panel","sap/m/Text","sap/m/VBox"],function(e,t,n,o){"use strict";return e.extend("poetries.controller.homePage",{onInit(){},onShowPoems:function(){const e=this.getOwnerComponent().getModel();const s=this.byId("poemCardContainer");s.removeAllItems();e.bindList("/Poems").requestContexts().then(e=>{e.forEach(e=>{const i=e.getObject();const a=new o({items:[new t({headerText:i.title,content:new n({text:i.content,wrapping:true})})]}).addStyleClass("sapUiSmallMargin");s.addItem(a)})})}})});
//# sourceMappingURL=homePage.controller.js.map