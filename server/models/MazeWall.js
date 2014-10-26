var mongoose=require('mongoose');

var mazewallSchema=new mongoose.Schema({
	mazeid: mongoose.Schema.Types.ObjectId,
	_id: mongoose.Schema.Types.ObjectId,
	x1: Number,
	x2: Number,
	y1: Number,
	y2: Number,
	color: String
});


module.exports = mongoose.model('MazeWall', mazewallSchema);

