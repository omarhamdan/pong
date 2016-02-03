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

    this.move();
  }

  Pong.prototype.checkObstacles = function() {

    if (((this.ball.x + this.ball.unitWidth) === this.unitWidth) || this.ball.x < 1) {
      /* symmetry wrt x-axis */
      this.ball.xDirection = this.ball.xDirection * -1;
    } else if (((this.ball.y + this.ball.unitHeight) === this.unitHeight) || this.ball.y < 1) {
      /* symmetry wrt y-axis */
      this.ball.yDirection = this.ball.yDirection * -1;
    }

    setTimeout(this.move.bind(this), 5);
  }

  Pong.prototype.move = function() {

    this.ball.y = this.ball.y + (this.ball.yDirection * this.ball.yMagnitude * this.unit);
    console.log(this.ball.y);
    this.ball.x = this.ball.x + (this.ball.xDirection * this.ball.xMagnitude * this.unit);

    this.ball.$elem.css({
      bottom : (this.ball.y) + 'px',
      left: (this.ball.x) + 'px'
    });

    this.checkObstacles();
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

  $(function() {
    new Pong({
      elem: ".grid"
    });
  });

})(window.jQuery);

