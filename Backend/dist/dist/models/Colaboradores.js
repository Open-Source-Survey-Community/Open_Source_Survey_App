"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var colaboradorSchema = new Schema({
	rol: String,
	usuarioColaborador: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	encuestaCompartida: {
		type: Schema.Types.ObjectId,
		ref: "encuesta"
	}
});

var Colaborador = mongoose.model("colaborador", colaboradorSchema);

module.exports = Colaborador;
//# sourceMappingURL=Colaboradores.js.map