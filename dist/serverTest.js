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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlclRlc3QuanMiXSwibmFtZXMiOlsiYm9keVBhcnNlciIsInJlcXVpcmUiLCJncmFwaGlxbEV4cHJlc3MiLCJncmFwaHFsRXhwcmVzcyIsIm1ha2VFeGVjdXRhYmxlU2NoZW1hIiwibG9nZ2VyIiwiZ2V0TG9nZ2VyIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJkYXRhYmFzZVRlc3RpbmciLCJjb25uZWN0aW9uIiwib25jZSIsImluZm8iLCJvbiIsImVycm9yIiwiZW52aXJvbm1lbnQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJzZXJ2ZXJDb25mIiwiU0VSVkVSX1BPUlQiLCJ0eXBlRGVmcyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJyZXNvbHZlcnMiLCJzY2hlbWEiLCJhcHAiLCJ1c2UiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwiY29udGV4dCIsIm1vZGVscyIsImVuZHBvaW50VVJMIiwibGlzdGVuIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLGFBQVIsQ0FBbkI7O2VBQzBDQSxRQUFRLHVCQUFSLEM7SUFBbkNDLGUsWUFBQUEsZTtJQUFpQkMsYyxZQUFBQSxjOztnQkFDU0YsUUFBUSxlQUFSLEM7SUFBekJHLG9CLGFBQUFBLG9COztBQUNSLElBQUlDLFNBQVMsaUJBQU9DLFNBQVAsRUFBYjs7QUFFQSxtQkFBU0MsT0FBVCxHQUFtQkMsT0FBT0QsT0FBMUI7O0FBRUEsbUJBQVNFLE9BQVQsQ0FBaUIsbUJBQVNDLGVBQTFCOztBQUVBLG1CQUFTQyxVQUFULENBQ0NDLElBREQsQ0FDTSxNQUROLEVBQ2EsWUFBSztBQUNoQlAsUUFBT1EsSUFBUCxDQUFZLHdDQUFaO0FBQ0EsQ0FIRixFQUdJQyxFQUhKLENBR08sT0FIUCxFQUdnQixVQUFDQyxLQUFELEVBQVU7QUFDeEJWLFFBQU9RLElBQVAsQ0FBWSxPQUFaLEVBQXFCRSxLQUFyQjtBQUNBLENBTEY7O0FBU0EsSUFBSUMsY0FBZUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLElBQXdCLE1BQTNDO0FBQ0EsSUFBSUMsYUFBYTtBQUNoQkMsY0FBYTtBQURHLENBQWpCOztBQUtBLElBQU1DLFdBQVUscUNBQVcscUNBQVcsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFdBQXJCLENBQVgsQ0FBWCxDQUFoQjtBQUNBLElBQU1DLFlBQWEseUNBQWUscUNBQVcsZUFBS0YsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLGFBQXJCLENBQVgsQ0FBZixDQUFuQjs7QUFFQSxJQUFNRSxTQUFTdEIscUJBQXFCO0FBQ25Da0IsbUJBRG1DO0FBRW5DRztBQUZtQyxDQUFyQixDQUFmOztBQUtBLElBQU1FLE1BQU0sd0JBQVo7O0FBRUFBLElBQUlDLEdBQUosQ0FBUTVCLFdBQVc2QixVQUFYLENBQXNCO0FBQzdCQyxXQUFVO0FBRG1CLENBQXRCLENBQVI7O0FBSUFILElBQUlDLEdBQUosQ0FBUSxZQUFSLEVBQXNCNUIsV0FBVytCLElBQVgsRUFBdEIsRUFBeUM1QixlQUFlO0FBQ3ZEdUIsZUFEdUQ7QUFFdkRNLFVBQVE7QUFDUEM7QUFETztBQUYrQyxDQUFmLENBQXpDOztBQU9BTixJQUFJQyxHQUFKLENBQVEsV0FBUixFQUFvQjFCLGdCQUFnQixFQUFFZ0MsYUFBYSxZQUFmLEVBQWhCLENBQXBCOztBQUVBUCxJQUFJQyxHQUFKLENBQVEsc0JBQU8sS0FBUCxDQUFSOztBQUdBRCxJQUFJUSxNQUFKLENBQVcsSUFBWCxFQUFpQixZQUFNO0FBQ3RCOUIsUUFBT1EsSUFBUCxDQUFZLHFDQUFaO0FBQ0FSLFFBQU9RLElBQVAsQ0FBWSwyQ0FBWjtBQUNBUixRQUFPUSxJQUFQLENBQVksdUNBQVo7QUFDQVIsUUFBT1EsSUFBUCxxQkFBOEJHLFlBQVlvQixXQUFaLEVBQTlCLG9DQUFzRmhCLFdBQVdDLFdBQWpHO0FBQ0EsQ0FMRDs7a0JBT2VNLEciLCJmaWxlIjoic2VydmVyVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGxvZzRqcyBmcm9tIFwiLi9sb2cvbG9nZ2VyXCI7XG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcbmltcG9ydCBtb2RlbHMgZnJvbSBcIi4vbW9kZWxzXCI7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQge2ZpbGVMb2FkZXIsIG1lcmdlUmVzb2x2ZXJzLCBtZXJnZVR5cGVzfSBmcm9tIFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCI7XG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vY29uZmlnL2RhdGFiYXNlLmNvbmZpZ1wiO1xuXG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuY29uc3Qge2dyYXBoaXFsRXhwcmVzcywgZ3JhcGhxbEV4cHJlc3N9ID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTtcbmNvbnN0IHsgbWFrZUV4ZWN1dGFibGVTY2hlbWEgfSA9IHJlcXVpcmUoXCJncmFwaHFsLXRvb2xzXCIpO1xubGV0IGxvZ2dlciA9IGxvZzRqcy5nZXRMb2dnZXIoKTtcblxubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5tb25nb29zZS5jb25uZWN0KGRhdGFiYXNlLmRhdGFiYXNlVGVzdGluZyk7XG5cbm1vbmdvb3NlLmNvbm5lY3Rpb24uXG5cdG9uY2UoXCJvcGVuXCIsKCk9PiB7XG5cdFx0bG9nZ2VyLmluZm8oXCJDT05ORUNUSU9OIFNVQ0NFU0ZVTEwgREFUQUJBU0UgVEVTVElOR1wiKTtcblx0fSkub24oXCJlcnJvclwiLCAoZXJyb3IpPT4ge1xuXHRcdGxvZ2dlci5pbmZvKFwiRVJST1JcIiwgZXJyb3IpO1xuXHR9KTtcblxuXG5cbmxldCBlbnZpcm9ubWVudCA9ICBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcInRlc3RcIjtcbmxldCBzZXJ2ZXJDb25mID0ge1xuXHRTRVJWRVJfUE9SVDogMzY2MFxufTtcblxuXG5jb25zdCB0eXBlRGVmcyA9bWVyZ2VUeXBlcyhmaWxlTG9hZGVyKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi9zY2hlbWFzXCIpKSk7XG5jb25zdCByZXNvbHZlcnMgID0gbWVyZ2VSZXNvbHZlcnMoZmlsZUxvYWRlcihwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4vcmVzb2x2ZXJzXCIpKSk7XG5cbmNvbnN0IHNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcblx0dHlwZURlZnMsXG5cdHJlc29sdmVyc1xufSk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuXHRleHRlbmRlZDogZmFsc2Vcbn0pKTtcblxuYXBwLnVzZShcIi9ncmFwaHRlc3RcIiwgYm9keVBhcnNlci5qc29uKCksIGdyYXBocWxFeHByZXNzKHtcblx0c2NoZW1hLFxuXHRjb250ZXh0Ontcblx0XHRtb2RlbHNcblx0fVxufSkpO1xuXG5hcHAudXNlKFwiL2dyYXBoaXFsXCIsZ3JhcGhpcWxFeHByZXNzKHsgZW5kcG9pbnRVUkw6IFwiL2dyYXBodGVzdFwiIH0pKTtcblxuYXBwLnVzZShtb3JnYW4oXCJkZXZcIikpO1xuXG5cbmFwcC5saXN0ZW4oMzY2MCwgKCkgPT4ge1xuXHRsb2dnZXIuaW5mbyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpO1xuXHRsb2dnZXIuaW5mbyhcIiMjIyMjIyMjIFNFUlZFUiBTVEFSVEVEIFRFU1QgISEhISAjIyMjIyMjXCIpO1xuXHRsb2dnZXIuaW5mbyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIik7XG5cdGxvZ2dlci5pbmZvKGBBcHAgcnVubmluZyBvbiAke2Vudmlyb25tZW50LnRvVXBwZXJDYXNlKCl9IG1vZGUgYW5kIGxpc3RlbmluZyBvbiBwb3J0ICR7c2VydmVyQ29uZi5TRVJWRVJfUE9SVH0gLi4uYCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwOyJdfQ==