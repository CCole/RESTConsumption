require('../services/staff.service.js');

module.exports =
angular
    .module('dataDisplay',['staff'])
    .controller('dataDisplay.controller', displayData);

function displayData(staffData){
    var vm = this; 
    staffData.query(function(data){
        vm.staff = data; 
    });

    vm.selectStaff = function(s){
        console.log(s.SQUIRE_STAFF_ID);
    };
}