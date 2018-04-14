const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etiquetasCorreccionesSchema = new Schema({
	usuariopropietario: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	idioma: String,
	color: String,
	descripcion: String,
	etiqueta:String
});

etiquetasCorreccionesSchema.index({"etiqueta":"text"});
const etiquetasCorrecciones = mongoose.model("etiqueta-correcciones",etiquetasCorreccionesSchema);
module.exports = etiquetasCorrecciones;