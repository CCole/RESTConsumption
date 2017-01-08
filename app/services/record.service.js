require('angular-resource');

module.exports =
    angular
        .module('record', ['ngResource'])
        .factory('staffRecord', manageRecord);

function manageRecord() {
    var record = {
        build: function buildRecord(vm) {
            var newStaffRecord = {
                staff: {
                    staffType: vm.staffType,
                    npiNumber: vm.npiNumber,
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    middleName: vm.middleName
                },
                specialty: {

                }
            };
            return newStaffRecord;
        }
    }
    return record;
} 