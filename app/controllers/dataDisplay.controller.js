require('../services/staff.service.js');

module.exports =
angular
    .module('dataDisplay',['staff'])
    .controller('dataDisplay.controller', displayData);

function displayData(staffData){
    var vm = this;
    var selection = null;  
    

    
    
    staffData.query(function(data){
        vm.staff = data; 
    });

    vm.selectStaff = function(s){
        console.log(s.SQUIRE_STAFF_ID);
        s.btnGrp = !s.btnGrp; 
        console.log(s);
        return s.SQUIRE_STAFF_ID; 
    };

   

    vm.delStaff = function(s){
        selection = s.SQUIRE_STAFF_ID;
        staffData.$delete({id: selection});
    };

    vm.editRecord = function(s){
            var editStaff = {
            staffType: s.staffType,
            npiNumber: s.npiNumber,
            firstName: s.firstName,
            lastName: s.lastName,
            middleName: s.middleName,
            staffId: s.SQUIRE_STAFF_ID
        };
      return editStaff;  
    };

    vm.saveStaff = function(editStaff){

    }
}

//add excpetions handling