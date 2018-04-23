const DeviceDetector    = require('../index');
const detector    = new DeviceDetector();

var user_agents =  [
  "Mozilla/5.0 (Linux; U; Android 6.0.1; en-US; SM-G920F Build/LMY47X) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.10.0.796 U3/0.8.0 Mobile Safari/534.30",
  "Mozilla/5.0 (Linux; Android 7.0; WAS-TL10 Build/HUAWEIWAS-TL10; xx-xx) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 7.1.1; SM-N950F Build/NMF26X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 6.0; SAMSUNG SM-G935F Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36"
];
for(var i= 0, l = user_agents.length; i < l; i++){
   console.log(detector.detect(user_agents[i]));
}
