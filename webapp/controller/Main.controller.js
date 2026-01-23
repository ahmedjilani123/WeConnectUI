sap.ui.define([
    "weconnectg/controller/BaseController",
    "weconnectg/controller/BusyDialog/BusyD",
    "sap/m/MessageToast",
    "weconnectg/controller/formatter",
    "sap/ui/core/Fragment"
], (BaseController, BusyD, MessageToast, formatter, Fragment) => {
    "use strict";

    return BaseController.extend("weconnectg.controller.Main", {
        formatter: formatter,
        onInit() {
            var Router = this.getOwnerComponent().getRouter();
            Router.getRoute("RouteInitial").attachPatternMatched(this.ObjectRouterViewData, this);
        },
        ObjectRouterViewData(objec) {
            this.getweekData();
        },
        onOpenDialogU: function () {
            BusyD.show();
            this.dialogUp = Fragment.load({
                id: this.getView().getId(),
                name: "weconnectg.fragments.AdminD.UpdateD",
                controller: this
            }).then((oDialog) => {
                this.getView().addDependent(oDialog);
                return oDialog;
            });

            this.dialogUp.then(function (oDialog) {
                  BusyD.hide();
                oDialog.open();
            });
        },
        NewHandlerWeek(oEvent){
              BusyD.show();
  this.dialogCreate = Fragment.load({
                id: this.getView().getId(),
                name: "weconnectg.fragments.AdminD.Create",
                controller: this
            }).then((oDialog) => {
                this.getView().addDependent(oDialog);
                return oDialog;
            });

            this.dialogCreate.then(function (oDialog) {
                  BusyD.hide();
                oDialog.open();
            });
        },
        onSaveNewHandler(oEvent){
let  weekNo = this.getOwnerComponent().getModel("Modelm").getData().results.length;
var remarkV = this.getOwnerComponent().getModel("WeekCreateM");
  BusyD.show();
var payload = {
    weekNo:weekNo,
    currRemark:remarkV.getData().currRemark
};
  var oModel = this.getOwnerComponent().getModel("mainService");
            oModel.create("/Weeks",payload, {
                success: function (oData, response) {
                      BusyD.hide();
                     oEvent.getSource().getParent().close();
                    this.getweekData();
                }.bind(this),
                error: function (oError) {
                      BusyD.hide();
                    sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                }
            });

        },
        onDetailNavigate(oEvent) {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("DetailRouter",{
                id: oEvent.getSource().getBindingContext("Modelm").getObject().ID
            });
        },
        StatusChangeHandler(oEvent) {
            $.sap.WeekID = oEvent.getSource().getBindingContext("Modelm").getObject().ID
            var that = this;
              BusyD.show();
            var oModel = this.getOwnerComponent().getModel("mainService");
            oModel.read("/Status", {
                success(odata) {
                      BusyD.hide();
                    var oStatusModel = new sap.ui.model.json.JSONModel(odata);
that.getView().setModel(oStatusModel, "statusModel");
                    that.dialogSt = Fragment.load({
                        id: that.getView().getId(),
                        name: "weconnectg.fragments.AdminD.StatusU",
                        controller: that
                    }).then((oDialog) => {
                        that.getView().addDependent(oDialog.setModel("statusModel"));
                        return oDialog;
                    });

                    that.dialogSt.then(function (oDialog) {
                        oDialog.open();
                    });
                },
                error(oError) {
                      BusyD.hide();
                   sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                }
            })


        },
        onSaveUpdateSHandler(oEvent) {
          
            var statusData = this.getView().getModel("statusModel").getData();
            const payload = {
                ID: $.sap.WeekID,
                status_code: statusData.status_code,
                statusRemark: statusData.statusRemark
            }
            var oModel = this.getOwnerComponent().getModel("mainService");
              BusyD.show();
            oModel.callFunction("/UpdateStatus", {
                method: "GET",
                urlParameters: payload,
                success: function (oData, response) {
                    console.log(oData);
                      BusyD.hide();
                     oEvent.getSource().getParent().close();
                    this.getweekData();
                }.bind(this),
                error: function (oError) {
                      BusyD.hide();
                    sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                }
            });
        },
        EnableUPdateBtnHandler(oEvent) {
            $.sap.WeekID = oEvent.getSource().getSelectedItem().getBindingContext("Modelm").getObject().ID;
            this.getView().byId("enableUpdateID").setEnabled(true);
        },
        CloseUpdatePress(oEvent) {
            var oModelC = this.getOwnerComponent().getModel("CreateM");
            oModelC.setData({});
            oModelC.refresh(true);
            oEvent.getSource().getParent().close();
        },
        onSaveEditHandler(oEvent){
             var oModel = this.getOwnerComponent().getModel("mainService");
             var oModelC = this.getOwnerComponent().getModel("CreateM");
             let DataPayload = oModelC.getData();
           
               BusyD.show();
               var daypayload ={
                weeks_ID:$.sap.WeekID,
                remark:DataPayload.remark
               }
            oModel.create("/DayWises",daypayload, {
                success: function (oData, response) {
                     oModelC.setData({});
            oModelC.refresh(true);
              BusyD.hide();
                     oEvent.getSource().getParent().close();
                    this.getweekData();
                }.bind(this),
                error: function (oError) {
                      BusyD.hide();
                    sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                }
            });
        }


    });
});