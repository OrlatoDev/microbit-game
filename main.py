def on_button_pressed_a():
    move(-1, basket)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    move(1, basket)
input.on_button_pressed(Button.B, on_button_pressed_b)

def move(num: number, sprite: game.LedSprite):
    sprite.move(num)
def createApple(x: number, y: number):
    return game.create_sprite(x, y)
basket: game.LedSprite = None
i = 0
basket = game.create_sprite(2, 4)
game.set_score(0)
basic.pause(1000)

def on_forever():
    global i
    i += 1
    apple = createApple(randint(0, 5), 0)
    basic.pause(100)
    apple.turn_right(90)
    apple.move(i)
    basic.pause(3000)
basic.forever(on_forever)
