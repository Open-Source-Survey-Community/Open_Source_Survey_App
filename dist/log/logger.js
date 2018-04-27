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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xvZy9sb2dnZXIuanMiXSwibmFtZXMiOlsibG9nNGpzIiwibG9nZ2VyQ29uZmlndXJhdGlvbiIsImFwcGVuZGVycyIsImNvbnNvbGUiLCJ0eXBlIiwibGF5b3V0IiwicGF0dGVybiIsImNhdGVnb3JpZXMiLCJkZWZhdWx0IiwibGV2ZWwiLCJjb25maWd1cmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztJQUFZQSxNOztBQUNaOzs7O0FBR0EsSUFBSUMsc0JBQXNCO0FBQ3pCQyxZQUFXO0FBQ1ZDLFdBQVM7QUFDUkMsU0FBTSxTQURFO0FBRVJDLFdBQVE7QUFDUEQsVUFBTSxTQURDO0FBRVBFLGFBQVM7QUFGRjtBQUZBO0FBREMsRUFEYztBQVV6QkMsYUFBWTtBQUNYQyxXQUFTO0FBQ1JOLGNBQVcsQ0FBQyxTQUFELENBREg7QUFFUk8sVUFBTyxnQkFBUUE7QUFGUDtBQURFO0FBVmEsQ0FBMUI7O0FBa0JBVCxPQUFPVSxTQUFQLENBQWlCVCxtQkFBakI7O2tCQUVlRCxNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxvZzRqcyBmcm9tIFwibG9nNGpzXCI7XG5pbXBvcnQge2xvZ0NvbmZ9IGZyb20gXCIuLi9jb25maWdcIjtcblxuXG5sZXQgbG9nZ2VyQ29uZmlndXJhdGlvbiA9IHtcblx0YXBwZW5kZXJzOiB7XG5cdFx0Y29uc29sZToge1xuXHRcdFx0dHlwZTogXCJjb25zb2xlXCIsXG5cdFx0XHRsYXlvdXQ6IHtcblx0XHRcdFx0dHlwZTogXCJwYXR0ZXJuXCIsXG5cdFx0XHRcdHBhdHRlcm46IFwiWyVbJTUuNXAlXV0gLSAlbSVcIlxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y2F0ZWdvcmllczoge1xuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdGFwcGVuZGVyczogW1wiY29uc29sZVwiXSxcblx0XHRcdGxldmVsOiBsb2dDb25mLmxldmVsXG5cdFx0fVxuXHR9XG59O1xuXG5sb2c0anMuY29uZmlndXJlKGxvZ2dlckNvbmZpZ3VyYXRpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2c0anM7Il19