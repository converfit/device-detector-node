var assert      = require('assert');
var requirejs   = require('requirejs');

var DeviceDetector    = require('../index');
var browsers    = require('./browser-test.json');
var cpus        = require('./cpu-test.json');
var devices     = require('./device-test.json');
var engines     = require('./engine-test.json');
var os          = require('./os-test.json');

var detector    = new DeviceDetector();
var methods     = [
    {
        label       : 'browser',
        list        : browsers,
        properties  : ['name']
    },
    {
        label       : 'device',
        list        : devices,
        properties  : ['model', 'type', 'vendor']
    }
];




for (var i in methods) {
    describe(methods[i]['title'], function () {
        for (var j in methods[i]['list']) {
            if (!!methods[i]['list'][j].ua) {
                describe('[' + methods[i]['list'][j].desc + ']', function () {
                    describe('"' + methods[i]['list'][j].ua + '"', function () {
                        var expect = methods[i]['list'][j].expect;
                        var label = methods[i]['label']
                        var result = detector.detect(methods[i]['list'][j].ua);

                        /*
                        result = result[label];
                        methods[i]['properties'].forEach(function(m) {

                            it('should return ' + methods[i]['label'] + ' ' + m + ': ' + expect[m], function () {
                                assert.equal(result[m], expect[m] != 'undefined' ? expect[m] : undefined);
                            });

                        });
                        */
                    });
                });
            }
        }
    });
}
