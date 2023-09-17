-- Inicialização do Love2D
function love.load()
    -- Configurações da janela do jogo
    largura, altura = 600, 800
    love.window.setMode(largura, altura)
    love.window.setTitle("Alone Pong")

    -- Cores
    preto = {0, 0, 0}
    verde = {0, 255, 0}

    -- Posições iniciais da bola e da barra (sem movimento)
    bola_tamanho = 20
    bola_x = largura / 2 - bola_tamanho / 2
    bola_y = altura / 2 - bola_tamanho / 2

    barra_largura = 100
    barra_altura = 10
    barra_x = largura / 2 - barra_largura / 2
    barra_y = altura - 30

    -- Velocidade da bola
    bola_velocidade_x = 200
    bola_velocidade_y = 200
end

-- Renderização do jogo
function love.draw()
    -- Limpa a tela
    love.graphics.setBackgroundColor(preto)
    love.graphics.clear()

    -- Desenha a bola
    love.graphics.setColor(verde)
    love.graphics.rectangle("fill", bola_x, bola_y, bola_tamanho, bola_tamanho)

    -- Desenha a barra do jogador
    love.graphics.rectangle("fill", barra_x, barra_y, barra_largura, barra_altura)
end

-- Atualização do jogo
function love.update(dt)
    -- Movimento da bola
    bola_x = bola_x + bola_velocidade_x * dt
    bola_y = bola_y + bola_velocidade_y * dt

    -- Controle da barra do jogador
    if love.keyboard.isDown("left") and barra_x > 0 then
        barra_x = barra_x - 200 * dt -- Velocidade da barra
    end
    if love.keyboard.isDown("right") and barra_x < largura - barra_largura then
        barra_x = barra_x + 200 * dt -- Velocidade da barra
    end

    -- Colisão com as paredes para a bola
    if bola_x <= 0 or bola_x >= largura - bola_tamanho then
        bola_velocidade_x = -bola_velocidade_x
    end

    -- Colisão com a parte superior da tela para a bola
    if bola_y <= 0 then
        bola_velocidade_y = -bola_velocidade_y
    end

    -- Colisão com a barra do jogador para a bola
    if (
        bola_y + bola_tamanho >= barra_y and
        bola_x + bola_tamanho >= barra_x and
        bola_x <= barra_x + barra_largura
    ) then
        bola_velocidade_y = -bola_velocidade_y
    end
end
