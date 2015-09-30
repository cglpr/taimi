(function(Liferay, angular) {
	angular.portlet.add("LiferayPlayground-portlet", "projectportlet",
		function() {
			var projModule = angular.module("projModule", []);
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

			}]);			
			return [ projModule.name ];
		});
})(Liferay, angular);