function getMazeByID(mongoose, mazeid, callback){
	var mazeModel=mongoose.model('mazewall');
	var maze=mazeModel.find({mazeid: mazeid}, gotMazes);
	
	function gotMazes(err, mazewalls){
		if(err){
			callback(err, null);
		}else if(mazewalls.length<1){
			callback("No mazewalls found with mazeid: "+mazeid, null);
		}else{
			callback(null, mazewalls);
		}
	}
}

module.exports=getMazeByID;
