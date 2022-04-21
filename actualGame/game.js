var canvas = document.getElementById("canvas"); ctx = canvas.getContext("2d"); width = 1000, height = 400, //canvas dimensions
player = { x: (2), y: 200, width: 38, height: 49, speed: 3, velX: 0, velY: 0, jumping: false, grounded: false, color: "red" }
keys = [], boxes = [], carrots = [], lava = [], end = [], friction = 0.8, gravity = 0.4; 
//            |---Position---| |------Dimensions------|                                 |Where You're Sent|
carrots.push({ x: 460, y: 350, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });//First spike
carrots.push({ x: 665, y: 289, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });//Second spike
carrots.push({ x: 925, y: 195, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });//Third spike
carrots.push({ x: 760, y: 130, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });//Fourth spike
carrots.push({ x: 680, y: 115, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });//Fifth spike
carrots.push({ x: 330, y: 180, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });// Sixth spike
carrots.push({ x: 030, y: 130, width: 020, height: 020, color: 'purple', effect: 'tele', px: 20, py: 370 });//Win platform spike
   lava.push({ x: 090, y: 388, width: 900, height: 008, color: 'red',    effect: 'tele', px: 20, py: 370 }); //Lava
    end.push({ x: 000, y: 050, width: 100, height: 100, color: 'blue',   effect: 'win',  px: 20, py: 370 }); //End goal
  boxes.push({ x: 000, y: 110, width: 010, height: 400, color: 'green'  });//Bottom left wall
  boxes.push({ x: 000, y: 000, width: 010, height: 085, color: 'green'  });//Top left wall
  boxes.push({ x: 000, y: 390, width:1000, height: 050, color: 'orange' });//Bottom wall
  boxes.push({ x: 990, y: 000, width: 050, height: 400, color: 'yellow' });//Right wall
  boxes.push({ x: 000, y: 350, width: 090, height: 050, color: '#655643' });//Start platform
  boxes.push({ x: 200, y: 325, width: 130, height: 030, color: '#655643' });//Second platform
  boxes.push({ x: 400, y: 350, width: 150, height: 030, color: '#655643' });//Third platform
  boxes.push({ x: 610, y: 290, width: 090, height: 030, color: '#655643' });//Fourth platform
  boxes.push({ x: 730, y: 250, width: 100, height: 030, color: 'black'   });//Fifth platform
  boxes.push({ x: 900, y: 200, width: 050, height: 030, color: 'red'     });//Sixth platform
  boxes.push({ x: 760, y: 135, width: 065, height: 030, color: 'blue'    });//Seventh platform
  boxes.push({ x: 680, y: 120, width: 070, height: 030, color: 'blue'    });//Eigth platform
  boxes.push({ x: 500, y: 200, width: 090, height: 025, color: '#655643' });//Ninth platform
  boxes.push({ x: 300, y: 180, width: 080, height: 025, color: '#655643' });//Tenth platform
  boxes.push({ x: 200, y: 160, width: 030, height: 025, color: '#655643' });//Eleventh platform
  boxes.push({ x: 000, y: 130, width: 095, height: 025, color: '#655643' });//Goal platform
canvas.width = width; canvas.height = height;

function update() {
   if (keys[38] || keys[32] || keys[87]) { if (!player.jumping && player.grounded) { player.jumping = true; player.grounded = false; player.velY = -player.speed * 2.5; /*how high to jump*/ } }// up arrow or space
   if (keys[39] || keys[68]) { if (player.velX < player.speed)  { player.velX++; } }// right arrow
   if (keys[37] || keys[65]) { if (player.velX > -player.speed) { player.velX--; } } // left arrow
   player.velX *= friction; player.velY += gravity; player.grounded = false;
   ctx.clearRect(0, 0, width, height); ctx.beginPath();//?????????????
   for (var i = 0; i < boxes.length; i++) {//print platforms
      ctx.fillStyle = boxes[i].color; ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
      var dir = colCheck(player, boxes[i]);
      if (dir === "l" || dir === "r") { player.velX = 0; player.jumping = false; } else if (dir === "b") { player.grounded = true; player.jumping = false; } else if (dir === "t") { player.velY *= -1; }
   }
   if(player.grounded){ player.velY = 0; } player.x += player.velX; player.y += player.velY;
   ctx.fill(); ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height);
   for(var j = 0; j < carrots.length; j++) {
      ctx.fillStyle = carrots[j].color; ctx.fillRect(carrots[j].x, carrots[j].y, carrots[j].width, carrots[j].height);
      if(colCheck(player, carrots[j])!==null) { if (carrots[j].effect==='tele') { player.x=carrots[j].px; player.y=carrots[j].py; } else if (carrots[j].effect==='win') { window.open("Maccas-win.html"); } }
   }
   for(var j = 0; j < lava.length; j++) {
      ctx.fillStyle = lava[j].color; ctx.fillRect(lava[j].x, lava[j].y, lava[j].width, lava[j].height);
      if(colCheck(player, lava[j])!==null) { if (lava[j].effect==='tele') { player.x=lava[j].px; player.y=lava[j].py; } }
   }
   for(var j = 0; j < end.length; j++) {
      ctx.fillStyle = end[j].color; ctx.fillRect(end[j].x, end[j].y, end[j].width, end[j].height);
      if(colCheck(player, end[j])!==null) { if (end[j].effect==='win') { player.x=end[j].px; player.y=end[j].py; } }
   }
   requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
   var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), hWidths = (shapeA.width / 2) + (shapeB.width / 2), hHeights = (shapeA.height / 2) + (shapeB.height / 2), colDir = null;
   if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
      if (oX >= oY) { if(vY > 0) { colDir = "t"; shapeA.y += oY;} else { colDir = "b"; shapeA.y -= oY; } }
      else { if(vX > 0) { colDir = "l"; shapeA.x += oX; } else { colDir = "r"; shapeA.x -= oX; } }
   }
   return colDir;
}
document.body.addEventListener("keydown", function (e) { keys[e.keyCode] = true; }); document.body.addEventListener("keyup", function (e) { keys[e.keyCode] = false; }); window.addEventListener("load", function () { update(); });