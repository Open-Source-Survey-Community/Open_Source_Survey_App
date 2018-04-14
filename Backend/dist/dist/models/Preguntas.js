"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pagination = require("mongoose-paginate");

var PreguntaSchema = new Schema({
	descripcion: String,
	usuario_ID: { type: String, index: true },
	identificador: { type: Number, default: 0 },
	historial_cambios: [{
		texto: {
			type: String, index: true
		}
	}],
	registroActual: { type: Boolean, index: true },
	listaImagen: [{
		url: String
	}],
	fecha_creacion: { type: Date, default: Date.now, index: true },
	fecha_actualizacion: { type: Date, default: Date.now, index: true },
	estado: { type: String, index: true, default: "revision" },
	tipoPregunta: {
		type: String
	},
	area_conocimiento: [{
		type: String
	}],
	respuestas: [{
		id: String,
		texto: String,
		tipoRespuesta: String
	}],
	comentarios: [{
		type: Schema.Types.ObjectId,
		ref: "comentario"
	}],
	discusiones: [{
		type: Schema.Types.ObjectId,
		ref: "discusionPregunta"
	}]
});

var Pregunta = mongoose.model("pregunta", PreguntaSchema);

module.exports = Pregunta;
//# sourceMappingURL=Preguntas.js.map