(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "projectportlet",
		function() {
			var projModule = angular.module("projModule", ['debugModule', 'serviceModule']);

			projModule.filter('shorten', function() {
				  return function(input, uppercase) {
				    input = input || '';
				    if(!(input.constructor === Array)) {
				    	return input;
				    }
				    var out = input[0] || "";
					if(input.length > 1) {
						out = out + ",...";
					}
				    return out;
				  };
				});

			projModule.controller("ProjectController", ["$scope", "debugService", "dbService",
			                                            function($scope, debugService, dbService) {
				debugService.setDebugging(true);
				dbService.setUsernameAndPassword('a', 'a');
				
				$scope.projList = [];
				$scope.techList = [];

				dbService.getTechs().then(getTechsSuccess, getTechsError);
				// TODO: set username and password of the current user (how to get user credentials from liferay?)
				$scope.add = function(proj) {
					if(proj){
						$scope.projList.push(proj);
					}
				};

				$scope.remove = function(index) {
					$scope.projList.splice(index, 1);
				};
				
				function getTechsSuccess(result) {
					debugService.print("in getTech cb, result: " + result);
					$scope.techList = result;					
				}
				
				function getTechsError(result) { // TODO: where to put the error msg?
					$scope.techList = [result || ""];						
				}				
			}]);			
			return [ projModule.name ];
		});
})(Liferay, angular);