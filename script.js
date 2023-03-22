class Snake {
    constructor(x, y, size){
        this.initialX = x
        this.initialY = y
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x: this.x, y: this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }
    
    move(){
        var newRect
        
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        
        this.tail.shift()
        this.tail.push(newRect)
    }
}

class Apple {
    constructor(){
        var isTouching
        
        while(true){
            isTouching = false
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            
            for(var i = 0; i < snake.tail.length; i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            
            this.size = snake.size
            this.color = 'red'
            
            if(!isTouching){
                break
            }
        }
    }
}

var canvas = document.getElementById('canvas')

var left = document.getElementById('left')
var right = document.getElementById('right')
var up = document.getElementById('up')
var down = document.getElementById('down')

var snake = new Snake(20, 20, 20)
var apple = new Apple()

var canvasContext = canvas.getContext('2d')

window.onload = () => {
    gameLoop()
}

function gameLoop(){
    setInterval(show, 1000 / 10)
}

function show(){
    update()
    draw()
}

function update(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    checkBodyCollision()
    eatApple()
    checkWallCollision()
}

function checkBodyCollision(){
    for (var i = 1; i < snake.tail.length; i++) {
        if(i == snake.tail.length - 1){
            break
        }
        
        if (snake.tail[snake.tail.length - 1].x == snake.tail[i].x && snake.tail[snake.tail.length - 1].y == snake.tail[i].y) {
            snake.tail = [{x: snake.initialX, y: snake.initialY}]
        }
    }
}

function checkWallCollision(){
    var headTail = snake.tail[snake.tail.length - 1]
    
    if(headTail.x == -snake.size){
        headTail.x = canvas.width - snake.size
    } else if (headTail.x == canvas.width) {
        headTail.x = 0
    } else if (headTail.y == -snake.size) {
        headTail.y = canvas.height - snake.size
    } else if (headTail.y == canvas.height) {
        headTail.y = 0
    }
}

function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x  && snake.tail[snake.tail.length - 1].y == apple.y){
        snake.tail[snake.tail.length] = {x: apple.x, y: apple.y}
        apple = new Apple()
    }
}

function draw(){
    createRect(0, 0, canvas.width, canvas.height, 'black')
    
    createRect(snake.tail[0].x, snake.tail[0].y, snake.size - 5, snake.size - 5, 'dodgerblue')
    
    for(var i = 1; i < snake.tail.length; i++){
        createRect(snake.tail[i].x, snake.tail[i].y, snake.size -5, snake.size - 5, 'white')
    }
    
    createRect(snake.tail[snake.tail.length - 1].x, snake.tail[snake.tail.length - 1].y, snake.size - 5, snake.size - 5, 'lawngreen')
    
    canvasContext.font = '20px Arial'
    canvasContext.fillStyle = "#ffff42"
    canvasContext.fillText('Score: ' + (snake.tail.length - 1), canvas.width - 80, 21)
    createRect(apple.x, apple.y, apple.size - 5, apple.size - 5, apple.color)
}

function createRect(x, y, width, height, color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

left.addEventListener("click", () => {
    if(snake.rotateX != 1){
        snake.rotateX = -1
        snake.rotateY = 0
    }
})

right.addEventListener("click", () => {
    if (snake.rotateX != -1) {
        snake.rotateX = 1
        snake.rotateY = 0
    }
})

up.addEventListener("click", () => {
    if (snake.rotateY != 1) {
        snake.rotateX = 0
        snake.rotateY = -1
    }
})

down.addEventListener("click", () => {
    if (snake.rotateY != -1) {
        snake.rotateX = 0
        snake.rotateY = 1
    }
})