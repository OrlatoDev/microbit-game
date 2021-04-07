/*
define a função "move" que recebe tais parâmetros:
- num (valor numérico)
- sprite (uma instância de sprite)
- orientation (valor numérico)

a função seta a orientação com base no valor recebido,
e move o sprite um "tanto de vezes", que ambos foram
passados como parâmetro 
*/
function move(num: number, sprite: game.LedSprite, orientation: number) {
    sprite.setDirection(orientation)
    sprite.move(num)
}

/*
define a função "createSprite" que recebe tais parâmetros:
- x (valor numérico)
- y (valor numérico)

depois retorna uma instância de sprite criado nas tais
posições equivalentes aos valores parametrais
*/
function createSprite(x: number, y: number) {
    return game.createSprite(x, y)
}

/*
Curiosidade: em JS (abreviação de JavaScript, que também é diferente de Java), 
há 3 formas de se declarar "variáveis", porém pelo o que testei, o micro:bit só
permite utilizar 2 delas (o let e o const)

as 3 palavras reservadas/jeitos de se criar uma variável
e o que são:

- var (Jeito padrão de se declarar uma variável, acaba
sendo o mais "óbvio" e fácil de lembrar. Há algumas regras:
quando se cria uma variável com a palavra var, o escopo da
variável pode ser global, ou local, ou seja, se eu declarar
uma variável no início do programa, e fora de
qualquer escopo de função, laços de repetição, etc, 
eu posso utilizá-la tanto dentro
de uma função tanto fora (escopo global), 
se eu declarar ela dentro de uma
função, só poderei utilizá-la dentro dessa função (escopo local e "escopado por função").
Também podemos "atualizar" e redeclarar o valor da variável, há uma outra
questão sobre atribuir valores depois de chamar a variável e resultar
em "undefined" na chamada, mas não vou entrar em detalhes)

- let (Parecido com var, porém o let é "escopado por bloco" (o escopo
é definido pelas {} ), então eu posso declarar uma variável com let
fora de qualquer função ou etc, e declarar uma dentro de alguma função,
e elas terão valores diferentes por mais que eu usasse o mesmo nome (e um
erro é retornado ("is not defined") se eu tentar usar uma variável de
escopo local em outro escopo local ou global, ou se eu tentar 
usar uma variável por exemplo dentro de um "for" que está dentro de uma
função na mesma função porém fora do laço "for")), também
não é possível redeclarar a variável mas é possível "atualizar", também
não vou entrar em detalhes quanto a diferença entre os dois termos.

- const (O nome já diz muito, é uma constante, ou seja, não permite a "atualização"
de valores e nem a redeclaração, a maioria do resto das regras são iguais à let)

Se quiser uma explicação melhor: https://medium.com/swlh/the-difference-of-var-vs-let-vs-const-in-javascript-abe37e214d66



cria uma variável chamada "resets" 
e atribui a ela o valor 0
*/
let resets = 0
/*
define a função "resetSpritePosition", que já se auto-explica,
ela reseta (ou seja, "seta de novo") a posição de um sprite, 
no qual é passado pelo parâmetro "sprite",
junto com os parâmetros "x" e "y", e adiciona 1 à variável "resets"
*/
function resetSpritePosition(sprite: game.LedSprite, x: number, y: number){
    sprite.setY(y)
    sprite.setX(x)
    resets += 1
}

//função só pra "organizar" melhor o código, encurtei toda a "introduçaõ" nessa função
function gameIntro(){
    game.setScore(0)
    basic.showString("APPLE GAME")
    basic.showString("Go!")
    basic.pause(100)
    basic.clearScreen()
}

//cria um sprite pra cesta e um pra maçã utilizando aquela função "createSprite"
let basket = createSprite(2, 4)
/*obs: o valor que é passado ao parâmetro "x" é aleatório entre números inteiros
de 0 a 5, ou seja, possíveis valores: 0, 1, 2, 3, 4 (o 5 não entra, pois só é permitido
valores < que 5, e não <= que 5)*/
let apple = createSprite(randint(0, 5), 0)

/*
movimenta as cestas pros lados conforme os botões são clicados,
observe que a orientação é 90, pois queremos movimentar de forma horizontal,
e se a orientação fosse 0, a movimentação iria ser vertical (não consigo explicar
direito sem uma forma de "ilustrar" kkkk, mas é basicamente isso)
*/
input.onButtonPressed(Button.A, function () {
    move(-1, basket, 90)
})
input.onButtonPressed(Button.B, function () {
    move(1, basket, 90)
})

//chama a função que executa a introdução do jogo
gameIntro()

//função que é repetida constantemente
basic.forever(function() {
    //pause de 250 milésimos
    basic.pause(250)
    /*movimenta a maçã pra baixo (coloquei orientação de 180 graus
    pra não ter que por exemplo utilizar uma orientação de 0 graus porém
    com o valor negativo, tipo, -1)*/
    move(1, apple, 180)
    /*se a maçã estiver tocando a cesta (não é necessário comparar o 
    retorno booleano ("true" ou "false") da função isTouching com "true" por exemplo, 
    porque quando o valor que a função retorna
    já é "true", ele entra direto no "if"), um ponto é adicionado, é emitido um som
    (só toca a nota Dó na quinta oitava), e reseta a posição da maçã (optei por não gerar
    várias maças diferentes, e sim sempre usar uma mesma maçã porém mudando-a de posição.
    Porque? Primeiro porque achei mais prático e segundo que em tese, isso gasta menos recurso
    de processamento e memória (por mais que não iria mudar muito porque estamos em uma pequena escala), 
    porque não vai ter vários sprites e não há a possibilidade de acidentalmente
    ter sprites gerados e armazenados na memória que não estão visíveis)*/
    if(apple.isTouching(basket)){
        game.addScore(1)
        music.playTone(Note.C5, music.beat())
        resetSpritePosition(apple, randint(0, 5), 0)
    }

    //se a maçã chegar ao fim da tela, uma outra nota é tocada (Fa na quarta oitava) e a posição da maçã é resetada
    if(apple.get(LedSpriteProperty.Y) === 4){
        music.playTone(Note.F4, music.beat())
        resetSpritePosition(apple, randint(0, 5), 0)
    }

    //quando houver 10 "jogadas", porque a cada "jogada" a maçã é resetada
    if(resets === 10){
        //se a pessoa pegar todas as maçãs toca uma melodia, mostra que ela ganhou e a pontuação é apresentada
        if(game.score() === 10){
            game.pause()
            basic.clearScreen()
            music.playTone(Note.Bb3, music.beat())
            music.playTone(Note.D4, music.beat())
            music.playTone(Note.G4, music.beat())
            basic.showString("You Win!")
            game.showScore()
        }
        //se não, toca uma melodia diferente e mostra a tela de gameover mostrando também a pontuação
        else{
            game.pause()
            basic.clearScreen()
            music.playTone(Note.CSharp3, music.beat())
            music.playTone(Note.Bb, music.beat())
            music.playTone(Note.E, music.beat())
            game.gameOver()
        }
    }
})
