require('../services/staff.service.js');

module.exports =
angular
    .module('dataEntry',['staff'])
    .controller('dataEntry.controller', enterData);

function enterData(staffData){
        var vm = this; 
        console.log(vm.npiNumber);
        
        vm.placeMask = function() {
            vm.npiMask = "9999999999";
        };

        vm.removeMask = function(){
            //if there are no values in the form input then remove mask on blur
            if(typeof vm.npiNumber === "undefined"){
                vm.npiMask = "";
            }
        };


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