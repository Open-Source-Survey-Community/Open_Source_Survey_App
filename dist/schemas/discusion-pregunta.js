"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var DiscusionPregunta = "\n\ttype DiscusionPregunta {\n\t\t_id: ID!\n\t\ttitulo: String\n\t\tidentificador: Int\n\t\tetiquetas_correcciones: [EtiquetaCorrecciones]\n\t\tdescripcion: String\n\t\ttipo_correccion: [String]\n\t\tcreador_correccion: Usuario\n\t\testado_correccion: [EstadoCorreccion]\n\t\tfecha_creacion: String\n\t\tfecha_cierre: String\n\t\tpregunta_ID: Pregunta\n\t\thabilitada: Boolean\n\t}\n\t\n\t\n\ttype EstadoCorreccion {\n\t\tusuario_creador_estado : Usuario\n\t\trol: String\n\t\tasignacion: String\n\t\tobservacion: String\n\n\t}\n\ttype DiscusionPreguntaConnection {\n\t\ttotalCount: Int\n\t\tedges : [DiscusionPreguntaEdge]\n\t\tpageInfo: PageInfo\n\t\t\t\n\t}\n\t\t\t\n\ttype DiscusionPreguntaEdge {\n\t\tcursor: String\n\t\tnode: DiscusionPregunta\t\t\n\t}\n\t\n\tinput estadoCorreccionPreguntaInput{\n\t\tusuario_creador_estado: ID!\n\t\trol: String\n\t\tasignacion: String\n\t\tobservacion: String\n\t}\n\t\n\tinput discusionPreguntaInput {\n\t\ttitulo: String!\n\t\tetiquetas_correcciones: [ID]!\n\t\tdescripcion: String\n\t\ttipo_correccion: [String]\n\t\tcreador_correccion: ID!\n\t\testado_correccion: [estadoCorreccionPreguntaInput]\n\t\tfecha_creacion: String\n\t\tpregunta_ID: ID!\n\t}\n\t\n\t\t\t\n\t\n\ttype Query{\n\t\t##Get the list paginated of the issues question related to question\n\t\tgetListaIssuesByQuestions(limit: Int, after: String,idPregunta: String!): DiscusionPreguntaConnection\n\t\t\n\t\t## Este query me permite obtener la lista de los usuarios que han asignado\n\t\t## los estados de correcciones de una pregunta, aqui se deben cargar informacion \n\t\t## tanto del creador de la correccion, como son los moderadores\n\t\tgetListaUsuariosAsignadoEstadoCorreccionPregunta(idDiscusionPregunta: String!): DiscusionPregunta\n\t\t\n\t\t##Carga la informacion completa referente a una Correccion de Pregunta\n\t\t## el parametro necesario es el idDiscusionPregunta\n\t\tloadDiscusionPregunta(idDiscusionPregunta: String): DiscusionPregunta\n\t\t\n\t\t##esta consulta se debe realizar cuando se desea generar un datatable de correcciones de preguntas\n\t\tloadListaDiscusionesGeneradasByPregunta(idPregunta: String, limit: Int):[DiscusionPregunta]\n\t\t\n\t\t##Esta consulta carga los primeros 10 correcciones de pregunta que fueron creadas\n\t\t## tomando como parametro la fecha de creacion\n\t\tloadFirstDiscusionesPreguntasRecienCreadas: [DiscusionPregunta]\n\t\t\n\t\t##la informacion que devuelve esta consulta, es una lista de todas\n\t\t##las correcciones referentes a una pregunta que han sido creadas, o han sido actualizadas\n\t\t##esta accion es solo mostrada para los moderadores\n\t\tloadListaCorreccionesByPreguntasCreadasEditadas(idPregunta: String, usuario: String, limit: Int): [DiscusionPregunta]\n\t\t\n\t\t##Mostrar informacion paginada de las correcciones de preguntas, por los 5 posibles estados \n\t\t## Estados de una correccion de pregunta\n\t\t##Creado:Lista de correcciones de preguntas que han sido recien creadas\n\t\t##Editado:Lista de correcciones de preguntas que han sido editadas\n\t\t##Pendiente:Lista de correcciones de preguntas que han sido aceptada por un moderador y que esperan la correccion del usuario\n\t\t##Cerrado: Lista de correcciones de preguntas que han sido rechazadas por un moderador\n\t\t##Resuelto: Lista de correcciones de preguntas que han sido marcadas como resueltas por el creador de la correccion pregunta\n\t\tloadListaCorreccionesPreguntasByEstado(idPregunta: String, estado: String,limit: Int, after: String): DiscusionPreguntaConnection\n\t\t\n\t\t\n\t\tloadlistaUsuariosCreadoCorreccionesPreguntas(idPregunta: String): [Usuario]\n\t\n\t}\n\t\n\ttype Mutation {\n\t\t## crea una nueva discusion de una Pregunta  \n\t\tnuevaDiscusionPregunta(discusionPregunta: discusionPreguntaInput): DiscusionPregunta\n\t\n\t\t## editar una discusion que  ha sido previamente creada\n\t\t## esta operacion solamente puede ser efectuada por el creador de la discusion\n\t\teditarDiscusionPregunta(idDiscusionPregunta: String!, discusionPregunta: discusionPreguntaInput): Boolean\n\t\t\n\t\t## eliminar discusion de una pregunta\n\t\t## Esta accion indica que un usuario decide eliminar una discusion de una pregunta que ha \n\t\t## desarrollado, de manera previa\n\t\teliminarDiscusionPregunta(idDiscusionPregunta: String!, creador_correccion: String): Boolean\n\t\t\n\t\t##edicion Rapida de Discusiones de pregunta\n\t\t##Esta accion indica que un usuario creador de una discusion, puede editar de manera rapida el titulo\n\t\teditarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: String!, correoUsuario: String!, titulo: String): DiscusionPregunta\n\t\n\t\t##Esta accion indica que un usuario creador de una discusion, puede editar de manera rapida, la descripcion de una pregunta\n\t\teditarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: String!, correoUsuario: String!, descripcion: String): DiscusionPregunta\n\t\t\n\t\t## Esta accion cambia el estado de una discusion de una pregunta a resuelto\n\t\t## Esta accion solamente lo puede realizar el creador de la discusion de la pregunta\n\t\taprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: String): DiscusionPregunta\n\t\t\n\t\tasignarEstadoACorrecciondePregunta(idDiscusionPregunta: String, idUsuario: String, estado: String, observacion: String): DiscusionPregunta\n\t}\n\n";
exports.default = DiscusionPregunta;
//# sourceMappingURL=discusion-pregunta.js.map