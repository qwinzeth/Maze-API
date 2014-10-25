var port=20756;
var express=require('express');
var fs=require('fs');
var getMaze=require('./server/getmaze.js');
var postMazeWall=require('./server/postMazeWall.js');
var updateMazeWall=require('./server/updateMazeWall.js');
var deleteMazeWall=require('./server/deleteMazeWall.js');

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

	// GET a single maze: /api/maze/:id
	function getMazeByIDAPIRoute(req, res){
		getMaze(req.params.id, gotMaze);

		function gotMaze(err, mazewalls){
			if(!err){
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end(JSON.stringify(mazewalls));
			}else{
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
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

	app.get('/api/maze/:id', getMazeByIDAPIRoute);
	app.post('/api/mazewall',postMazeWallRoute);
	app.put('/api/mazewall', putMazeWallRoute);
	app.delete('/api/mazewall/:id', deleteMazeWallRoute);

	var server=app.listen(port, listen);

	function listen(){
		console.log(server.address());
	}
}
