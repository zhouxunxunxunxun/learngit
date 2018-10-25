//点击开始游戏-》startPage消失-》游戏开始
//随机出现食物，三节蛇运动
//上下左右 改变方向
//判断是否吃到食物-》食物消失，蛇加一
//判断游戏结束

var startbtn = document.getElementById('startBtn');
var startp = document.getElementById('startp');
var startpage = document.getElementById('startpage');
var lose = document.getElementById('lose');
var loserscore = document.getElementById('loserscore');
var scorebox = document.getElementById('score');
var content = document.getElementById('content');
var startpage = document.getElementById('startpage');
var close = document.getElementById('close');
var startgamebool = true;
var startpaushbool = true;
var snakemove;
var speed = 200;
init();//初始化
function init(){
	//map
	this.mapw = parseInt(getComputedStyle(content).width);
	this.maph = parseInt(getComputedStyle(content).height);
	this.mapdiv = content;
	//食物
	this.foodw = 20;
	this.foodh = 20;
	this.foodx = 0;
	this.foody = 0;
	//蛇
	this.snakew = 20;
	this.snakeh = 20;
	this.snakebody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
	
	//game 
	this.direct = 'right';
	this.right = false;
	this.left = false;
	this.up = true;
	this.down = true;

	this.score = 0; 
	bindEvent();

	// startGame();
}
function startGame(){
	
	startpage.style.display = "none";
	startp.style.display = "block";
	food();
	snake();
	// snakemove = setInterval(function(){
	// 	// bindEvent();
	// 	move();
	// },speed);
	// bindEvent();
}

function food(){
	var food = document.createElement('div');
	food.style.width = this.foodw + 'px';
	food.style.height = this.foodh + 'px';
	food.style.position = 'absolute';
	this.foodx = Math.floor(Math.random()*(this.mapw/20));
	this.foody = Math.floor(Math.random()*(this.maph/20));
	food.style.left = this.foodx*20 + 'px';
	food.style.top = this.foody*20 + 'px';
	this.mapdiv.appendChild(food).setAttribute('class','food');

}

function snake(){
	for(var i = 0;i < this.snakebody.length;i++){
		var snake = document.createElement('div');
		snake.style.width = this.snakew + 'px';
		snake.style.height = this.snakeh + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakebody[i][0] * 20 + 'px';
		snake.style.top = this.snakebody[i][1] * 20 + 'px';
		snake.classList.add(this.snakebody[i][2]);
		this.mapdiv.appendChild(snake).classList.add('snake');
		switch(this.direct){
		case 'right':
		break;
		case 'up':
		snake.style.transform = 'rotate(270deg)';
		break;
		case 'left':
		snake.style.transform = 'rotate(180deg)';
		break;
		case 'down':
		snake.style.transform = 'rotate(90deg)';
		break;
		default:
		break;
		}
	}

}

function move(){
	// bindEvent();
	for(var i = this.snakebody.length-1;i>0;i--){
		this.snakebody[i][0] = this.snakebody[i-1][0];
		this.snakebody[i][1] = this.snakebody[i-1][1];
	}
	switch(this.direct){
		case 'right':
		this.snakebody[0][0] +=1;
		break;
		case 'up':
		this.snakebody[0][1] -=1;
		break;
		case 'left':
		this.snakebody[0][0] -=1;
		break;
		case 'down':
		this.snakebody[0][1] +=1;
		break;
		default:
		break;
	}
	removeClass('snake');
	snake();
	if(this.snakebody[0][0] == this.foodx && this.snakebody[0][1] == this.foody){
		var snakeEndx = this.snakebody[this.snakebody.length - 1][0];
		var snakeEndy = this.snakebody[this.snakebody.length - 1][1];
		switch(this.direct){
		case 'right':
		this.snakebody.push([snakeEndx + 1,snakeEndy,'body']);
		break;
		case 'up':
		this.snakebody.push([snakeEndx,snakeEndy - 1,'body']);
		break;
		case 'left':
		this.snakebody.push([snakeEndx - 1,snakeEndy,'body']);
		break;
		case 'down':
		this.snakebody.push([snakeEndx,snakeEndy + 1,'body']);
		break;
		default:
		break;
		}
		this.score += 1;
		scorebox.innerHTML = score;
		removeClass('food');
		food();
	}
	if(this.snakebody[0][0] < 0 || this.snakebody[0][0] >= this.mapw/20){
		reloadgame();
	}
	if(this.snakebody[0][1] < 0 || this.snakebody[0][1] >= this.maph/20){
		reloadgame();

	}
	var snakehx = this.snakebody[0][0];
	var snakehy = this.snakebody[0][1];
	for(var i = 1;i < this.snakebody.length;i++){
		if(snakehx == snakebody[i][0] && snakehy == snakebody[i][1]){
			reloadgame();
		}
	}

}
function reloadgame(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakemove);
	this.snakebody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
	
	//game 
	this.direct = 'right';
	this.right = false;
	this.left = false;
	this.up = true;
	this.down = true;

	// this.score = 0; 
	lose.style.display = "block";
	loserscore.innerHTML = this.score;
	this.score = 0;
	scorebox.innerHTML = this.score;
	startgamebool = true;
	startpaushbool = true;
	startp.setAttribute('src','img/start.png');
}
function removeClass(className){
	var elem = document.getElementsByClassName(className);
	while(elem.length > 0){
		elem[0].parentNode.removeChild(elem[0]);
	}
}
function setDerict(code){
	switch(code){
		case 37:
		if(this.left){
			// console.log(456);
			this.direct = 'left';
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
		}
		break;
		case 38:
		if(this.up){
			// console.log(456);
			this.direct = 'up';
			this.left = true;
			this.right = true;
			this.up = false;
			this.down = false;
		}
		break;
		case 39:
		if(this.right){
			// console.log(456);
			this.direct = 'right';
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
		}
		break;
		case 40:
		if(this.down){
			// console.log(456);
			this.direct = 'down';
			this.left = true;
			this.right = true;
			this.up = false;
			this.down = false;
		}
		break;
		default:
		break;
	}
	return this.direct;
}
function bindEvent(){
	document.onkeydown = function(e){
		// console.log(123);
		var code = e.keyCode;
		// alert(code);
		setDerict(code);
	}
	close.onclick = function(){
		// startandpush();
		lose.style.display = "none";
		// startandpaush()
		// startpage.style.display = "block";
	}
	startbtn.onclick = function(){
		alert(123);
		startandpaush();
	}
	startp.onclick = function(){
		startandpaush();
	}

}

function startandpaush(){
	if(startpaushbool){
		if(startgamebool){
			startGame();
			startgamebool = false;
		}
		startp.setAttribute('src','img/pause.png');
		document.onkeydown = function(e){
			// console.log(123);
			var code = e.keyCode;
			// alert(code);
			setDerict(code);
		}
		snakemove = setInterval(function(){
		// bindEvent();
		move();
		},speed);
		startpaushbool = false;
	}
	else{
		startp.setAttribute('src','img/start.png');
		clearInterval(snakemove);
		document.onkeydown = function(e){
			e.returnValue = false;
			return false;
		}
		startpaushbool = true;
	}
}









