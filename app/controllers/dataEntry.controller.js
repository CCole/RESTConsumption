require('../services/staff.service.js');

module.exports =
angular
    .module('dataEntry',['staff'])
    .controller('dataEntry.controller', enterData);

function enterData(staffData){
    var vm = this;
    //vm.staffType = "Enter Staff Type";
   // vm.newStaff = {}; //create object from all inputs and send to server - send over in payload
    vm.submit = function(){  
    console.log("newStaff"); 
    };

}