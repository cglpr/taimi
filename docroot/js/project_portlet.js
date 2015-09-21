(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "projectportlet",
		function() {
			var projModule = angular.module("projModule", []);
			projModule.controller("ProjectController", ["$scope", function($scope) {
				$scope.projList = [];
				
				$scope.add = function(proj) {
					if(proj){
						$scope.projList.push({name: proj.name});
					}
				};

				$scope.remove = function(index) {
					$scope.projList.splice(index, 1);
				};
			}]);			
			return [ projModule.name ];
		});
})(Liferay, angular);