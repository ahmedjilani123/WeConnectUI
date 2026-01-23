sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/BusyDialog",
     "weconnectg/controller/BusyDialog/BusyD"
],function(Controller,BusyDialog,BusyD){
    return Controller.extend("weconnectg.controller.BaseController",{
getweekData(){
       var jsonModel = this.getOwnerComponent().getModel("Modelm");
            var oModel = this.getOwnerComponent().getModel("mainService");
            BusyD.show();
            oModel.read("/Weeks",{
                urlParameters:{
                    "$expand":"status"
                },
                success(odata){
                      BusyD.hide();
                      odata.results.sort((a, b) => b.weekNo - a.weekNo)
                    const MainDAta = {results:odata.results};
                  
                    var OpenOr = odata.results.some((item)=>{
                        return ['O','I','W'].includes(item.status_code)
                    })
                   
 MainDAta.NewEnbled=!OpenOr;
                    jsonModel.setData(MainDAta);
                    jsonModel.refresh(true);
console.log(odata);
                },
                error(oError){
                      BusyD.hide();
                   sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
            
                }
            })
}
      
    })

})