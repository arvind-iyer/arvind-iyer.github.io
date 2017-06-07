//Script for snake game

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^/&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

window.onload=function() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	console.log(ctx);
	// console.log(canvas);
	speed = getQueryParams(document.location.search).speed;
	console.log(speed);
	document.addEventListener("keydown", onKeyPress);
	if (!speed) 
		speed = 12;
	setInterval(game, 1000/speed);
}

player = {x: 10, y: 10, 
			vel: {x: 0, y: 0}, 
			trail: [], tail: 3,
			score: 0}
fruit = {x: 15, y: 15};
rows = cols = 20;

highscore = 0;
function game() {
	player.x += player.vel.x;
	player.y += player.vel.y;

	if(player.x > cols - 1) {
		player.x = 0;
	}
	if(player.x < 0) {
		player.x = cols - 1;
	}
	if(player.y > rows - 1) {
		player.y = 0;
	}
	if(player.y < 0) {
		player.y = rows - 1;
	}
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, 400, 400);

	ctx.fillStyle = "red";	
	ctx.fillRect(fruit.x * 20, fruit.y * 20, 20, 20 );	

	ctx.fillStyle = "lime";
	ctx.fillRect(player.x * 20, player.y * 20, 19, 19 );
	for (var i = player.trail.length - 1; i >= 0; i--) {
		if(player.trail[i].x == player.x && player.trail[i].y == player.y) {
			player.tail = 3;
			player.x = player.y = 10;
			player.score= 0;
			return;
		}
		ctx.fillRect(player.trail[i].x * 20, player.trail[i].y * 20, 19,19);
	}
	player.trail.push({x: player.x, y: player.y})
	if (player.trail.length > player.tail)
		player.trail = player.trail.slice(player.trail.length - player.tail);
	if(player.x == fruit.x && player.y == fruit.y) {
		player.tail++;
		player.score += +speed;
		if(player.score > highscore) {
			highscore = player.score;
		}
		fruit.x = Math.floor(Math.random() * cols);
		fruit.y = Math.floor(Math.random() * rows);
	}
	document.getElementById("score").textContent = "Score: " + player.score + "\t Highscore: " + highscore;
}

function onKeyPress(evt) {
	switch (evt.key) {
		case "ArrowLeft": {
			if(player.vel.x == 0) {
				player.vel.x = -1;
				player.vel.y = 0;
			}
			break;
		}
		case "ArrowUp": {
			if(player.vel.y == 0) {
				player.vel.x = 0;
				player.vel.y = -1;
			}
			break;
		}
		case "ArrowDown": {
			if(player.vel.y == 0) {
				player.vel.x = 0;
				player.vel.y = 1;
			}
			break;
		}
		case "ArrowRight": {
			if (player.vel.x == 0) {
				player.vel.x = 1;
				player.vel.y = 0;
			}
			break;
		}
	}  
}