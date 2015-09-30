<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>

<portlet:defineObjects />

<div class="container">

	<div class="page-header">
		<h1>Työntekijän profiili</h1>
	</div>

	<div ng-controller="EmployeeController">
		<form name="form" novalidate class="css-form">

			<div class="panel panel-info">
				<div class="panel panel-info">
					<div class="panel-heading"><h4>Henkilötiedot:</h4></div>
				</div>
				<div class="panel-body">
					
					<div class="row">
						<div class="col-md-4">Nimi:</div>
						<div class="col-md-4"><input type="text" ng-model="currentEmployee.name" name="empName" required /></div>
						<div ng-show="form.$submitted || form.empName.$touched">
			      			<div ng-show="form.empName.$error.required" class="col-md-4" style="color: red" >Nimi on pakollinen.</div>
			    		</div>
					</div> 
				
				</div>
			</div>	
			
			<div class="panel panel-info">
				<div class="panel-heading"><h4>Tekninen osaaminen:</h4></div>
				<div class="panel-body">
				
						<div ng-repeat="skill in currentEmployee.skills">
							<div class="row">
								<div class="col-md-4">{{skill.name}}</div>
								<div class="col-md-4">{{skill.level}}</div>
								<div class="col-md-4"><button class="btn btn-default">Poista</button></div>
							</div>
						</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-6"><button class="btn btn-default" type="button">Tallenna muutokset</button>
				</div>
			</div>
		</form>
	</div>

</div>