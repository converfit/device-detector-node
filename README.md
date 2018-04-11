# Device Detector for Nodejs

This package is a port of matomo-org/device-detector from nodejs based on sanchezzzhak first port. Also use ua-parse-js package to complete some information that the matomo package don't provide.

## Installation

Using npm:

```shell
$ npm install --save device-detector-node
```
## Usage
Just add migatoseneca/nodejs-device-detector to your projects requirements. And use some code like this one:


```js
const DeviceDetector = require('../index');
const detector = new DeviceDetector();

let user_agent = 'Mozilla/5.0 (Linux; U; Android 6.0.1; en-US; SM-G920F Build/LMY47X) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.10.0.796 U3/0.8.0 Mobile Safari/534.30';

console.log(detector.detect(user_agent));

/**
 * {
 *  browser: {
 *    type: 'browser',
 *    name: 'UC Browser',
 *    version: '10.10',
 *    engine: '',
 *    engine_version: ''
 *  },
 *  device: {
 *    vendor: 'Samsung',
 *    type: 'mobile',
 *    model: 'GALAXY S6'
 *  },
 *  os: {
 *    name: 'Android',
 *    version: '6.0',
 *    platform: 'x64'
 *  }
 * }
 */
```

Last update: 2018/04/12
