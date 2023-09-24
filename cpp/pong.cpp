#include <SFML/Graphics.hpp>
#include <SFML/Window/Event.hpp>
#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    sf::RenderWindow window(sf::VideoMode(800, 600), "Pong");

    // Variáveis de jogo
    float ballRadius = 6.0f;
    sf::CircleShape ball(ballRadius);
    ball.setFillColor(sf::Color::Green);
    ball.setPosition(window.getSize().x / 2.0f - ballRadius, window.getSize().y / 2.0f - ballRadius);

    float ballSpeedX = (std::rand() % 4 == 0) ? 0.15f : -0.08f;
    float ballSpeedY = (std::rand() % 4 == 0) ? 0.15f : -0.08f;

    float paddleWidth = 5.0f;
    float paddleHeight = 60.0f;

    sf::RectangleShape paddle1(sf::Vector2f(paddleWidth, paddleHeight));
    paddle1.setFillColor(sf::Color::Green);
    paddle1.setPosition(10.0f, window.getSize().y / 2.0f - paddleHeight / 2.0f);

    sf::RectangleShape paddle2(sf::Vector2f(paddleWidth, paddleHeight));
    paddle2.setFillColor(sf::Color::Green);
    paddle2.setPosition(window.getSize().x - paddleWidth - 10.0f, window.getSize().y / 2.0f - paddleHeight / 2.0f);

    bool player1UpPressed = false;
    bool player1DownPressed = false;
    bool player2UpPressed = false;
    bool player2DownPressed = false;

    int player1Score = 0;
    int player2Score = 0;

    // Placar
    sf::Font font;
    if (!font.loadFromFile("VT323.ttf")) {
        std::cerr << "Failed to load font!" << std::endl;
        return 1;
    }

    sf::Text scoreText;
    scoreText.setFont(font);
    scoreText.setCharacterSize(30);
    scoreText.setFillColor(sf::Color::Green);

    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();
            else if (event.type == sf::Event::KeyPressed) {
                if (event.key.code == sf::Keyboard::W)
                    player1UpPressed = true;
                else if (event.key.code == sf::Keyboard::S)
                    player1DownPressed = true;
                else if (event.key.code == sf::Keyboard::O)
                    player2UpPressed = true;
                else if (event.key.code == sf::Keyboard::L)
                    player2DownPressed = true;
            } else if (event.type == sf::Event::KeyReleased) {
                if (event.key.code == sf::Keyboard::W)
                    player1UpPressed = false;
                else if (event.key.code == sf::Keyboard::S)
                    player1DownPressed = false;
                else if (event.key.code == sf::Keyboard::O)
                    player2UpPressed = false;
                else if (event.key.code == sf::Keyboard::L)
                    player2DownPressed = false;
            }
        }

        // Atualiza a posição da bola
        ball.move(ballSpeedX, ballSpeedY);

        // Colisão com as bordas
        if (ball.getPosition().x <= 0 || ball.getPosition().x + 2 * ballRadius >= window.getSize().x - paddleWidth) {
            ballSpeedX = -ballSpeedX;
        }

        // Colisão com os paddles
        if (ball.getGlobalBounds().intersects(paddle1.getGlobalBounds()) || ball.getGlobalBounds().intersects(paddle2.getGlobalBounds())) {
            ballSpeedX = -ballSpeedX;
        }

        // Verifica se a bola saiu da tela
        if (ball.getPosition().y > window.getSize().y || ball.getPosition().y < 0) {
            // Inverte a direção vertical da bola
            ballSpeedY = -ballSpeedY;
        }

        // Verifica os pontos
        if (ball.getPosition().x < 0) {
            // Ponto para o jogador 2
            player2Score++;
            ball.setPosition(window.getSize().x / 2.0f - ballRadius, window.getSize().y / 2.0f - ballRadius);
            ballSpeedX = -0.08f;
            ballSpeedY = (std::rand() % 4 == 0) ? 0.15f : -0.08f;
        } else if (ball.getPosition().x > window.getSize().x - paddleWidth - 2 * ballRadius) {
            // Ponto para o jogador 1
            player1Score++;
            ball.setPosition(window.getSize().x / 2.0f - ballRadius, window.getSize().y / 2.0f - ballRadius);
            ballSpeedX = 0.08f;
            ballSpeedY = (std::rand() % 4 == 0) ? 0.15f : -0.08f;
        }

        // Movimenta os paddles
        if (player1UpPressed && paddle1.getPosition().y > 0) {
            paddle1.move(0, -0.5f);
        }
        if (player1DownPressed && paddle1.getPosition().y + paddleHeight < window.getSize().y) {
            paddle1.move(0, 0.5f);
        }
        if (player2UpPressed && paddle2.getPosition().y > 0) {
            paddle2.move(0, -0.5f);
        }
        if (player2DownPressed && paddle2.getPosition().y + paddleHeight < window.getSize().y) {
            paddle2.move(0, 0.5f);
        }

        // Atualiza o placar
        scoreText.setString(std::to_string(player1Score) + " : " + std::to_string(player2Score));
        scoreText.setPosition(window.getSize().x / 2.0f - scoreText.getGlobalBounds().width / 2.0f, 10.0f);

        window.clear();
        window.draw(ball);
        window.draw(paddle1);
        window.draw(paddle2);
        window.draw(scoreText);
        window.display();
    }

    return 0;
}
