"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Colaborador = "\n\ttype Colaborador {\n\t\t_id: ID!\n\t\trol: String\n\t\tusuarioColaborador: Usuario\n\t}\t\n\ttype Query {\n\t  \tgetColaboradorUsuario(id: String, idColaborador: String): Colaborador\n\t\tcargarListaColaboradoresUsuario(id: String): [Colaborador]\n\t\tgetNumeroColaboradoresUsuario(id: String): Int\n\t  \n\t}\n\t\t\n\ttype Mutation {\n\t\teditarRolColaboradorUsuario(id:String, idColaborador: String, rol: String): Boolean\n\t\taddColaboradorUsuario(id: String, idColaborador: String ): [Colaborador]\n\t\teliminarUsuarioColaborador(id: String, idColaborador: String): Boolean\n\t}\n";

exports.default = Colaborador;
//# sourceMappingURL=colaborador.js.map