function postMazeWall(mazewall, callback){
	var MazeWall=require('./models/MazeWall.js');
	var newMazeWall=new MazeWall();
	newMazeWall.mazeid=mazewall.mazeid;
	newMazeWall.id=mazewall.id;
	newMazeWall.x1=mazewall.x1;
	newMazeWall.x2=mazewall.x2;
	newMazeWall.y1=mazewall.y1;
	newMazeWall.y2=mazewall.y2;
	newMazeWall.color=mazewall.color;
	
	newMazeWall.save(mazeSaved);
	
	function mazeSaved(err){
		callback(err);
	}
}

module.exports=postMazeWall;
