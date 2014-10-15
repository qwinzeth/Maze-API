var express=require('express');
var app=express();

function defaultRoute(req, res){
	res.send('Hello World!');
}

app.get('/', defaultRoute);

function listen(){
	console.log(server.address());
}

var server=app.listen(20756, listen);
