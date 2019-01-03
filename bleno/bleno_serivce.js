var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var BatteryLevelCharacteristic = require('./bleno_char');
var BatteryLevelCharacteristic2 = require('./bleno_char2');

function BatteryService() {
  BatteryService.super_.call(this, {
      uuid: '180F',
      characteristics: [
          new BatteryLevelCharacteristic(),
        new BatteryLevelCharacteristic2()
    ]
  });
}

util.inherits(BatteryService, BlenoPrimaryService);

module.exports = BatteryService;