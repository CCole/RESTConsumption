require('../services/staff.service.js');

module.exports =
angular
    .module('dataDelete',['staff'])
    .controller('dataDelete.controller', deleteData);

    function deleteData(staffData){
        var vm = this;
    }