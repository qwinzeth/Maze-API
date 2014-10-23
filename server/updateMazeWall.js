function updateMazeWall(mazewall, callback){
	var MazeWall=require('./models/MazeWall.js');
	
	MazeWall.update({_id: mazewall._id}, mazewall, mazeSaved);
	
	function mazeSaved(err){
		callback(err);
	}
}

module.exports=updateMazeWall;
