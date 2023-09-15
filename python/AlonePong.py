import pygame
import random

# Inicialização do Pygame
pygame.init()

# Configurações da janela do jogo
largura, altura = 600, 800
janela = pygame.display.set_mode((largura, altura))
pygame.display.set_caption("Alone Pong")

# Cores
preto = (0, 0, 0)
verde = (0, 255, 0)

# Bola
bola_tamanho = 20
bola_x = largura // 2 - bola_tamanho // 2
bola_y = altura // 2 - bola_tamanho // 2
bola_velocidade_x = random.choice([-0.1, -0.3]) * 2
bola_velocidade_y = random.choice([-0.1, -0.3]) * 2

# Barra do jogador
barra_largura = 100
barra_altura = 10
barra_x = largura // 2 - barra_largura // 2
barra_y = altura - 30
barra_velocidade = 1

# Loop do jogo
running = True
while running:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            running = False

    # Controle da barra do jogador
    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_LEFT] and barra_x > 0:
        barra_x -= barra_velocidade
    if teclas[pygame.K_RIGHT] and barra_x < largura - barra_largura:
        barra_x += barra_velocidade

    # Movimento da bola
    bola_x += bola_velocidade_x
    bola_y += bola_velocidade_y

    # Colisão com as paredes e a barra
    if bola_x <= 0 or bola_x >= largura - bola_tamanho:
        bola_velocidade_x = -bola_velocidade_x

    if bola_y <= 0:
        bola_velocidade_y = -bola_velocidade_y

    if (
        barra_y <= bola_y + bola_tamanho <= barra_y + barra_altura
        and barra_x <= bola_x <= barra_x + barra_largura
    ):
        bola_velocidade_y = -bola_velocidade_y

    # Verifica se a bola caiu
    if bola_y >= altura:
        bola_x = largura // 2 - bola_tamanho // 2
        bola_y = altura // 2 - bola_tamanho // 2
        bola_velocidade_x = random.choice([-0.1, -0.3]) * 2
        bola_velocidade_y = random.choice([-0.1, -0.3]) * 2

    # Limpa a tela
    janela.fill(preto)

    # Desenha a bola
    pygame.draw.ellipse(janela, verde, (bola_x, bola_y, bola_tamanho, bola_tamanho))

    # Desenha a barra do jogador
    pygame.draw.rect(janela, verde, (barra_x, barra_y, barra_largura, barra_altura))

    pygame.display.update()

# Encerramento do Pygame
pygame.quit()
