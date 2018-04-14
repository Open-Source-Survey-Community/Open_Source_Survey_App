"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var User = "\n\t\ttype Usuario {\n\t\t\t_id: ID!\n\t\t\tnombre: String\n\t\t\tapellido: String\n\t\t\tcorreo: String\n\t\t\turlImage: String\n\t\t\twiki: String\n\t\t\tinstitucion: String\n\t\t\tgrado_academico: String\n\t\t\tarea_academica: String\n\t\t\troles: [Rol]\n\t\t}\n\t\t\n\t\t\n\t\ttype Query {\n\t\t\tmostrarPerfilUsuario(id: String): Usuario\n\t\t\tlistaUsuariosByName(nombre: String): [Usuario]\n\t\t\tlistarTodosUsuarios: [Usuario]\n\t\t}\n\t\t\n\t\ttype Mutation {\n\t\t\tcrearUsuario(correo: String! , nombre: String, urlImage: String, rol: String, acciones: String): Usuario\n\t\t\teditarInstitucionUsuario(id: String, institucion: String): Usuario\n\t\t\teditarGradoAcademicoUsuario(id: String, grado_academico: String!): Usuario\n\t\t\teditarAreaAcademica(id: String, area_academica: String): Usuario\n\t\t\taddWiki(id: String, wiki: String): Usuario\n\t\t\teditarNombreUsuario(id: String, nombre: String): Usuario\n\t\t\teditarApellido(id: String, apellido: String): Usuario\n\t\t\taddImage(id: String, imagen: String): Usuario\n\t\t}\n";

exports.default = User;
//# sourceMappingURL=user.js.map