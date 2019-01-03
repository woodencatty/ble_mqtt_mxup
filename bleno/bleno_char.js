var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
  BatteryLevelCharacteristic.super_.call(this, {
    uuid: 'TEST',
    properties: ['read'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'test me baby'
      })
    ]
  });
};

util.inherits(BatteryLevelCharacteristic, Characteristic);

BatteryLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (os.platform() === 'darwin') {
    exec('pmset -g batt', function (error, stdout, stderr) {
      var data = stdout.toString();
      // data - 'Now drawing from \'Battery Power\'\n -InternalBattery-0\t95%; discharging; 4:11 remaining\n'
      var percent = "howlongmessageyoucansend"
      console.log(percent);
      callback(this.RESULT_SUCCESS, new Buffer([percent]));
    });
  } else {
    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer("howlongmessageyoucansend"));
  }
};

module.exports = BatteryLevelCharacteristic;