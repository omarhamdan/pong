(function($) {
  "use strict";

  let unit = 1;
  let pongWidth = 600;
  let pongHeight = 450;

  let Pong = function(options) {
    this.$elem = $(options.elem);
    this.unit = unit;
    this.unitWidth = pongWidth;
    this.unitHeight = pongHeight;
    this.stop = false;
    this.run();
  }

  Pong.prototype.run = function() {
    this.$elem.width(this.unitWidth * this.unit).height(this.unitHeight * this.unit);
    this.ball = new Ball({
      elem: ".ball"
    });
    this.ball.pong = this;
    this.start();
  }

  Pong.prototype.start = function() {
    let _this = this;
    $('.stop-button').click(function() {
      if ($(this).text() === "Stop!") {
         $(this).text('Resume');
        _this.stop = true;
      } else {
        $(this).text('Stop!');
        _this.stop = false;
        _this.ball.move();
      }
    });

    this.ball.move();
  }

  let Ball = function(options) {
    this.$elem = $(options.elem);
    this.unit = unit;
    this.unitWidth = 15;
    this.unitHeight = 15;

    /* Represent Position */
    this.x = 0;
    this.y = 0;

    /* Represent Direction */
    this.xDirection = 1;
    this.yDirection = 1;

    /* Represent Magnitude */
    this.xMagnitude = 1;
    this.yMagnitude = 1;

    this.$elem.width(this.unitWidth * this.unit).height(this.unitHeight * this.unit);
  }

  Ball.prototype.move = function() {
    this.y = this.y + (this.yDirection * this.yMagnitude * this.unit);
    this.x = this.x + (this.xDirection * this.xMagnitude * this.unit);

    this.$elem.css({
      bottom : (this.y) + 'px',
      left: (this.x) + 'px'
    });

    setTimeout(this.checkObstacles.bind(this), 0);
  }

  Ball.prototype.checkObstacles = function() {
    let rightMost = this.x + this.unitWidth;
    let topMost = this.y + this.unitHeight;

    let topRightCorner = (rightMost === pongWidth) && (topMost === pongHeight) && this.xDirection === 1 && this.yDirection === 1;
    let topLeftCorner = (this.x === 0) && (topMost === pongHeight) && this.xDirection === -1 && this.yDirection === 1;
    let bottomRightCorner = (rightMost === pongWidth) && (this.y === 0) && this.xDirection === 1 && this.yDirection === -1;
    let bottomleftCorner = (this.x === 0)  && (this.y === 0) && this.xDirection === -1 && this.yDirection === -1;

    /* if corner */
    if (topRightCorner || topLeftCorner || bottomRightCorner || bottomleftCorner) {
      this.xDirection = -this.xDirection;
      this.yDirection = -this.yDirection;
    } else {
      /* if border */
      if ((rightMost >= pongWidth) || this.x < 1) {
        /* symmetry wrt x-axis */
        this.xDirection = -this.xDirection;
      } else if ((topMost >= pongHeight) || this.y < 1) {
        /* symmetry wrt y-axis */
        this.yDirection = -this.yDirection;
      }
    }

    if (!this.pong.stop) {
      this.move();
    }
  }



  $(function() {
    new Pong({
      elem: ".grid"
    });
  });

})(window.jQuery);

