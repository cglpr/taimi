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
				
				//$scope.userId = '561254228d6af5b5886cbf61';
				$scope.userId = '3232';
				
				getProfile($scope.userId);				
				initTechs();
				initSkillLevels();
				
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
					$log.debug("Tallennus käynnissä. $scope.currentEmployee: ", $scope.currentEmployee);
					var existingProfile = false;
					if (existingProfile) {
						dbService.updateUserProfile($scope.currentEmployee).then(saveProfileSuccess, saveProfileError);
					} else {
						dbService.createUserProfile($scope.currentEmployee).then(createProfileSuccess, createProfileError);
					}
					
				}
				
				function createProfileSuccess(result) {
					debugService.print("in createProfileSuccess");
					flash('Profiili tallennettu.');
				}
				
				function createProfileError(result) {
					debugService.print("in createProfileError");
					flash('Profiilin tallennus epäonnistui.');
				}
				
				function saveProfileSuccess(result) {
					debugService.print("in saveProfileSuccess");
					flash('Profiili tallennettu.');
				}
				
				function saveProfileError(result) {
					debugService.print("in saveProfileError");
					flash('Profiilin tallennus epäonnistui.');
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
					// We optimistically assume that the user profile does not yet exist.
					debugService.print("in getProfileError. Assuming user profile does not exist in db. ");
					$scope.currentEmployee = {firstName: "", lastName: "", age: "", streetAddress: "", postalNumber: "", city: "", skills: []};
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
