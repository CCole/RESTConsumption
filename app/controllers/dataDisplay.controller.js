require('../services/staff.service.js');

module.exports =
angular
    .module('dataDisplay',['staff'])
    .controller('dataDisplay.controller', displayData);

function displayData(staffData){
    var vm = this;
    var selection = null;  
    vm.selected = {};
//Show staff
    staffData.query(function(data){
        vm.staff = data; 
    });
//Select staff
    vm.selectStaff = function(s){
        vm.selected = angular.copy(s);
        return s.SQUIRE_STAFF_ID; 
    };
//Delete staff
    vm.delStaff = function(s){
        selection = s.SQUIRE_STAFF_ID;
        staffData.$delete({id: selection});
    };
//Display one of two templates - one for editing records and one for viewing
    vm.getTemplate = function(s){
        if (s.SQUIRE_STAFF_ID === vm.selected.SQUIRE_STAFF_ID){
            return 'edit';
        }
        else return 'display';
    };
//Edit a record - first get the record from the resource, alter it, then send it back to server
    vm.editRecord = function(s){
            var editStaff = staffData.get({id: s.SQUIRE_STAFF_ID});
            editStaff.staffType = s.Staff_Type;
            editStaff.id = s.SQUIRE_STAFF_ID;
            editStaff.firstName = s.First_Name;
            editStaff.lastName = s.Last_Name;
            editStaff.middleName = s.Middle_Name;
            staffData.update({id: s.SQUIRE_STAFF_ID},  editStaff);
      
    };

}

//add excpetions handling