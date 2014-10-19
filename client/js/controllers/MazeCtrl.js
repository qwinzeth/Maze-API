var mazeApp = angular.module('mazeApp', []);

mazeApp.controller('MazeCtrl', function ($scope, $http) {
	$scope.mazeWalls=[];
	$scope.mazeError="";
	
	$scope.getMaze=function getMaze(){
		$http.get('/api/maze/'+$('#txtMazeID').val()).success(getMazeCompleted).error(showError);
	}
	
	function showError(err){
		$scope.mazeError=err;
		$scope.mazeWalls=[];
	}
	
	function getMazeCompleted(data){
		$scope.mazeError="";
		$scope.mazeWalls=data;
	}
});
