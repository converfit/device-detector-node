const DeviceDetector    = require('../index');
const detector    = new DeviceDetector();

var user_agents =  [
  "Mozilla/5.0 (Linux; U; Android 6.0.1; en-US; SM-G920F Build/LMY47X) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.10.0.796 U3/0.8.0 Mobile Safari/534.30",
  "Mozilla/5.0 (Linux; Android 7.0; WAS-TL10 Build/HUAWEIWAS-TL10; xx-xx) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36"

];
for(var i= 0, l = user_agents.length; i < l; i++){
   console.log(detector.detect(user_agents[i]));
}
