(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('axios')) :
	typeof define === 'function' && define.amd ? define(['axios'], factory) :
	(global = global || self, factory(global.axios));
}(this, function (axios) { 'use strict';

	axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	var UCGConfig = {};
	var defCon = {
	  default_tp: 'none',
	  time_out: 5000,
	  header: {}
	};
	function writeUCGConfig(appId, config, callback) {
	  if (!!appId && typeof appId === 'string') {
	    UCGConfig[appId] = _extends_1({}, defCon, config, {
	      appId: appId
	    });
	    callback && callback({
	      code: 0,
	      msg: 'success',
	      result: config
	    });
	  } else {
	    callback && callback({
	      code: 1,
	      msg: "appId不能为空，或者不是string",
	      result: null
	    });
	  }
	}
	function readUCGConfig(appId, callback) {
	  if (!!appId && typeof appId === 'string') {
	    var config = UCGConfig[appId];

	    if (config) {
	      callback && callback({
	        code: 0,
	        msg: 'success',
	        result: config
	      });
	    } else {
	      callback && callback({
	        code: 1,
	        msg: '不存在此配置',
	        result: config
	      });
	    }

	    return config;
	  } else {
	    callback && callback({
	      code: 1,
	      msg: "appId不能为空，或者不是string",
	      result: null
	    });
	    return null;
	  }
	}

	var appcontext = {
		token: "",
		devid: "DUPNW17610001718865360039302957",
		userid: "",
		massotoken: "",
		appid: "sso",
		funcid: "",
		groupid: "",
		sessionid: "",
		user: "",
		tabid: "",
		pass: ""
	};
	var servicecontext = {
		callback: "nothing",
		actionid: "umCommonService",
		params: {
			user: "a",
			pass: "a111111"
		},
		actionname: "load",
		viewid: "com.yonyou.ma.controller.CustomerController",
		controllerid: "com.yonyou.ma.controller.CustomerController"
	};
	var deviceinfo = {
		os: "web",
		style: "web",
		isroot: false,
		versionname: "3.6.2",
		devid: "DUPNW17610001718865360039302957",
		name: "PRA-AL00X",
		ssid: "yumhf_wifi",
		appversion: "4",
		mac: "c4:86:e9:7c:86:f0",
		uuid: "",
		wfaddress: "c4:86:e9:7c:86:f0",
		osversion: "8.0.0",
		lang: "zh",
		ncdevid: "865360039302957"
	};
	var serviceid = "UMSSOGetApps";
	var defaultData = {
		appcontext: appcontext,
		servicecontext: servicecontext,
		deviceinfo: deviceinfo,
		serviceid: serviceid
	};

	var URL_PATH = '/umserver/SSOLogin';

	function callAction(options) {
	  if (!options) return;
	  var appId = options.appId;
	  var UCGConfig = readUCGConfig(appId);
	  if (!UCGConfig) return;
	  var _UCGConfig$host = UCGConfig.host,
	      host = _UCGConfig$host === void 0 ? '' : _UCGConfig$host,
	      _UCGConfig$port = UCGConfig.port,
	      port = _UCGConfig$port === void 0 ? '' : _UCGConfig$port,
	      _UCGConfig$isHttps = UCGConfig.isHttps,
	      isHttps = _UCGConfig$isHttps === void 0 ? false : _UCGConfig$isHttps,
	      default_tp = UCGConfig.default_tp,
	      time_out = UCGConfig.time_out,
	      configHeader = UCGConfig.header;
	  var _options$tp = options.tp,
	      tp = _options$tp === void 0 ? default_tp : _options$tp,
	      _options$viewId = options.viewId,
	      viewId = _options$viewId === void 0 ? "" : _options$viewId,
	      _options$action = options.action,
	      action = _options$action === void 0 ? "" : _options$action,
	      serviceId = options.serviceId,
	      _options$timeout = options.timeout,
	      timeout = _options$timeout === void 0 ? time_out : _options$timeout,
	      _options$params = options.params,
	      params = _options$params === void 0 ? {} : _options$params,
	      _options$header = options.header,
	      header = _options$header === void 0 ? configHeader : _options$header;
	  var requestData = {
	    deviceinfo: _extends_1({}, defaultData.deviceinfo),
	    appcontext: _extends_1({}, defaultData.appcontext, {
	      appid: appId
	    }),
	    serviceid: serviceId || defaultData.serviceid,
	    servicecontext: _extends_1({}, defaultData.servicecontext, {
	      params: params,
	      appid: appId,
	      viewid: viewId,
	      actionname: action
	    })
	  };
	  var http = isHttps ? 'https://' : 'http://';
	  var url = host ? "" + http + host + port : '';

	  var _url = url + URL_PATH;

	  var dataForm = new FormData();
	  dataForm.append('tp', tp);
	  dataForm.append('data', JSON.stringify(requestData));
	  return new Promise(function (resolve, reject) {
	    axios({
	      timeout: timeout,
	      method: "POST",
	      url: _url,
	      data: dataForm,
	      headers: _extends_1({
	        'Content-Type': 'application/json'
	      }, header) // params,

	    }).then(function (res) {
	      if (options.callback) options.callback(res.data);
	      resolve(res.data);
	    }).catch(function (err) {
	      if (options.callback) options.callback(err);
	      reject(err);
	    });
	  });
	}

	function callService(options) {
	  if (!options) return;
	  return callAction(_extends_1({}, options));
	}

	var apilist = [{
	  api: 'callAction',
	  fn: callAction
	}, {
	  api: 'callService',
	  fn: callService
	}, {
	  api: 'writeUCGConfig',
	  fn: writeUCGConfig
	}, {
	  api: 'readUCGConfig',
	  fn: readUCGConfig
	}];

	var apilist$1 = [{
	  api: 'writeUCGConfig',
	  fn: function fn(obj) {
	    mtlBridge.call("ucg.writeUCGConfig", JSON.stringify(obj), obj.callback);
	  }
	}, {
	  api: 'readUCGConfig',
	  fn: function fn(obj) {
	    mtlBridge.call("ucg.readUCGConfig", JSON.stringify(obj), obj.callback);
	  }
	}, {
	  api: 'callAction',
	  fn: function fn(obj) {
	    mtlBridge.call("ucg.callService", JSON.stringify(obj), obj.callback);
	  }
	}];

	(function () {
	  if (!mtl) {
	    throw new Error('mtl is undefine!');
	  }

	  var apilist$2 = [];

	  if (mtl.platform == 'ios' || mtl.platform == 'android') {
	    apilist$2 = apilist$1;
	  } else {
	    apilist$2 = apilist;
	  }

	  for (var _iterator = apilist$2, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var api = _ref;
	    mtl.register(api);
	  }
	})();

}));
