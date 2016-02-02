(function($) {
  "use strict";

  let unit = 15;

  let Pong = function(options) {
    this.$elem = $(options.elem);
    this.unit = unit;
    this.unitWidth = 40;
    this.unitHeight = 30;
    this.run();
  }

  Pong.prototype.run = function() {
   this.$elem.width(this.unitWidth * this.unit).height(this.unitHeight * this.unit);
  }



  $(function() {
    new Pong({
      elem: ".grid"
    });
  });

})(window.jQuery);

