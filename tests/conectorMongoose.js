import mongoose from "mongoose";
import database from "../config/database.config";
import log4js from "../log/logger";

let logger = log4js.getLogger();
process.env.NODE_ENV = "test";

const options = {
	auto_reconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 1000,
};
let connect = ()=>{
	return new Promise((resolve, reject) => {
		mongoose.Promise = global.Promise;
		mongoose.connect(database.databaseTesting, options);
		mongoose.connection.
			once("open",()=> {
				logger.info("CONNECTION SUCCESFULL DATABASE TESTING");
				resolve();
			}).on("error", (error)=> {
				logger.info("ERROR", error);
				reject();
			});
	});
};
let clearDatabase = ()=>{
	return new Promise(resolve => {
		let contador = 0;
		let cantidadColeccionesDatabaseTesting = Object.keys(mongoose.connection.collections).length;
		for (const i in mongoose.connection.collections){
			mongoose.connection.collections[i].remove(function (){
				contador= contador + 1 ;
				if (contador > cantidadColeccionesDatabaseTesting){
					resolve();
				}
			});
		}
	});
};

export async function configurarBasedeDatos() {
	await connect();
	await clearDatabase();
}