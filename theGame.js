window.addEventListener("keydown", theControls, false);
window.addEventListener("keyup", theControls, false);
let keyboard = {}; //This is the link for keycodes to change controls http://gcctech.org/csc/javascript/javascript_keycodes.htm
    keyboard.UP = 87;     //W
    keyboard.DOWN = 83;   //S
    keyboard.LEFT = 65;   //A
    keyboard.RIGHT = 68;  //D       

let ourPlayer = { /* Player's start position and id, PlayerLocation */
    x: 100,
    y: 100,
    speedMultiplier: 35,
    playerId: document.getElementById("thePlayer")
};

let movePlayer = function(theX, theY) { /* Character Movement Updating */
   ourPlayer.x += (theX||0) * ourPlayer.speedMultiplier;
   ourPlayer.y += (theY||0) * ourPlayer.speedMultiplier;
   ourPlayer.playerId.style.left = ourPlayer.x + 'px';
   ourPlayer.playerId.style.top = ourPlayer.y + 'px';
};
    
let playerMotion = function() { /* Player Controls */
    if(keyboard[keyboard.LEFT]) {
        movePlayer(-1,0);
    }
    if(keyboard[keyboard.RIGHT]) {
        movePlayer(1,0);
    }
    if(keyboard[keyboard.UP]) {
        movePlayer(0,-1);
    }
    if(keyboard[keyboard.DOWN]) {
        movePlayer(0,1);
    }
}

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

function scrollIt() { //Camera Follows the Player
    ourPlayer.playerId.scrollIntoView({block: "center", inline: "center"});
}

function doThisLoop() {
    playerMotion();
    scrollIt();     //Camera Follows Player
    requestAnimationFrame(doThisLoop);  
}

doThisLoop();
movePlayer(); //Update the Position of the player