document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 //so first div in our grid
  let appleIndex = 0 //so first div in our grid
  let currentSnake = [2,1,0] 
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0


  //to start, and restart the game
  function startGame() {
    //clear previous game settings
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    //create apple
    randomApple()
    //initialise new game settings
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }


  //function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes() {

    //deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //snake self collision
    ) {
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop() //remove and return the last item
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  //generate new apple once apple is eaten
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
  }

  //assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode === 39) {//right key
      direction = 1 
    } else if (e.keyCode === 38) {//up key
      direction = -width 
    } else if (e.keyCode === 37) {//left key
      direction = -1 
    } else if (e.keyCode === 40) {//down key
      direction = +width 
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})