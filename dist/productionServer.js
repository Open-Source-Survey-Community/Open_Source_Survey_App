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

var _require = require('apollo-engine'),
    ApolloEngine = _require.ApolloEngine;

var bodyParser = require("body-parser");

var _require2 = require("apollo-server-express"),
    graphiqlExpress = _require2.graphiqlExpress,
    graphqlExpress = _require2.graphqlExpress;

var _require3 = require("graphql-tools"),
    makeExecutableSchema = _require3.makeExecutableSchema;

var logger = _logger2.default.getLogger();

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(_database2.default.databaseProduction);

_mongoose2.default.connection.once("open", function () {
    logger.info("BASE DE DATOS ATLAS CONECTADO DE MANERA EXITOSA-> DBNAME OPEN SOURCE SURVEY");
}).on("error", function (error) {
    logger.info("error en la conexion");
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

var engine = new ApolloEngine({
    logging: {
        level: 'DEBUG' // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
    },
    apiKey: process.env.ENGINE_API_KEY || 'service:Open-Source-Survey-Community-6275:GBObpSxuDtTHT8qeVQMVTA'
});

app.use("/graphql", bodyParser.json(), graphqlExpress({
    schema: schema,
    context: {
        models: _models2.default
    },
    tracing: true,
    cacheControl: true
}));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use((0, _morgan2.default)("prod"));

engine.listen({
    port: process.env.PORT || 5000,
    expressApp: app
}, function () {
    logger.info("Servidor corriendo de manera exitosa");
});

exports.default = engine;
//# sourceMappingURL=productionServer.js.map