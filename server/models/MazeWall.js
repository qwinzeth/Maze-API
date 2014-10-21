var mongoose=require('mongoose');

var mazewallSchema=new mongoose.Schema({
	mazeid: Number,
	id: Number,
	x1: Number,
	x2: Number,
	y1: Number,
	y2: Number,
	color: String
});


module.exports = mongoose.model('MazeWall', mazewallSchema);

