function dbConnect(callback){
	var mongoose=require('mongoose');
	mongoose.connect('mongodb://localhost/mazeapidb');
	var db = mongoose.connection;
	db.on('error', errorCallback);
	db.once('open', successCallback);

	function errorCallback(err){
		callback(err, null);
	}

	function successCallback(){
		var mazewallSchema=mongoose.Schema({
			mazeid: Number,
			id: Number,
			x1: Number,
			x2: Number,
			y1: Number,
			y2: Number,
			color: String
		});

		mongoose.model('mazewall', mazewallSchema);

		callback(null, mongoose);
	}
}

module.exports=dbConnect;
