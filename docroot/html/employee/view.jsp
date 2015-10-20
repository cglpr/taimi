<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<%@ taglib prefix="liferay-util" uri="http://liferay.com/tld/util" %>

<portlet:defineObjects />

<div>
	<liferay-ui:tabs names="Muokkaa profiilia" refresh="false" tabsValues="Muokkaa profiilia">
	<liferay-ui:section>
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
					<div class="row">
						<div class="col-md-4">Ik&auml;:</div>
						<div class="col-md-4"><input type="text" ng-model="currentEmployee.age" name="empAge" required /></div>
						<div ng-show="form.$submitted || form.empAge.$touched">
			      			<div ng-show="form.empAge.$error.required" class="col-md-4" style="color: red" >Ikä on pakollinen.</div>
			    		</div>
					</div> 
					<hr />
					<div class="row">
						<div class="col-md-4">Katuosoite:</div>
						<div class="col-md-4"><input type="text" ng-model="currentEmployee.streetAddress" name="empAddress" required /></div>
						<div ng-show="form.$submitted || form.empAddress.$touched">
			      			<div ng-show="form.empAddress.$error.required" class="col-md-4" style="color: red" >Katuosoite on pakollinen.</div>
			    		</div>
					</div>
					<div class="row">
						<div class="col-md-4">Postinumero:</div>
						<div class="col-md-4"><input type="text" ng-model="currentEmployee.postalNumber" name="empPostnumber" required /></div>
						<div ng-show="form.$submitted || form.empPostnumber.$touched">
			      			<div ng-show="form.empPostnumber.$error.required" class="col-md-4" style="color: red" >Postinumero on pakollinen.</div>
			    		</div>
					</div>
					<div class="row">
						<div class="col-md-4">Postitoimipaikka:</div>
						<div class="col-md-4"><input type="text" ng-model="currentEmployee.city" name="empCity" required /></div>
						<div ng-show="form.$submitted || form.empCity.$touched">
			      			<div ng-show="form.empCity.$error.required" class="col-md-4" style="color: red" >Postitoimipaikka on pakollinen.</div>
			    		</div>
					</div> 
				</div>
			</div>
			
			<flash:messages class="slide-down" ng-show="messages"></flash:messages>	
			
			<div class="panel panel-info">
				<div class="panel-heading"><h4>Tekninen osaaminen:</h4></div>
				<div class="panel-body">
					<table class="table-bordered">
						<thead>
							<tr>
								<th>Osaamisalue</th>
								<th>Osaamistaso</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="skill in currentEmployee.skills">
								<td>{{skill.name}}</td>
								<td>{{skill.level}}</td>
								<td><button class="btn btn-default" ng-click="removeSkill(skill)">Poista</button></td>
							</tr>
							<!-- Add new skill -->
							<tr>
								<td>
									<select class="form-control" ng-model="newSkill.name" name="selectTech">
										<option value="-1"></option><!-- empty value -->
										<option ng-repeat="tech in techList" value="{{tech}}">{{tech}}</option>
									</select>
								</td>
								<td>
									<select class="form-control" ng-model="newSkill.level" name="selectLevel">
										<option ng-repeat="skillLevel in skillLevels" value="{{skillLevel}}">{{skillLevel}}</option>
									</select>
								</td>
								<td>
									<button class="btn btn-default" ng-click="addSkill(newSkill)">Lisää</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
			<div class="row">
				
				<div class="col-md-6" ng-if="existingProfile === true"><button class="btn btn-default" type="button" ng-click="save()">Päivitä käyttäjäprofiili</button>
				</div>
				<div class="col-md-6" ng-if="existingProfile === false"><button class="btn btn-default" type="button" ng-click="save()">Luo käyttäjäprofiili</button>
				</div>
			</div>
			
			
			
		</form>
	</div>
	</liferay-ui:section>
	</liferay-ui:tabs>
</div>