

module.exports =
    angular
        .module('dataEntry')
        .controller('modal.controller', getModal);

function getModal($uibModalInstance, $scope, $timeout) {
    var vm = this;
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