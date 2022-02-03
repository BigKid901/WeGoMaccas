window.addEventListener("keydown", theControls, false); window.addEventListener("keyup", theControls, false);

let keyboard = {}; //This is the link for keycodes to change controls http://gcctech.org/csc/javascript/javascript_keycodes.htm
    keyboard.UP = 87;     /*W*/     keyboard.UP_AGAIN = 73;     /*I*/
    keyboard.DOWN = 83;   /*S*/     keyboard.DOWN_AGAIN = 75;   /*J*/
    keyboard.LEFT = 65;   /*A*/     keyboard.LEFT_AGAIN = 74;   /*K*/
    keyboard.RIGHT = 68;  /*D*/     keyboard.RIGHT_AGAIN = 76;  /*L*/
    
let ourPlayer1 = { x: 100, y: 100, speedMultiplier: 35,playerId: document.getElementById("thePlayer1") };
let movePlayer1 = function(theX, theY) { /* Character Movement Updating */
    ourPlayer1.x += (theX||0) * ourPlayer1.speedMultiplier; ourPlayer1.y += (theY||0) * ourPlayer1.speedMultiplier;
    ourPlayer1.playerId.style.left = ourPlayer1.x + 'px'; ourPlayer1.playerId.style.top = ourPlayer1.y + 'px'; };

let jump1 = function(theX, theY) {
    
}

let playerMotion1 = function() { /* Player Controls */
    if(keyboard[keyboard.LEFT])  { movePlayer1(-1,0); }
    if(keyboard[keyboard.RIGHT]) { movePlayer1(1,0);  }
    if(keyboard[keyboard.UP])    { 
        movePlayer1(0,-1); 
    }
    if(keyboard[keyboard.DOWN])  { movePlayer1(0,1);  } 


}

let ourPlayer2 = { x: 100, y: 100, speedMultiplier: 35, playerId: document.getElementById("thePlayer2") };
let movePlayer2 = function(theX, theY) { /* Character Movement Updating */
    ourPlayer2.x += (theX||0) * ourPlayer2.speedMultiplier; ourPlayer2.y += (theY||0) * ourPlayer2.speedMultiplier;
    ourPlayer2.playerId.style.left = ourPlayer2.x + 'px'; ourPlayer2.playerId.style.top = ourPlayer2.y + 'px'; };
let playerMotion2 = function() { /* Player Controls */
    if(keyboard[keyboard.LEFT_AGAIN])  { movePlayer2(-1,0); }
    if(keyboard[keyboard.RIGHT_AGAIN]) { movePlayer2(1,0);  }
    if(keyboard[keyboard.UP_AGAIN])    { movePlayer2(0,-1); }
    if(keyboard[keyboard.DOWN_AGAIN])  { movePlayer2(0,1);  } }

function theControls(e) { 
   if(e.keyCode == 49 || e.keyCode == 97) { //number 1, or numpad 1 
       ourPlayer1.speedMultiplier = 5; ourPlayer2.speedMultiplier = 5;
       ourPlayer1.playerId.innerHTML = "Speed 1"; ourPlayer2.playerId.innerHTML = "Speed 1"; }

   if(e.keyCode == 50 || e.keyCode == 98) { //number 2, or numpad 2
       ourPlayer1.speedMultiplier = 15; ourPlayer2.speedMultiplier = 15;
       ourPlayer1.playerId.innerHTML = "Speed 2"; ourPlayer2.playerId.innerHTML = "Speed 2"; }

   if(e.keyCode == 51 || e.keyCode == 99) { //number 3, or numpad 3
       ourPlayer1.speedMultiplier = 35; ourPlayer2.speedMultiplier = 35;
       ourPlayer1.playerId.innerHTML = "Speed 3"; ourPlayer2.playerId.innerHTML = "Speed 3"; }

   let theKeyCode = e.keyCode || e.which; //Find out which key was pressed
   keyboard[theKeyCode] = e.type == 'keydown';
}

function doThisLoop() { playerMotion1(); playerMotion2(); requestAnimationFrame(doThisLoop); }

doThisLoop(); movePlayer1(); movePlayer2(); 