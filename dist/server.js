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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

app.listen(4000, function () {
	logger.info("###################################");
	logger.info("######## SERVER STARTED !!!! #######");
	logger.info("#####################################");
	logger.info("App running on " + _config.environment.toUpperCase() + " mode and listening on port " + _config.serverConf.SERVER_PORT + " ...");
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJib2R5UGFyc2VyIiwicmVxdWlyZSIsImdyYXBoaXFsRXhwcmVzcyIsImdyYXBocWxFeHByZXNzIiwibWFrZUV4ZWN1dGFibGVTY2hlbWEiLCJsb2dnZXIiLCJnZXRMb2dnZXIiLCJQcm9taXNlIiwiZ2xvYmFsIiwiY29ubmVjdCIsImRhdGFiYXNlRGV2ZWxvcG1lbnQiLCJjb25uZWN0aW9uIiwib25jZSIsImluZm8iLCJvbiIsImVycm9yIiwidHlwZURlZnMiLCJqb2luIiwiX19kaXJuYW1lIiwicmVzb2x2ZXJzIiwic2NoZW1hIiwiYXBwIiwidXNlIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsImNvbnRleHQiLCJtb2RlbHMiLCJlbmRwb2ludFVSTCIsImxpc3RlbiIsInRvVXBwZXJDYXNlIiwiU0VSVkVSX1BPUlQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBLElBQU1BLGFBQWFDLFFBQVEsYUFBUixDQUFuQjs7ZUFDMENBLFFBQVEsdUJBQVIsQztJQUFuQ0MsZSxZQUFBQSxlO0lBQWlCQyxjLFlBQUFBLGM7O2dCQUNTRixRQUFRLGVBQVIsQztJQUF6Qkcsb0IsYUFBQUEsb0I7O0FBQ1IsSUFBSUMsU0FBUyxpQkFBT0MsU0FBUCxFQUFiOztBQUlBLG1CQUFTQyxPQUFULEdBQW1CQyxPQUFPRCxPQUExQjs7QUFFQSxtQkFBU0UsT0FBVCxDQUFpQixtQkFBU0MsbUJBQTFCOztBQUVBLG1CQUFTQyxVQUFULENBQ0NDLElBREQsQ0FDTSxNQUROLEVBQ2EsWUFBSztBQUNoQlAsUUFBT1EsSUFBUCxDQUFZLGdDQUFaO0FBQ0EsQ0FIRixFQUdJQyxFQUhKLENBR08sT0FIUCxFQUdnQixVQUFDQyxLQUFELEVBQVU7QUFDeEJWLFFBQU9RLElBQVAsQ0FBWSxPQUFaLEVBQXFCRSxLQUFyQjtBQUNBLENBTEY7O0FBT0EsSUFBTUMsV0FBVSxxQ0FBVyxxQ0FBVyxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsV0FBckIsQ0FBWCxDQUFYLENBQWhCO0FBQ0EsSUFBTUMsWUFBYSx5Q0FBZSxxQ0FBVyxlQUFLRixJQUFMLENBQVVDLFNBQVYsRUFBcUIsYUFBckIsQ0FBWCxDQUFmLENBQW5COztBQUVBLElBQU1FLFNBQVNoQixxQkFBcUI7QUFDbkNZLG1CQURtQztBQUVuQ0c7QUFGbUMsQ0FBckIsQ0FBZjs7QUFLQSxJQUFNRSxNQUFNLHdCQUFaOztBQUVBQSxJQUFJQyxHQUFKLENBQVF0QixXQUFXdUIsVUFBWCxDQUFzQjtBQUM3QkMsV0FBVTtBQURtQixDQUF0QixDQUFSOztBQUlBSCxJQUFJQyxHQUFKLENBQVEsVUFBUixFQUFvQnRCLFdBQVd5QixJQUFYLEVBQXBCLEVBQXVDdEIsZUFBZTtBQUNyRGlCLGVBRHFEO0FBRXJETSxVQUFRO0FBQ1BDO0FBRE87QUFGNkMsQ0FBZixDQUF2Qzs7QUFRQU4sSUFBSUMsR0FBSixDQUFRLFdBQVIsRUFBb0JwQixnQkFBZ0IsRUFBRTBCLGFBQWEsVUFBZixFQUFoQixDQUFwQjs7QUFHQVAsSUFBSUMsR0FBSixDQUFRLHNCQUFPLEtBQVAsQ0FBUjs7QUFHQUQsSUFBSVEsTUFBSixDQUFXLElBQVgsRUFBaUIsWUFBTTtBQUN0QnhCLFFBQU9RLElBQVAsQ0FBWSxxQ0FBWjtBQUNBUixRQUFPUSxJQUFQLENBQVksc0NBQVo7QUFDQVIsUUFBT1EsSUFBUCxDQUFZLHVDQUFaO0FBQ0FSLFFBQU9RLElBQVAscUJBQThCLG9CQUFZaUIsV0FBWixFQUE5QixvQ0FBc0YsbUJBQVdDLFdBQWpHO0FBQ0EsQ0FMRCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7ZW52aXJvbm1lbnQsIHNlcnZlckNvbmZ9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IGxvZzRqcyBmcm9tIFwiLi9sb2cvbG9nZ2VyXCI7XG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcbmltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCBkYXRhYmFzZSBmcm9tIFwiLi9jb25maWcvZGF0YWJhc2UuY29uZmlnXCI7XG5pbXBvcnQgbW9kZWxzIGZyb20gXCIuL21vZGVsc1wiO1xuaW1wb3J0IHtmaWxlTG9hZGVyLCBtZXJnZVJlc29sdmVycywgbWVyZ2VUeXBlc30gZnJvbSBcIm1lcmdlLWdyYXBocWwtc2NoZW1hc1wiO1xuXG5cbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCB7Z3JhcGhpcWxFeHByZXNzLCBncmFwaHFsRXhwcmVzc30gPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIpO1xuY29uc3QgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSB9ID0gcmVxdWlyZShcImdyYXBocWwtdG9vbHNcIik7XG5sZXQgbG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcigpO1xuXG5cblxubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5tb25nb29zZS5jb25uZWN0KGRhdGFiYXNlLmRhdGFiYXNlRGV2ZWxvcG1lbnQpO1xuXG5tb25nb29zZS5jb25uZWN0aW9uLlxuXHRvbmNlKFwib3BlblwiLCgpPT4ge1xuXHRcdGxvZ2dlci5pbmZvKFwiQ09OTkVDVElPTiBTVUNDRVNGVUxMIERBVEFCQVNFXCIpO1xuXHR9KS5vbihcImVycm9yXCIsIChlcnJvcik9PiB7XG5cdFx0bG9nZ2VyLmluZm8oXCJFUlJPUlwiLCBlcnJvcik7XG5cdH0pO1xuXG5jb25zdCB0eXBlRGVmcyA9bWVyZ2VUeXBlcyhmaWxlTG9hZGVyKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi9zY2hlbWFzXCIpKSk7XG5jb25zdCByZXNvbHZlcnMgID0gbWVyZ2VSZXNvbHZlcnMoZmlsZUxvYWRlcihwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4vcmVzb2x2ZXJzXCIpKSk7XG5cbmNvbnN0IHNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcblx0dHlwZURlZnMsXG5cdHJlc29sdmVyc1xufSk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuXHRleHRlbmRlZDogZmFsc2Vcbn0pKTtcblxuYXBwLnVzZShcIi9ncmFwaHFsXCIsIGJvZHlQYXJzZXIuanNvbigpLCBncmFwaHFsRXhwcmVzcyh7XG5cdHNjaGVtYSxcblx0Y29udGV4dDp7XG5cdFx0bW9kZWxzXG5cdH1cbn0pKTtcblxuXG5hcHAudXNlKFwiL2dyYXBoaXFsXCIsZ3JhcGhpcWxFeHByZXNzKHsgZW5kcG9pbnRVUkw6IFwiL2dyYXBocWxcIiB9KSk7XG5cblxuYXBwLnVzZShtb3JnYW4oXCJkZXZcIikpO1xuXG5cbmFwcC5saXN0ZW4oNDAwMCwgKCkgPT4ge1xuXHRsb2dnZXIuaW5mbyhcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpO1xuXHRsb2dnZXIuaW5mbyhcIiMjIyMjIyMjIFNFUlZFUiBTVEFSVEVEICEhISEgIyMjIyMjI1wiKTtcblx0bG9nZ2VyLmluZm8oXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpO1xuXHRsb2dnZXIuaW5mbyhgQXBwIHJ1bm5pbmcgb24gJHtlbnZpcm9ubWVudC50b1VwcGVyQ2FzZSgpfSBtb2RlIGFuZCBsaXN0ZW5pbmcgb24gcG9ydCAke3NlcnZlckNvbmYuU0VSVkVSX1BPUlR9IC4uLmApO1xufSk7XG4iXX0=