<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>

<portlet:defineObjects />
<div ng-controller="EmployeeController">
	<form name="form" novalidate class="css-form">
		<h1>Työntekijät</h1>
		<p>Nimi:<br> 
			<input type="text" ng-model="emp.name" name="empName" required /> 
			<br /> 
			  <div ng-show="form.$submitted || form.empName.$touched">
      				<div ng-show="form.empName.$error.required" style="color: red" >Nimi on pakollinen.</div>
    			</div>
		</p>
		<p>
		 <button type="button" class="btn btn-default btn-sm" ng-click="add(emp)">
          <span class="glyphicon glyphicon-plus-sign"></span> Lisää
        </button>
		</p>
	</form>

	<div ng-repeat="emp in empList">
		<span>{{emp.name}}</span>
		<button ng-click="remove($index);">Poista</button>
	</div>
</div>

