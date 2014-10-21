var mazeApp = angular.module('mazeApp', []);

mazeApp.controller('MazeCtrl', function ($scope, $http) {
	$scope.mazeWalls=[];
	$scope.mazeError="";
	$scope.mazeID=0;
	
	$scope.getMaze=getMaze;
	$scope.postMazeWall=postMazeWall;
	$scope.newMazeWall={
		mazeid: $scope.mazeID,
		id: 1,
		x1: 200,
		x2: 220,
		y1: 200,
		y2: 220,
		color: '#00FF00'
	};
	
	function getMaze(){
		$http.get('/api/maze/'+$scope.mazeID).success(getMazeCompleted).error(showError);

		function getMazeCompleted(data){
			$scope.mazeError="";
			$scope.mazeWalls=data;
		}
	}
	
	function postMazeWall(){
		$http.post('/api/maze', {mazewall: $scope.newMazeWall}).success(postMazeWallCompleted).error(showError);
		
		function postMazeWallCompleted(){
			$scope.mazeError="";
			$scope.newMazeWall.id++;
			$scope.newMazeWall.x1+=20;
			$scope.newMazeWall.x2+=20;
		}
	}
	
	function showError(err){
		$scope.mazeError=err;
		$scope.mazeWalls=[];
	}
	
});
