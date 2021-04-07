function move(num: number, sprite: game.LedSprite, orientation: number) {
    sprite.setDirection(orientation)
    sprite.move(num)
}
function createSprite(x: number, y: number) {
    return game.createSprite(x, y)
}

let resets = 0
function resetSpritePosition(sprite: game.LedSprite, x: number, y: number){
    sprite.setY(y)
    sprite.setX(x)
    resets += 1
}

function gameIntro(){
    game.setScore(0)
    basic.showString("APPLE GAME")
    basic.showString("Go!")
    basic.pause(100)
    basic.clearScreen()
}

let basket = createSprite(2, 4)
let apple = createSprite(randint(0, 5), 0)

input.onButtonPressed(Button.A, function () {
    move(-1, basket, 90)
})
input.onButtonPressed(Button.B, function () {
    move(1, basket, 90)
})

gameIntro()

basic.forever(function() {
    basic.pause(250)
    move(1, apple, 180)
    if(apple.isTouching(basket)){
        game.addScore(1)
        music.playTone(Note.C5, music.beat())
        resetSpritePosition(apple, randint(0, 5), 0)
    }

    if(apple.get(LedSpriteProperty.Y) === 4){
        music.playTone(Note.F4, music.beat())
        resetSpritePosition(apple, randint(0, 5), 0)
    }

    if(resets === 10){
        if(game.score() === 10){
            game.pause()
            basic.clearScreen()
            music.playTone(Note.Bb3, music.beat())
            music.playTone(Note.D4, music.beat())
            music.playTone(Note.G4, music.beat())
            basic.showString("You Win!")
            game.showScore()
        }
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
