const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificacionSchema = new Schema({
	usuario_emisor:{
		type:Schema.Types.ObjectId,
		ref:"usuario"
	},
	fecha_creacion:{
		type:Date,
		default: Date.now
	},
	tipo:{
		type:String
	},
	descripcion: String,
	leido: {type: Boolean, default: false}

});


const notificaciones = mongoose.model("notificacion",notificacionSchema);

module.exports = notificaciones;
