(function(Liferay, angular) {
	if (angular.portlet)
		return;

	angular.portlet = {};

	var angularPortlets = {};

	angular.portlet.add = function(pluginName, portletName, angularFunction) {
		var portletId = "_WAR_" + pluginName.replace(/[_]|[-]/g, "");
		portletId = portletName.replace(/[_]|[-]/g, "") + portletId;
		angularPortlets[portletId] = angularFunction;
	};

	Liferay.Portlet.ready(function(portletInstanceId, node) {
		var portletId = portletInstanceId.replace(/[_]INSTANCE[_].+/g, "");
		var domNode = document.getElementById("portlet_" + portletInstanceId);

		if (angularPortlets[portletId]) {
			angular.bootstrap(domNode, angularPortlets[portletId](portletInstanceId, domNode));
		}
	});
})(Liferay, angular);