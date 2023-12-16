const canvas = document.getElementById('canvasPong');
const ctx = canvas.getContext('2d');

let player1UpPressed = false;
let player1DownPressed = false;
let player2UpPressed = false;
let player2DownPressed = false;

let player1Score = 0;
let player2Score = 0;

// Configuração inicial
function ballSpeed() {
    return Math.floor(Math.random() * (3 - 1)) + 1;
}

const paddleWidth = 2;
const paddleHeight = 40;
const ballSize = 3;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = ballSpeed();
let ballSpeedY = ballSpeed();

function drawRect(x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

function drawNet() {
	for (let i = 0; i < canvas.height; i += 20) {
		drawRect(canvas.width / 2 - 1, i, 1, 10, 'green');
	}
}

function drawGame() {
	// Limpa o canvas
	drawRect(0, 0, canvas.width, canvas.height, 'black');

	// Desenha a rede
	drawNet();

	// Desenha as paddles e a bola
	drawRect(0, paddle1Y, paddleWidth, paddleHeight, 'green');
	drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'green');
	drawCircle(ballX, ballY, ballSize, 'green');
	
    // Desenha o placar
    ctx.fillStyle = 'green';
    ctx.font = '15px "VT323", monospace';
    ctx.fillText(player1Score + ' - ' + player2Score, canvas.width / 2 - 15, 15);
}

function movePaddle(evt) {
	const mousePos = calculateMousePos(evt);
	paddle1Y = mousePos.y - paddleHeight / 2;
}

function calculateMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	const root = document.documentElement;
	const mouseX = evt.clientX - rect.left - root.scrollLeft;
	const mouseY = evt.clientY - rect.top - root.scrollTop;
	return { x: mouseX, y: mouseY };
}

function updateGame() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Colisão com a parte superior e inferior
	if (ballY < 0 || ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

	// Colisão com paddles
	if (
		ballX < paddleWidth &&
		ballY > paddle1Y &&
		ballY < paddle1Y + paddleHeight
	) {
		ballSpeedX = -ballSpeedX;
	}

	if (
		ballX > canvas.width - paddleWidth &&
		ballY > paddle2Y &&
		ballY < paddle2Y + paddleHeight
	) {
		ballSpeedX = -ballSpeedX;
	}

	// Placar e saque
	if (ballX < 0) {
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		ballSpeedX = ballSpeed() * -1;
		ballSpeedY = ballSpeed() * -1;
		player2Score += 1;
	} else if (ballX > canvas.width) {
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		ballSpeedX = ballSpeed();
		ballSpeedY = ballSpeed();
		player1Score += 1;		
	}
}

// Ajuste as posições dos paddles
function updatePaddlePositions() {
    if (player1UpPressed && paddle1Y > 0) {
        paddle1Y -= 5; // Ajuste de velocidade
    }
    if (player1DownPressed && paddle1Y + paddleHeight < canvas.height) {
        paddle1Y += 5; 
    }
    if (player2UpPressed && paddle2Y > 0) {
        paddle2Y -= 5; 
    }
    if (player2DownPressed && paddle2Y + paddleHeight < canvas.height) {
        paddle2Y += 5; 
    }
}

// Event listener para keydown (tecla pressionada)
document.addEventListener('keydown', function (event) {
    if (event.key === 'w' || event.key === 'W') {
        player1UpPressed = true;
    } else if (event.key === 's' || event.key === 'S') {
        player1DownPressed = true;
    } else if (event.key === 'o' || event.key === 'O') {
        player2UpPressed = true;
    } else if (event.key === 'l' || event.key === 'L') {
        player2DownPressed = true;
    }
});

// Event listener para keyup (tecla liberada)
document.addEventListener('keyup', function (event) {
    if (event.key === 'w' || event.key === 'W') {
        player1UpPressed = false;
    } else if (event.key === 's' || event.key === 'S') {
        player1DownPressed = false;
    } else if (event.key === 'o' || event.key === 'O') {
        player2UpPressed = false;
    } else if (event.key === 'l' || event.key === 'L') {
        player2DownPressed = false;
    }
});

function gameLoop() {
    drawGame();
    updateGame();
    updatePaddlePositions();
    requestAnimationFrame(gameLoop);
}


gameLoop();
