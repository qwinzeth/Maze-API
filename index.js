var port=20756;
var express=require('express');
var fs=require('fs');
var app=express();

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

function getMazeAPIRoute(req, res, id){id=0;
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end('[{"id": '+id+', "x1": 50, "x2": 100, "y1": 25, "y2": 50, "color": "#0000FF"}]');
}

app.get('/', defaultRoute);
app.get('/js/jquery.js', jQueryRoute);
app.get('/js/mazeclientscript.js', mazeClientJSRoute);
app.get('/js/controllers/MazeCtrl.js', mazeCtrlJSRoute);
app.get('/css/maze.css', mazeCSSRoute);

app.get('/api/maze', getMazeAPIRoute);

function listen(){
	console.log(server.address());
}

var server=app.listen(port, listen);
