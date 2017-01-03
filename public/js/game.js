var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var scorecardcanvas = document.getElementById('scorecard');
var scorecardcontext = scorecardcanvas.getContext('2d');

// the cloud
var cloud = new Image();
cloud.src = 'img/cloud.png';


// the sun
var sun = new Image();
sun.src = 'img/sun.png';

// red plane
var redPlane = new Plane(canvas, 'red', 'img/plane-red.png', 30, 90);

// white plane
var whitePlane = new Plane(canvas, 'white', 'img/plane-white.png', 450, 540);

var joystick = 0;
var fire = false;
var flipflop = false;

var pad = function(str) {
  return ('     ' + str).slice(-5);
}

var drawScorecard = function() {
  scorecardcontext.clearRect(0,0, scorecardcanvas.width, scorecardcanvas.height);
  scorecardcontext.font = '15px courier, monospace';
  scorecardcontext.strokeStyle = 'red';
  scorecardcontext.strokeText('HITS' + pad(redPlane.hits),20, 12);
  scorecardcontext.strokeText('RNDS' + pad(redPlane.rounds),20, 25);
  scorecardcontext.strokeStyle = 'white';
  scorecardcontext.strokeText('HITS' + pad(whitePlane.hits),215, 12);
  scorecardcontext.strokeText('RNDS' + pad(whitePlane.rounds),215, 25);
}

setInterval(function() {
  
  context.clearRect(0,0, canvas.width, canvas.height);
  context.drawImage(sun,750,6);
  redPlane.processJoystick(0);
  redPlane.redraw();
  whitePlane.processJoystick(joystick);
  if (fire) {
    if (flipflop === false) {
      whitePlane.fire();
    }
    flipflop = !flipflop;
  } else {
    flipflop = false;
  }
  if (whitePlane.missileCollides(redPlane.x, redPlane.y)) {
    redPlane.loseLife();
  }
  whitePlane.redraw();
  context.drawImage(cloud,300,180);

  drawScorecard();
}, 50);

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 37 || evt.keyCode == 65) {
    joystick=-1;
  }
  if (evt.keyCode == 39 || evt.keyCode == 68) {
    joystick=1;
  }  
  if (evt.keyCode == 32) {
    fire=true;
  }
};

document.onkeyup = function(evt) {
  joystick = 0;
  fire = false;
};