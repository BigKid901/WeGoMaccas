var canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d"); width = 1000, height = 400, //canvas dimensions
        player = { x: (2), y: 200, width: 38, height: 49, speed: 3, velX: 0, velY: 0, jumping: false, grounded: false, color: "red" }

        /*ARRAYS*/
        keys = [] /*something for controls*/, boxes = [] /*array of platforms*/, carrots = [] /*array of power ups*/,  lava = [], end = [], friction = 0.8, gravity = 0.4; 

        //Carrots
        carrots.push({ x: 460, y: 350, width: 20, height: 20, color: 'purple', effect: 'tele', stay: true, px: 20, py: 370 });
        carrots.push({ x: 665, y: 289, width: 20, height: 20, color: 'purple', effect: 'tele', stay: true, px: 20, py: 370 });
        carrots.push({ x: 925, y: 195, width: 20, height: 20, color: 'purple', effect: 'tele', stay: true, px: 20, py: 370 });
        carrots.push({ x: 760, y: 130, width: 20, height: 20, color: 'purple', effect: 'tele', stay: true, px: 20, py: 370 });
        carrots.push({ x: 680, y: 115, width: 20, height: 20, color: 'purple', effect: 'tele', stay: true, px: 20, py: 370 });
        carrots.push({ x: 30, y: 130, width: 20, height: 20, color: 'purple', effect: 'tele', stay: true, px: 20, py: 370 });
        carrots.push({ x: 330, y: 180, width: 20, height: 20, color: 'purple', effect: 'tele', rotate: 20, stay: true, px: 20, py: 370 });

        //Lava
        lava.push({ x: 90, y: 388, width: 900, height: 8, color: 'red', effect: 'tele', rotate: 0, stay: true, px: 20, py: 370 });

        //End goal
        end.push({ x: 0, y: 50, width: 100, height: 100, color: 'blue', effect: 'win', rotate: 0, stay: true, px: 20, py: 370 });;

        // dimensions
        boxes.push({ x: 0, y: height/4+10, width: 10, height: height, color: 'green' });
        boxes.push({ x: 0, y: 0, width: 10, height: height/4-15, color: 'green' });
        boxes.push({ x: 0, y: height - 10, width: width, height: 50, color: 'orange' });
        boxes.push({ x: width - 10, y: 0, width: 50, height: height, color: 'yellow' });

        boxes.push({ x: 0, y: 350, width: 90, height: 50, color: '#655643' });//Start block
        boxes.push({ x: 200, y: 325, width: 130, height: 30, color: '#655643' });//First platform
        boxes.push({ x: 400, y: 350, width: 150, height: 30, color: '#655643' });//Second platform
        boxes.push({ x: 610, y: 290, width: 90, height: 30, color: '#655643' });//Third block
        boxes.push({ x: 730, y: 250, width: 100, height: 30, color: 'black' });//Fourth platform
        boxes.push({ x: 900, y: 200, width: 50, height: 30, color: 'red' });//Fifth platform
        boxes.push({ x: 760, y: 135, width: 65, height: 30, color: 'blue' });//Sixth platform
        boxes.push({ x: 680, y: 120, width: 70, height: 30, color: 'blue' });//Seventh platform
        boxes.push({ x: 500, y: 200, width: 90, height: 25, color: '#655643' });//Eigth platform
        boxes.push({ x: 300, y: 180, width: 80, height: 25, color: '#655643' });//Ninth platform
        boxes.push({ x: 200, y: 160, width: 30, height: 25, color: '#655643' });//Tenth platform
        boxes.push({ x: 0, y: 130, width: 95, height: 25, color: '#655643' });//Eleventh platform

        canvas.width = width;
        canvas.height = height;


        function update() { // check keys 
            if (keys[38] || keys[32] || keys[87]) { if (!player.jumping && player.grounded) { player.jumping = true; player.grounded = false; player.velY = -player.speed * 2.5; /*how high to jump*/ } }// up arrow or space
            if (keys[39] || keys[68]) { if (player.velX < player.speed)  { player.velX++; } }// right arrow
            if (keys[37] || keys[65]) { if (player.velX > -player.speed) { player.velX--; } } // left arrow

            player.velX *= friction; player.velY += gravity;
    
            ctx.clearRect(0, 0, width, height); //?????????????
            ctx.beginPath();//?????????????
    
            player.grounded = false;
            for (var i = 0; i < boxes.length; i++) {//print platforms
                ctx.fillStyle = boxes[i].color;
                ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
                var dir = colCheck(player, boxes[i]);
                if (dir === "l" || dir === "r") { player.velX = 0; player.jumping = false; } else if (dir === "b") { player.grounded = true; player.jumping = false; } else if (dir === "t") { player.velY *= -1; }
            }

            if(player.grounded){ player.velY = 0; }
            player.x += player.velX; player.y += player.velY;
    
  
        ctx.fill();//Draw charater stuff
    
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);


    //draw carrots stuff 
    for(var j = 0; j < carrots.length; j++) {
      ctx.fillStyle = carrots[j].color;
      var cx = carrots[j].x + 0.5 * carrots[j].width, /* x of shape center */ cy = carrots[j].y + 0.5 * carrots[j].height; /* y of shape center */
      ctx.fillRect(carrots[j].x, carrots[j].y, carrots[j].width, carrots[j].height);
     
      //carrots collision
      if(colCheck(player, carrots[j])!==null) {//touched power up!
        if (carrots[j].effect==='tele') { player.x=carrots[j].px; player.y=carrots[j].py; }
        else if (carrots[j].effect==='win') { window.open("Maccas-win.html"); }
      }
    }

    //for lava
    for(var j = 0; j < lava.length; j++) {
        ctx.fillStyle = lava[j].color; var cx = lava[j].x + 0.5 * lava[j].width, /* x of shape center */ cy = lava[j].y + 0.5 * lava[j].height; /* y of shape center */ ctx.fillRect(lava[j].x, lava[j].y, lava[j].width, lava[j].height);
      
      //lava collision
      if(colCheck(player, lava[j])!==null) { if (lava[j].effect==='tele') { player.x=lava[j].px; player.y=lava[j].py; } } //touched power up!
    }
    
     //for end
     for(var j = 0; j < end.length; j++) {
        ctx.fillStyle = end[j].color; var cx = end[j].x + 0.5 * end[j].width, /* x of shape center */ cy = end[j].y + 0.5 * end[j].height; /* y of shape center */ ctx.fillRect(end[j].x, end[j].y, end[j].width, end[j].height);
      
      //end collision
      if(colCheck(player, end[j])!==null) { if (end[j].effect==='win') { player.x=end[j].px; player.y=end[j].py; } } //touched power up!
    }
 
    requestAnimationFrame(update);
}

    function colCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), // get the vectors to check against
    hWidths = (shapeA.width / 2) + (shapeB.width / 2), hHeights = (shapeA.height / 2) + (shapeB.height / 2), colDir = null;// add the half widths and half heights of the objects

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
            
        if(oX >= oY) {
            if(vY > 0) { colDir = "t"; shapeA.y += oY;}
            else { colDir = "b"; shapeA.y -= oY; } }
            else { if(vX > 0) { colDir = "l"; shapeA.x += oX; } else { colDir = "r"; shapeA.x -= oX; } }
    }
    return colDir;

}
        document.body.addEventListener("keydown", function (e) { keys[e.keyCode] = true; }); document.body.addEventListener("keyup", function (e) { keys[e.keyCode] = false; });
        window.addEventListener("load", function () { update(); });