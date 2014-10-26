function getMazes(callback){
	var Maze=require('../models/Maze.js');
	var mazeQuery=Maze.find(gotMaze);
	
	function gotMaze(err, mazes){
		if(err){
			callback(err, null);
		}else{
			callback(null, mazes);
		}
	}	
}

module.exports=getMazes;
