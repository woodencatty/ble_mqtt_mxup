var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
  BatteryLevelCharacteristic.super_.call(this, {
    uuid: '2A63',
    properties: ['read', 'write'],
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

    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer("howlongmessageyoucansend"));
  
};

BatteryLevelCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

  console.log(data.toString());
   console.log(offset)
      callback(this.RESULT_UNLIKELY_ERROR);
  
};

module.exports = BatteryLevelCharacteristic;