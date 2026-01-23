sap.ui.define([
  "sap/ui/core/mvc/Controller",
   "weconnectg/controller/formatter",
    "weconnectg/controller/BusyDialog/BusyD"
], (Controller,formatter,BusyD) => {
  "use strict";

  return Controller.extend("weconnectg.controller.Detail", {
    formatter: formatter,
      onInit() {
           var Router = this.getOwnerComponent().getRouter();
            Router.getRoute("DetailRouter").attachPatternMatched(this.ObjectRouterDetailData, this);
        
      },
      ObjectRouterDetailData(oEvent){
        var oUserModel = new sap.ui.model.json.JSONModel();
oUserModel.loadData("/user-api/currentUser");
oUserModel.attachRequestCompleted(function(oEvent) {
    var userData = oEvent.getSource().getData();
    console.log("Logged in user:", userData.displayName);
    // Bind this model to your UI components if needed
    this.getView().setModel(oUserModel, "user");
}, this);
const WeekID = oEvent.getParameter("arguments").id;
var createModel = this.getOwnerComponent().getModel("CreateM")
 var oModel = this.getOwnerComponent().getModel("mainService");
 BusyD.show();
            oModel.read(`/Weeks('${WeekID}')`,{
                 urlParameters:{
              $expand:"daywise"
            },
                success(odata){
                  BusyD.hide();
                  createModel.setData(odata);
                  createModel.refresh(true);
                },
                error(oError){
                  BusyD.hide();
                    sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
             
                }
            })
      },
      NavBacktoHome(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteInitial");
      }
  });
});