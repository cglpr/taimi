(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "employeeportlet",
		function() {
			var empModule = angular.module("empModule", []);
			empModule.controller("EmployeeController", ["$scope", function($scope) {
				$scope.empList = [];
				
				$scope.add = function(emp) {
					if(emp){
						$scope.empList.push({name: emp.name});
					}
				};

				$scope.remove = function(index) {
					$scope.empList.splice(index, 1);
				};
			}]);			
			return [ empModule.name ];
		});
})(Liferay, angular);