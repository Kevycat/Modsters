var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var tileWidth = canvas.width / 32 - 1
var tileHeight = canvas.height / 14 - 1

var x = 0, y = 0;

var images = [];

var keys = [];

var zombies = [];

function zombie(x, y){
	this.x = x;
	this.y = y;
}

zombies[0] = new zombie(1, 1);

var chunk = new Array(256);
chunk.fill("grass");

function registerImage(name){
	images[name] = new Image();
	images[name].src = name + ".png";
}

document.addEventListener("keydown", function(event){
	keys[event.code] = true;
});

document.addEventListener("keyup", function(event){
	keys[event.code] = false;
});

registerImage("grass");
registerImage("Person");
registerImage("Zombie");

var loadInterval = setInterval(function(){
	for(var image in images){
		if(!images[image].complete){
			return;
		}
	}
	clearInterval(loadInterval);
	setInterval(draw, 25);
}, 10);

function draw(){
	if(keys["KeyW"]){
		y -= 1 / 24;
	}
	if(keys["KeyA"]){
		x -= 1 / 24;
	}
	if(keys["KeyS"]){
		y += 1 / 24;
	}
	if(keys["KeyD"]){
		x += 1 / 24;
	}
	
	ctx.fillStyle = "rgb(0, 128, 256";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < 16; i++){
	    for(var j = 0; j < 16; j++){
	        ctx.drawImage(images[chunk[i + 16 * j]], 32 * i - 14 * j - x * 24 + y * 24 + canvas.width / 2 - 12, 14 * j - y * 24 + canvas.height / 2, 48, 48);
        }
    }
	
	for(var zombie in zombies){
		console.log(zombies[zombie].x);
		ctx.drawImage(images["Zombie"], 24 * zombies[zombie].x - 24 * zombies[zombie].y - x * 24 + y * 24 + canvas.width / 2 - 24, 24 * zombies[zombie].y - y * 24 + canvas.height / 2 - 48, 48, 48);
	    if(zombies[zombie].x < x){
			zombies[zombie].x += 0.01
		}
		if(zombies[zombie].x > x){
			zombies[zombie].x -= 0.01
		}
		if(zombies[zombie].y < y){
			zombies[zombie].y += 0.01
		}
		if(zombies[zombie].y > y){
			zombies[zombie].y -= 0.01
		}
	}
	
	ctx.drawImage(images["Person"], canvas.width / 2 - 24, canvas.height / 2 - 48, 48, 48);
}