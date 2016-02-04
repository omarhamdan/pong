(function($) {
  "use strict";

  let unit = 1;

  let Pong = function(options) {
    this.$elem = $(options.elem);
    this.unit = unit;
    this.unitWidth = 600;
    this.unitHeight = 450;
    this.run();
  }

  Pong.prototype.run = function() {
   this.$elem.width(this.unitWidth * this.unit).height(this.unitHeight * this.unit);
    let ball = this.ball = new Ball({
      elem: ".ball"
    });

    this.start();
  }

  Pong.prototype.checkObstacles = function() {

    let rightMost = this.ball.x + this.ball.unitWidth;
    let topMost = this.ball.y + this.ball.unitHeight;

    let topRightCorner = (rightMost === this.unitWidth) &&
                         (topMost === this.unitHeight) &&
                         this.ball.xDirection === 1 &&
                         this.ball.yDirection === 1;

    let topLeftCorner = (this.ball.x === 0) &&
                        (topMost === this.unitHeight) &&
                        this.ball.xDirection === -1 &&
                        this.ball.yDirection === 1;

    let bottomRightCorner = (rightMost === this.unitWidth) &&
                            (this.ball.y === 0) &&
                            this.ball.xDirection === 1 &&
                            this.ball.yDirection === -1;

    let bottomleftCorner = (this.ball.x === 0)  &&
                           (this.ball.y === 0) &&
                           this.ball.xDirection === -1 &&
                           this.ball.yDirection === -1;

    /* if corner */
    if (topRightCorner || topLeftCorner || bottomRightCorner || bottomleftCorner) {
      this.ball.xDirection = -this.ball.xDirection;
      this.ball.yDirection = -this.ball.yDirection;
    } else {
      /* if border */
      if ((rightMost >= this.unitWidth) || this.ball.x < 1) {
        /* symmetry wrt x-axis */
        this.ball.xDirection = -this.ball.xDirection;
      } else if ((topMost >= this.unitHeight) || this.ball.y < 1) {
        /* symmetry wrt y-axis */
        this.ball.yDirection = -this.ball.yDirection;
      }
    }

    setTimeout(this.move.bind(this), 0);
  }

  Pong.prototype.start = function() {
    let stop = true;
    $('.stop-button').click(function() {
      stop = false;
    });
    while (!stop) {
      this.ball.move();
      this.ball.checkObstacles();
    }
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
    this.xDirection = -1;
    this.yDirection = -1;

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
  }

  $(function() {
    new Pong({
      elem: ".grid"
    });
  });

})(window.jQuery);

