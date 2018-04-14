"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("./config");

var _logger = require("./log/logger");

var _logger2 = _interopRequireDefault(_logger);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require("./config/database.config");

var _database2 = _interopRequireDefault(_database);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var bodyParser = require("body-parser");

var _require = require("apollo-server-express"),
    graphiqlExpress = _require.graphiqlExpress,
    graphqlExpress = _require.graphqlExpress;

var _require2 = require("graphql-tools"),
    makeExecutableSchema = _require2.makeExecutableSchema;

var logger = _logger2.default.getLogger();

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(_database2.default.databaseDevelopment);

_mongoose2.default.connection.once("open", function () {
	logger.info("CONNECTION SUCCESFULL DATABASE");
}).on("error", function (error) {
	logger.info("ERROR", error);
});

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

app.use("/graphql", bodyParser.json(), graphqlExpress({
	schema: schema,
	context: {
		models: _models2.default
	}
}));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use((0, _morgan2.default)("dev"));

app.listen(5000, function () {
	logger.info("###################################");
	logger.info("######## SERVER STARTED !!!! #######");
	logger.info("#####################################");
	logger.info("App running on " + _config.environment.toUpperCase() + " mode and listening on port " + _config.serverConf.SERVER_PORT + " ...");
});
//# sourceMappingURL=server.js.map