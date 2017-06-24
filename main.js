// Given list of coordinates of pencil, line, eraser, along with timestamp
// it should be able to draw the shapes.

// constants section
var LINE_WIDTH = 10;
var PENCIL = "PENCIL";
var LINE = "LINE";

// TODO: take care of eraser
function draw(dataList){
    for(var i=1; i<dataList.length; i++){
        var data = dataList[i];
        var type = data.type;
        var points = data.points;
        ctx.beginPath();
        var startPoint = points[0];
        ctx.moveTo(startPoint.x, startPoint.y);
        for(var j=1; j<points.length; j++){
            var currentPoint = points[j];
            if(type === LINE){
                if(j%2 === 0){
                    ctx.lineTo(currentPoint.x, currentPoint.y);
                    ctx.stroke();
                } else {
                    ctx.moveTo(currentPoint.x, currentPoint.y);
                }
            } else if(type === PENCIL){
                ctx.lineTo(currentPoint.x, currentPoint.y);
                ctx.stroke();
                ctx.moveTo(currentPoint.x, currentPoint.y);                
            }
        }
    }
}

var data = [];
var prevType = PENCIL;

function listen(e){
    var x = e.pageX;
    var y = e.pageY;
    console.log("listening data" + e.x + " " + e.y);
    data.push({
        "x": x,
        "y": y
    });
}

function pushData(dataList, type){
    dataList.push({
        "points": data,
        "type": type
    });
    data = [];
    draw(dataList);
}

function record(type, dataList){
    console.log("recording started..");
    pushData(dataList, prevType);
    if(type === PENCIL){
        console.log("listening to pencil");
        // record on every mouse move
        window.removeEventListener("mousedown", listen, false);
        window.removeEventListener("mouseup", listen, false);
        window.addEventListener("mousemove", listen, false);
    } else if(type === LINE){
        // record only on mouse down and release
        window.removeEventListener("mousemove", listen, false);
        window.addEventListener("mousedown", listen, false);
        window.addEventListener("mouseup", listen, false);
    }
    prevType = type;
}

var dataList = [];
document.body.innerHTML = '<canvas id="myCanvas"></canvas>';
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.lineWidth=LINE_WIDTH;
record(PENCIL, dataList);
