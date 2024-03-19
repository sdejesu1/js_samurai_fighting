const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
// 16 by 9 ratio for width & height
canvas.width = 1024
canvas.height = 576
// making the canvas a black color
c.fillRect(0, 0, canvas.width, canvas.height)
// gravity constant for velocity
const gravity = .7

const player = new Fighter({
    position:{x: 200, y: 0},
    velocity: {x: 0, y: 0},
    imageSrc: "./edo_assets/Luffy/Idle.png",
    framesMax: 7,
    scale: 2.2,
    offset: {x: 100, y: 55},
    sprites: {
        idle: {
            imageSrc: "./edo_assets/Luffy/Idle.png",
            framesMax: 7
        },
        run: {
            imageSrc: "./edo_assets/Luffy/Run.png",
            framesMax: 6
        },
        jump: {
            imageSrc: "./edo_assets/Luffy/Jump.png",
            framesMax: 6
        },
        fall: {
            imageSrc: "./edo_assets/Luffy/Fall.png",
            framesMax: 5
        },
        attack1: {
            imageSrc: "./edo_assets/Luffy/Attack1.png",
            framesMax: 10
        },
        takeHit: {
            imageSrc: "./edo_assets/Luffy/Take Hit.png",
            framesMax: 7
        },
        death: {
            imageSrc: "./edo_assets/Luffy/Death.png",
            framesMax: 4
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: 60
        },
        width: 155,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },


    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

// game states
/**
// Define game states
const GameState = {
    Start: false,
    SelectPlayer: false,
    SelectEnemy: false,
    Cinematic: false,
    Fight: false,
    RematchOrQuit: false
};

// Current state of the game
let currentState = GameState.Fight;

// Function to update the game based on the current state
function updateGameState() {
    switch(currentState) {
        case GameState.Start:
            // Logic for the start state
            document.querySelector('#healthBar').style.display = 'none'
            break;
        case GameState.SelectPlayer:
            // Logic for selecting player character
            break;
        case GameState.SelectEnemy:
            // Logic for selecting enemy character
            break;
        case GameState.Cinematic:
            // Logic for cinematic
            break;
        case GameState.Fight:
            // Logic for fight
            document.querySelector('#healthBar').style.display = 'flex'
            break;
        case GameState.RematchOrQuit:
            // Logic for rematch or quit
            break;
        default:
            // Handle invalid state
            break;
    }
}

// Example function to change game state

// Call updateGameState() to handle initial state
updateGameState();
*/


// animation loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.2)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    if (player.isReversed) {
        player.attackBox.position.x += -3 * player.attackBox.offset.x
    }
    if (enemy.isReversed) {
        enemy.attackBox.position.x += -1 * enemy.attackBox.offset.x + 70
    }

    // testing the attack boxes
    //c.fillRect(player.attackBox.position.x, player.attackBox.position.y, player.attackBox.width, player.attackBox.height)
    //c.fillRect(enemy.attackBox.position.x, enemy.attackBox.position.y, enemy.attackBox.width, enemy.attackBox.height)

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        if (player.velocity.y === 0){
            player.switchSprite('runRev')
        }
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        if (player.velocity.y === 0){
            player.switchSprite('run')
        }
    } else {
        if (player.isReversed) {
            player.switchSprite('idleRev')
            console.log('idleRev')
        } else {
            player.switchSprite('idle')
            console.log('idle')
        }
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        if (enemy.velocity.y === 0){
            enemy.switchSprite('run')
        }
        console.log('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        if (enemy.velocity.y === 0){
            enemy.switchSprite('runRev')
        }
        console.log('runRev')
    } else if (enemy.velocity.y === 0) {
        if (enemy.isReversed) {
            enemy.switchSprite('idleRev')
            console.log('idleRev')
        } else {
            enemy.switchSprite('idle')
            console.log('idle')
        }
    }

    // player jumping and reversing
    if (player.isReversed) {
        // enemy jumping and reversing
        if (player.velocity.y < 0) {
            player.switchSprite('jumpRev')
            console.log('jumpRev')
        } else if (player.velocity.y > 0) {
            player.switchSprite('fallRev')
            console.log('fallRev')
        }
    } else {
        if (player.velocity.y < 0) {
            player.switchSprite('jump')
            console.log('jump')
        } else if (player.velocity.y > 0) {
            player.switchSprite('fall')
            console.log('fall')
        }
    }

    // enemy jumping
    if (enemy.isReversed) {
        // enemy jumping and reversing
        if (enemy.velocity.y < 0) {
            enemy.switchSprite('jumpRev')
            console.log('jumpRev')
        } else if (enemy.velocity.y > 0) {
            enemy.switchSprite('fallRev')
            console.log('fallRev')
        }
    } else {
        if (enemy.velocity.y < 0) {
            enemy.switchSprite('jump')
            console.log('jump')
        } else if (enemy.velocity.y > 0) {
            enemy.switchSprite('fall')
            console.log('fall')
        }
    }


    // detecting for collision and enemy gets hit
    if (rectangularCollision({rectangle1: player, rectangle2: enemy})
        && player.isAttacking && (player.framesCurrent === 4)) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    if (rectangularCollision({rectangle1: enemy, rectangle2: player})
        && enemy.isAttacking && enemy.framesCurrent === 2) {
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }
    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 3) {
        enemy.isAttacking = false
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

window.addEventListener('keydown', (event) => {
    // player keys
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                player.isReversed = false
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                player.isReversed = true
                break
            case 'w':
                player.velocity.y = -20
                break
            case ' ':
                player.attack()
                break
        }
    }

    // enemy keys
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                enemy.isReversed = true
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                enemy.isReversed = false
                break
            case 'ArrowUp':
                enemy.velocity.y = -20
                break
            case 'ArrowDown':
                enemy.attack()
                break
        }
    }

})
window.addEventListener('keyup', (event) => {
    // player keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }

    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})


function gameLoop() {
    decreaseTimer()
    animate()
}

const background = createBackground('wooden_village_entrance')
const shop = createBackground('shop')


//const player = createCharacters('player')
const enemy = createCharacters('enemy')

gameLoop()