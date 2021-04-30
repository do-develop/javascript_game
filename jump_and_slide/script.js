document.addEventListener('DOMContentLoaded', () =>{
    //const game = document.querySelector('.game')
    const character = document.querySelector('.character')
    //var chLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    let isJumping = false
    let isGoingLeft = false
    let isGoingRight = false
    let left = 0
    let bottom = 0
    let gravity = 0.9
    let leftTimerId
    let rightTimerId
    var width = parseInt(window.innerWidth);
    
    
    function jump(){
        if (isJumping) return
        
        character.classList.add('character')
        character.classList.remove('character-slide')
        
        let timerUpId = setInterval( function() {
            //fall down
            if(bottom > 200){
                clearInterval(timerUpId)
                let timerDownId = setInterval(function() {
                    if(bottom < 0){//collision check
                        clearInterval(timerDownId)
                        isJumping = false
                    }
                    bottom -=5
                    bottom = bottom * gravity
                    character.style.bottom = bottom + 'px'
                }, 30)
            }
            //jump up
            isJumping = true
            bottom += 25
            bottom = bottom * gravity
            character.style.bottom = bottom + 'px'
        }, 30)
        
    }
    
    function slideLeft(){
        if (isGoingLeft) return
        
        character.classList.remove('character')
        character.classList.add('character-slide')
        
        if(isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        
        isGoingLeft = true
        leftTimerId = setInterval(function(){
            left -= 5
            character.style.left = left + 'px'
            
            if(left <= 0){
                clearInterval(leftTimerId);
                isGoingLeft = false
            }
        }, 30) 
        
    }
    
    function slideRight(){
        if (isGoingRight) return
        
        character.classList.remove('character')
        character.classList.add('character-slide')
        
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingleft = false
        }
        
        isGoingRight = true
        rightTimerId = setInterval(function(){
            left += 5
            character.style.left = left + 'px'
            
            if(left >= width){
                clearInterval(rightTimerId)
                isGoingRight = false
            }
        }, 30)
        
        
    }
    
    //assign functions to keyboard input
    function control(e){
        if(e.keyCode === 38){//key up
            jump()
        } else if (e.keyCode === 37){//key left
            slideLeft()
        } else if (e.keyCode === 39){//key right
            slideRight()
        }
    }
    
    //Event listener
    document.addEventListener('keydown',control)
})