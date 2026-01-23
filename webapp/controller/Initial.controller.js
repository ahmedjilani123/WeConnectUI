sap.ui.define([
 "weconnectg/controller/BaseController",
 "weconnectg/controller/BusyDialog/BusyD",
 "sap/m/MessageToast"
], (BaseController,BusyD,MessageToast) => {
    "use strict";

    return BaseController.extend("weconnectg.controller.Initial", {
        onInit() {},
        LoginToMainPage(){
            const Router = this.getOwnerComponent().getRouter();
            Router.navTo("MainRouter");
        }
          


           

    
    });
});