"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pagination = require("mongoose-paginate");

var usuarioSchema = new Schema({
	nombre: {
		type: String,
		default: "WITHOUT NAME",
		index: true
	},
	apellido: {
		type: String,
		default: "WITHOUT LASTNAME"
	},
	correo: {
		type: String,
		default: "nullUsuario@gmail.com"
	},
	urlImage: String,
	Wiki: String,
	roles: [{
		rol: {
			type: String,
			default: "usuario"
		},
		Acciones: [{
			type: String,
			default: "crear pregunta, crear cambios de preguntas"
		}]
	}],
	institucion: { type: String, default: "sin definir" },
	grado_academico: { type: String, default: "sin definir" },
	area_academica: { type: String, default: "sin definir" },
	colaboradores: [{
		type: Schema.Types.ObjectId,
		ref: "colaborador"
	}],
	notificaciones: [{
		type: Schema.Types.ObjectId,
		ref: "notificacion"
	}]
});

usuarioSchema.index({ "nombre": "text" });
usuarioSchema.plugin(pagination);
var Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;
//# sourceMappingURL=Usuarios.js.map