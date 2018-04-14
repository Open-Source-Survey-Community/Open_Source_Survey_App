"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pagination = require("mongoose-paginate");

var discusionEncuestaSchema = new Schema({
	titulo: String,
	descripcion: String,
	creador_ID: { type: String },
	etiquetas: [{
		type: String
	}],
	asignados: [{
		Usuario_ID: {
			type: String
		},
		tipo: {
			type: String
		}
	}],
	estado: String,
	fecha_creacion: String,
	fecha_cierre: String,
	comentarios: [{
		type: Schema.Types.ObjectId,
		ref: "comentario"
	}],
	encuesta_ID: String
});

var discusionEncuesta = mongoose.model("discusionEncuesta", discusionEncuestaSchema);

module.exports = discusionEncuesta;
//# sourceMappingURL=discusionesEncuestas.js.map