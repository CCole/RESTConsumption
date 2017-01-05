

module.exports =
    angular
        .module('dataEntry')
        .controller('modal.controller', getModal);

function getModal($uibModalInstance, $scope, $timeout, $sce, staffData) {
    var vm = this;

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

    vm.npiLink = $sce.trustAsHtml(
        '<b>The National Provider Identifier</b>&nbsp;is a unique 10-digit identifier number issued to health care providers. <a target="_blank" href="https://npiregistry.cms.hhs.gov/">Learn more</a>');
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