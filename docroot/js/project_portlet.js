(function(Liferay, angular) {
	function htmlEncode(value) {
		return $('<div/>').text(value).html();
	}
	
	function htmlDecode(value) {
		return $('<div/>').html(value).text();
	}
	
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
				
				$scope.projFields = {
					name : 'Projektin nimi',
					sizeKiloEuros : 'Koko/kEUR',
					techs : 'Teknologiat',
					customer : 'Asiakas'
				}
				$scope.projList = [];
				$scope.techList = [];
				$scope.projSearchResults = [];
				$scope.newTech = null;
				$scope.currentTerms = initTerms();
				$scope.termsList = [];
				$scope.operators = dbService.getOperators();
				$scope.joinOperators = dbService.getJoinOperators();

				initTechs();
				initProjects();
				
				$scope.add = function(proj) {
					if(proj){
						dbService.addProject(proj).then(addProjectSuccess, addProjectError);
					}
				};

				$scope.remove = function(index) {
					var p = $scope.projList[index];
					debugService.print("in remove, project to remove: " + p);
					dbService.removeProject(p).then(addProjectSuccess, addProjectError);
				};
				
				$scope.addTech = function(aTech) {
					debugService.print("in addTech: " + aTech);
					if(aTech) {
						dbService.addTech(aTech).then(addTechSuccess, addTechError);
						$scope.newTech = null;
					}

				};

				$scope.addTerms = function(terms) {
					debugService.print("in addTerms termsList.length: " + $scope.termsList.length);
					if(terms){
						debugService.print("in addTerms if: " + $scope.termsToString(terms));
						debugService.printProperties(terms);
						$scope.termsList.push(terms);
					}
					debugService.print("in the end of addTerms termsList.length: " + $scope.termsList.length);
					$scope.currentTerms = initTerms();
				};

				$scope.removeTerms = function(index) {
					$scope.termsList.splice(index, 1);					
				}
				
				$scope.clearSearchTerms = function() {
					$scope.termsList.length = 0;
				}
				
				$scope.searchProjects = function() {
					debugService.print("searchProjects begin");
					dbService.searchProjects($scope.termsList).then(searchProjectsSuccess, searchProjectsError);
					debugService.print("searchProjects end");
				}
				
				$scope.termsToString = function(terms) {
					return terms.field + " " + terms.oper + " " + terms.value;
				}
				
				function initTechs() {
					dbService.getTechs().then(getTechsSuccess, getTechsError);					
				}
				
				function initProjects() {
					dbService.getProjects().then(getProjectsSuccess, getProjectsError);					
				}
				
				function initTerms() {
					return {field : '', oper : '', value : '', joinOper : ''};
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
					if(result) {
						result.forEach(function(elem) {
							debugService.print("Project's properties:");
							debugService.printProperties(elem);							
						});
					}
					$scope.projList = result;					
				}
				
				function getProjectsError(result) { // TODO: where to put the error msg?
					debugService.print("in getProjectsError, result: " + result);
					$scope.projList = [result || ""];						
				}
				
				function searchProjectsSuccess(result) {
					debugService.print("in searchProjectsSuccess cb, result: " + result);
					if(result) {
						result.forEach(function(elem) {
							debugService.print("Project's properties:");
							debugService.printProperties(elem);							
						});
					}
					$scope.projSearchResults = result;					
				}
				
				function searchProjectsError(result) { // TODO: where to put the error msg?
					debugService.print("in searchProjectsError, result: " + result);
					$scope.projSearchResults = [result || ""];						
				}
				
				function addTechSuccess(result) {
					debugService.print("in addTechSuccess cb, result: '" + result + "'");
					initTechs();				
				}
				
				function addTechError(result) { // TODO: where to put the error msg?
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