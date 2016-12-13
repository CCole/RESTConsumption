require('../services/staff.service.js');
require('angular-ui-router');
require('angular-animate');

module.exports =
angular
    .module('dataEntry',['staff', 'ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider){
        
        $stateProvider
        .state('form', {
            url: '/form',
            templateUrl: 'index.html',
            controller: 'dataEntry.controller'
        })
        .state('form.staff', {
            url: '/staff',
            templateUrl: 'form.staff.html'
        })
        .state('form.specialty', {
            url: '/specialty',
            templateUrl: 'form.specialty.html'
        })

        $urlRouterProvider.otherwise('/form/staff');
    })
    .controller('dataEntry.controller', enterData);

function enterData(staffData, $sce){
        var vm = this; 
        
        
    
        vm.placeMask = function() {
            vm.npiMask = "9999999999";
        };

        vm.removeMask = function(){
            //if there are no values in the form input then remove mask on blur
            //not clear if angular-ui-mask implements a function that removes the placeholder if a user does not 
            //finish entry and then clicks away. Definitly rethink this.
          /* if(typeof vm.npiNumber !== "undefined") {
               console.log(vm.npiNumber.length);
           }*/
            if(typeof vm.npiNumber === "undefined" || (vm.npiNumber.length == 0)){ 
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

    vm.npiLink = $sce.trustAsHtml('<b>The National Provider Identifier</b>&nbsp;is a unique 10-digit identifier number issued to health care providers. <a target="_blank" href="https://npiregistry.cms.hhs.gov/">Learn more</a>');
}