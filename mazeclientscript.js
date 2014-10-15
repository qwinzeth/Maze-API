function getMaze(){
	$.get('/api/maze?id='+$('#txtMazeID').val(), getMazeCompleted);
}

function getMazeCompleted(data){
	$('#divMaze').html('<div style="position: absolute; left: '+data[0].x1+'px; top: '+data[0].y1+'px; width: '+(data[0].x2-data[0].x1)+'px; height: '+(data[0].y2-data[0].y1)+'px;border: 1px solid black; background-color: '+data[0].color+'">'+data[0].id+'</div>');
}

function documentReady(){
	$('#btnGetMaze').click(getMaze);
}

$(documentReady);
