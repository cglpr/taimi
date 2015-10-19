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
			var operators = ['>', '<', htmlDecode('sis&auml;lt&auml;&auml;'), 'alkaa', htmlDecode('p&auml;&auml;ttyy'), '=', '<=', '>='];
			var joinOperators = ['AND', 'OR'];
			var reverseFields = {	
					'Projektin nimi' : 'name',
					'Koko/kEUR' : 'sizeKiloEuros',
					'Teknologiat' : 'techs',
					'Asiakas' : 'customer'
			};
			var operatorMapping = {
				'>' : '$gt',
				'<' : '$lt',
				'=' : '$eq',
				'<=' : '$lte',
				'>=' : '$gte'
			};
			
            return({
            	setUsernameAndPassword: setUsernameAndPassword,
                addTech: addTech,
                addProject: addProject,
                getProjects: getProjects,
                getTechs: getTechs,
                getUserProfile: getUserProfile,
                updateUserProfile: updateUserProfile,
                createUserProfile: createUserProfile,
                getSkillLevels: getSkillLevels,
                removeProject: removeProject,
                searchProjects: searchProjects,
                getOperators: getOperators,
                getJoinOperators: getJoinOperators
            });
            // ---
            // PUBLIC METHODS.
            // ---
            function setUsernameAndPassword(username, password) {
            	user = username;
            	pwd = password;
            	setAuthData();
            }

            //
            // All these methods that are used to query/update the db, return Promise objects,
            // so these are called for example like this:
            // var promise = dbService.addTech( techName );
            // promise.then(mySuccessHandlerCallback, myErrorHandlerCallback);
            //
            
            function addTech( name ) {
            	debugService.print("dbService.addTech called with name: " + name );
            	return addToCollection('techs', {name : name});
            }

            function addProject( project ) {
            	return addToCollection('projects', project);
            }
            
            function getProfile(id) {
            	return getCollection
            }
            
            function removeProject( project ) {
            	debugService.print("dbService.removeProject _etag props:");
            	debugService.printProperties(project._etag);
            	return removeFromCollection('projects', project._id.$oid, project._etag.$oid);
            }
            
            function getProjects() {
            	return getCollection('projects');
            }
            
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
            
            function getSkillLevels() {
            	debugService.print("dbService.getSkillLevels called.");
            	var reqObject = {
                    method: "get",
                    url: "http://localhost:8090/lrskillz/skillLevels",
                    params: {
                        action: "get"
                    }            			
            	};
            	addAuthData(reqObject);
            	var request = $http(reqObject);
                return( request.then( handleSkillLevelsSuccess, handleError ) );
            }
            
            function getUserProfile(userId) {
            	debugService.print("dbService.getUserProfile called with userId: " + userId);
            	return getWithCollectionAndId('persons', userId);
            }

            function getOperators() {
            	return operators.slice();
            }

            function getJoinOperators() {
            	return joinOperators.slice();
            }
/*
 * 			var reverseFields = {	
					'Projektin nimi' : 'name',
					'Koko/kEUR' : 'sizeKiloEuros',
					'Teknologiat' : 'techs',
					'Asiakas' : 'customer'
			};
			
            // Esimerkkikysely 
            // http://localhost:8090/lrskillz/projects?filter={'name':{'$regex':'(?i)^roj.*'}}
            // tai:
            // "127.0.0.1:8080/test/coll?filter={'$and':[{'title': {'$regex':'(?i)^STAR TREK.*'}, {'publishing_date':{'$gte':{'$date':'2015-09-04T08:00:00Z'}}}]}"

 */            
            function searchProjects(termsList) {
            	var query;
				debugService.print("dbService.searchProjects begin");
            	if(termsList.length > 1) {
    				debugService.print("dbService.searchProjects createCombinedQuery");
            		query = createCombinedQuery(termsList);
            	} else if(termsList.length == 1){
    				debugService.print("dbService.searchProjects createSimpleQuery");
            		query = createSimpleQuery(termsList[0]);
            	} else {
            		// find all
    				debugService.print("dbService.searchProjects getCollection");
                	return getCollection('projects');
            	}
				debugService.print("dbService.searchProjects before searchCollection, query: " + query);
            	return searchCollection('projects', query);
            }
            
            function updateUserProfile(profile) {
            	debugService.print("updateProfile called");
            	return updateDocumentInCollection('persons', profile, profile._etag.$oid);
            }
            
            function createUserProfile(profile) {
            	debugService.print("createUserProfile called");
            	return addToCollection('persons', profile);
            }
            
            // ---
            // PRIVATE METHODS.
            // ---

           function createCombinedQuery(termsList) {
				debugService.print("dbService.createCombinedQuery begin");
            	var op = '$' + (termsList[0].joinOper || "and").toLowerCase();
            	var queryTerms = [];
            	var aTerm;
            	var result = {};
				debugService.print("dbService.createCombinedQuery operation: " + op);
            	termsList.forEach(function(elem) {
            		aTerm = {};
            		aTerm[reverseFields[elem['field']]] = createFilterTerm(elem);
            		queryTerms.push(aTerm);
            	});
            	result[op] = queryTerms;
            	return 'filter=' + JSON.stringify(result);
            }
            
            function createFilterTerm(terms) {
				debugService.print("dbService.createFilterTerm begin");
            	var filterTerm = {};
            	var myVal = terms.value;
            	var myOp = operatorMapping[terms.oper];
            	if(!myOp) {
            		// regex matching
            		myOp = '$regex';
            		if(terms.oper.startsWith('a')) {
            			myVal = '^' + myVal;
            		} else if(terms.oper.startsWith('p')) {
            			myVal = myVal + "$";
            		} else {
            			myVal = '.*' + myVal + '.*';
            		}
            	}
            	filterTerm[myOp] = myVal;
				debugService.printProperties(filterTerm, "dbService.createFilterTerm returning:");
            	return filterTerm;
            }
            
            function createSimpleQuery(terms) {
            	var result = {};
            	result[reverseFields[terms['field']]] = createFilterTerm(terms);
				debugService.print("dbService.createSimpleQuery, result: " + result);
            	return 'filter=' + JSON.stringify(result);
            }
            
            function getWithCollectionAndId(collection, id) {
            	debugService.print("dbService.getWithCollectionAndId called  with collection: " + collection + " and id: " + id);
            	var reqObject = {
                    method: "get",
                    url: "http://localhost:8090/lrskillz/" + collection + "/" + id,
                    params: {
                        action: "get"
                    }            			
            	};
            	addAuthData(reqObject);
            	var request = $http(reqObject);
                return( request.then( handleGetWithCollectionAndIdSuccess, handleError ) );
            }
            
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
            
            function searchCollection( collection, filter ) {
            	debugService.print("dbService.searchCollection called with param: " + collection + " and " + filter);
            	var reqObject = {
                    method: "get",
                    url: "http://localhost:8090/lrskillz/" + collection + "?" + filter,
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
            	addAuthData(reqObject);
            	var request = $http(reqObject);
                return( request.then( handleAddSuccess, handleError ) );
            }
            
            function updateDocumentInCollection( collection, doc, etag ) {
            	debugService.print("dbService.updateDocumentInCollection called with param: " + collection + " and: " + doc);
            	var json_doc = JSON.stringify(doc);
                var reqObject = {
                    method: "put",
                    url: "http://localhost:8090/lrskillz/" + collection,
                    data: doc
                };
            	addAuthData(reqObject);
            	reqObject.headers['If-Match'] = etag;
            	var request = $http(reqObject);
                return( request.then( handleAddSuccess, handleError ) );
            }
            
            // Used for collections the documents of which contain 'name' as a property:
            function removeFromCollection( collection, id, etag ) {

            	debugService.print("dbService.removeFromCollection called with params: "
            			+ collection + ", " + id + " and etag: " + etag);
                var reqObject = {
                    method: "delete",
                    url: "http://localhost:8090/lrskillz/" + collection + "/" + id
                };
            	addAuthData(reqObject);
            	reqObject.headers['If-Match'] = etag;
            	var request = $http(reqObject);
                return( request.then( handleAddSuccess, handleError ) );

            }
            
            function setAuthData(token) {
            	var myPwd = token || pwd;
            	authData = Base64.encode(user + ":" + myPwd);
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
                if (
                    ! angular.isObject( response.data ) ||
                    ! response.data.message
                    ) {
                    return( $q.reject( "An unknown error occurred." ) );
                }
                // Otherwise, use expected error message.
                return( $q.reject( response.data.message ) );
            }

            function handleGetWithCollectionAndIdSuccess( response ) {
            	debugService.print("dbService.handleGetWithCollectionAndIdSuccess");
            	var token = response.headers('Auth-Token');
            	setAuthData(token);
                return(response.data);
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
            
            function handleSkillLevelsSuccess( response ) {
            	debugService.print("dbService.handleSkillLevelSuccess");
            	var token = response.headers('Auth-Token');
            	setAuthData(token);
            	var result = parseSkillLevels(response.data);
                return( result );
            }
            
            function handleSuccess( response ) {
            	debugService.print("dbService.handleSuccess");
            	var token = response.headers('Auth-Token');
            	debugService.print("dbService.handleSuccess, token: " + token);
            	setAuthData(token);
            	var result = parseObjects(response.data);
                return( result );
            }
            
            function handleAddSuccess( response ) {
            	debugService.print("dbService.handleAddSuccess");

            	var token = response.headers('Auth-Token');
            	debugService.print("dbService.handleAddSuccess, token: " + token);
            	setAuthData(token);
            	debugService.print("dbService.handleAddSuccess, response: " + response + " and properties:");
            	debugService.printProperties(response);
            	// return just empty object in succesful case:
                return( {} );
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
            
            function parseSkillLevels(data) {
            	debugService.print("dbService.parseSkillLevels: " + data);
            	var skillLevels = (((data || {})["_embedded"] || {})["rh:doc"]) || [];
            	var result = [];
            	skillLevels.forEach(function (skillLevel) {
            		result.push(skillLevel.name);
            	});
            	debugService.print("dbService.parseSkillLevels, returning: " + result);
            	return result;
            }
            
            // This returns a list of whatever-object is queried from a collection.
            function parseObjects(data) {
            	debugService.print("dbService.parseObjects: " + data);
            	var result = (((data || {})["_embedded"] || {})["rh:doc"]) || [];
            	debugService.print("dbService.parseObjects, returning: " + result);
            	result.forEach(function(obj) {
            		debugService.printProperties(obj);
            	});
            	return result;
            }

            function clone(source) {
            	var copy = {};
	        	for (var property in source) {
	        		if (source.hasOwnProperty(property)) {
	        			copy[property] = source[property];
	        		}
		        }	            	
            	
            	return copy;
            }
            
        	function htmlEncode(value) {
        		return $('<div/>').text(value).html();
        	}
        	
        	function htmlDecode(value) {
        		return $('<div/>').html(value).text();
        	}
        	

        }]
    );