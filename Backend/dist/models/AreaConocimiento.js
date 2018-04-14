"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var areasConocimientoSchema = new Schema({
	usuariopropietario: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	titulo: { type: String, index: true },
	descripcion: { type: String, default: "inexistente" },
	idioma: String
});
areasConocimientoSchema.index({ "titulo": "text" });
var areasConocimiento = mongoose.model("areas-conocimiento", areasConocimientoSchema);
module.exports = areasConocimiento;
//# sourceMappingURL=AreaConocimiento.js.map