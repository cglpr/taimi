(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "employeeportlet",
		function() {
			var empModule = angular.module("empModule", ['flash', 'ngAnimate']);
			
			empModule.controller("EmployeeController", ["$scope", "$log", "$filter", "flash", function($scope, $log, $filter, flash) {
				$scope.empList = [];
				$scope.techList = [{name: 'Angularjs'}, {name: 'Groovy'}, {name: 'Grails'}];
				$scope.skillLevels = [{id: '1', name: 'Aloittelija'}, {id: '2', name: 'Kokenut'}, {id: '3', name: 'Asiantuntija'}];
				$scope.currentEmployee = {id: '1', name: 'John Smith', age: '33', streetAddress: 'Orioninkatu 8', postalNumber: '53850', city: 'Lappeenranta'};
				$scope.currentEmployee.skills = [$scope.techList[0]];
				$scope.currentEmployee.skills[0].level = $scope.skillLevels[0];
				
				$scope.removeSkill = function(skill) {
					var index = $scope.currentEmployee.skills.indexOf(skill);
					$scope.currentEmployee.skills.splice(index, 1); 
				}
				
				$scope.addSkill = function(newSkill) {
					if (newSkill.id === '-1') {
						return;
					}
					$log.debug("newSkill: ", newSkill);
					// We need to copy object, so we get a new object.
					var newSkillObject = jQuery.extend(true, {}, newSkill);
					newSkillObject.level = JSON.parse(newSkillObject.level);

					$scope.currentEmployee.skills.push(newSkillObject);					
				}
				
				$scope.save = function() {
					flash('Profiili tallennettu.');
				}
				
			}]);
			
			return [ empModule.name ];
		});
})(Liferay, angular);
