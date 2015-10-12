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
				<div class="col-md-4">Nimi:</div>
				<div class="col-md-6"><input type="text" ng-model="proj.name" name="projName" required /></div>
				<div ng-show="form.$submitted || form.projName.$touched">
		     			<div ng-show="form.projName.$error.required" class="col-md-2" style="color: red" >Nimi on pakollinen.</div>
		   		</div>
	   		</div>
			<div class="row">
				<div class="col-md-4">Koko (kEUR):</div>
				<div class="col-md-6"><input type="text" ng-model="proj.sizeKiloEuros" name="projSize" required /> </div>
				<div ng-show="form.$submitted || form.projSize.$touched">
					<div ng-show="form.projSize.$error.required" class="col-md-2" style="color: red">Koko on pakollinen.</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">Teknologiat:</div>
				<div class="col-md-6"><select ng-model="proj.techs" name="projTechs" required multiple>
					<option ng-repeat="tech in techList" value="{{tech}}">{{tech}}</option>
				</select></div> 
				<div ng-show="form.$submitted || form.projTechs.$touched">
	      			<div ng-show="form.projTechs.$error.required" class="col-md-2" style="color: red" >Teknologiat ovat pakolliset.</div>
	    		</div>   		  
	   		</div>
			<div class="row">
				<div class="col-md-4">Lis&auml;&auml; teknologia:</div> 
				<div class="col-md-6"><input type="text" ng-model="newTech" name="newTechnology" /></div>
				<div class="col-md-2"> 
					<button type="button" class="btn btn-default btn-sm" ng-click="addTech(newTech)">
		            	<span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
		        	</button>
	        	</div>
	   		</div>
			<div class="row">
				<div class="col-md-4">Kuvaus:</div> 
				<div class="col-md-8"><input type="text" ng-model="proj.description" name="projDescription" /></div> 
	   		</div>
			<div class="row">
				<div class="col-md-4">Asiakas:</div> 
				<div class="col-md-6"><input type="text" ng-model="proj.customer" name="projCustomer" /></div> 
				<div class="col-md-2">
					<button type="button" class="btn btn-default btn-sm" ng-click="add(proj)">
		          	<span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
		        	</button>
				</div>
	   		</div>
	   	</div>
	</liferay-ui:section>
	</form>

	<liferay-ui:section>
		<div class="panel panel-info">
			<div class="panel-heading "><div class="col-md-12"><h4>Projektilista</h4></div></div>
			<div class="panel-body">
				<table class="table-bordered">
					<thead>
						<tr>
							<th>Projektin nimi</th>
							<th>Koko/kEUR</th>
							<th>Teknologiat</th>
							<th>Asiakas</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="proj in projList">
							<th>{{ proj.name }}</th>
							<th>{{ proj.sizeKiloEuros}}</th>
							<th>{{ proj.techs | shorten }}</th>
							<th>{{ proj.customer }}</th>
							<td><button ng-click="remove($index);">Poista</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</liferay-ui:section>
	<liferay-ui:section>
		<p>T‰ss‰ tabissa haetaan projekteja</p>
	</liferay-ui:section>
	</liferay-ui:tabs>
</div>

