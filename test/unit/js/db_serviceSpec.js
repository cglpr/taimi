/**
 * 
 */
describe('Testing dbService', function () {
  var dbService,
      httpBackend;
  
  beforeEach(function (){
    // load the module.
    module('serviceModule');
    
    // get your service, also get $httpBackend
    // $httpBackend will be a mock, thanks to angular-mocks.js
    inject(function($httpBackend, _dbService_) {
      dbService = _dbService_;      
      httpBackend = $httpBackend;
    });
  });
  
  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  

  it('Tests that correct URL is called when a technology is added.', function (){
    // set up some data for the http call to return and test later.
    var returnData = { }, returnedPromise, result;
    
    // expectGET to make sure this is called once.
    httpBackend.expectPOST('http://localhost:8090/lrskillz/techs').respond(returnData);
    
    // make the call.
    returnedPromise = dbService.addTech('MyTestTech');
    
    // set up a handler for the response, that will put the result
    // into a variable in this scope for you to test.
    returnedPromise.then(function(response) {
      result = response;
    });
    
    // flush the backend to "execute" the request to do the expectedPOST assertion.
    httpBackend.flush();
    
    // check the result. 
    // (after Angular 1.2.5: be sure to use `toEqual` and not `toBe`
    // as the object will be a copy and not the same instance.)
    expect(result).toEqual(returnData);
  });  

  it('Tests that correct URL is called when a project is added.', function (){
	    // set up some data for the http call to return and test later.
	    var returnData = { }, returnedPromise, result;
	    
	    // expectGET to make sure this is called once.
	    httpBackend.expectPOST('http://localhost:8090/lrskillz/projects').respond(returnData);
	    
	    // make the call.
	    returnedPromise = dbService.addProject('MyTestProject');
	    
	    // set up a handler for the response, that will put the result
	    // into a variable in this scope for you to test.
	    returnedPromise.then(function(response) {
	      result = response;
	    });
	    
	    // flush the backend to "execute" the request to do the expectedPOST assertion.
	    httpBackend.flush();
	    
	    // check the result. 
	    // (after Angular 1.2.5: be sure to use `toEqual` and not `toBe`
	    // as the object will be a copy and not the same instance.)
	    expect(result).toEqual(returnData);
	  });  
});