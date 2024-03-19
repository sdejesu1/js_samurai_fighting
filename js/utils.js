function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (enemy.health > player.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000) // 1000 milliseconds
        timer --
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player, enemy})
    }
}

function createCharacters(choice) {
    switch (choice) {
        case 'player':
            return new Fighter({
                position: {x: 160, y: 0},
                velocity: {x: 0, y: 0},
                imageSrc: "../edo_assets/samuraiMack/Idle.png",
                framesMax: 8,
                scale: 2.5,
                offset: {x: 215, y: 157},
                sprites: {
                    idle: {
                        imageSrc: "../edo_assets/samuraiMack/Idle.png",
                        framesMax: 8
                    },
                    run: {
                        imageSrc: "../edo_assets/samuraiMack/Run.png",
                        framesMax: 8
                    },
                    jump: {
                        imageSrc: "../edo_assets/samuraiMack/Jump.png",
                        framesMax: 2
                    },
                    fall: {
                        imageSrc: "../edo_assets/samuraiMack/Fall.png",
                        framesMax: 2
                    },
                    attack1: {
                        imageSrc: "../edo_assets/samuraiMack/Attack1.png",
                        framesMax: 6
                    },
                    takeHit: {
                        imageSrc: "../edo_assets/samuraiMack/TakeHit-whitesilhouette.png",
                        framesMax: 4
                    },
                    death: {
                        imageSrc: "../edo_assets/samuraiMack/Death.png",
                        framesMax: 6
                    },

                    idleRev: {
                        imageSrc: "../edo_assets/samuraiMack/Idlereverse.png",
                        framesMax: 8
                    },
                    runRev: {
                        imageSrc: "../edo_assets/samuraiMack/Runreverse.png",
                        framesMax: 8
                    },
                    jumpRev: {
                        imageSrc: "../edo_assets/samuraiMack/Jumpreverse.png",
                        framesMax: 2
                    },
                    fallRev: {
                        imageSrc: "../edo_assets/samuraiMack/Fallreverse.png",
                        framesMax: 2
                    },
                    attack1Rev: {
                        imageSrc: "../edo_assets/samuraiMack/Attack1reverse.png",
                        framesMax: 6
                    },
                    takeHitRev: {
                        imageSrc: "../edo_assets/samuraiMack/TakeHit-whitesilhouettereverse.png",
                        framesMax: 4
                    },
                    deathRev: {
                        imageSrc: "../edo_assets/samuraiMack/Deathreverse.png",
                        framesMax: 6
                    }
                },
                attackBox: {
                    offset: {
                        x: 80,
                        y: 50
                    },
                    width: 150,
                    height: 50
                }
            })
        case 'enemy':
            return new Fighter({
                position: {x: 800, y: 100},
                velocity: {x: 0, y: 0},
                color: 'blue',
                imageSrc: "../edo_assets/kenji/Idle.png",
                framesMax: 8,
                scale: 2.5,
                offset: {x: 215, y: 167},
                sprites: {
                    idle: {
                        imageSrc: "../../edo_assets/kenji/Idle.png",
                        framesMax: 4
                    },
                    run: {
                        imageSrc: "../edo_assets/kenji/Run.png",
                        framesMax: 8
                    },
                    jump: {
                        imageSrc: "../edo_assets/kenji/Jump.png",
                        framesMax: 2
                    },
                    fall: {
                        imageSrc: "../edo_assets/kenji/Fall.png",
                        framesMax: 2
                    },
                    attack1: {
                        imageSrc: "../edo_assets/kenji/Attack1.png",
                        framesMax: 4
                    },
                    takeHit: {
                        imageSrc: "../edo_assets/kenji/Take hit.png",
                        framesMax: 3
                    },
                    death: {
                        imageSrc: "../edo_assets/kenji/Death.png",
                        framesMax: 7
                    },

                    // reverse images
                    idleRev: {
                        imageSrc: "../edo_assets/kenji/Idlereverse.png",
                        framesMax: 4
                    },
                    runRev: {
                        imageSrc: "../edo_assets/kenji/Runreverse.png",
                        framesMax: 8
                    },
                    jumpRev: {
                        imageSrc: "../edo_assets/kenji/Jumpreverse.png",
                        framesMax: 2
                    },
                    fallRev: {
                        imageSrc: "../edo_assets/kenji/Fallreverse.png",
                        framesMax: 2
                    },
                    attack1Rev: {
                        imageSrc: "../edo_assets/kenji/Attack1reverse.png",
                        framesMax: 4
                    },
                    takeHitRev: {
                        imageSrc: "../edo_assets/kenji/Take hitreverse.png",
                        framesMax: 3
                    },
                    deathRev: {
                        imageSrc: "../edo_assets/kenji/Deathreverse.png",
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
    }
}
function createBackground(choice) {
    switch (choice) {
        case 'wooden_village_entrance':
            return new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./edo_assets/background.png"
            })

        case 'shop':
            return new Sprite({
                position: {
                    x: 605,
                    y: 128
                },
                imageSrc: "./edo_assets/shop.png",
                scale: 2.75,
                framesMax: 6
            })
    }
}