"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Rol = "\n\ttype Rol {\n\t\t_id: ID!\n\t\trol: String\n\t\tAcciones: [String]\n\t\testado: Int\t\n\t}\n\t\n\ttype Query {\n\t\tverRolUsuario(id: String): Rol\n\t\t\t\n\t}\n\t\t\n\ttype Mutation {\n\t\teditarRolUsuario(id: String!,rol: String, acciones: [String]): Rol\n\t}\n\n";

exports.default = Rol;
//# sourceMappingURL=rol.js.map