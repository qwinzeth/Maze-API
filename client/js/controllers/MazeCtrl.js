var mazeApp = angular.module('mazeApp', []);

mazeApp.controller('MazeCtrl', function ($scope, $http) {
	angular.element(document).ready(getMazes);

	$scope.player={
		x: 0,
		y: 0,
		jump: 5,
		width: 12,
		height: 29
	};

	$scope.mazeSelectionPairs=[];
	$scope.mazeError="";
	$scope.maze={
		_id: null,
		walls: [],
		mazename: "",
		startx: 0,
		starty: 0,
		finishx: 368,
		finishy: 368
	};

	$scope.keyDown=keyDown;

	$scope.selectWall=selectMazeWall;
	
	$scope.getMaze=getMaze;
	$scope.postMaze=postMaze;
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
	
	function keyDown(event){
		switch(event.keyCode){
		case 37:
			attemptPlayerMove($scope.player.x-parseInt($scope.player.jump), $scope.player.y);
		break;
		case 39:
			attemptPlayerMove($scope.player.x+parseInt($scope.player.jump), $scope.player.y);
		break;
		case 38:
			attemptPlayerMove($scope.player.x, $scope.player.y-parseInt($scope.player.jump));
		break;
		case 40:
			attemptPlayerMove($scope.player.x, $scope.player.y+parseInt($scope.player.jump));
		break;
		}
	}

	function attemptPlayerMove(newx, newy){
		if(newx<0||newx>=$('.maze-container').width()-$scope.player.width
		||newy<0||newy>=$('.maze-container').height()-$scope.player.height){
			return;
		}
		
		for(var i=0;i<$scope.maze.walls.length;i++){
			var cwall=$scope.maze.walls[i];
			if(newx+$scope.player.width>=cwall.x1&&newx<=cwall.x2&&newy+$scope.player.height>=cwall.y1&&newy<=cwall.y2){
				return;
			}
		}
		
		$scope.player.x=newx;
		$scope.player.y=newy;
	}	
	
	function selectMazeWall(mazeWall){
		$scope.newMazeWall._id=mazeWall._id;
		$scope.newMazeWall.x1=mazeWall.x1;
		$scope.newMazeWall.y1=mazeWall.y1;
		$scope.newMazeWall.width=mazeWall.x2-mazeWall.x1;
		$scope.newMazeWall.height=mazeWall.y2-mazeWall.y1;
		$scope.newMazeWall.color=mazeWall.color;
	}
	
	function getMazes(){
		$http.get('/api/maze').success(getMazesCompleted).error(showError);
		
		function getMazesCompleted(data){
			$scope.mazeSelectionPairs=data;
			if($scope.mazeSelectionPairs.length>0){
				$scope.maze._id=data[0]._id;
				getMaze();
			}
		}
	}
	
	function getMaze(){
		$http.get('/api/maze/'+$scope.maze._id).success(getMazeCompleted).error(wipeMazeWalls);

		function getMazeCompleted(data){
			$scope.mazeError="";
			$scope.maze=data;
			for(var i=0;i<$scope.maze.walls.length;i++){
				var wall=$scope.maze.walls[i];
				wall.cssStyle={left: wall.x1+'px', 'top': wall.y1+'px', 'width': (wall.x2-wall.x1-1)+'px', 'height': (wall.y2-wall.y1-1)+'px', 'background-color': wall.color};
			}
			$scope.player.x=$scope.maze.startx;
			$scope.player.y=$scope.maze.starty;
		}
		
		function wipeMazeWalls(err){
			// Despite perfectly valid JSON being returned from the server, a 500 is received.
			if(err.walls&&err.walls.length>=0){
				getMazeCompleted(err);
				return;
			}
			$scope.maze.walls=[];
			$scope.newMazeWall._id=null;
			showError(err);
		}
	}
	
	function postMaze(){
		$http.post('/api/maze', {maze: $scope.maze}).success(postMazeCompleted).error(showError);
		
		function postMazeCompleted(data){
			$scope.mazeError="";
			$scope.maze._id=data._id;
			getMaze();
		}
	}
	
	function postMazeWall(){
		$scope.newMazeWall.mazeid=$scope.maze._id;
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
		$scope.newMazeWall.mazeid=$scope.maze._id;
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
