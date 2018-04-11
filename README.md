# Device Detector for Nodejs

This package is a port of matomo-org/device-detector from nodejs based on sanchezzzhak first port.

## Usage

ust add migatoseneca/nodejs-device-detector to your projects requirements. And use some code like this one:


```js
const Detector = require("./modules/device-detector-node/index");

var detector = new Detector();

console.log(detector.detect("Mozilla/5.0 (Linux; U; Android 4.1.2; zh-CN; Amaze 4G Build/JZO54K) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 UCBrowser/9.5.0.360 U3/0.8.0 Mobile Safari/533.1"));

```
