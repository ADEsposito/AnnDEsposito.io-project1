console.log("yup");

var scoreCounter = 0;
var shotsLeftCounter = 10;
var successfulHitsCounter = 0;

var zombieIndex = 0;

var ctx;
var backgroundImage;
var zombieImage;
var x = 0;
var y = 0;
var numOfZombies = 10;
var fallingZombies = [];

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0);
}

canvas.addEventListener('click', function(event) {
  lastDownTarget = event.target;
  var mousePos = getMousePos(canvas, event);
  var clickX = mousePos.x;
  var clickY = mousePos.y;
  if(shotsLeftCounter > 0) {
    checkZombieClick(clickX, clickY)
  }
}, false);


function checkZombieClick(mouseX, mouseY){
  var xCheck = false;
  var yCheck = false;

  for(i = 0; i < fallingZombies.length; i++) {

    var rightBoundX = updateFallingZombies()[i].x + 100;
    var upperBoundY = updateFallingZombies()[i].y;
    var leftBoundX = updateFallingZombies()[i].x;
    var lowerBoundY = updateFallingZombies()[i].y + 100;

    if (((mouseX <= rightBoundX) && (mouseX >= leftBoundX)) && ((mouseY >= upperBoundY) && (mouseY <= lowerBoundY))) {
      xCheck = true;
      yCheck = true;

      zombieIndex = i;
    }
  }


  if (xCheck === true && yCheck === true) {
      shotsLeftCounter--;
      successfulHitsCounter += 1;
      scoreCounter += 100;
      fallingZombies.splice(zombieIndex, 1)
      numOfZombies--
    }
    else {
      shotsLeftCounter--;
    }
    $('#shots').text("SHOTS LEFT : " + shotsLeftCounter);
    $('#hits').text("HITS : " + successfulHitsCounter);
    $('#score').text("SCORE : " + scoreCounter);
}


function updateFallingZombies(){
  return fallingZombies
}

function draw() {
  if(shotsLeftCounter === 0){
    $('#shots').text("SHOTS LEFT : 0");
    $('h1').text("FINAL SCORE : " + scoreCounter);
    clearInterval(animate)
  }
  // clear the canvas
  ctx.clearRect(0,0, canvas.width,canvas.height);
  drawBackground();

  for (var i=0; i< numOfZombies; i++) {
    ctx.drawImage (updateFallingZombies()[i].image, updateFallingZombies()[i].x, updateFallingZombies()[i].y);

    // set speed of falling for zombies
    fallingZombies[i].y += fallingZombies[i].speed;
    // repeat the zombies when they go off the canvas
    if (fallingZombies[i].y > 600) {
      // account for the size of the zombie image (100 x 100)
      fallingZombies[i].y = -100
      // zombies appear randomly along width of canvas
      fallingZombies[i].x = Math.random() * 1200;
    }
  }
}

function setup() {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');

    backgroundImage = new Image();
    backgroundImage.src = "https://static1.squarespace.com/static/512c621be4b03f854ef23109/515e08eee4b0f7be5031f2ae/51783cc3e4b054c7ac3a3c15/1404352428072/Hospitals++38.jpg?format=1500w";

    for (var i = 0; i < numOfZombies; i++) {
      var fallingZ = new Object();
      fallingZ["image"] =  new Image();
      fallingZ.image.src = 'http://img.allnurses.com/avatars/Halloween/xZombie2.png.pagespeed.ic.llCqg5-WsN.png';

      fallingZ["x"] = Math.random() * 1200;
      fallingZ["y"] = Math.random() * 5;
      fallingZ["speed"] = 3 + Math.random() * 5;
      fallingZombies.push(fallingZ);
    }
  }
}

// TRY TO FLESH THIS OUT RATHER THAN USE SETINTERVAL
/* function animate(){

  window.requestAnimationFrame(animate)
}
*/

setup();
var animate = setInterval(draw, 36);
