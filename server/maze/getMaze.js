function getMazeByID(mazeid, callback){
	var Maze=require('../models/Maze.js');
	var mazeQuery=Maze.find({_id: mazeid}, gotMaze);
	
	function gotMaze(err, maze){
		if(err){
			callback(err, null);
		}else if(maze.length<1){
			callback("No maze found with mazeid="+mazeid, null);
		}else{
			var MazeWall=require('../models/MazeWall.js');
			var mazewallsQuery=MazeWall.find({mazeid: mazeid}, gotMazeWalls);
		}

		function gotMazeWalls(err, mazewalls){
			if(err){
				callback(err, null);
			}else{
				var retmaze=maze[0];
				retmaze.walls=mazewalls;
				callback(null, retmaze);
			}
		}
	}	
}

module.exports=getMazeByID;
