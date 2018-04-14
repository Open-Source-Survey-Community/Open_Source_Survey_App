const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const discusionPreguntaSchema = new Schema({
	titulo:String,
	identificador: {
		type: Number,
		default: 1
	},
	etiquetas_correcciones: [{
		type:Schema.Types.ObjectId,
		ref:"etiqueta-correcciones"
	}],
	descripcion:String,
	tipo_correccion: [String],
	creador_correccion:{
		type:Schema.Types.ObjectId,
		ref:"usuario"
	},
	estado_correccion:[{
		usuario_creador_estado:{
			type:Schema.Types.ObjectId,
			ref:"usuario"
		},
		rol:String,
		asignacion: String,
		observacion: {type: String, default: "any observation was registered"}
	}],
	fecha_creacion:{type: Date, index: true},
	fecha_cierre:{type: Date, index: true},
	comentarios:[{
		type:Schema.Types.ObjectId,
		ref:"comentario"
	}],
	pregunta_ID:{
		type:Schema.Types.ObjectId,
		ref:"pregunta"
	},
	habilitada: {
		type: Boolean, default: true
	}
});


discusionPreguntaSchema.index({"titulo": "text"});
const discusionPregunta = mongoose.model("discusionPregunta",discusionPreguntaSchema);

module.exports = discusionPregunta;
