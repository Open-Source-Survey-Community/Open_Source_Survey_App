"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Pregunta = "\n\t\t\ttype Pregunta {\n\t\t\t\t_id: ID!\n\t\t\t\tdescripcion: String\n\t\t\t\tusuario_ID: Usuario\n\t\t\t\tidentificador: Int\n\t\t\t\thistorial_cambios: [Pregunta]\n\t\t\t\tregistroActual: Boolean\n\t\t\t\timagen: String\n\t\t\t\tfecha_creacion: String\n\t\t\t\tfecha_cierre: String\n\t\t\t\testado: String\n\t\t\t\ttipoPregunta: String\n\t\t\t\tareaconocimiento: [AreaConocimiento]\n\t\t\t\tdiscusiones: [DiscusionPregunta]\n\t\t\t\trespuestas: [String]\n\t\t\t\n\t\t\t}\n\t\t\t\n\t\t\ttype PreguntaConnection {\n\t\t\t\ttotalCount: Int\n\t\t\t\tedges : [PreguntaEdge]\n\t\t\t\tpageInfo: PageInfo\n\t\t\t\n\t\t\t}\n\t\t\t\n\t\t\ttype PreguntaEdge {\n\t\t\t\tcursor: String\n\t\t\t\tnode: Pregunta\n\t\t\t\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\ttype Query {\n\t\t\t\tverMyPreguntaActual(idPregunta: String!): Pregunta\n\t\t\t\tverListadoMisPreguntasActuales(idUsuario: String): [Pregunta]\n\t\t\t\tverListadoMisPreguntasActualesByEstado(idUsuario: String, estado: String): [Pregunta]\n\t\t\t\tlistadoPreguntasActuales(after: String,limit: Int, word: String): PreguntaConnection\n\t\t\t\tlistadoPreguntasActualesByEstado(after: String, limit: Int, word: String, estado: String): PreguntaConnection\n\t\t\t\thistorialImagenesUsadasByUserinAPregunta(idUsuario: String,idPregunta: String): Pregunta\n\t\t\t\tlistadoUsuariosDistintosCreadoPreguntas :[Usuario]\n\t\t\t\tlistadoAreasConocimientosUsadasPreguntas: [AreaConocimiento]\n\t\t\t\t\n\t\t\t}\n\t\t\tinput PreguntaInput{\n\t\t\t\tdescripcion: String!\n\t\t\t\tusuario_ID: ID!\n\t\t\t\timagen: String\n\t\t\t\tfecha_creacion: String!\n\t\t\t\ttipoPregunta: String\n\t\t\t\tareaconocimiento: [ID!]!\n\t\t\t\trespuestas: [String]\n\t\n\t\t\t}\n\t\t\t\n\t\t\ttype Mutation {\n\t\t\t\tcrearPregunta(pregunta: PreguntaInput): Pregunta\n\t\t\t\teditarPregunta(idPregunta: String, pregunta: PreguntaInput): Pregunta\n\t\t\t\teliminarPregunta(idPregunta: String!, correoUsuario: String!): Pregunta\n\t\t\t\trollbackPreguntaAnterior(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta\n\t\t\t\trollbackDescripcionPregunta(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta\n\t\t\t\trollbackRespuestasPregunta(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta\n\t\t\t\trollbackImagenPregunta(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta\n\t\t\t}\n\t\t\t\n\t\t\t\n\n\n";

exports.default = Pregunta;
//# sourceMappingURL=pregunta.js.map