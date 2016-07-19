'use strict';

var canvas = document.querySelector('#board');
var is_paint = false;
var width = 500;
var height = 500;
var mycolor = '#0000FF';
var othercolor = '#58FAAC';

function messageHandler(content) {
    var message = content.message;
    console.log(message);
    var json = JSON.parse(message);
    redraw(json.x*width,json.y*height,json.point,othercolor);
}

function redraw(x,y,point,color){

    context.strokeStyle = color;
    context.lineJoin = "round";
    context.lineWidth = 8;

    switch (point){
        case 'start point':
            context.beginPath();
            context.moveTo(x,y);
            break;
        case 'middle point':
            context.lineTo(x,y);
            context.stroke();
            break;
        case 'end point':
            context.stroke();
            break;
    }

}

function pointdraw(x,y,point) {
    redraw(x,y,point,mycolor);

    var packet =
    {
        point   :point,
        x       :x/width,
        y       :y/height,
        pointNum:0,
        lineNum :0
    };

    boardCoast(JSON.stringify(packet));
    
}
$('#board').mousedown(function(e){
    is_paint = true;
    pointdraw(e.offsetX,e.offsetY,'start point');
});

$('#board').mousemove(function(e){
    if(is_paint){
        pointdraw(e.offsetX,e.offsetY,'middle point');
    }
});


$('#board').mouseup(function(e){
    is_paint = false;
    pointdraw(e.offsetX,e.offsetY,'end point');
});


