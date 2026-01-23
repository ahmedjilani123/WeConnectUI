sap.ui.define([
 "weconnectg/controller/BaseController",
  "weconnectg/controller/BusyDialog/BusyD",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], (BaseController,BusyD,JSONModel,MessageToast) => {
    "use strict";

    return BaseController.extend("weconnectg.controller.NotFound", {
onInit(){},
BackToLoginPress(){
    const oRouter = this.getOwnerComponent().getRouter();
    oRouter.navTo("RouteInitial");
}
    })
})