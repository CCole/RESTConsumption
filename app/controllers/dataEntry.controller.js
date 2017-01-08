require('../services/staff.service.js');
require('../services/record.service.js');
require('angular-ui-router');
require('angular-animate');
require('angular-ui-bootstrap');

module.exports =
    angular
        .module('dataEntry', ['staff', 'record', 'ui.router', 'ngAnimate', 'ui.bootstrap'])
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

function enterData($uibModal, staffRecord, $scope) {
    var vm = this;



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


}