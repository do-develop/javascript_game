document.addEventListener('DOMContentLoaded', ()=>{
    const squares = document.querySelectorAll('.grid div')
    const playerDisplay = document.querySelector('#player')
    let currentPlayer = 'player-X'
    
    squares.forEach(square => {
        square.addEventListener('click', clickOutcome)
    })
    
    function clickOutcome(e){
        const squareArray = Array.from(squares)
        const index = squareArray.indexOf(e.target)
        playerDisplay.innerHTML = currentPlayer
        
        if(currentPlayer === 'player-X'){
            squares[index].classList.add('player-X')
            currentPlayer = 'player-O'
        }else{
            squares[index].classList.add('player-O')
            currentPlayer = 'player-X'
        }
    }
})