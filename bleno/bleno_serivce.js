var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var BatteryLevelCharacteristic = require('./bleno_char');

function BatteryService() {
  BatteryService.super_.call(this, {
      uuid: '180F',
      characteristics: [
          new BatteryLevelCharacteristic()
      ]
  });
}

util.inherits(BatteryService, BlenoPrimaryService);

module.exports = BatteryService;