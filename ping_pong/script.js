//==========================================================
//Variables
//==========================================================
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const paddleWidth = 100
const paddleHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let ballTimerId
let score = 0

//user positions variables
const userStartPosition = [230,10]
let currentPosition = userStartPosition

//ball position variables
const ballStartPosition = [270,40]
let ballCurrentPosition = ballStartPosition
let xDirection = -2
let yDirection = 2

//==========================================================
// BLOCKS
//==========================================================
//create individual block class
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis+blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis+blockHeight]
    }
}

//array of blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

//draw all blocks
function addBlocks() {
    for(let i=0; i<blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//==========================================================
// USER
//==========================================================
//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break
            
        case 'ArrowRight':
            if(currentPosition[0] < 560-blockWidth){
                currentPosition[0] += 10
                drawUser()
            }
            break
    }
}

document.addEventListener('keydown', moveUser)

//==========================================================
// BALL
//==========================================================

//draw the ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//add a ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move the ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkBallCollisions()
}

ballTimerId = setInterval(moveBall, 30)

//check for ball collisions
function checkBallCollisions(){
    
    //check for block collision
    for(let i=0; i<blocks.length; ++i){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1]+ballDiameter) > blocks[i].bottomLeft[1] && 
             ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            //remove the block element
            allBlocks[i].classList.remove('block')
            //remove the block class
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
        }
        
        //check for win
        if(blocks.length === 0){
            scoreDisplay.innerHTML = 'YOU WIN'
            clearInterval(ballTimerId)
            document.removeEventListener('keydown', moveUser)
        }
    }
    
    //check wall collisions
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) || //right wall
       ballCurrentPosition[1] >= (boardHeight - ballDiameter) || //top wall
       ballCurrentPosition[0] <= 0 //left wall
      ){
        changeDirection()
    }
    
    //check paddle(user) collisions
    if(
        (ballCurrentPosition[0] > currentPosition[0] && 
         ballCurrentPosition[0] < currentPosition[0]+paddleWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] &&
         ballCurrentPosition[1] < currentPosition[1]+paddleHeight)
      ){
        changeDirection()
    }
    
    //check for gameover condition
    if(ballCurrentPosition[1] <= 0){
        clearInterval(ballTimerId)
        scoreDisplay.innerHTML = 'Game Over'
        document.removeEventListener('keydown',moveUser)
    }
}

function changeDirection(){
    if(xDirection===2 && yDirection===2){
        yDirection = -2
        return
    }
    if(xDirection===2 && yDirection===-2){
        xDirection = -2
        return
    }
    if(xDirection===-2 && yDirection===-2){
        yDirection = 2
        return
    }
    if(xDirection===-2 && yDirection===2){
        xDirection = 2
        return
    }
}