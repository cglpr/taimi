// The service to be meant to access the database through RESTHeart.
// Modified from the example of using ajax with angularjs by Ben Nadel at:
// http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm

	var test = angular.module('debugModule', []);
	// I act a repository for the remote friend collection.
    test.service(
        "debugService",
        function( ) {
        	var debugging = false;
            return({
                setDebugging: setDebugging,
                print: print
            });
            // ---
            // PUBLIC METHODS.
            // ---
            function setDebugging( value ) {
            	if(typeof(value) === "boolean") {
            		debugging = value;
            	}
            }
            
            function print(text) {
            	if(debugging) {
                	console.log(text);            		
            	}
             }

        }
    );