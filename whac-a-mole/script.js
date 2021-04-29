//global variables
const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const startButton = document.getElementById('start_button');

let result = 0;
let hitPosition
let timerId = null
let countDownTimerId = null
let currentTime = 30

//=========================================================================//
//movement
//=========================================================================//
function randomSquare(){
  squares.forEach(square => {
    square.classList.remove('mole')
  }) //remove a mole first

  let randomSquare = squares[Math.floor(Math.random() * 9)] //0~8
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', ()=>{
    if(square.id == hitPosition){
      result++
      score.textContent = result;
      hitPosition = null
    }
  })
})

function moveMole(){
  timerId = setInterval(randomSquare, 500)
}

//=========================================================================//
//Timer
//=========================================================================//
function countDown(){
    --currentTime
    timeLeft.textContent = currentTime

    if(currentTime==0){
      clearInterval(countDownTimerId)
      clearInterval(timerId)
      alert("Game over! Your final score is "+result)
    }
}

//=========================================================================//
//Start game
//=========================================================================//
startButton.onclick = function(){
  moveMole()
  countDownTimerId = setInterval(countDown, 1000)
}
