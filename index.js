module.exports = DeviceDetector;
module.exports.DeviceDetector = DeviceDetector;

const UAparser = require('ua-parser-js');
const YAML = require('yamljs');


function getBaseRegExp(str) {
    str = str.replace(new RegExp('/', 'g'), '\\/');
    str = '(?:^|[^A-Z0-9\-_]|[^A-Z0-9\-]_|sprd-)(?:' + str + ')';
    return new RegExp(str, 'i');
}

function DeviceDetector(options) {
  this.base_path = __dirname + '/regexes';
  this.maxMinorParts = 1;
  this.browser_collection = [];
  this.os_collection = [];
  this.brand_collection = [];
	this.init();
}

DeviceDetector.prototype.init = function(){
  this.loadCollections();
};

DeviceDetector.prototype.loadCollections = function(){
  /**
   * Load collections on creation
   * it loads the collections by importance if the
   * parser detects a match won't keep with the
   * next collections
   */


  let path;

  this.collections = {
    client : {},
    device : {}
  };


  // Client Collections

  path = this.base_path + '/client/feed_readers.yml';
  this.collections.client.feed_readers  = YAML.load(path);

  path = this.base_path + '/client/libraries.yml';
  this.collections.client.libraries  = YAML.load(path);

  path = this.base_path + '/client/mediaplayers.yml';
  this.collections.client.mediaplayers  = YAML.load(path);

  path = this.base_path + '/client/mobile_apps.yml';
  this.collections.client.mobile_apps  = YAML.load(path);

  path = this.base_path + '/client/pim.yml';
  this.collections.client.pim  = YAML.load(path);

  path = this.base_path + '/client/browsers.yml';
  this.collections.client.browsers  = YAML.load(path);

  // Device Collections

  path = this.base_path + '/device/mobiles.yml';
  this.collections.device.mobiles  = YAML.load(path);

  path = this.base_path + '/device/cameras.yml';
  this.collections.device.cameras  = YAML.load(path);

  path = this.base_path + '/device/car_browsers.yml';
  this.collections.device.car_browsers  = YAML.load(path);

  path = this.base_path + '/device/consoles.yml';
  this.collections.device.consoles  = YAML.load(path);

  path = this.base_path + '/device/portable_media_player.yml';
  this.collections.device.portable_media_player  = YAML.load(path);

  path = this.base_path + '/device/televisions.yml';
  this.collections.device.televisions  = YAML.load(path);


  // Bots Collections

  path = this.base_path + '/bots.yml';
  this.collections.bots  = YAML.load(path);

  // OS Collections

  path = this.base_path + '/oss.yml';
  this.collections.oss  = YAML.load(path);

};


DeviceDetector.prototype.buildModel = function (model, matches)
{
    model = this.buildByMatch(model, matches);
    model = model.replace('_' , ' ').replace('/ TD$/i', '');
    return (model === 'Build') ? null : model;
};

DeviceDetector.prototype.buildVersion = function (versionString, matches){
    versionString = this.buildByMatch(versionString, matches);

    versionString = versionString.replace(/ \./g,'.')
    versionString = versionString.replace(/_/g,'.')
    versionArray = versionString.split('.');
    versionArraySort = [];
    for(var i in versionArray){
      if(i <= this.maxMinorParts){
        versionArraySort.push(versionArray[i]);
      }else{
        break;
      }
    }
    versionString = versionArraySort.join('.');

    return versionString;
}

DeviceDetector.prototype.buildEngine = function (engineData, browserVersion){
  let engine= '';

  if (engineData){
    if (engineData.default){
      engine = engineData.default;
    }

    if (engineData.versions && Array.isArray(engineData.versions)) {
      for( let version in engineData.versions){
        if((parseInt(browserVersion) - parseInt(version)) >= 0){
          engine = engineData.versions[version]
        }
      }
    }
  }

  return engine;
}

DeviceDetector.prototype.buildEngineVersion =  function(engine,user_agent){
  if(!engine){
    return ''
  }
  // TODO: Problems with engine version RegExp
  /*
  let regexp = new RegExp(engine + "\s*\/?\s*((\?(?=\d+\.\d)\d+[.\d]*|\d{1,7}(?=(?:\D|$))))", 'i');

  if(match = regex.exec(user_agent)) {
    return match;
  }
  */

  return '';
}

DeviceDetector.prototype.matchUserAgent = function(str,user_agent){
  str = str.replace(new RegExp('/', 'g'), '\\/');

  regex = new RegExp('(?:^|[^A-Z_-])(?:' + str + ')', 'i');

  if (match = regex.exec(user_agent)){
    return true
  }
  return false

}
DeviceDetector.prototype.parsePlatform = function(user_agent){
  if (this.matchUserAgent('arm',user_agent)) {
    return 'ARM';
  } else if (this.matchUserAgent('WOW64|x64|win64|amd64|x86_64'),user_agent) {
    return 'x64';
  } else if (this.matchUserAgent('i[0-9]86|i86pc'),user_agent) {
    return 'x86';
  }
  return '';
}


DeviceDetector.prototype.buildByMatch = function(item, matches){
  item = item.toString();
    for (var nb=1;nb<=3;nb++) {
        if (item.indexOf('$' + nb) == -1) {
            continue;
        }
        var replace =(matches[nb] !== undefined) ? matches[nb] : '';
        item = item.replace('$' + nb,replace);
    }
    return item;
};

DeviceDetector.prototype.getDevice = function(user_agent){
  for(let col in this.collections.device){
    let collection = this.collections.device[col];
    for(let key in collection){

      let regex = getBaseRegExp(collection[key].regex);
      let match;
      if(match = regex.exec(user_agent)) {
        var device = {
          vendor : key,
          type : '',
          model : ''
        }

        if(!collection[key].device){
          device.type = collection[key].device;
        }

        if(collection[key].model){
          device.model = this.buildModel(collection[key].model,model_match);
        }
        if(collection[key].models){
          for(var i= 0, l = collection[key]['models'].length; i < l; i++){
            var data = collection[key]['models'][i];
            var model_preg = getBaseRegExp(data.regex);
            if(model_match = model_preg.exec(user_agent)){
              if(data.model){
                device.model = (this.buildModel(data.model,model_match)).replace(/ +$/, "");
              }
              if(data.device){
                device.type = data.device;
              }
              if(data.brand){
                device.vendor = data.vendor;
              }
              break;
            }
          }
        }

        return device;
      }
    }
  }
  return {};
};

DeviceDetector.prototype.getClient = function(user_agent){
  for(let col in this.collections.client){
    let collection = this.collections.client[col];
    for(let key in collection){
      let regex = getBaseRegExp(collection[key].regex);
      let match;
      if(match = regex.exec(user_agent)) {
        let version = this.buildVersion(collection[key].version,match);
        let engine = this.buildEngine(collection[key].engine,match);
        let engineVersion = this.buildEngineVersion(engine,user_agent);
        return {
          type : 'browser',
          name : collection[key].name,
          version : version,
          engine : engine,
          engine_version : engineVersion,

        }
      }
    }
  }
  return {};
};



DeviceDetector.prototype.getOs = function(user_agent){
  let collection = this.collections.oss;
  for(let key in collection){

    let regex = getBaseRegExp(collection[key].regex);
    let match;
    if(match = regex.exec(user_agent)) {
      let version = this.buildVersion(collection[key].version,match);
      let platform = this.parsePlatform(user_agent);
      return {
        name : collection[key].name,
        version : version,
        platform : platform
      }
    }
  }
  return {};
};





DeviceDetector.prototype.getBot = function(user_agent){
  return {};
};


DeviceDetector.prototype.skipBotDetection = function(){
  this.skipBot = true;
}

DeviceDetector.prototype.isBot = function(){
  let bot = this.getBot(user_agent);
  if(bot.length > 0){
    return true
  }else{
    return false;
  }
}

DeviceDetector.prototype.detect = function(user_agent){

  // TODO: check if is bot

  var device = this.getDevice(user_agent);
  var client = this.getClient(user_agent);
  var os = this.getOs(user_agent);

  // Use ua parser js to complete data

  let uaparser = UAparser(user_agent);

  let result = {
    browser: client,
    device: device,
    os : os
  }
  for(var i in result){
    for(var j in result[i]){
      if( result[i][j] == '' && uaparser[i] && uaparser[i][j] && uaparser[i][j] != ''){
        result[i][j] = uaparser[i][j];
      }
    }
  }

  return {
    browser: client,
    device: device,
    os : os
  }
};
