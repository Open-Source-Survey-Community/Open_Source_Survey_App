"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pagination = require("mongoose-paginate");

var PreguntaValidadasSchema = new Schema({
	descripcion: {
		type: String
	},
	usuario_ID: {
		type: String
	},
	etiquetas: {
		texto: String
	},
	listaImagen: [{
		url: String
	}],
	fecha_creacion: {
		type: Date, default: Date.now
	},
	topicos: {
		texto: String
	},
	respuestas: [{
		id: String,
		texto: String,
		tipoRespuesta: String
	}]
});

var PreguntaValidadas = mongoose.model("preguntaValidadas", PreguntaValidadasSchema);

module.exports = PreguntaValidadas;
//# sourceMappingURL=preguntasValidadas.js.map