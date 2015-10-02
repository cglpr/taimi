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
				// TODO: set username and password of the current user (how to get user credentials from liferay?)
				dbService.setUsernameAndPassword('a', 'a');
				
				$scope.projList = [];
				$scope.techList = [];
				$scope.newTech = null;

				initTechs();
				initProjects();
				
				$scope.add = function(proj) {
					if(proj){
						// TODO: selvita miksei tassa toimi then() - eiko tule Promisea jostain syysta?!?!
						dbService.addProject(proj); //.then(addProjectSuccess, addProjectError);
						setTimeout(function() {addProjectSuccess("called manually");}, 500);
					}
				};

				$scope.remove = function(index) {
					$scope.projList.splice(index, 1);
				};
				
				$scope.addTech = function(aTech) {
					debugService.print("in addTech: " + aTech);
					if(aTech) {
						// TODO: selvita miksei tassa toimi then() - eiko tule Promisea jostain syysta?!?!
						dbService.addTech(aTech); //.then(addTechSuccess, addTechError);
						setTimeout(function() {addTechSuccess("called manually");}, 500);
						$scope.newTech = null;
					}

				};

				function initTechs() {
					dbService.getTechs().then(getTechsSuccess, getTechsError);					
				}
				
				function initProjects() {
					dbService.getProjects().then(getProjectsSuccess, getProjectsError);					
				}
				
				function getTechsSuccess(result) {
					debugService.print("in getTech cb, result: " + result);
					$scope.techList = result.sort(function(a,b) {
					    return a.toLowerCase().localeCompare(b.toLowerCase());
					});					
				}
				
				function getTechsError(result) { // TODO: where to put the error msg?
					$scope.techList = [result || ""];						
				}	
				
				function getProjectsSuccess(result) {
					debugService.print("in getProjectsSuccess cb, result: " + result);
					$scope.projList = result;					
				}
				
				function getProjectsError(result) { // TODO: where to put the error msg?
					debugService.print("in getProjectsError, result: " + result);
					$scope.projList = [result || ""];						
				}
				
				function addTechSuccess(result) {
					debugService.print("in addTechSuccess cb");
					initTechs();				
				}
				
				function addTechsError(result) { // TODO: where to put the error msg?
					debugService.print("in addTechsError, result: " + result);
				}				
				function addProjectSuccess(result) {
					debugService.print("in addProjectSuccess cb, result: " + result);
					initProjects();				
				}
				
				function addProjectError(result) { // TODO: where to put the error msg?
					debugService.print("in addProjectError, result: " + result);
				}				
			}]);			
			return [ projModule.name ];
		});
})(Liferay, angular);