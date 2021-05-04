document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    const flagsLeft = document.querySelector('#flags-left')
    const result = document.querySelector('#result')
    let width = 10
    let squares = []
    let bombAmount = 20
    let flags = 0
    let isGameOver = false
    
    //create Board
    function createBoard(){
        flagsLeft.innerHTML = bombAmount
        
        //get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array((width*width)-bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)

        //create squares
        for(let i=0; i<width*width; ++i){
            const square = document.createElement('div')
            square.setAttribute('id', i)//to keep track of each square
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
            
            //upon normal click
            square.addEventListener('click', function(e){
                click(square)
            })
            
            //upon right click
            square.oncontextmenu = function(e){
                e.preventDefault()
                addFlag(square)
            }
        }
        
        //add numbers
        for(let i=0; i<squares.length; ++i){
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width-1)
            
            if(squares[i].classList.contains('valid')){
                //checks left side(edge)
                if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
                //check above
                if(i>10 && squares[i-width].classList.contains('bomb')) total++
                //checks diagonal upper right side
                if(i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++
                //checks diagonal upper left side
                if(i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
                //check diagonal down right side (edge)
                if(i<98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
                //checks diagonal down left side (edge)
                if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++
                //checks diagonal down right side 
                if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total++
                //checks diagonal down left side 
                if (i < 89 && squares[i +width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
            }
        }
    }
    createBoard()
    
    //add flag with right click
    function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags++
        flagsLeft.innerHTML = bombAmount - flags
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags--
        flagsLeft.innerHTML = bombAmount - flags
      }
    }
  }
    
    //click on square action
    function click(square){
        let currentId = square.id
        if(isGameOver) return
        if(square.classList.contains('checked') || square.classList.contains('flag')) return
        if(square.classList.contains('bomb')){
            gameOver(square)
        }else{
            let total = square.getAttribute('data')
            if(total != 0){
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }
    
    //check neighboring square that is clicked
    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width-1)
        
        setTimeout(()=>{
            if(currentId > 0 && !isLeftEdge){
                const newId = squares[parseInt(currentId)-1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if(currentId > 9 && !isRightEdge){
                const newId = squares[parseInt(currentId)+1-width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId -width)].id
                //const newId = parseInt(currentId) -width   ....refactor
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id
                //const newId = parseInt(currentId) -1 -width   ....refactor
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                //const newId = parseInt(currentId) +1   ....refactor
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                //const newId = parseInt(currentId) -1 +width   ....refactor
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id
                //const newId = parseInt(currentId) +1 +width   ....refactor
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id
                //const newId = parseInt(currentId) +width   ....refactor
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

        }, 10)
    }
    
   function gameOver(square){
       console.log('Boooom! Game Over')
       isGameOver = true
       
        //show all the bombs
       squares.forEach(square => {
           if(square.classList.contains('bomb')){
               square.innerHTML = '💣'
               square.classList.remove('bomb')
               square.classList.add('checked')
           }
       })
   } 
    
   //check for win
    function checkForWin(){
        let matches = 0
        for(let i=0; i<squares.length; ++i){
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb'))
                
            if(matches === bombAmount){
                result.innerHTML = 'YOU WIN'
                isGameOver = true
            }
        }
        
    }
    
    
})