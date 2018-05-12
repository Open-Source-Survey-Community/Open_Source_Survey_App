import path from "path";
import express from "express";
import log4js from "./log/logger";
import morgan from "morgan";
import models from "./models";
import mongoose from "mongoose";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import database from "./config/database.config";
const { ApolloEngine } = require('apollo-engine');

const bodyParser = require("body-parser");
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
let logger = log4js.getLogger();

mongoose.Promise = global.Promise;

mongoose.connect(database.databaseProduction);

mongoose.connection
        .once("open",()=>{
            logger.info("BASE DE DATOS ATLAS CONECTADO DE MANERA EXITOSA-> DBNAME OPEN SOURCE SURVEY");
        }).on("error", (error) => {
            logger.info("error en la conexion");
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

const engine = new ApolloEngine({
    logging: {
        level: 'DEBUG'   // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
    },
    apiKey: process.env.ENGINE_API_KEY || 'GBObpSxuDtTHT8qeVQMVTA'
});

app.use("/graphql", bodyParser.json(), graphqlExpress({
    schema,
    context:{
        models
    },
    tracing: true,
    cacheControl: true
}));

app.use("/graphiql",graphiqlExpress({ endpointURL: "/graphql" }));

app.use(morgan("prod"));

engine.listen({
    port: process.env.PORT || 5000,
    expressApp: app
},()=>{
    logger.info("Servidor corriendo de manera exitosa");
});

export default engine;