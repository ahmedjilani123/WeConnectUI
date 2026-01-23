sap.ui.define([],function(){
"use strict";
return{
 statusS:function(sStatus){
    switch(sStatus){
        case "O":
            return "Indication15";
        case "R":
            return "Indication16";
        case "W":
            return "Indication20";
         case "I":
            return "Indication18";
         case "C":
            return "Indication14";
        case "T":
            return "Indication13";
        default:
            return "Indication15";
    }
},
statusText:function(sStatus){
    switch(sStatus){
        case "O":
            return "Open";
        case "R":
            return "Received";
        case "W":
            return "Waiting";
         case "I":
            return "In Progress";
         case "C":
            return "Completed";
        case "T":
            return "Transfer";
        default:
            return "Open";
    }
},
statusIcon:function(sStatus){
   switch (sStatus) {
                case "O":
                    return "sap-icon://status-inactive";
                case "R":
                    return "sap-icon://download";
                case "W":
                    return "sap-icon://pending";
                case "I":
                    return "sap-icon://process";
                case "C":
                    return "sap-icon://complete";
                case "T":
                    return "sap-icon://shipping-status";
                default:
                    return "sap-icon://status-inactive";
            }
}

}
})