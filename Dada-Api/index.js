var five = require('johnny-five');
var board = new five.Board({
  port: "/dev/cu.usbmodem1421"
});

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  this.pinMode(13, this.MODES.OUTPUT);

  this.loop(500, () => {
    // Whatever the last value was, write the opposite
    this.digitalWrite(13, this.pins[12].value ? 0 : 1);
  });
});
