console.log("yup");

var scoreCounter = 0;
var shotsLeftCounter = 10;
var successfulHitsCounter = 0;

var ctx;
var backgroundImage;
var zombieImage;
var x = 0;
var y = 0;
var numOfZombies = 5;
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

function draw() {
  // clear the canvas
  ctx.clearRect(0,0, canvas.width,canvas.height);
  drawBackground();

  for (var i=0; i< numOfZombies; i++) {
    // the falling zombies
    ctx.drawImage (fallingZombies[i].image, fallingZombies[i].x, fallingZombies[i].y);

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

    canvas.addEventListener('click', function(event) {
          lastDownTarget = event.target;
          console.log("click worked");
          var mousePos = getMousePos(canvas, event);
          var clickX = mousePos.x;
          var clickY = mousePos.y;
          console.log(clickX + " is the click X " + clickY + " is the click Y");
      }, false);

    backgroundImage = new Image();
    backgroundImage.src = "http://img11.deviantart.net/9f53/i/2013/023/7/4/hospital_corridor__1_by_montstar-d5sfata.jpg";
    setInterval(draw, 36);
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

setup();
/*
************* INITIAL START TO LOGIC, PLACES ONE IMAGE IN STATIC POSITION, LISTENS FOR CLICK, RESPONDS APPROPRIATELY IF IS A HIT OR MISS *************
var randomXLocation = function() {
  console.log("X")
  var xMinimum = 0;
  var xMaximum = 600;
  randomX = Math.floor(Math.random() * (xMaximum - xMinimum + 1)) + xMinimum;
}

var randomYLocation = function() {
  console.log("Y")
  var yMinimum = 0;
  var yMaximum = 600;
  randomY = Math.floor(Math.random() * (yMaximum - yMinimum + 1) + yMinimum);
}


var generateImageLocation = function() {
  randomXLocation();
 randomYLocation();

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var image = document.getElementById("zombie");
  ctx.drawImage(image, randomX, randomY, 50, 50);
  var rightBoundX = randomX + 50;
  var upperBoundY = randomY;
  var leftBoundX = randomX;
  var lowerBoundY = randomY + 50;
  var xCheck = false;
  var yCheck = false;

  canvas.addEventListener('click', function(event) {
    console.log("clicked zombie");
    //console.log(randomX + "is the X of the image " + randomY + " is the Y of the image");
    var mousePos = getMousePos(canvas, event);
    var clickX = mousePos.x;
    var clickY = mousePos.y;
    //console.log(clickX + " is the click X " + clickY + " is the click Y");

    //image is 50 x 50 px
    //coordinates of image start at top left corner (randomX & randomY)
    //max X of click must be between randomX & randomX + 50
    //max Y of click must be between randomY & randomY - 50
    if ((clickX <= rightBoundX) && (clickX >= leftBoundX)) {
      //console.log("X Check");
      //console.log(rightBoundX + " is the Right Edge. " + leftBoundX + " is the Left Edge.")
      xCheck = true;
    }
    if ((clickY >= upperBoundY) && (clickY <= lowerBoundY)) {
      //console.log("Y Check");
      //console.log(upperBoundY + " is the Upper Edge. " + lowerBoundY + " is the Lower Edge.")
      yCheck = true;
    }


    if (xCheck === true && yCheck === true) {
      console.log("Hit!");
      shotsLeftCounter -= 1;
      successfulHitsCounter += 1;
      scoreCounter += 100;
      console.log(shotsLeftCounter + " shots left. " + successfulHitsCounter + " successful hits. " + scoreCounter + " is your score.")
    }
    else {
      console.log("Miss!");
      shotsLeftCounter -= 1;
      console.log(shotsLeftCounter + " shots left. " + successfulHitsCounter + " successful hits. " + scoreCounter + " is your score.")
    }
    $('#shots').text("SHOTS LEFT : " + shotsLeftCounter);
    $('#hits').text("HITS : " + successfulHitsCounter);
    $('#score').text("SCORE : " + scoreCounter);
  })
  }

generateImageLocation();
*/
