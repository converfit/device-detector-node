var assert      = require('assert');
var requirejs   = require('requirejs');

var devices     = require('./device-test.json');

const DeviceDetector    = require('../index');
const detector    = new DeviceDetector();


describe("Test user agent", function () {
    for (var i in devices) {
      let device = devices[i];
      describe(device.desc,function(){
        let result = detector.detect(device.ua);
        it('model should return ' + device.expect.model, function () {
            assert.equal(device.expect.model, result.device.model);
        });
      });
    }
});
