
require('angular-resource');

module.exports = 
angular
    .module('staff', ['ngResource'])
    .factory('staffData', getStaffData);

function getStaffData($resource){
    return $resource("http://localhost:8080/staffWebService/rest/staff");
}