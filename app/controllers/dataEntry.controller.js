require('../services/staff.service.js');
require('angular-ui-router');
require('angular-animate');
require('angular-ui-bootstrap');

module.exports =
    angular
        .module('dataEntry', ['staff', 'ui.router', 'ngAnimate','ui.bootstrap'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('staff', {
                    url: '/staff',
                    templateUrl: 'form.staff.html'
                })
                .state('specialty', {
                    url: '/specialty',
                    templateUrl: 'form.specialty.html'
                })

            $urlRouterProvider.otherwise('/staff');
        })
        .controller('dataEntry.controller', enterData);

function enterData(staffData, $sce, $scope, $timeout, $uibModal) {
    var vm = this;

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            componentHandler.upgradeAllRegistered();
        })
    });

    vm.placeMask = function () {
        vm.npiMask = "9999999999";
    };

    vm.removeMask = function () {
        //if there are no values in the form input then remove mask on blur
        //not clear if angular-ui-mask implements a function that removes the placeholder if a user does not 
        //finish entry and then clicks away. Definitly rethink this.
        /* if(typeof vm.npiNumber !== "undefined") {
             console.log(vm.npiNumber.length);
         }*/
        if (typeof vm.npiNumber === "undefined" || (vm.npiNumber.length == 0)) {
            vm.npiMask = "";
        }
    };


    vm.postStaff = function () {

        var newStaff = {
            staffType: vm.staffType,
            npiNumber: vm.npiNumber,
            firstName: vm.firstName,
            lastName: vm.lastName,
            middleName: vm.middleName
        };

        var newSpecialty = {
            specialty: vm.specialty,
            specialtyDescription: vm.specialtyDescription,
            credentialNumber: vm.credentialNumber,
            issueDate: vm.issueDate,
            issuingOrg: vm.issuingOrg

        };

        console.log(newStaff);
        console.log(vm.staffType);

        staffData.save(newStaff, function (response) {
            console.log(response.message);
        });
    };

    vm.animationsEnabled = true;
    vm.openModalForm = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'multiStepModal.html',
            size: size,
            controller: 'modal.controller',
            controllerAs: 'vm',
            bindToController: true
        });
    };
    

     


    vm.npiLink = $sce.trustAsHtml('<b>The National Provider Identifier</b>&nbsp;is a unique 10-digit identifier number issued to health care providers. <a target="_blank" href="https://npiregistry.cms.hhs.gov/">Learn more</a>');
}