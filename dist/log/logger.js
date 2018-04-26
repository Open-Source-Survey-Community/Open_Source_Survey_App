"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _log4js = require("log4js");

var log4js = _interopRequireWildcard(_log4js);

var _config = require("../config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loggerConfiguration = {
	appenders: {
		console: {
			type: "console",
			layout: {
				type: "pattern",
				pattern: "[%[%5.5p%]] - %m%"
			}
		}
	},
	categories: {
		default: {
			appenders: ["console"],
			level: _config.logConf.level
		}
	}
};

log4js.configure(loggerConfiguration);

exports.default = log4js;
//# sourceMappingURL=logger.js.map