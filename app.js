(function($) {
  "use strict";

  let unit = 1;
  const interations = 1000;

  let Pong = function(options) {
    this.$elem = $(options.elem);
    this.unit = unit;
    this.unitWidth = 600;
    this.unitHeight = 450;
    this.stopCounter = 0;
    this.run();
  }

  Pong.prototype.run = function() {
   this.$elem.width(this.unitWidth * this.unit).height(this.unitHeight * this.unit);
    let ball = this.ball = new Ball({
      elem: ".ball"
    });
    this.checkObstacles();
  }

  Pong.prototype.checkObstacles = function() {
    let hitObstacle = false;

    if ((this.ball.x + this.ball.unitWidth) === this.unitWidth) {
      this.ball.lastObstacle = "right";
      hitObstacle = true;
    } else if ((this.ball.y + this.ball.unitWidth) === this.unitHeight) {
      this.ball.lastObstacle = "bottom";
      hitObstacle = true;
    } else if (this.ball.x < 2) {
      this.ball.lastObstacle = "left";
      hitObstacle = true;
    } else if (this.ball.y < 2) {
      this.ball.lastObstacle = "top";
      hitObstacle = true;
    }

    if (hitObstacle) {
      this.ball.changeDirection();
      this.stopCounter++;
    }

    if (this.stopCounter !== interations) {
      this.move();
    }

  }

  Pong.prototype.move = function() {
    switch (this.ball.direction) {
      case "SE":
        this.ball.moveSouthEast();
        break;
      case "NE":
        this.ball.moveNorthEast();
        break;
      case "SW":
        this.ball.moveSouthWest();
        break;
      case "NW":
        this.ball.moveNorthWest();
        break;
    }

    setTimeout(this.checkObstacles.bind(this), 0);
  }


  let Ball = function(options) {
    this.$elem = $(options.elem);
    this.unit = unit;
    this.unitWidth = 15;
    this.unitHeight = 15;
    this.x = 2; // Start at 2 since checkObstacles is true for this.x < 2
    this.y = 2;

    this.direction = "SE";
    this.lastObstacle = null;
    this.angle = 30;

    this.$elem.width(this.unitWidth * this.unit).height(this.unitHeight * this.unit);
  }

  Ball.prototype.moveSouthEast = function() {
    this.$elem.css({
      top : (++this.y * this.unit) + 'px',
      left: (++this.x * this.unit) + 'px'
    });
  }

  Ball.prototype.moveNorthEast = function() {
    this.$elem.css({
      top : (--this.y * this.unit) + 'px',
      left: (++this.x * this.unit) + 'px'
    });
  }

  Ball.prototype.moveNorthWest = function() {
    this.$elem.css({
      top : (--this.y * this.unit) + 'px',
      left: (--this.x * this.unit) + 'px'
    });
  }

  Ball.prototype.moveSouthWest = function() {
    this.$elem.css({
      top : (++this.y * this.unit) + 'px',
      left: (--this.x * this.unit) + 'px'
    });
  }

  Ball.prototype.changeDirection = function() {
    switch (this.direction) {
      case "SE":
        if (this.lastObstacle === "right") {
          this.direction = "SW";
        } else {
          this.direction = "NE";
        }
        break;
      case "NE":
        if (this.lastObstacle === "right") {
          this.direction = "NW";
        } else {
          this.direction = "SE";
        }
        break;
      case "SW":
        if (this.lastObstacle === "left") {
          this.direction = "SE";
        } else {
          this.direction = "NW";
        }
        break;
      case "NW":
        if (this.lastObstacle === "left") {
          this.direction = "NE";
        } else {
          this.direction = "SW";
        }
        break;
    }
  }

  $(function() {
    new Pong({
      elem: ".grid"
    });
  });

})(window.jQuery);

