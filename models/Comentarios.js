const mongoose = require("mongoose");
const Schame = mongoose.Schema;

const comentarioSchame = new Schame({
	creador_comentario:{
		type: Schame.Types.ObjectId,
		ref: "usuario"
	},
	identificador:{type: Number, default:1},
	habilitada: {type: Boolean, default:true},
	contenido:String,
	fecha_creacion:{ type: Date, index: true },
	fecha_actualizacion:{ type: Date, index:true },
	votacion:[{
		usuario_creador:{type: Schame.Types.ObjectId, ref: "usuario"},
		like:{
			type: Number
		},
		dislike:{
			type: Number
		},
		favoritos:{
			type: Number
		}
	}],
	listaSubComentarios:[{
		type:Schame.Types.ObjectId,
		ref:"comentario"
	}]
});




const Comentario = mongoose.model("comentario",comentarioSchame);

module.exports = Comentario;