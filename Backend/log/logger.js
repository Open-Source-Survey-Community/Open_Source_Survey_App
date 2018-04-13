import * as log4js from "log4js";
import {logConf} from "../config";


let loggerConfiguration = {
	appenders: {
		console: {
			type: "console",
			layout: {
				type: "pattern",
				pattern: "[%[%5.5p%]] - %m%"
			}
		}
	},
	categories: {
		default: {
			appenders: ["console"],
			level: logConf.level
		}
	}
};

log4js.configure(loggerConfiguration);

export default log4js;