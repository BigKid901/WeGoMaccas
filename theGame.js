//THE CONTROLS SECTION
window.addEventListener("keydown", theControls, false);
window.addEventListener("keyup", theControls, false);
let keyboard = {};
    keyboard.UP = 87;     //87 is w, 38 is up arrow
    keyboard.DOWN = 83;   //83 is s, 40 is down arrow
    keyboard.LEFT = 65;   //65 is a, 37 is left arrow
    keyboard.RIGHT = 68;  //68 is d, 39 is right arrow       

function theControls(e) { 
    if(e.keyCode == 49 || e.keyCode == 97) { //number 1, or numpad 1 
        ourPlayer.speedMultiplier=5;
        ourPlayer.playerId.innerHTML="Speed 1";
    }
    if(e.keyCode == 50 || e.keyCode == 98) { //number 2, or numpad 2
        ourPlayer.speedMultiplier=15;
        ourPlayer.playerId.innerHTML="Speed 2";
    }
    if(e.keyCode == 51 || e.keyCode == 99) { //number 3, or numpad 3
        ourPlayer.speedMultiplier=35;
        ourPlayer.playerId.innerHTML="Speed 3";
    }

    
    let theKeyCode = e.keyCode || e.which; //Find out which key was pressed
    keyboard[theKeyCode] = e.type == 'keydown';
}
 
/* Player's start position and id, PlayerLocation*/
let ourPlayer = {
    x: 100,
    y: 100,
    speedMultiplier: 35,
    playerId: document.getElementById("thePlayer")
};

/* Character Movement Updating */
let movePlayer = function(theX, theY){
   ourPlayer.x += (theX||0) * ourPlayer.speedMultiplier;
   ourPlayer.y += (theY||0) * ourPlayer.speedMultiplier;

   ourPlayer.playerId.style.left = ourPlayer.x + 'px';
   ourPlayer.playerId.style.top = ourPlayer.y + 'px';
};
    
/* Player Controls */
let playerMotion = function(){
    if(keyboard[keyboard.LEFT]){
        movePlayer(-1,0);
    }
    if(keyboard[keyboard.RIGHT]){
        movePlayer(1,0);
    }
    if(keyboard[keyboard.UP]){
        movePlayer(0,-1);
    }
    if(keyboard[keyboard.DOWN]){
        movePlayer(0,1);
    }
}

//Camera Follows the Player
function scrollIt() {
    ourPlayer.playerId.scrollIntoView({block: "center", inline: "center"});
}

function doThisLoop() {
    playerMotion();
    scrollIt();     //Camera Follows Player
    requestAnimationFrame(doThisLoop);  
}

doThisLoop();
movePlayer(); //Update the Position of the player