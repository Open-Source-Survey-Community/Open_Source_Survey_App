const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areasConocimientoSchema = new Schema({
	usuariopropietario: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	titulo: {type:String, index: true},
	descripcion: {type:String, default: "inexistente"},
	idioma: String
});
areasConocimientoSchema.index({"titulo": "text"});
const areasConocimiento = mongoose.model("areas-conocimiento",areasConocimientoSchema);
module.exports = areasConocimiento;
