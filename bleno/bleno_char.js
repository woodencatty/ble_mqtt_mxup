var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
  BatteryLevelCharacteristic.super_.call(this, {
    uuid: '2A63',
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

    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer("howlongmessageyoucansend"));
  
};

BatteryLevelCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log(data);

  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  } else if (data.length !== 3) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  } else {
   console.log(data);
      callback(this.RESULT_SUCCESS);
  }
};

module.exports = BatteryLevelCharacteristic;