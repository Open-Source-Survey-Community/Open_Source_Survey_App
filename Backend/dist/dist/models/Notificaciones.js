"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificacionSchema = new Schema({
	usuario_emisor: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	fecha_creacion: {
		type: Date,
		default: Date.now
	},
	tipo: {
		type: String
	},
	descripcion: String,
	leido: { type: Boolean, default: false }

});

var notificaciones = mongoose.model("notificacion", notificacionSchema);

module.exports = notificaciones;
//# sourceMappingURL=Notificaciones.js.map