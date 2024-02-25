const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')

// 16 by 9 ratio for width & height
canvas.width = 1024
canvas.height = 576

// making the canvas a black color
c.fillRect(0,0, canvas.width, canvas.height)

// class for objects (player & opp)
class Sprite {
    constructor(position) {
        this.position = position
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
}

const player = new Sprite({
        x: 0,
        y: 0
})

player.draw()

console.log(player)