<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<portlet:defineObjects />
<div ng-controller="ProjectController">
	<form name="form" novalidate class="css-form">
	<liferay-ui:tabs names="Lis‰‰ projekti,Listaa projektit,Hae projekti" refresh="false" tabsValues="Lis‰‰ projekti,Listaa projektit,Hae projekti">
	<liferay-ui:section>
		<h1>Lis‰‰ uusi projekti</h1>
		<p>
		Nimi:<br> 
			<input type="text" ng-model="proj.name" name="projName" required /> 
			<br /> 
			  <div ng-show="form.$submitted || form.projName.$touched">
      				<div ng-show="form.projName.$error.required" style="color: red" >Nimi on pakollinen.</div>
    		  </div>
		</p>
		<p>Koko (kEUR):<br> 
			<input type="text" ng-model="proj.sizeKiloEuros" name="projSize" required /> 
			<br /> 
			  <div ng-show="form.$submitted || form.projSize.$touched">
      				<div ng-show="form.projSize.$error.required" style="color: red" >Koko on pakollinen.</div>
    		  </div>
		</p>
		<p>Teknologiat:<br>
			<select ng-model="proj.techs" name="projTechs" required multiple>
				<option ng-repeat="tech in techList" value="{{tech}}">{{tech}}</option>
			</select>
			<br /> 
			  <div ng-show="form.$submitted || form.projTechs.$touched">
      				<div ng-show="form.projTechs.$error.required" style="color: red" >Teknologiat ovat pakolliset.</div>
    		  </div>
		</p>
		<p>Lis&auml;&auml; teknologia:<br> 
			<input type="text" ng-model="newTech" name="newTechnology" /> 
			<button type="button" class="btn btn-default btn-sm" ng-click="addTech(newTech)">
            	<span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
        	</button>
			<br /> 
		</p>
		<p>Kuvaus:<br> 
			<input type="text" ng-model="proj.description" name="projDescription" /> 
			<br /> 
		</p>
		<p>Asiakas:<br> 
			<input type="text" ng-model="proj.customer" name="projCustomer" /> 
			<br /> 
		</p>
		<p>
		 <button type="button" class="btn btn-default btn-sm" ng-click="add(proj)">
          <span class="glyphicon glyphicon-plus-sign"></span> Lis‰‰
        </button>
		</p>
	</liferay-ui:section>
	</form>

	<liferay-ui:section>
	<h1>Projektilista</h1>
	<table>
		<tr>
			<th>Projektin nimi</th>
			<th>Koko/kEUR</th>
			<th>Teknologiat</th>
			<th>Asiakas</th>
		</tr>
		<tr ng-repeat="proj in projList">
			<td >{{ proj.name }}</td>
			<td >{{ proj.sizeKiloEuros}}</td>
			<td >{{ proj.techs | shorten }}</td>
			<td >{{ proj.customer }}</td>
			<td><button ng-click="remove($index);">Poista</button>
		</tr>
	</table>
	</liferay-ui:section>
	<liferay-ui:section>
		<p>T‰ss‰ tabissa haetaan projekteja</p>
	</liferay-ui:section>
	</liferay-ui:tabs>
</div>

