"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pagination = require("mongoose-paginate");

var discusionPreguntaSchema = new Schema({
	titulo: String,
	descripcion: String,
	creador_ID: { type: String },
	etiquetas: [{
		type: String
	}],
	estados: [{
		usuario_ID: {
			type: String
		},
		texto: {
			type: String
		}
	}],
	fecha_creacion: String,
	fecha_cierre: String,
	comentarios: [{
		type: Schema.Types.ObjectId,
		ref: "comentario"
	}],
	pregunta_ID: String
});

var discusionPregunta = mongoose.model("discusionPregunta", discusionPreguntaSchema);

module.exports = discusionPregunta;
//# sourceMappingURL=discusionesPregutas.js.map