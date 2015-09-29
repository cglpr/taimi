	var app = angular.module('serviceModule', []);
	// I act a repository for the remote friend collection.
    app.service(
        "dbService",
        function( $http, $q ) {
            // Return public API.
            return({
                addTech: addTech,
                getTechs: getTechs
            });
            // ---
            // PUBLIC METHODS.
            // ---
            // I add a friend with the given name to the remote collection.
            function addTech( name ) {
                var request = $http({
                    method: "post",
                    url: "http://localhost:8080/lrskillz/techs",
                    params: {
                        name: name
                    },
                    data: {
                        name: name
                    }
                });
                return( request.then( handleSuccess, handleError ) );
            }
            // I get all of the friends in the remote collection.
            function getTechs() {
                var request = $http({
                    method: "get",
                    url: "http://localhost:8080/lrskillz/techs",
                    params: {
                        action: "get"
                    }
                });
                return( request.then( handleTechsSuccess, handleError ) );
            }
            // ---
            // PRIVATE METHODS.
            // ---
            // I transform the error response, unwrapping the application dta from
            // the API response payload.
            function handleError( response ) {
                // The API response from the server should be returned in a
                // nomralized format. However, if the request was not handled by the
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
            // I transform the successful response, unwrapping the application data
            // from the API response payload.
            function handleTechsSuccess( response ) {
            	var result = {};
            	result.success = true;
            	result.techs = parseTechs(rhResponse);
                return( result );
            }
            
            function parseTechs(rhResponse) {
            	var techs = (((rhResponse || {})["_embedded"] || {})["rh:doc"]) || [];
            	var result = [];
            	techs.forEach(function (tech) {
            		result.add(tech.name);
            	});
            }
        }
    );