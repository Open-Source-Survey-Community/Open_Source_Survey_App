const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreguntaSchema = new Schema({
	descripcion:{type: String, index: true},
	usuario_ID: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	identificador:{type: Number, default:1},
	historial_cambios:[{
		descripcion: String,
		imagen: String,
		fecha_creacion: String,
		tipoPregunta: String,
		estado: String,
		areaconocimiento:[{
			type: Schema.Types.ObjectId,
			ref: "areas-conocimiento"
		}],
		respuestas:[String]
	}],
	registroActual:{type:Boolean, index: true, default: true},
	imagen: {type: String, default: "no image"},
	fecha_creacion:{type: Date, index: true},
	fecha_cierre: {type: Date, index:true},
	estados_asignados:[{
		usuario:{
			type: Schema.Types.ObjectId,
			ref: "usuario"
		},
		estado_asignado: String,
		observacion: String,
		fecha_asignacion:{type: Date, index:true}
	}],
	estado:{type: String, default: "revision"},
	tipoPregunta: {type: String, default: "open answer"},
	areaconocimiento:[{
		type: Schema.Types.ObjectId,
		ref: "areas-conocimiento"
	}],
	respuestas:[{
		type:String,
	}],
	comentarios:[{
		type:Schema.Types.ObjectId,
		ref:"comentario"
	}],
	discusiones:[{
		type:Schema.Types.ObjectId,
		ref:"discusionPregunta"
	}]
});


PreguntaSchema.index({"descripcion": "text"});
const Pregunta = mongoose.model("pregunta",PreguntaSchema);

module.exports = Pregunta;
