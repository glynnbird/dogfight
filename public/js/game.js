var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var scorecardcanvas = document.getElementById('scorecard');
var scorecardcontext = scorecardcanvas.getContext('2d');

var lagged = true;
var myColour = location.pathname.replace("/", "");
var theirColour = (myColour == "white") ? "red" : "white"
var sns = new SNSClient('dogfight', {
  userData: {
    type: "dogfight",
    colour: myColour
  },
  userQuery: {
    type: "dogfight"
  }
});

// the cloud
var cloud = new Image();
cloud.src = 'img/cloud.png';


// the sun
var sun = new Image();
sun.src = 'img/sun.png';

// their plane
var theirPlane = new Plane(canvas, theirColour, 'img/plane-'+theirColour+'.png', 30, 90);

// my plane
var myPlane = new Plane(canvas, myColour, 'img/plane-'+myColour+'.png', 450, 540);

// fire sound
var audio = new Audio('audio/metal.mp3');

var joystick = 0;
var fire = false;
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
  var acc = 0;
  if (theirPlane.rounds < 512) {
    acc = 100 * myPlane.hits/(512 - theirPlane.rounds);
  }
  scorecardcontext.strokeText('ACC ' + pad(acc),10, 48);
  scorecardcontext.strokeStyle = myColour;
  scorecardcontext.strokeText('HITS' + pad(myPlane.hits),10, 72);
  scorecardcontext.strokeText('RNDS' + pad(myPlane.rounds),10, 85);
    var acc = 0;
  if (myPlane.rounds < 512) {
    acc = 100 * theirPlane.hits/(512 - myPlane.rounds);
  }
  scorecardcontext.strokeText('ACC ' + pad(acc),10, 96);
}

setInterval(function() {
  
  context.clearRect(0,0, canvas.width, canvas.height);
  context.drawImage(sun,750,6);
  
  if (lagged) {
    theirPlane.processJoystick(theirPlane.joystick);
  }
  lagged = true;
  
  theirPlane.redraw();
  myPlane.processJoystick(joystick);
  if (fire) {
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
    flipflop = !flipflop;
  } else {
    flipflop = false;
  }
  
  if (myPlane.missileCollides(theirPlane.x, theirPlane.y)) {
    myPlane.recordHit();
    sns.send({ type: 'dogfight', colour: theirColour }, { action: 'hit', colour: myColour })
  }
  
  var myPosition = {
    x: myPlane.x,
    y: myPlane.y,
    rounds: myPlane.rounds,
    missile: myPlane.missile,
    direction: myPlane.direction
  }

  sns.send({ type: 'dogfight', colour: theirColour }, { action: 'position', colour: myColour, data: myPosition })
  myPlane.redraw();
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

sns.on('notification', function(plane) {
  
  switch (plane.action) {

    case 'position':
      if (plane.colour == theirColour) {
        lagged = false;
        theirPlane.x = plane.data.x;
        theirPlane.y = plane.data.y;
        theirPlane.direction = plane.data.direction;
        theirPlane.missile = plane.data.missile;
        theirPlane.rounds = plane.data.rounds;
      }
      break;

    case 'hit':
      if (plane.colour == theirColour) {
        theirPlane.recordHit();
      }
      break;

  }
  
  
})