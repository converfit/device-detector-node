# Device Detector for Nodejs

This package is a port of matomo-org/device-detector from nodejs based on sanchezzzhak first port

## Usage

Using DeviceDetector . Just add migatoseneca/nodejs-device-detector to your projects requirements. And use some code like this one:


```js
const detector = new require('device-detector-node');

console.dir(detector.findBrowser('user-agent'));
```
