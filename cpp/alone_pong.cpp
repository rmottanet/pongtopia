#include <SFML/Graphics.hpp>
#include <SFML/Window/Event.hpp>
#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    sf::RenderWindow window(sf::VideoMode(400, 500), "Alone Pong");
    sf::Clock clock;

    // Configurações do jogo
    std::srand(static_cast<unsigned int>(std::time(nullptr)));
	float ballSpeedX = (std::rand() % 4 == 0) ? 2.0f : -2.0f;
	float ballSpeedY = (std::rand() % 4 == 0) ? 2.0f : -2.0f;

    const float paddleWidth = 60.0f;
    const float paddleHeight = 5.0f;
    float paddleX = (window.getSize().x - paddleWidth) / 2.0f;

    const float ballSize = 5.0f;
    float ballX = window.getSize().x / 2.0f;
    float ballY = window.getSize().y / 2.0f;

    // Variáveis para controle das teclas de seta
    bool rightPressed = false;
    bool leftPressed = false;

    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();
            else if (event.type == sf::Event::KeyPressed) {
                if (event.key.code == sf::Keyboard::Right)
                    rightPressed = true;
                else if (event.key.code == sf::Keyboard::Left)
                    leftPressed = true;
            } else if (event.type == sf::Event::KeyReleased) {
                if (event.key.code == sf::Keyboard::Right)
                    rightPressed = false;
                else if (event.key.code == sf::Keyboard::Left)
                    leftPressed = false;
            }
        }

        float deltaTime = clock.restart().asSeconds();

        // Atualiza a posição da bola
        ballX += ballSpeedX * deltaTime * 100.0f;
        ballY += ballSpeedY * deltaTime * 100.0f;

        // Colisão com as bordas
        if (ballX + ballSize >= window.getSize().x || ballX <= 0)
            ballSpeedX = -ballSpeedX;

        if (ballY <= 0)
            ballSpeedY = -ballSpeedY;

        // Colisão com paddle
        if (ballY + ballSize >= window.getSize().y - paddleHeight && ballX >= paddleX && ballX <= paddleX + paddleWidth)
            ballSpeedY = -ballSpeedY;

        // Limita a posição do paddle
        paddleX = std::min(std::max(paddleX, 0.0f), static_cast<float>(window.getSize().x - paddleWidth));

        // Reinicia a bola se ela sair da tela
        if (ballY + ballSize >= window.getSize().y) {
            ballX = window.getSize().x / 2.0f;
            ballY = window.getSize().y / 2.0f;
            ballSpeedX = (std::rand() % 4 == 0) ? 2.0f : -2.0f;
            ballSpeedY = (std::rand() % 4 == 0) ? 2.0f : -2.0f;
        }

        // Atualiza a posição do paddle
        if (rightPressed && paddleX < window.getSize().x - paddleWidth)
            paddleX += deltaTime * 250.0f;

        if (leftPressed && paddleX > 0)
            paddleX -= deltaTime * 250.0f;

        window.clear(sf::Color::Black);

        // Desenha os elementos do jogo
        sf::RectangleShape paddle(sf::Vector2f(paddleWidth, paddleHeight));
        paddle.setPosition(paddleX, window.getSize().y - paddleHeight);
        paddle.setFillColor(sf::Color::Green);
        window.draw(paddle);

        sf::CircleShape ball(ballSize);
        ball.setPosition(ballX, ballY);
        ball.setFillColor(sf::Color::Green);
        window.draw(ball);

        window.display();
    }

    return 0;
}
