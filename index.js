const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

// 16 by 9 ratio for width & height
canvas.width = 1024
canvas.height = 576

// making the canvas a black color
c.fillRect(0,0, canvas.width, canvas.height)

// gravity constant for velocity
const gravity = .7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./edo_assets/background.png"
})

const shop = new Sprite({
    position: {
        x: 605,
        y: 128
    },
    imageSrc: "./edo_assets/shop.png",
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position:{x: 0, y: 0},
    velocity: {x: 0, y: 0},
    imageSrc: "./edo_assets/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {x: 215, y: 157},
    sprites: {
        idle: {
            imageSrc: "./edo_assets/samuraiMack/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./edo_assets/samuraiMack/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./edo_assets/samuraiMack/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./edo_assets/samuraiMack/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./edo_assets/samuraiMack/Attack1.png",
            framesMax: 6
        },
        takeHit: {
            imageSrc: "./edo_assets/samuraiMack/Take Hit - white silhouette.png",
            framesMax: 4
        },
        death: {
            imageSrc: "./edo_assets/samuraiMack/Death.png",
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    }
})

const enemy = new Fighter({
    position:{x: 400, y: 100},
    velocity: {x: 0, y: 0},
    color: 'blue',
    imageSrc: "./edo_assets/kenji/Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {x: 215, y: 167},
    sprites: {
        idle: {
            imageSrc: "./edo_assets/kenji/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./edo_assets/kenji/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./edo_assets/kenji/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./edo_assets/kenji/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./edo_assets/kenji/Attack1.png",
            framesMax: 4
        },
        takeHit: {
            imageSrc: "./edo_assets/kenji/Take hit.png",
            framesMax: 3
        },
        death: {
            imageSrc: "./edo_assets/kenji/Death.png",
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
})

console.log(player)

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

// rectangular collision fxn


decreaseTimer()

// animation loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.2)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    // detecting for collision and enemy gets hit
    if (rectangularCollision({rectangle1: player, rectangle2: enemy})
        && player.isAttacking && player.framesCurrent === 4) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    if (rectangularCollision({rectangle1: enemy, rectangle2: player})
        && enemy.isAttacking && enemy.framesCurrent === 2) {
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#enemyHealth', {
            width: player.health + '%'
        })
    }
    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }


    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    // player keys
    if (!player.dead){
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
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
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
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