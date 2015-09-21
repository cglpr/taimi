<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>

<portlet:defineObjects />
<div ng-controller="ProjectController">
	<form name="form" novalidate class="css-form">
		<h1>Lis‰‰ uusi projekti</h1>
		<p>Nimi:<br> 
			<input type="text" ng-model="proj.name" name="projName" required /> 
			<br /> 
			  <div ng-show="form.$submitted || form.projName.$touched">
      				<div ng-show="form.projName.$error.required" style="color: red" >Nimi on pakollinen.</div>
    			</div>
		</p>
		<p>
		 <button type="button" class="btn btn-default btn-sm" ng-click="add(proj)">
          <span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
        </button>
		</p>
	</form>

	<h1>Projektilista</h1>
	<div ng-repeat="proj in projList">
		<span>{{proj.name}}</span>
		<button ng-click="remove($index);">Poista</button>
	</div>
</div>

