var mongoose=require('mongoose');

var mazeSchema=new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	mazename: String,
	startx: Number,
	starty: Number,
	finishx: Number,
	finishy: Number
});


module.exports = mongoose.model('Maze', mazeSchema);

