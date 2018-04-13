const SERVER_ENV = {
	"production": {
		"SERVER_PORT": process.env.IWIP_SERVER_PORT || 3000
	},
	"test": {
		"SERVER_PORT": 3509
	},
	"development": {
		"SERVER_PORT": 4000
	}
};

export default SERVER_ENV;