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
				
				// TODO fetch user Id from portal user object (or something like that...).
				$scope.userId = "MockUser";
				$scope.existingProfile = false;
				
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

					$scope.currentEmployee.skills.push(newSkillObject);
				}
				
				$scope.save = function() {
					if ($scope.existingProfile) {
						// Existing profile has RESTHeart fields like _id and _embedded and we must not send them (it generates errors).
						var newProfileArray = createNewProfileArray($scope.currentEmployee);
						$log.debug("Updating existing profile with array: ", newProfileArray);
						$log.debug(" and etag: ", $scope.currentEmployee._etag.$oid);
						dbService.updateUserProfile(newProfileArray, $scope.currentEmployee._id.$oid, $scope.currentEmployee._etag.$oid).then(saveProfileSuccess, saveProfileError);
					} else {
						$log.debug("Creating new user profile with array: ", $scope.currentEmployee);
						$scope.currentEmployee.userId = $scope.userId;
						dbService.createUserProfile($scope.currentEmployee).then(createProfileSuccess, createProfileError);
					}
					
				}
				
				function createNewProfileArray(existingProfile) {
					var profileArray = {};
					profileArray.userId = existingProfile.userId;
					profileArray.name = existingProfile.name;
					profileArray.age = existingProfile.age;
					profileArray.streetAddress = existingProfile.streetAddress;
					profileArray.postalNumber = existingProfile.postalNumber;
					profileArray.city = existingProfile.city;
					profileArray.skills = existingProfile.skills;
					return profileArray;
				}
				
				function createProfileSuccess(result) {
					$log.debug("in createProfileSuccess");
					flash('success', 'Profiili luotu.');
					if ($scope.existingProfile === false) {
						$scope.existingProfile = true;
					}
					
					getProfile($scope.userId);
				}
				
				function createProfileError(result) {
					$log.debug("in createProfileError");
					flash('error', 'Profiilin luonti epäonnistui.');
				}
				
				function saveProfileSuccess(data, status, headers, config) {
					// We need to get the profile again, because the _etag has been updated.
					getProfile($scope.userId);
					
					$log.debug("in saveProfileSuccess");
					flash('success', 'Profiili tallennettu.');
				}
				
				function saveProfileError(result) {
					$log.debug("in saveProfileError");
					
					flash('error', 'Profiilin tallennus epäonnistui.');
				}
				
				function getProfile(profileId) {
					dbService.getUserProfile(profileId).then(getProfileSuccess, getProfileError);
				}
				
				function getProfileSuccess(result) {
					$log.debug("in getProfileSuccess, result: ", result);
					
					// Success does not mean that the profile was found. 
					// In either case a result array is returned.
					if (result['rh:doc'].length > 0) {
						$scope.currentEmployee = result['rh:doc'][0];
						$scope.existingProfile = true;
					} else {
						$scope.currentEmployee = {name: "", age: "", streetAddress: "", postalNumber: "", city: "", skills: []};
					}
				}
				
				function getProfileError(result) {
					$log.error("getProfileError, result: ", result);
					$scope.currentEmployee = {name: "", age: "", streetAddress: "", postalNumber: "", city: "", skills: []};
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
				
				function getTechsError(result) {
					$scope.techList = [result || ""];
					$log.error("getTechsError, result: ", result);
				}
				
				function getSkillLevelsSuccess(result) {
					debugService.print("in getSkillLevelsSuccess");
					$scope.skillLevels = result.sort(function(a,b) {
					    return a.toLowerCase().localeCompare(b.toLowerCase());
					});
					
				}
				
				function getSkillLevelsError(result) {
					$scope.skillLevels = [result || ""];
					$log.error("getSkillLevelsError, result: ", result);
				}
				
				function addTechSuccess(result) {
					$log.debug("in addTechSuccess");
					initTechs();				
				}
				
				function addTechError(result) {
					$log.error("addTechsError, result: " , result);
				}				
				
			}]);
			
			return [ empModule.name ];
		});
})(Liferay, angular);
