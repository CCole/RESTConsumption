require('../services/staff.service.js');

module.exports =
angular
    .module('dataEntry',['staff'])
    .controller('dataEntry.controller', enterData);

function enterData(staffData){
        var vm = this; 
        vm.npiMask = "9999999999";
        vm.postStaff = function() {

            var newStaff = { 
                staffType: vm.staffType,
                npiNumber: vm.npiNumber,
                firstName: vm.firstName,
                lastName: vm.lastName,
                middleName: vm.middleName     
            };

            console.log(newStaff); 
            console.log(vm.staffType);

            staffData.save(newStaff, function(response){
                console.log(response.message);
            });
    };

}