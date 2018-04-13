import path from "path";
import express from "express";
import {environment, serverConf} from "./config";
import log4js from "./log/logger";
import morgan from "morgan";
import mongoose from "mongoose";
import database from "./config/database.config";
import models from "./models";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";

const bodyParser = require("body-parser");
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
let logger = log4js.getLogger();



mongoose.Promise = global.Promise;

mongoose.connect(database.databaseDevelopment);

mongoose.connection.
	once("open",()=> {
		logger.info("CONNECTION SUCCESFULL DATABASE");
	}).on("error", (error)=> {
		logger.info("ERROR", error);
	});

const typeDefs =mergeTypes(fileLoader(path.join(__dirname, "./schemas")));
const resolvers  = mergeResolvers(fileLoader(path.join(__dirname, "./resolvers")));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use("/graphql", bodyParser.json(), graphqlExpress({
	schema,
	context:{
		models
	}
}));

app.use("/graphiql",graphiqlExpress({ endpointURL: "/graphql" }));

app.use(morgan("dev"));


app.listen(4000, () => {
	logger.info("###################################");
	logger.info("######## SERVER STARTED !!!! #######");
	logger.info("#####################################");
	logger.info(`App running on ${environment.toUpperCase()} mode and listening on port ${serverConf.SERVER_PORT} ...`);
});
