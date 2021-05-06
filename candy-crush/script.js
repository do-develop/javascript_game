document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0
    
    const candyColors = [
        'url(assets/red-candy.png)',
        'url(assets/yellow-candy.png)',
        'url(assets/orange-candy.png)',
        'url(assets/purple-candy.png)',
        'url(assets/green-candy.png)',
        'url(assets/blue-candy.png)'
    ]
    
    //create game board
    function createBoard(){
        for(let i=0; i<width*width; ++i){
            //create div sqaures and make it draggable
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            //assign id number to each square
            square.setAttribute('id', i)
            //assign randome color to each div square
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            //add child squares to game grid
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()
    
    
    //drag the candies
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))
    
    
    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
    }
    
    function dragOver(e){
        e.preventDefault()
    }
    
    function dragEnter(e){
        e.preventDefault()
    }
    
    function dragLeave(){
        this.style.backgroundImage = ''
    }
    
    function dragDrop(){
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }
    
    function dragEnd(){
        const isLeftEdge = (squareIdBeingDragged % width === 0)
        const isRightEdge = (squareIdBeingDragged % width === width-1)
        //what is a valid drag movement?
        let validMoves = []
        let validMove
        
        if(isLeftEdge){
            validMoves = [
                squareIdBeingDragged-width, 
                squareIdBeingDragged+1,
                squareIdBeingDragged+width
            ]
            validMove = validMoves.includes(squareIdBeingReplaced)
        } 
        else if(isRightEdge){
            validMoves = [
                squareIdBeingDragged-1,
                squareIdBeingDragged-width, 
                squareIdBeingDragged+width
            ]
            validMove = validMoves.includes(squareIdBeingReplaced)
        }
        else{
            validMoves = [
                squareIdBeingDragged-1,
                squareIdBeingDragged-width,
                squareIdBeingDragged+1,
                squareIdBeingDragged+width
            ]
            validMove = validMoves.includes(squareIdBeingReplaced)
        }
        
        if(squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else{
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
    }
    //drop candies once some have been cleared
    function moveDown() {
        for (i = 0; i < 55; i ++) {
            if(squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && (squares[i].style.backgroundImage === '')) {
                  let randomColor = Math.floor(Math.random() * candyColors.length)
                  squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }
    
    //CHECK FOR MATCHES
    function checkRowForFour(){
        for(i=0; i<60; ++i){
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = (squares[i].style.backgroundImage === '')
            
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue
            
            if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score
                
                rowOfFour.every(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkRowForFour()
    
    function checkColumnForFour(){
        for(i=0; i<39; ++i){
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = (squares[i].style.backgroundImage === '')
            
            if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score
                
                columnOfFour.every(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkColumnForFour()
//for row of Three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
          let rowOfThree = [i, i+1, i+2]
          let decidedColor = squares[i].style.backgroundImage
          const isBlank = squares[i].style.backgroundImage === ''

          const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
          if (notValid.includes(i)) continue

            if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
          }
        }
      }
      checkRowForThree()

 //for column of Three
    function checkColumnForThree() {
       for (i = 0; i < 47; i++) {
         let columnOfThree = [i, i+width, i+width*2]
         let decidedColor = squares[i].style.backgroundImage
         const isBlank = squares[i].style.backgroundImage === ''

           if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
               score += 3
               scoreDisplay.innerHTML = score
               columnOfThree.forEach(index => {
               squares[index].style.backgroundImage = ''
            })
          }
        }
    }
    checkColumnForThree()
    
    window.setInterval(function(){
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveDown()
    },100)
    

    
    
})