var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var flapping = 0;
var counter = 0;

hole.addEventListener('animationiteration', ()=>{
  var random = -((Math.random()*300) + 150);
  hole.style.top = random + "px";
  counter++;
});

setInterval(function(){
  var characterTop =
  parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  //fall if no flapping
  if(flapping==0){
    character.style.top = (characterTop+2)+"px";
  }

  //game over conditions
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));

  var cTop = -(500-characterTop); //inverse of characterTop

  if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
      alert("Game over. Score: "+(counter));
      character.style.top = 100 + "px";
      counter=0;
  }
},10);

function flap(){
  flapping = 1;
  let flapCount = 0;

  var flapInterval = setInterval(function(){
    //get character position
    var characterTop =
    parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    //flap about 5 px above
    if(characterTop>6 && counter<15){
      character.style.top = (characterTop-5)+"px";
    }
    //won't flap indefinitely
    if(flapCount>15){
      clearInterval(flapInterval);
      flapping=0;
      flapCount=0;
    }
    flapCount++;
  },10);
}
