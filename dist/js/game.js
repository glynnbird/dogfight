var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var scorecardcanvas = document.getElementById('scorecard');
var scorecardcontext = scorecardcanvas.getContext('2d');

var lagged = true;
//var pathBits =  location.pathname.replace(/^\//, '').split('/');
var myColour = 'white';
var gameId = '1'

var theirColour = (myColour == "white") ? "red" : "white"

// the cloud
var cloud = new Image();
cloud.src = 'img/cloud.png'

// the sun
var sun = new Image();
sun.src = 'img/sun.png';

// their plane
var theirPlane = new Plane(canvas, theirColour, 'img/plane-'+theirColour+'.png', 30, 90);

// my plane
var myPlane = new Plane(canvas, myColour, 'img/plane-'+myColour+'.png', 450, 540);

// fire sound
var audio = new Audio('audio/metal.mp3');

var whiteJoystick = 0;
var redJoystick = 0;
var whiteFire = false;
var redFire = false;
var flipflop = false;

var pad = function(str) {
  str = parseInt(str).toString();
  return ('     ' + str).slice(-5);
}

var drawScorecard = function() {
  scorecardcontext.clearRect(0,0, scorecardcanvas.width, scorecardcanvas.height);
  scorecardcontext.font = '15px courier, monospace';
  scorecardcontext.strokeStyle = theirColour;
  scorecardcontext.strokeText('HITS' + pad(theirPlane.hits),10, 22);
  scorecardcontext.strokeText('RNDS' + pad(theirPlane.rounds),10, 35);
  scorecardcontext.strokeStyle = myColour;
  scorecardcontext.strokeText('HITS' + pad(myPlane.hits),10, 72);
  scorecardcontext.strokeText('RNDS' + pad(myPlane.rounds),10, 85);
}

setInterval(function() {
  
  context.clearRect(0,0, canvas.width, canvas.height);
  context.drawImage(sun,600,6);
  
  theirPlane.processJoystick(redJoystick);

  myPlane.processJoystick(whiteJoystick);
  flipflop = !flipflop;
  if (whiteFire) {
    if (flipflop === false) {
      if (myPlane.rounds > 0) {
        // http://soundbible.com/1804-M4A1-Single.html
        var audio = new Audio('audio/fire.mp3');
      } else {
        // http://soundbible.com/1405-Dry-Fire-Gun.html
        var audio = new Audio('audio/empty.mp3');
      }
      audio.play();
      myPlane.fire();
    }
  } else if (redFire) {
    if (flipflop === false) {
      if (theirPlane.rounds > 0) {
        // http://soundbible.com/1804-M4A1-Single.html
        var audio = new Audio('audio/fire.mp3');
      } else {
        // http://soundbible.com/1405-Dry-Fire-Gun.html
        var audio = new Audio('audio/empty.mp3');
      }
      audio.play();
      theirPlane.fire();
    }
  } else {
    flipflop = true;
  }
  
  if (myPlane.missileCollides(theirPlane.x, theirPlane.y)) {
    myPlane.recordHit();
  }
  if (theirPlane.missileCollides(myPlane.x, myPlane.y)) {
    theirPlane.recordHit();
  }
  
  var myPosition = {
    x: myPlane.x,
    y: myPlane.y,
    rounds: myPlane.rounds,
    missile: myPlane.missile,
    direction: myPlane.direction
  }

  myPlane.redraw();
  theirPlane.redraw();
  context.drawImage(cloud,200,150);
  drawScorecard();
}, 50);

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 37) {
    whiteJoystick=-1;
  }
  if (evt.keyCode == 39) {
    whiteJoystick=1;
  }  
  if (evt.keyCode == 32) {
    whiteFire=true;
  }
  if (evt.keyCode == 81) {
    redJoystick=-1;
  }
  if (evt.keyCode == 87) {
    redJoystick=1;
  }
  if (evt.keyCode == 65) {
    redFire=true;
  }
};

document.onkeyup = function(evt) {
  if (evt.keyCode == 39) {
    whiteJoystick = 0;
  }
  if (evt.keyCode == 32) {
    whiteFire=false;
  }
  if (evt.keyCode == 81) {
    redJoystick=0;
  }
  if (evt.keyCode == 87) {
    redJoystick=0;
  }
  if (evt.keyCode == 65) {
    redFire=false;
  }
};

const onRUp = function() {
  redJoystick = 1
}
const onRDown = function() {
  redJoystick = -1
}
const onRFire = function() {
  redFire = true
}
const onRCancel = function() {
  redFire = false
  redJoystick = 0
}

const onLUp = function() {
  whiteJoystick = 1
}
const onLDown = function() {
  whiteJoystick = -1
}
const onLFire = function() {
  whiteFire = true
}
const onLCancel = function() {
  whiteFire = false
  whiteJoystick = 0
}
