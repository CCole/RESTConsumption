

module.exports =
    angular
        .module('dataEntry')
        .controller('modal.controller', getModal);

function getModal($uibModalInstance, $scope, $timeout) {
    var vm = this;
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

    vm.cancelModal = function () {
        $uibModalInstance.close();
        console.log("modal closed");
    };

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            componentHandler.upgradeAllRegistered();
        })
    });
}