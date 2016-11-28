require('../services/staff.service.js');

module.exports =
angular
    .module('dataDisplay',['staff'])
    .controller('dataDisplay.controller', displayData);

function displayData(staffData){
    var vm = this;
    var selection = null;  
    vm.selected = {};

    staffData.query(function(data){
        vm.staff = data; 
    });

    vm.selectStaff = function(s){
        vm.selected = angular.copy(s);
        return s.SQUIRE_STAFF_ID; 
    };

   

    vm.delStaff = function(s){
        selection = s.SQUIRE_STAFF_ID;
        staffData.$delete({id: selection});
    };

    vm.getTemplate = function(s){
        if (s.SQUIRE_STAFF_ID === vm.selected.SQUIRE_STAFF_ID){
            return 'edit';
        }
        else return 'display';
    };

    vm.editRecord = function(s){
            var editStaff = staffData.get({id: s.SQUIRE_STAFF_ID});
            
      console.log(editStaff);  
    };

    vm.saveStaff = function(editStaff){

    }
}

//add excpetions handling