var port=20756;
var express=require('express');
var fs=require('fs');
var getMazes=require('./server/maze/getMazes.js');
var getMaze=require('./server/maze/getMaze.js');
var postMaze=require('./server/maze/postMaze.js');
var postMazeWall=require('./server/mazewall/postMazeWall.js');
var updateMazeWall=require('./server/mazewall/updateMazeWall.js');
var deleteMazeWall=require('./server/mazewall/deleteMazeWall.js');

//DB
var dbhandler=require('./server/dbhandler');
dbhandler(dbConnected);
function dbConnected(err, mongoose){
	if(err){
		console.log('DB Error: '+err);
		return;
	}

	//Routing
	var app=express();

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	var bodyParser=require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// GET all mazes: /api/maze
	function getMazesAPIRoute(req, res){
		getMazes(gotMaze);
		
		function gotMaze(err, mazes){
			if(!err){
				res.json(mazes);
			}else{
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}
		}
	}

	// GET a single maze: /api/maze/:id
	function getMazeByIDAPIRoute(req, res){
		getMaze(req.params.id, gotMaze);

		function gotMaze(err, maze){
			if(!err){
				res.writeHead(500, {'Content-Type': 'application/json'});
				var mazeJSONString=JSON.stringify(maze);
				mazeJSONString=mazeJSONString.substring(0, mazeJSONString.length-1);
				var wallsJSONString=JSON.stringify(maze.walls);
				mazeJSONString+=", \"walls\":"+wallsJSONString+"}";
				res.end(mazeJSONString);
			}else{
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}
		}
	}
	
	// POST a new maze: /api/maze
	// The body must contain the JSON for the new maze.
	/* maze={
			mazeid: Number,
			mazename: String,
			startx: Number,
			starty: Number,
			finishx: Number,
			finishy: Number
		}
	*/
	function postMazeRoute(req, res){
		req.body.maze._id=new mongoose.Types.ObjectId();
		postMaze(req.body.maze, mazePosted);
		
		function mazePosted(err){
			if(err){
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}else{
				res.json({_id: req.body.maze._id});
			}
		}
	}

	// POST a new maze wall: /api/mazewall
	// The body must contain the JSON for the new maze wall.
	/* mazewall={
			mazeid: Number,
			x1: Number,
			x2: Number,
			y1: Number,
			y2: Number,
			color: String
		}
	*/
	function postMazeWallRoute(req, res){
		req.body.mazewall._id=new mongoose.Types.ObjectId();
		postMazeWall(req.body.mazewall, mazeWallPosted);
		
		function mazeWallPosted(err){
			if(err){
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}else{
				res.json({_id: req.body.mazewall._id});
			}
		}
	}
	
	// PUT an update to an existing maze wall: /api/mazewall
	// The body must contain the JSON for the updated maze wall.
	/* mazewall={
			_id: ObjectId (from GET)
			mazeid: Number,
			x1: Number,
			x2: Number,
			y1: Number,
			y2: Number,
			color: String
		}
	*/
	function putMazeWallRoute(req, res){
		updateMazeWall(req.body.mazewall, mazeWallUpdated);
		
		function mazeWallUpdated(err){
			if(err){
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}else{
				res.writeHead(204);
				res.end();
			}
		}
	}

	// DELETE a maze wall: /api/mazewall:id
	function deleteMazeWallRoute(req, res){
		deleteMazeWall(req.params.id, deletedMazeWall);
		
		function deletedMazeWall(err, mazewalls){
			if(err){
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}else{
				res.writeHead(204);
				res.end();
			}
		}
	}

	app.use('/', express.static('./client/'));

	app.get('/api/maze', getMazesAPIRoute);
	app.get('/api/maze/:id', getMazeByIDAPIRoute);
	app.post('/api/maze', postMazeRoute);
	app.post('/api/mazewall',postMazeWallRoute);
	app.put('/api/mazewall', putMazeWallRoute);
	app.delete('/api/mazewall/:id', deleteMazeWallRoute);

	var server=app.listen(port, listen);

	function listen(){
		console.log(server.address());
	}
}
