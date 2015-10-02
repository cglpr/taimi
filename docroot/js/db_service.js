// The service to be meant to access the database through RESTHeart.
// Modified from the example of using ajax with angularjs by Ben Nadel at:
// http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm

	var app = angular.module('serviceModule', ['debugModule']);
	// I act a repository for the remote friend collection.
    app.service(
        "dbService",
        ['$http', '$q', 'debugService', function( $http, $q, debugService ) {
        	var authData = null;
        	// TODO: authToken validity time should be registered and should be cleared when it expires
        	var authToken = null;
        	var user = null;
        	var pwd = null;
        	
            return({
            	setUsernameAndPassword: setUsernameAndPassword,
                addTech: addTech,
                addProject: addProject,
                getProjects: getProjects,
                getTechs: getTechs
            });
            // ---
            // PUBLIC METHODS.
            // ---
            function setUsernameAndPassword(username, password) {
            	user = username;
            	pwd = password;
            	setAuthData();
            }
            
            function addTech( name ) {
            	debugService.print("dbService.addTech called with name: " + name );
            	addToCollection('techs', {name : name});
            	/*
                var request = $http({
                    method: "post",
                    url: "http://localhost:8090/lrskillz/techs",
                    params: {
                        name: name
                    },
                    data: {
                        name: name
                    }
                });
                return( request.then( handleSuccess, handleError ) );
                */
            }

            function addProject( project ) {
            	addToCollection('projects', project);
            }
            
            // Returns Promise
            function getProjects() {
            	return getCollection('projects');
            }
            
            // Returns Promise
            function getTechs() {
            	debugService.print("dbService.getTechs called again");
            	var reqObject = {
                    method: "get",
                    url: "http://localhost:8090/lrskillz/techs",
                    params: {
                        action: "get"
                    }            			
            	};
            	addAuthData(reqObject);
            	var request = $http(reqObject);
                return( request.then( handleTechsSuccess, handleError ) );
            }

            // ---
            // PRIVATE METHODS.
            // ---
            // collection = collection to which to add the document
            // doc = doc object, this function JSONifies it
            function getCollection( collection ) {
            	debugService.print("dbService.getCollection called again with param: " + collection);
            	var reqObject = {
                    method: "get",
                    url: "http://localhost:8090/lrskillz/" + collection,
                    params: {
                        action: "get"
                    }            			
            	};
            	addAuthData(reqObject);
            	var request = $http(reqObject);
                return( request.then( handleGetCollectionSuccess, handleError ) );
            }
            
            function addToCollection( collection, doc ) {
            	debugService.print("dbService.addToCollection called with param: " + collection + " and: " + doc);
            	var json_doc = JSON.stringify(doc);
                var reqObject = {
                    method: "post",
                    url: "http://localhost:8090/lrskillz/" + collection,
                    data: doc
                };
            	debugService.print("dbService.addToCollection before addAuthData");
            	addAuthData(reqObject);
            	debugService.print("dbService.addToCollection before $http");
            	var request = $http(reqObject);
            	debugService.print("dbService.addToCollection after $http");
                return( request.then( handleAddSuccess, handleError ) );
            }
            
            function setAuthData(token) {
            	var myPwd = token || pwd;
            	authData = Base64.encode(user + ":" + pwd);
            }
            
            function getAuthData() {
            	if(!authData) {
            		setAuthData();
            	}
            	
            	return authData;
            }
            
            function createBasicAuthHeader() {
            	return 'Basic ' + getAuthData();
            }
            
            function addAuthData(reqObject) {
        		reqObject.headers = {'Authorization' : createBasicAuthHeader()};
            }
            
            function printProperties(myObject) {
            	for (var property in myObject) {
            	    if (myObject.hasOwnProperty(property)) {
            	        debugService.print(property + ": " + myObject[property]);
            	    }
            	}
            }
            
            function handleError( response ) {
            	debugService.print("dbService.handleError: " + response);
                // The API response from the server should be returned in a
                // normalized format. However, if the request was not handled by the
                // server (or what not handles properly - ex. server error), then we
                // may have to normalize it on our end, as best we can.
                if (
                    ! angular.isObject( response.data ) ||
                    ! response.data.message
                    ) {
                    return( $q.reject( "An unknown error occurred." ) );
                }
                // Otherwise, use expected error message.
                return( $q.reject( response.data.message ) );
            }

            function handleGetCollectionSuccess( response ) {
            	debugService.print("dbService.handleGetCollectionSuccess");

            	var token = response.headers('Auth-Token');
            	debugService.print("dbService.handleGetCollectionSuccess, token: " + token);
            	setAuthData(token);
            	var result = parseObjects(response.data);
                return( result );
            }
            
            function handleTechsSuccess( response ) {
            	debugService.print("dbService.handleTechsSuccess");

            	var token = response.headers('Auth-Token');
            	debugService.print("dbService.handleTechsSuccess, token: " + token);
            	setAuthData(token);
            	var result = parseTechs(response.data);
                return( result );
            }
            
            function handleAddSuccess( response ) {
            	debugService.print("dbService.handleAddSuccess");

            	var token = response.headers('Auth-Token');
            	debugService.print("dbService.handleAddSuccess, token: " + token);
            	setAuthData(token);
            	debugService.print("dbService.handleAddSuccess, response: " + response + " and properties:");
            	debugService.printProperties(response);
                return( response );
            }
            
            // Techs are objects with only name property. This returns a list of names.
            function parseTechs(data) {
            	debugService.print("dbService.parseTechs: " + data);
            	var techs = (((data || {})["_embedded"] || {})["rh:doc"]) || [];
            	var result = [];
            	techs.forEach(function (tech) {
            		result.push(tech.name);
            	});
            	debugService.print("dbService.parseTechs, returning: " + result);
            	return result;
            }
            
            // This returns a list of whatever-object is queried from a collection.
            function parseObjects(data) {
            	debugService.print("dbService.parseObjects: " + data);
            	var result = (((data || {})["_embedded"] || {})["rh:doc"]) || [];
            	debugService.print("dbService.parseObjects, returning: " + result);
            	return result;
            }

        }]
    );