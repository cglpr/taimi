(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "employeeportlet",
		function() {
			var empModule = angular.module("empModule", ['flash', 'debugModule', 'serviceModule']);
			
			empModule.controller("EmployeeController", ["$scope", "$log", "$filter", "flash", "debugService", "dbService", 
			                                            function($scope, $log, $filter, flash, debugService, dbService) {
				debugService.setDebugging(true);
				// TODO: set username and password of the current user (how to get user credentials from liferay?)
				dbService.setUsernameAndPassword('a', 'a');
				
				$scope.empList = [];
				$scope.techList = [];
				
				$scope.userId = '561254228d6af5b5886cbf61';
				
				getProfile($scope.userId);				
				initTechs();
				initSkillLevels();
				
				//$scope.skillLevels = [{id: '1', name: 'Aloittelija'}, {id: '2', name: 'Kokenut'}, {id: '3', name: 'Asiantuntija'}];
				//$scope.currentEmployee.skills = [$scope.techList[0]];
				
				//$scope.currentEmployee.skills[0].level = $scope.skillLevels[0];
				
				$scope.removeSkill = function(skill) {
					var index = $scope.currentEmployee.skills.indexOf(skill);
					$scope.currentEmployee.skills.splice(index, 1);
				}
				
				$scope.addSkill = function(newSkill) {
					if (newSkill.level === '' || newSkill.name === '') {
						return;
					}
					// We need to copy object, so we get a new object.
					var newSkillObject = jQuery.extend(true, {}, newSkill);
					//newSkillObject.level = JSON.parse(newSkillObject.level);

					$scope.currentEmployee.skills.push(newSkillObject);					
				}
				
				$scope.save = function() {
					flash('Profiili tallennettu.');
				}
				
				function getProfile(profileId) {
					dbService.getUserProfile(profileId).then(getProfileSuccess, getProfileError);
				}
				
				function getProfileSuccess(result) {
					debugService.print("in getProfileSuccess, result: " + result);
					$scope.currentEmployee = result;
					$scope.currentEmployee.name = result.firstName + " " + result.lastName;
				}
				
				function getProfileError(result) {
					debugService.print("in getProfileError, result: " + result);
					return;
				}
				
				function initTechs() {
					dbService.getTechs().then(getTechsSuccess, getTechsError);					
				}
				
				function initSkillLevels() {
					dbService.getSkillLevels().then(getSkillLevelsSuccess, getSkillLevelsError);
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
				
				function getSkillLevelsSuccess(result) {
					debugService.print("in getSkillLevelsSuccess");
					$scope.skillLevels = result.sort(function(a,b) {
					    return a.toLowerCase().localeCompare(b.toLowerCase());
					});
					
				}
				
				function getSkillLevelsError(result) { // TODO: where to put the error msg?
					$scope.skillLevels = [result || ""];						
				}
				
				function addTechSuccess(result) {
					debugService.print("in addTechSuccess cb");
					initTechs();				
				}
				
				function addTechError(result) { // TODO: where to put the error msg?
					debugService.print("in addTechsError, result: " + result);
				}				
				
			}]);
			
			return [ empModule.name ];
		});
})(Liferay, angular);
