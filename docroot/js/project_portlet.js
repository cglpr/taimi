(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "projectportlet",
		function() {
			var projModule = angular.module("projModule", []);
			projModule.controller("ProjectController", ["$scope", function($scope) {
				$scope.projList = [];
				$scope.techList = ['Angularjs', 'Groovy', 'Grails', 'Java', 'Javascript', 'React', 'Spring', 'Spring-UI'];
				
				$scope.add = function(proj) {
					if(proj){
						$scope.projList.push(proj);
					}
				};

				$scope.remove = function(index) {
					$scope.projList.splice(index, 1);
				};
				
				$scope.getTechs = function(index) {
					return techList;
				};
				$scope.techsForTable = function(proj) {
					var t = proj.techs[0];
					if(proj.techs.length > 1) {
						t = t + ",...";
					}
					return t;
				}

			}]);			
			return [ projModule.name ];
		});
})(Liferay, angular);