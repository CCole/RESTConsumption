
require('angular-resource');

module.exports = 
angular
    .module('staff', ['ngResource'])
    .factory('staffData', staffInterface); 

function staffInterface($resource){
    return $resource("http://localhost:8080/staffWebService/rest/staff/:id", {id: '@SQUIRE_STAFF_ID'});
}