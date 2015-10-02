(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "employeeportlet",
		function() {
			var empModule = angular.module("empModule", []);
			
			empModule.controller("EmployeeController", ["$scope", "$log", "$filter", function($scope, $log, $filter) {
				$scope.empList = [];
				$scope.techList = [{name: 'Angularjs', id: '1'}, {name: 'Groovy', id: '2'}, {name: 'Grails', id: '3'}];
				$scope.skillLevels = ['1', '2', '3', '4', '5'];
				$scope.currentEmployee = {id: '1', name: 'John Smith', age: '33', streetAddress: 'Orioninkatu 8', postalNumber: '53850', city: 'Lappeenranta'};
				$scope.currentEmployee.skills = [$scope.techList[0]];
				$scope.currentEmployee.skills[0].level = '3';
				$scope.currentEmployee.skills[0].description = 'Asiantuntija';
				
				$scope.removeSkill = function(skill) {
					var index = $scope.currentEmployee.skills.indexOf(skill);
					$scope.currentEmployee.skills.splice(index, 1); 
				}
				
				$scope.addSkill = function(newSkill) {
					// We need to copy object, so we get a new object.
					var newSkillObject = jQuery.extend(true, {}, newSkill);
					// Set tech name based on id.
					newSkillObject.name = $filter('filter')($scope.techList, {id: newSkill.id})[0].name;
					
					$log.debug("newSkillObject: ", newSkillObject);
					
					$scope.currentEmployee.skills.push(newSkillObject);
					// TODO: remove. For testing purposes
					$log.debug("FilterById result: ", $filter('filter')($scope.techList, {id: newSkill.id}))[0];						
				}
				
			}]);
			
			return [ empModule.name ];
		});
})(Liferay, angular);
