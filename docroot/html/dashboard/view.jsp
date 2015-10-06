<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<%@ taglib prefix="liferay-util" uri="http://liferay.com/tld/util" %>


  <script type="text/javascript" src="http://code.angularjs.org/1.1.0/angular.min.js"></script>
  <script type="text/javascript" src="http://www.google.com/jsapi?ext.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="app.js"></script>
  <script src="controllers.js"></script>

  <body> 

    <div ng-controller = 'SkillDemandCtrl'>
      <div chart id="chart_div"></div>
    </div>    
  </body>
