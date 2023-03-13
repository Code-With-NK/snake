const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 13;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let intervalId;
let score = 0;
let highScore = localStorage.getItem("highscore") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (dir) => {
    if(dir === "left" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(dir === "right" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (dir === "up" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (dir === "down" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
}

controls.forEach(name => {
    console.log(name.dataset.key)
    name.addEventListener('click', () => changeDirection(name.dataset.key));
})

const handleGameOver = () => {
    clearInterval(intervalId);
    alert("Game over");
    location.reload();
}

const initGame = () => {
    if(gameOver){
        return handleGameOver();
    }
    
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highscore", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    if(snakeX <= 0 || snakeX >= 30 || snakeY <= 0 || snakeY >= 30){
        gameOver = true;
    }
    
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakeX, snakeY];
    
    snakeX += velocityX;
    snakeY += velocityY;
    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
intervalId = setInterval(initGame, 125);