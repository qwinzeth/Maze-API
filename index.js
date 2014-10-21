var port=20756;
var express=require('express');
var fs=require('fs');
var getMaze=require('./server/getmaze.js');
var postMazeWall=require('./server/postMazeWall.js');

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

	function serveFile(res, uri, mimeType){
		fs.readFile(uri, readFileCompleted);

		function readFileCompleted(err, data){
			if(!err){
				res.writeHead(200, {'Content-Type': mimeType});
				res.end(data.toString());
			}else{
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err+'\n');
			}
		}
	};

	function defaultRoute(req, res){
		serveFile(res, "client/index.html", "text/html");
	}

	function jQueryRoute(req, res){
		serveFile(res, 'client/js/jquery.min.js', 'text/javascript');
	}

	function mazeClientJSRoute(req, res){
		serveFile(res, 'client/js/mazeclientscript.js', 'text/javascript');
	}

	function mazeCtrlJSRoute(req, res){
		serveFile(res, 'client/js/controllers/MazeCtrl.js', 'text/javascript');
	}

	function mazeCSSRoute(req, res){
		serveFile(res, 'client/css/maze.css', 'text/css');
	}

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
	
	function postMazeWallRoute(req, res){
console.log(req.body);
		postMazeWall(req.body.mazewall, mazeWallPosted);
		
		function mazeWallPosted(err){
			if(err){
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('Error: '+err);
			}else{
				res.writeHead(204);
				res.end();
			}
		}
	}

	app.get('/', defaultRoute);
	app.get('/js/jquery.js', jQueryRoute);
	app.get('/js/mazeclientscript.js', mazeClientJSRoute);
	app.get('/js/controllers/MazeCtrl.js', mazeCtrlJSRoute);
	app.get('/css/maze.css', mazeCSSRoute);

	app.get('/api/maze/:id', getMazeByIDAPIRoute);
	app.post('/api/maze',postMazeWallRoute);

	var server=app.listen(port, listen);

	function listen(){
		console.log(server.address());
	}
}
