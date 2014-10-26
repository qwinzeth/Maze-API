function postMaze(maze, callback){
	var Maze=require('../models/Maze.js');
	var newMaze=new Maze();	
	newMaze._id=maze._id;
	newMaze.mazename=maze.mazename;
	newMaze.startx=maze.startx;
	newMaze.starty=maze.starty;
	newMaze.finishx=maze.finishx;
	newMaze.finishy=maze.finishy;
	
	newMaze.save(mazeSaved);
	
	function mazeSaved(err){
		callback(err);
	}
}

module.exports=postMaze;
