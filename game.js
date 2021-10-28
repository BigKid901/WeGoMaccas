// The attributes of the player.
var player = {
   x: 200,
   y: 200,
   x_v: 0,
   y_v: 0,
   jump : true,
   height: 20,
   width: 20
   };
// The status of the arrow keys
var keys = {
   right: false,
   left: false,
   up: false,
   };
// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;
// The number of platforms
var num = 2;
// The platforms
var platforms = [];
// Function to render the canvas
function rendercanvas(){
   ctx.fillStyle = "#F0F8FF";
   ctx.fillRect(0, 0, 720, 720);
}
// Function to render the player
function renderplayer(){
   ctx.fillStyle = "#db1010";
   ctx.fillRect((player.x)-20, (player.y)-20, player.width, player.height);
   }
// Function to create platforms
function createplat(){
   for(i = 0; i < num; i++) {
       platforms.push(
           {
           x: 100 * i,
           y: 200 + (30 * i),
           width: 110,
           height: 15
           }
       );
   }
   }
// Function to render platforms
function renderplat(){
   ctx.fillStyle = " #feffc0";
   ctx.fillRect(platforms[0].x, platforms[0].y, platforms[0].width, platforms[0].height);
   ctx.fillRect(platforms[1].x, platforms[1].y, platforms[1].width,platforms[1]. height);

}
// This function will be called when a key on the keyboard is pressed https://gcctech.org/csc/javascript/javascript_keycodes.htm
function keydown(e) {
   // a
   if(e.keyCode == 65) {
       keys.left = true;
   }
   // SPACEBAR
   if(e.keyCode == 32) {
       if(player.jump == false) {
           player.y_v = -10;
       }
   }
   // d
   if(e.keyCode == 68) {
       keys.right = true;
   }
}
// This function is called when the pressed key is released
function keyup(e) {
   if(e.keyCode == 65) {
       keys.left = false;
   }
   if(e.keyCode == 32) {
       if(player.y_v < -2) {
       player.y_v = -3;
       }
   }
   if(e.keyCode == 68) {
       keys.right = false;
   }
} 
function loop() {
   // If the player is not jumping apply the effect of frictiom
   if(player.jump == false) {
       player.x_v *= friction;
   } else {
       // If the player is in the air then apply the effect of gravity
       player.y_v += gravity;
   }
   player.jump = true;
   // If the left key is pressed increase the relevant horizontal velocity
   if(keys.left) {
       player.x_v = -2.5;
   }
   if(keys.right) {
       player.x_v = 2.5;
   }
   // Updating the y and x coordinates of the player
   player.y += player.y_v;
   player.x += player.x_v;
   // A simple code that checks for collions with the platform
   let i = -1;
   if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width &&
   platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height){
       i = 0;
   }
   if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width &&
   platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
       i = 1;
   }
   if (i > -1){
       player.jump = false;
       player.y = platforms[i].y;    
   }
   // Rendering the canvas, the player and the platforms
   rendercanvas();
   renderplayer();
   renderplat();
}
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
ctx.canvas.height = 720;
ctx.canvas.width = 720;
createplat();
// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,22);