
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                if (callback) callback(httpRequest.responseText);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
};

function drawChart() {  // When HTML DOM "click" event is invoked on element with ID "somebutton", execute the following function...
	fetchJSONFile('/TaimiBackend/rest/techdata/demand', function(responseText){
        var data = new google.visualization.DataTable(responseText);

        var options = {
          title: 'Global Skill Demand',
          width: 320, 
          height: 450,
          is3D: true
        };
        
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        
        chart.draw(data, options);
	});
};

var app = angular.module('dashboardApp', []);
app.controller('SkillDemandCtrl', function($scope) {
 
});

app.directive('chart', function() {
        drawChart();
});

google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['dashboardApp']);
});
google.load('visualization', '1', {packages: ['corechart','columnchart','piechart','gauge']});
    