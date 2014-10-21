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
		callback(null, mongoose);
	}
}

module.exports=dbConnect;
