var Plane = function(canvas, name, imageSrc, x, y) {
  var p = this;
  this.TO_RADIANS = Math.PI * 2 / 360.0;
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  this.name = name;
  this.img = new Image();
  this.img.src = imageSrc;
  this.x = x;
  this.y = y;
  this.missile = [];
  this.direction = 0;
  this.rounds = 512;
  this.hits = 0;
  this.hits = 0;
  this.joystick = 0;
  this.missileImage = new Image()
  this.missileImage.src = 'img/missile.png';

  // draw on load
  this.img.addEventListener('load', function() {
    p.redraw();
  }, false);

  this.processJoystick = function(j) {
    p.joystick = j;
    p.direction = (p.direction + j * 2) % 360;
    var r = p.direction * p.TO_RADIANS;
    p.x = p.x + -3 * Math.cos(r);
    p.y = p.y + -3 * Math.sin(r);

    // missile
    if (p.missile) {
      for (var i in p.missile) {
        var m = p.missile[i];
        if (m) {
          var r = m.direction * p.TO_RADIANS;
          m.x = m.x + -m.speed * Math.cos(r);
          m.y = m.y + -m.speed * Math.sin(r);
        
          // missile death
          if (m.x < 0 || m.y < 0 || m.x > W || m.y > H) {
            p.missile.splice(i, 1)
          }
        }
      }
    }

    // wrap around
    var W = p.canvas.width;
    var H = p.canvas.height;
    if (p.x < 0) { 
      p.x = W + p.x;
    }
    if (p.y < 0) {
      p.y = H + p.y;
    }
    if (p.x > W) { 
      p.x = p.x - W;
    }
    if (p.y > H) {
      p.y =  H - p.y;
    }
  }; 

  this.redraw = function() {
    var angleInRadians = p.direction * p.TO_RADIANS;
    p.context.translate(p.x, p.y);
    p.context.rotate(angleInRadians);
    p.context.drawImage(p.img, -p.img.width / 2, -p.img.height / 2);
    p.context.rotate(-angleInRadians);
    p.context.translate(-p.x, -p.y);
    if (p.missile) {
      p.missile.forEach(function(m) {
        if (m) {
          p.context.drawImage(p.missileImage, Math.floor(m.x), Math.floor(m.y));
        }
      });
    }
  };

  this.fire = function() {
    if (p.rounds > 0) {
      p.rounds--;
      var obj = {
        x: p.x,
        y: p.y,
        speed: 9,
        direction: p.direction
      };
      p.missile.push(obj);
    }
  };

  this.missileCollides = function(x, y) {
    var hit = false;
    if (p.missile) {
      // reverse through array to remove dead missiles
      for (i = p.missile.length; i >=0 ; i--) {
        var m = p.missile[i];
        if ( m && (m.x > x - 15 && m.x < x + 15) &&
              (m.y > y - 15 && m.y < y + 15)) {
          hit = true;
          p.missile.splice(i, 1)
        }
      }
      p.missile.forEach(function(m) {
        if ( m && (m.x > x - 5 && m.x < x + 5) &&
              (m.y > y - 5 && m.y < y + 5)) {
          hit = true;
          m = true;
        }
      });
    }
    
    return hit;
  }

  this.recordHit = function() {
    p.hits++;
    if (Math.random()>0.5) {
      var audio = new Audio('audio/clang.mp3');
    } else {
      var audio = new Audio('audio/metal.mp3');
    }
    audio.play();
  }
};
