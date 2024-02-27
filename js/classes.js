class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite {
    constructor({
                    position,
                    velocity,
                    color = 'red',
                    imageSrc,
                    scale = 1,
                    framesMax = 1,
                    offset = {x: 0, y: 0},
                    sprites,
                    attackBox = {offset: {}, width: undefined, height: undefined}
                }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false
        this.isReversed = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update() {
        this.draw()
        if (!this.dead) {
            this.animateFrames()
            this.reverseChar()
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        if (this.isReversed) {
            this.attackBox.position.x += -1 * this.attackBox.offset.x + 70
        }

        // testing the attack box
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        // stopping where the sprite falls a tiny bit short, to keep sprite integrity when falling
        if (this.position.y + this.height + this.velocity.y >= (canvas.height - 96)) {
            this.velocity.y = 0
            this.position.y = 330
        } else {
            this.velocity.y += gravity
        }
    }


    reverseChar() {
        if (this.isReversed) {
            console.log("Char is reversed")
        }
    }

    attack() {
        if (this.isReversed === true) {
            this.switchSprite('attack1Rev')
        } else {
            this.switchSprite('attack1')
        }
        this.isAttacking = true
    }

    takeHit() {
        this.health -= 5
        if (this.health <= 0) {
            if (this.isReversed === true) {
                this.switchSprite('deathRev')
            } else {
                this.switchSprite('death')
            }
        } else {
            if (this.isReversed === true) {
                this.switchSprite('takeHitRev')
            } else {
                this.switchSprite('takeHit')
            }
        }
    }

    switchSprite(sprite) {
        // cases for if player is reversed
        if (this.isReversed === true) {
            // overriding all other animations with death animation
            if (this.image === this.sprites.deathRev.image) {
                if (this.framesCurrent === this.sprites.deathRev.framesMax - 1) {
                    this.dead = true
                }
                return
            }
            // overriding all other animations with attack animation
            if (this.image === this.sprites.attack1Rev.image && this.framesCurrent < this.sprites.attack1Rev.framesMax - 1) {
                return
            }
            // overriding all other animations with take hit animation
            if (this.image === this.sprites.takeHitRev.image && this.framesCurrent < this.sprites.takeHitRev.framesMax - 1) {
                return
            }
            switch (sprite) {
                case 'idleRev':
                    if (this.image !== this.sprites.idleRev.image) {
                        this.image = this.sprites.idleRev.image
                        this.framesMax = this.sprites.idleRev.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'runRev':
                    if (this.image !== this.sprites.runRev.image) {
                        this.image = this.sprites.runRev.image
                        this.framesMax = this.sprites.runRev.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'jumpRev':
                    if (this.image !== this.sprites.jumpRev.image) {
                        this.image = this.sprites.jumpRev.image
                        this.framesMax = this.sprites.jumpRev.framesMax
                        this.framesCurrent = 0
                        console.log('char should be jumping rev')
                    }
                    break

                case 'fallRev':
                    if (this.image !== this.sprites.fallRev.image) {
                        this.image = this.sprites.fallRev.image
                        this.framesMax = this.sprites.fallRev.framesMax
                        this.framesCurrent = 0
                        console.log('char should be falling rev')
                    }
                    break

                case 'attack1Rev':
                    if (this.image !== this.sprites.attack1Rev.image) {
                        this.image = this.sprites.attack1Rev.image
                        this.framesMax = this.sprites.attack1Rev.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'takeHitRev':
                    if (this.image !== this.sprites.takeHitRev.image) {
                        this.image = this.sprites.takeHitRev.image
                        this.framesMax = this.sprites.takeHitRev.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'deathRev':
                    if (this.image !== this.sprites.deathRev.image) {
                        this.image = this.sprites.deathRev.image
                        this.framesMax = this.sprites.deathRev.framesMax
                        this.framesCurrent = 0
                    }
                    break
            }
            // else the player is not reversed
        } else {
            // overriding all other animations with death animation
            if (this.image === this.sprites.death.image) {
                if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                    this.dead = true
                }
                return
            }
            // overriding all other animations with attack animation
            if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) {
                return
            }
            // overriding all other animations with take hit animation
            if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) {
                return
            }
            switch (sprite) {
                case 'idle':
                    if (this.image !== this.sprites.idle.image) {
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'run':
                    if (this.image !== this.sprites.run.image) {
                        this.image = this.sprites.run.image
                        this.framesMax = this.sprites.run.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'jump':
                    if (this.image !== this.sprites.jump.image) {
                        this.image = this.sprites.jump.image
                        this.framesMax = this.sprites.jump.framesMax
                        this.framesCurrent = 0
                        console.log('char should be jumping')
                    }
                    break

                case 'fall':
                    if (this.image !== this.sprites.fall.image) {
                        this.image = this.sprites.fall.image
                        this.framesMax = this.sprites.fall.framesMax
                        this.framesCurrent = 0
                        console.log('char should be falling')
                    }
                    break

                case 'attack1':
                    if (this.image !== this.sprites.attack1.image) {
                        this.image = this.sprites.attack1.image
                        this.framesMax = this.sprites.attack1.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'takeHit':
                    if (this.image !== this.sprites.takeHit.image) {
                        this.image = this.sprites.takeHit.image
                        this.framesMax = this.sprites.takeHit.framesMax
                        this.framesCurrent = 0
                    }
                    break

                case 'death':
                    if (this.image !== this.sprites.death.image) {
                        this.image = this.sprites.death.image
                        this.framesMax = this.sprites.death.framesMax
                        this.framesCurrent = 0
                    }
                    break

            }
        }
    }
}