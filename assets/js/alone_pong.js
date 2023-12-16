const canvas = document.getElementById('canvasAlonePong');
const ctx = canvas.getContext('2d');

// Configurações do jogo
function ballSpeed() {
    return Math.floor(Math.random() * (3 - 1)) + 1;
}

const paddleWidth = 40;
const paddleHeight = 2;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballSize = 3;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = ballSpeed();
let ballSpeedY = ballSpeed();

// Variáveis para controle das teclas de seta e eventos de toque
let rightPressed = false;
let leftPressed = false;
let touchX = null; // Armazena a posição X do toque

// Função para desenhar um retângulo
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Função para desenhar um círculo
function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// Função para desenhar o jogo
function drawGame() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 'green');
    drawCircle(ballX, ballY, ballSize, 'green');
}

// Função para atualizar o jogo
function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballSize >= canvas.width || ballX <= 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballY + ballSize >= canvas.height - paddleHeight && ballX >= paddleX && ballX <= paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
    }

    paddleX = Math.min(Math.max(paddleX, 0), canvas.width - paddleWidth);

    if (ballY + ballSize >= canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = ballSpeed();
        ballSpeedY = ballSpeed();
    }
}

// Função para atualizar a posição da barra do jogador com base nas teclas de seta
function updatePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5; // Ajuste a velocidade de movimento da barra aqui
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5; // Ajuste a velocidade de movimento da barra aqui
    }
}

// Event listener para keydown (tecla pressionada)
document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowRight') {
        rightPressed = true;
    } else if (event.code === 'ArrowLeft') {
        leftPressed = true;
    }
});

// Event listener para keyup (tecla liberada)
document.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowRight') {
        rightPressed = false;
    } else if (event.code === 'ArrowLeft') {
        leftPressed = false;
    }
});

// Event listener para touchstart (toque na tela)
canvas.addEventListener('touchstart', function(event) {
    touchX = event.touches[0].clientX; // Armazena a posição X do toque
});

// Event listener para touchmove (movimento do toque na tela)
canvas.addEventListener('touchmove', function(event) {
    if (touchX !== null) {
        const newTouchX = event.touches[0].clientX;
        const touchDelta = newTouchX - touchX;

        if (touchDelta > 0) {
            rightPressed = true;
            leftPressed = false;
        } else if (touchDelta < 0) {
            rightPressed = false;
            leftPressed = true;
        }
    }
    touchX = event.touches[0].clientX; // Atualiza a posição X do toque
});

// Event listener para touchend (liberação do toque na tela)
canvas.addEventListener('touchend', function(event) {
    touchX = null; // Reseta a posição X do toque
    rightPressed = false;
    leftPressed = false;
});

// Função para o loop do jogo
function gameLoop() {
    drawGame();
    updateGame();
    updatePaddle(); // Atualiza a posição da barra do jogador
    requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();
