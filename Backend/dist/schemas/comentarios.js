"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Comentario = "\n\t\ttype Comentario{\n\t\t\t_id: ID!\n\t\t\tcreador_comentario: Usuario\n\t\t\tidentificador: Int\n\t\t\thabilitado: Boolean\n\t\t\tcontenido: String\n\t\t\tfecha_creacion: String\n\t\t\tfecha_actualizacion: String\n\t\t\tvotacion: [Voto]\n\t\t\tlistaSubComentarios:[Comentario]\n\t\t}\n\t\t\n\t\ttype Voto{\n\t\t\tusuario_creador: Usuario\n\t\t\tlike: Int\n\t\t\tdislike: Int\n\t\t\tfavoritos: Int\n\t\t}\n\t\t\n\t\ttype Votacion{\n\t\t\tlike: Int\n\t\t\tdislike: Int\n\t\t}\n\t\t\n\t\t\n\t\t\n\t\ttype ComentarioConnection {\n\t\t\ttotalCount: Int\n\t\t\tedges: [ComentarioEdge]\n\t\t\tpageInfo: PageInfo\n\t\t}\n\t\ttype ComentarioEdge {\n\t\t\tcursor: String\n\t\t\tnode: Comentario\n\t\t}\n\t\t\n\t\tinput ComentarioInput {\n\t\t\tcontenido: String\n\t\t\tcreador_comentario:ID!\n\t\t\tfecha_creacion: String!\n\t\t}\n\t\t\n\t\t\n\t\ttype Mutation {\n\t\t\tcrearComentarioAnexadaAPregunta(comentario: ComentarioInput, idPregunta: String!): Comentario\n\t\t\tcrearComentarioAnexadaADiscusionPregunta(comentario: ComentarioInput, idDiscusionPregunta: String!): Comentario\n\t\t\tcrearSubComentarioAnexadaAComentario(comentario: ComentarioInput, idComentario: String): Comentario\n\t\t\teditarComentario(contenido: String, idComentario: String, idUsuario: String!):Comentario\n\t\t\tcolocarLikesComentario(idUsuario: String, idComentario: String):Votacion\n\t\t\tcolocarDisLikesComentario(idUsuario: String, idComentario: String):Votacion\n\t\t\tcolocarFavoritosComentario(idUsuario: String, idComentario: String):Int\n\n\t\t}\n\n";
exports.default = Comentario;
//# sourceMappingURL=comentarios.js.map