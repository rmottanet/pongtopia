import pygame
import random

# Inicialização do Pygame
pygame.init()

# Configurações da janela do jogo
largura, altura = 800, 600
janela = pygame.display.set_mode((largura, altura))
pygame.display.set_caption("Pong")

# Cores
preto = (0, 0, 0)
verde = (51, 255, 0)

# Raquetes
raquete_largura = 10
raquete_altura = 100
raquete_jogador1_x = 20
raquete_jogador2_x = largura - 20 - raquete_largura
raquete_jogador1_y = altura // 2 - raquete_altura // 2
raquete_jogador2_y = altura // 2 - raquete_altura // 2
raquete_velocidade = 0.5

# Bola
bola_tamanho = 20
bola_x = largura // 2 - bola_tamanho // 2
bola_y = altura // 2 - bola_tamanho // 2
bola_velocidade_x = random.choice((-0.5, -0.2))
bola_velocidade_y = random.choice((-0.5, -0.2))

# Pontuação
pontos_jogador1 = 0
pontos_jogador2 = 0
fonte = pygame.font.Font(None, 36)

# Loop do jogo
running = True
while running:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            running = False

    # Controle das barras dos jogadores
    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_w] and raquete_jogador1_y > 0:
        raquete_jogador1_y -= raquete_velocidade
    if teclas[pygame.K_s] and raquete_jogador1_y < altura - raquete_altura:
        raquete_jogador1_y += raquete_velocidade
    if teclas[pygame.K_o] and raquete_jogador2_y > 0:
        raquete_jogador2_y -= raquete_velocidade
    if teclas[pygame.K_l] and raquete_jogador2_y < altura - raquete_altura:
        raquete_jogador2_y += raquete_velocidade

    # Movimento da bola
    bola_x += bola_velocidade_x
    bola_y += bola_velocidade_y

    # Colisão com as paredes superior e inferior
    if bola_y <= 0 or bola_y >= altura - bola_tamanho:
        bola_velocidade_y = -bola_velocidade_y

    # Colisão com as raquetes
    if (
        raquete_jogador1_x + raquete_largura >= bola_x >= raquete_jogador1_x
        and raquete_jogador1_y + raquete_altura >= bola_y >= raquete_jogador1_y
    ):
        bola_velocidade_x = -bola_velocidade_x

    if (
        raquete_jogador2_x - bola_tamanho <= bola_x <= raquete_jogador2_x
        and raquete_jogador2_y + raquete_altura >= bola_y >= raquete_jogador2_y
    ):
        bola_velocidade_x = -bola_velocidade_x

    # Verifica se a bola saiu da tela
    if bola_x >= largura:
        pontos_jogador1 += 1
        bola_x = largura // 2 - bola_tamanho // 2
        bola_y = altura // 2 - bola_tamanho // 2
        bola_velocidade_x = random.choice((-0.5, -0.2)) * -1
        bola_velocidade_y = random.choice((-0.5, -0.2)) * -1
    
    elif bola_x <= 0:
        pontos_jogador2 += 1
        bola_x = largura // 2 - bola_tamanho // 2
        bola_y = altura // 2 - bola_tamanho // 2
        bola_velocidade_x = random.choice((-0.5, -0.2))
        bola_velocidade_y = random.choice((-0.5, -0.2))

    # Verifica se alguém venceu (10 pontos)
    if pontos_jogador1 >= 10 or pontos_jogador2 >= 10:
        running = False

    # Limpa a tela
    janela.fill(preto)

    # Desenha as raquetes
    pygame.draw.rect(janela, verde, (raquete_jogador1_x, raquete_jogador1_y, raquete_largura, raquete_altura))
    pygame.draw.rect(janela, verde, (raquete_jogador2_x, raquete_jogador2_y, raquete_largura, raquete_altura))

    # Desenha a bola
    pygame.draw.ellipse(janela, verde, (bola_x, bola_y, bola_tamanho, bola_tamanho))

# Desenha a pontuação
    pontuacao = fonte.render(f"{pontos_jogador1} - {pontos_jogador2}", True, verde)
    janela.blit(pontuacao, (largura // 2 - pontuacao.get_width() // 2, 30))

    pygame.display.update()

# Encerramento do Pygame
pygame.quit()
