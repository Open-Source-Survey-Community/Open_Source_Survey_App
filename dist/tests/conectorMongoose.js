"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.configurarBasedeDatos = undefined;

var configurarBasedeDatos = exports.configurarBasedeDatos = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return connect();

					case 2:
						_context.next = 4;
						return clearDatabase();

					case 4:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function configurarBasedeDatos() {
		return _ref.apply(this, arguments);
	};
}();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require("../config/database.config");

var _database2 = _interopRequireDefault(_database);

var _logger = require("../log/logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var logger = _logger2.default.getLogger();
process.env.NODE_ENV = "test";

var options = {
	auto_reconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 1000
};
var connect = function connect() {
	return new Promise(function (resolve, reject) {
		_mongoose2.default.Promise = global.Promise;
		_mongoose2.default.connect(_database2.default.databaseTesting, options);
		_mongoose2.default.connection.once("open", function () {
			logger.info("CONNECTION SUCCESFULL DATABASE TESTING 22");
			resolve();
		}).on("error", function (error) {
			logger.info("ERROR", error);
			reject();
		});
	});
};
var clearDatabase = function clearDatabase() {
	return new Promise(function (resolve) {
		var contador = 0;
		var cantidadColeccionesDatabaseTesting = Object.keys(_mongoose2.default.connection.collections).length;
		for (var i in _mongoose2.default.connection.collections) {
			_mongoose2.default.connection.collections[i].remove(function () {
				contador = contador + 1;
				if (contador > cantidadColeccionesDatabaseTesting) {
					resolve();
				}
			});
		}
	});
};
//# sourceMappingURL=conectorMongoose.js.map