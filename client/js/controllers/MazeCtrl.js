var mazeApp = angular.module('mazeApp', []);

mazeApp.controller('MazeCtrl', function ($scope, $http) {
	$scope.mazeWalls = [];
	
	$scope.getMaze=function getMaze(){
		$http.get('/api/maze/'+$('#txtMazeID').val()).success(getMazeCompleted);
	}
  
	function getMazeCompleted(data){
		$scope.mazeWalls=data;
	}
});
