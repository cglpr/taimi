<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<portlet:defineObjects />
<div ng-controller="ProjectController">
	<form name="form" novalidate class="css-form">
	<liferay-ui:tabs names="Lis‰‰ projekti,Listaa projektit,Hae projekti" refresh="false" tabsValues="Lis‰‰ projekti,Listaa projektit,Hae projekti">
	<liferay-ui:section>
	<div class="panel panel-info">
		<div class="panel panel-info">
			<div class="panel-heading"><h4>Lis‰‰ uusi projekti:</h4></div>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-3">Nimi:</div>
				<div class="col-md-6"><input type="text" ng-model="proj.name" name="projName" required /></div>
				<div ng-show="form.$submitted || form.projName.$touched">
		     			<div ng-show="form.projName.$error.required" class="col-md-3" style="color: red" >Nimi on pakollinen.</div>
		   		</div>
	   		</div>
			<div class="row">
				<div class="col-md-3">Koko (kEUR):</div>
				<div class="col-md-6"><input type="text" ng-model="proj.sizeKiloEuros" name="projSize" required /> </div>
				<div ng-show="form.$submitted || form.projSize.$touched">
					<div ng-show="form.projSize.$error.required" class="col-md-3" style="color: red">Koko on pakollinen.</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">Teknologiat:</div>
				<div class="col-md-6"><select ng-model="proj.techs" name="projTechs" required multiple>
					<option ng-repeat="tech in techList" value="{{tech}}">{{tech}}</option>
				</select></div> 
				<div ng-show="form.$submitted || form.projTechs.$touched">
	      			<div ng-show="form.projTechs.$error.required" class="col-md-3" style="color: red" >Teknologiat ovat pakolliset.</div>
	    		</div>   		  
	   		</div>
			<div class="row">
				<div class="col-md-3">Lis&auml;&auml; teknologia:</div> 
				<div class="col-md-6"><input type="text" ng-model="newTech" name="newTechnology" /></div>
				<div class="col-md-3"> 
					<button type="button" class="btn btn-default btn-sm" ng-click="addTech(newTech)">
		            	<span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
		        	</button>
	        	</div>
	   		</div>
			<div class="row">
				<div class="col-md-3">Kuvaus:</div> 
				<div class="col-md-9"><input type="text" ng-model="proj.description" name="projDescription" /></div> 
	   		</div>
			<div class="row">
				<div class="col-md-3">Asiakas:</div> 
				<div class="col-md-6"><input type="text" ng-model="proj.customer" name="projCustomer" /></div> 
				<div class="col-md-3">
					<button type="button" class="btn btn-default btn-sm" ng-click="add(proj)">
		          	<span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
		        	</button>
				</div>
	   		</div>
	   	</div>
	</div>
	</liferay-ui:section>

	<liferay-ui:section>
		<div class="panel panel-info">
			<div class="panel-heading "><h4>Projektit</h4></div>
			<div class="panel-body">
				<table class="table-striped">
					<thead>
						<tr>
							<th>{{ projFields.name }}</th>
							<th>{{ projFields.sizeKiloEuros }}</th>
							<th>{{ projFields.techs }}</th>
							<th>{{ projFields.customer }}</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="proj in projList">
							<td>{{ proj.name }}</td>
							<td>{{ proj.sizeKiloEuros}}</td>
							<td>{{ proj.techs | shorten }}</td>
							<td>{{ proj.customer }}</td>
							<td><button ng-click="remove($index);">Poista</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</liferay-ui:section>
	<liferay-ui:section>
		<div class="page-header">
			<h2>Hae projekteja</h2>
		</div>
		<div class="panel panel-info">
			<div class="panel-heading "><h4>Hakuehdot</h4></div>
			<div class="panel-body">

				<div class="row">
					<div class="col-md-3">Kentt‰</div> 
					<div class="col-md-3">Ehto</div> 
					<div class="col-md-3">Arvo</div> 
		   		</div>
				<div class="row">
					<div class="col-md-3">
						<select ng-model="currentTerms.field" name="searchField" class="projectMargins mediumWidth">
						<option ng-repeat="field in projFields" value="{{field}}" class="projectMargins mediumWidth">{{field}}</option>
						</select>
					</div> 
					<div class="col-md-3">
						<select ng-model="currentTerms.oper" name="searchOper" class="projectMargins mediumWidth">
						<option ng-repeat="oper in operators" value="{{oper}}" class="projectMargins mediumWidth">{{oper}}</option>
						</select>
					</div> 
					<div class="col-md-4">
						<input type="text" ng-model="currentTerms.value" name="searchValue" class="projectMargins mediumWidth" />
					</div> 
					<div class="col-md-2">
						<button type="button" class="btn btn-default btn-sm" ng-click="addTerms(currentTerms)" class="projectMargins">
			          	<span class="glyphicon glyphicon-plus-sign"></span>
			        	</button>
					</div>
		   		</div>
		   		<div  class="textContent">
					<div ng-repeat="myterm in termsList">
						<div class="row">
							<div class="col-md-8">{{ termsToString(myterm) }}</div>
							<div class="col-md-2">
								<select ng-model="termsList[$index].joinOper" name="joinOper" class="projectMargins narrow"
									ng-init="joinOperators[0]">
								<option ng-repeat="oper in joinOperators" value="{{oper}}">{{oper}}</option>
								</select>
							</div>
							<div class="col-md-2">
								<button type="button" class="btn btn-default btn-sm projectMargins rightAlign" ng-click="removeTerms($index)">
					          	<span class="glyphicon glyphicon-minus-sign"></span>
					        	</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-3">
						<button type="button" class="btn btn-default btn-sm" ng-click="searchProjects()">Hae
			        	</button>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-default btn-sm" ng-click="clearSearchTerms()">Tyhjenn&auml;
			        	</button>
					</div>
				</div>
			</div>
		</div>
		<div class="panel panel-info">
			<div class="panel-heading "><h4>Hakutulokset</h4></div>
			<div class="panel-body">
				<div class="table-responsive">
				<table class="table-striped spaced">
					<thead>
						<tr>
							<th class="spaced">{{ projFields.name }}</th>
							<th class="spaced">{{ projFields.sizeKiloEuros }}</th>
							<th class="spaced">{{ projFields.techs }}</th>
							<th class="spaced">{{ projFields.customer }}</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="proj in projSearchResults">
							<td class="spaced">{{ proj.name }}</td>
							<td class="spaced">{{ proj.sizeKiloEuros}}</td>
							<td class="spaced">{{ proj.techs | shorten }}</td>
							<td class="spaced">{{ proj.customer }}</td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
		</div>
	</liferay-ui:section>
	</liferay-ui:tabs>
	</form>
</div>

