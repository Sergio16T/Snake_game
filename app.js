const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 
const gameSpeed = 100; 
let distanceX= 20; 
let distanceY = 0; 
let score_span = document.getElementById('score'); 
let score = 0; 
const gameOverModal = document.querySelector('.game-over-modal'); 


let snake = [{x: 160, y: 160}, {x: 140, y: 160},{x: 120, y: 160}, {x: 100, y: 160}];

main(); 
createApple(); 
document.addEventListener('keydown', changeDirection); 


function main() {
    if (endGame()) {
        gameOverModal.style.display ='block'; 
        return;
    } 
    setTimeout(function onTick() {
        drawCanvas(); 
        drawApple();
        advanceSnake(); 
        drawSnake(); 

        main(); 
    }, gameSpeed)
}


function drawCanvas() {
    ctx.fillStyle = 'gray'; 
    ctx.strokeStyle = 'black'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2; 
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}




function drawSnake() {
    snake.forEach(function(snakeLink) {
        ctx.fillStyle ='lightgreen'; 
        ctx.fillRect(snakeLink.x, snakeLink.y, 20, 20); 
        ctx.strokeStyle = 'blue'; 
        ctx.strokeRect(snakeLink.x, snakeLink.y, 20, 20);
}); 
}

function changeDirection(event) {
    const leftKey = 37; 
    const rightKey = 39
    const upKey = 38; 
    const downKey = 40; 
    
    const keyPressed = event.keyCode; 
    const goingUp = distanceY === -20; 
    const goingDown = distanceY === 20; 
    const goingLeft = distanceX === -20; 
    const goingRight = distanceX === 20; 

    if (keyPressed === leftKey && !goingRight) {distanceX = -20, distanceY = 0};
    if (keyPressed === rightKey && !goingLeft) {distanceX = 20, distanceY =0}; 
    if (keyPressed === upKey && !goingDown) {distanceX = 0, distanceY = -20};
    if (keyPressed === downKey && !goingUp) {distanceX = 0, distanceY = 20 };
    

}

function advanceSnake() {
    const head= { x: snake[0].x + distanceX, y: snake[0].y + distanceY}; 
    snake.unshift(head); 
    if (snake[0].x ===appleX && snake[0].y ===appleY) {
        score += 10;
        score_span.innerHTML = score; 
       // document.getElementById('score') = score;  
        createApple();
        
    } else {
    snake.pop(); 
    }
}
// challenge myself to use ternary operator synax in function above ^ 
/* research scope of if statement tried declaring 
score_span = document.getElementById('score').innerHTML as a global variable
 and then saying score_span.innerHTML = score inside if statement in advanceSnake. didn't work. 
*/ 

function setAppleRandom(min, max) {
    return Math.round((Math.random() * (max-min) + min)/20) *20; 

}
function createApple() {
    appleX = setAppleRandom(0, canvas.width -20); 
    appleY = setAppleRandom(0, canvas.height -20);

    snake.forEach(function isAppleOnSnake(link) {
        if (link.x === appleX && link.y === appleY) createApple(); 
    });

}

function drawApple() {
    ctx.fillStyle= 'red'; 
    ctx.fillRect(appleX, appleY, 20, 20);
    ctx.strokeStyle ='darkred'; 
    ctx.strokeRect(appleX, appleY, 20, 20); 

}

function endGame() {
    for (let i =4; i <snake.length; i++) {
         if (snake[i].x === snake[0].x && snake[i].y ===snake[0].y) return true; 
    }
    const hitLeftWall = snake[0].x < 0; 
    const hitTopWall =snake[0].y < 0 ; 
    const hitRightWall = snake[0].x > canvas.width -20; 
    const hitBottomWall = snake[0].y > canvas.height -20; 

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall 
    
}

function playAgain(){ 
    window.location.reload(); 
}

