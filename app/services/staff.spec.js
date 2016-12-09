//Test whether or not the service exists. Did our code create a 'staffData' service as expected?
describe('Staff Service', function(){

    var staffData, _inject, _setup, httpBackend;
    
    staffData = null; 
    httpBackend = null; 

    _inject = function(){
        inject(function(_staffData_, $httpBackend){
            staffData = _staffData_;
            httpBackend = $httpBackend;
        });
    };

    beforeEach(function(){
        module('staff'); 
            
    });

   

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    
   describe('the staffData resource', function(){
       beforeEach(function(){
           _inject();
       });

       it('exists', function(){
           console.log(staffData);
           //The easiest way to determine if something is truthy is to determine that it is not falsey
           //casting staffData as false then not false
           expect(!!staffData).toBe(true);
       });
   })

});