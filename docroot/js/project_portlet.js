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
				$scope.projList = [];
				$scope.techList = ['Angularjs', 'Groovy', 'Grails', 'Java', 'Javascript', 'React', 'Spring', 'Spring-UI'];
				// TODO: set username and password of the current user (how to get user credentials from liferay?)
				debugService.setDebugging(true);
				dbService.setUsernameAndPassword('a', 'a');
				
				$scope.add = function(proj) {
					if(proj){
						$scope.projList.push(proj);
					}
				};

				$scope.remove = function(index) {
					$scope.projList.splice(index, 1);
				};
				
				$scope.getTechs = function() {
					//techList = dbService.getTechs();
					return dbService.getTechs();
				};

			}]);			
			return [ projModule.name ];
		});
})(Liferay, angular);