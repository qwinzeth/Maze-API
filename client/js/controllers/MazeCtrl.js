var mazeApp = angular.module('mazeApp', []);

mazeApp.controller('MazeCtrl', function ($scope, $http) {
	angular.element(document).ready(getMaze);

	$scope.mazeWalls=[];
	$scope.mazeError="";
	$scope.mazeID=0;

	$scope.selectWall=selectMazeWall;
	
	$scope.getMaze=getMaze;
	$scope.postMazeWall=postMazeWall;
	$scope.updateMazeWall=updateMazeWall;
	$scope.deleteMazeWall=deleteMazeWall;
	
	$scope.newMazeWall={
		_id: null,
		x1: 200,
		y1: 200,
		width: 20,
		height: 20,
		color: '#00FF00'
	};
	
	function selectMazeWall(mazeWall){
		$scope.newMazeWall._id=mazeWall._id;
		$scope.newMazeWall.x1=mazeWall.x1;
		$scope.newMazeWall.y1=mazeWall.y1;
		$scope.newMazeWall.width=mazeWall.x2-mazeWall.x1;
		$scope.newMazeWall.height=mazeWall.y2-mazeWall.y1;
		$scope.newMazeWall.color=mazeWall.color;
	}
	
	function getMaze(){
		$http.get('/api/maze/'+$scope.mazeID).success(getMazeCompleted).error(wipeMazeWalls);

		function getMazeCompleted(data){
			$scope.mazeError="";
			$scope.mazeWalls=data;
		}
		
		function wipeMazeWalls(err){
			$scope.mazeWalls=[];
			$scope.newMazeWall._id=null;
			showError(err);
		}
	}
	
	function postMazeWall(){
		$scope.newMazeWall.mazeid=$scope.mazeID;
		$scope.newMazeWall.x2=parseInt($scope.newMazeWall.x1)+parseInt($scope.newMazeWall.width);
		$scope.newMazeWall.y2=parseInt($scope.newMazeWall.y1)+parseInt($scope.newMazeWall.height);
		$http.post('/api/mazewall', {mazewall: $scope.newMazeWall}).success(postMazeWallCompleted).error(showError);
		
		function postMazeWallCompleted(data){
			$scope.mazeError="";
			$scope.newMazeWall._id=data._id;
			getMaze();
		}
	}
	
	function updateMazeWall(){
		$scope.newMazeWall.mazeid=$scope.mazeID;
		$scope.newMazeWall.x2=parseInt($scope.newMazeWall.x1)+parseInt($scope.newMazeWall.width);
		$scope.newMazeWall.y2=parseInt($scope.newMazeWall.y1)+parseInt($scope.newMazeWall.height);
		$http.put('/api/mazewall', {mazewall: $scope.newMazeWall}).success(putMazeWallCompleted).error(showError);
		
		function putMazeWallCompleted(){
			$scope.mazeError="";
			getMaze();
		}
	}
	
	function deleteMazeWall(){
		$http.delete('/api/mazewall/'+$scope.newMazeWall._id).success(deleteMazeWallCompleted).error(showError);
		
		function deleteMazeWallCompleted(){
			$scope.newMazeWall._id=null;
			getMaze();
		}
	}
	
	function showError(err){
		$scope.mazeError=err;
	}
});
