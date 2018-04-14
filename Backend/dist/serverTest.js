"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _logger = require("./log/logger");

var _logger2 = _interopRequireDefault(_logger);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _database = require("./config/database.config");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyParser = require("body-parser");

var _require = require("apollo-server-express"),
    graphiqlExpress = _require.graphiqlExpress,
    graphqlExpress = _require.graphqlExpress;

var _require2 = require("graphql-tools"),
    makeExecutableSchema = _require2.makeExecutableSchema;

var logger = _logger2.default.getLogger();

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(_database2.default.databaseTesting);

_mongoose2.default.connection.once("open", function () {
	logger.info("CONNECTION SUCCESFULL DATABASE TESTING");
}).on("error", function (error) {
	logger.info("ERROR", error);
});

var environment = process.env.NODE_ENV || "test";
var serverConf = {
	SERVER_PORT: 3660
};

var typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, "./schemas")));
var resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, "./resolvers")));

var schema = makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: resolvers
});

var app = (0, _express2.default)();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use("/graphtest", bodyParser.json(), graphqlExpress({
	schema: schema,
	context: {
		models: _models2.default
	}
}));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphtest" }));

app.use((0, _morgan2.default)("dev"));

app.listen(3660, function () {
	logger.info("###################################");
	logger.info("######## SERVER STARTED TEST !!!! #######");
	logger.info("#####################################");
	logger.info("App running on " + environment.toUpperCase() + " mode and listening on port " + serverConf.SERVER_PORT + " ...");
});

exports.default = app;
//# sourceMappingURL=serverTest.js.map