function deleteMazeWall(mazeWallID, callback){
	var MazeWall=require('./models/MazeWall.js');
	MazeWall.remove({_id: mazeWallID}, deletedMazeWall);
	
	function deletedMazeWall(err){
		callback(err);
	}
}

module.exports=deleteMazeWall;
