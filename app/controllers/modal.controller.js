

module.exports =
    angular
        .module('dataEntry')
        .controller('modal.controller', getModal);

function getModal($uibModalInstance) {
    var vm = this;
    vm.cancelModal = function () {
        $uibModalInstance.close();
        console.log("modal closed");
    };
}