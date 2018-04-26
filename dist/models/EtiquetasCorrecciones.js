"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var etiquetasCorreccionesSchema = new Schema({
	usuariopropietario: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	idioma: String,
	color: String,
	descripcion: String,
	etiqueta: String,
	categoria: String
});

etiquetasCorreccionesSchema.index({ "etiqueta": "text" });
var etiquetasCorrecciones = mongoose.model("etiqueta-correcciones", etiquetasCorreccionesSchema);
module.exports = etiquetasCorrecciones;
//# sourceMappingURL=EtiquetasCorrecciones.js.map