import path from "path";
import express from "express";
import log4js from "./log/logger";
import morgan from "morgan";
import models from "./models";
import mongoose from "mongoose";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import database from "./config/database.config";

const bodyParser = require("body-parser");
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
let logger = log4js.getLogger();

mongoose.Promise = global.Promise;

mongoose.connect(database.databaseTesting);

mongoose.connection.
	once("open",()=> {
		logger.info("CONNECTION SUCCESFULL DATABASE TESTING 22");
	}).on("error", (error)=> {
		logger.info("ERROR", error);
	});



let environment =  process.env.NODE_ENV || "test";
let serverConf = {
	SERVER_PORT: 3660
};


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

app.use("/graphtest", bodyParser.json(), graphqlExpress({
	schema,
	context:{
		models
	}
}));

app.use("/graphiql",graphiqlExpress({ endpointURL: "/graphtest" }));

app.use(morgan("dev"));


app.listen(3660, () => {
	logger.info("###################################");
	logger.info("######## SERVER STARTED TEST !!!! #######");
	logger.info("#####################################");
	logger.info(`App running on ${environment.toUpperCase()} mode and listening on port ${serverConf.SERVER_PORT} ...`);
});

export default app;