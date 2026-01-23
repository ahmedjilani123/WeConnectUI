sap.ui.define([
    "sap/ui/core/UIComponent",
    "weconnectg/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("weconnectg.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
       var createModel = this.getModel("CreateM");
       createModel.setData({
        remark:"",
        weeks_ID:""
       })
       createModel.refresh(true);
        var createModel = this.getModel("WeekCreateM");
       createModel.setData({
        currRemark:""
      
       })
       createModel.refresh(true);
            // enable routing
            this.getRouter().initialize();
        }
    });
});