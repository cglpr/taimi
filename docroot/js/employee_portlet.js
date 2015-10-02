(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "employeeportlet",
		function() {
			var empModule = angular.module("empModule", []);
			
			empModule.controller("EmployeeController", ["$scope", function($scope) {
				$scope.empList = [];
				$scope.techList = [{name: 'Angularjs', id: '1'}, {name: 'Groovy', id: '2'}, {name: 'Grails', id: '3'}];
				$scope.currentEmployee = {id: '1', name: 'John Smith', age: '33', streetAddress: 'Orioninkatu 8', postalNumber: '53850', city: 'Lappeenranta'};
				$scope.currentEmployee.skills = [$scope.techList[0]];
				$scope.currentEmployee.skills[0].level = '3';
				$scope.currentEmployee.skills[0].description = 'Asiantuntija';
				
				$scope.removeSkill = function(skill) {
					var index = $scope.currentEmployee.skills.indexOf(skill);
					$scope.currentEmployee.skills.splice(index, 1); 
				}
				
			}]);
			
			return [ empModule.name ];
		});
})(Liferay, angular);
