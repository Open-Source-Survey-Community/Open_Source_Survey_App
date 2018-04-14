"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.logConf = exports.serverConf = exports.environment = undefined;

var _server = require("./server.config");

var _server2 = _interopRequireDefault(_server);

var _logger = require("./logger.config");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var environment = process.env.NODE_ENV || "development";

var serverConf = _server2.default[environment];
var logConf = _logger2.default[environment];

exports.environment = environment;
exports.serverConf = serverConf;
exports.logConf = logConf;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbnZpcm9ubWVudCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInNlcnZlckNvbmYiLCJsb2dDb25mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsY0FBY0MsUUFBUUMsR0FBUixDQUFZQyxRQUFaLElBQXdCLGFBQTVDOztBQUVBLElBQU1DLGFBQWEsaUJBQVdKLFdBQVgsQ0FBbkI7QUFDQSxJQUFNSyxVQUFVLGlCQUFRTCxXQUFSLENBQWhCOztRQUdDQSxXLEdBQUFBLFc7UUFDQUksVSxHQUFBQSxVO1FBQ0FDLE8sR0FBQUEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTRVJWRVJfRU5WIGZyb20gXCIuL3NlcnZlci5jb25maWdcIjtcbmltcG9ydCBMT0dfRU5WIGZyb20gXCIuL2xvZ2dlci5jb25maWdcIjtcblxuY29uc3QgZW52aXJvbm1lbnQgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcImRldmVsb3BtZW50XCI7XG5cbmNvbnN0IHNlcnZlckNvbmYgPSBTRVJWRVJfRU5WW2Vudmlyb25tZW50XTtcbmNvbnN0IGxvZ0NvbmYgPSBMT0dfRU5WW2Vudmlyb25tZW50XTtcblxuZXhwb3J0IHtcblx0ZW52aXJvbm1lbnQsXG5cdHNlcnZlckNvbmYsXG5cdGxvZ0NvbmZcbn07Il19