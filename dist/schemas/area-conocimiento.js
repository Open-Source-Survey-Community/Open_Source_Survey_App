"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var AreaConocimiento = "\n\ttype AreaConocimiento {\n\t\tusuariopropietario: Usuario\n\t\ttitulo: String\n\t\tdescripcion: String\n\t\tidioma: String\n\t}\n\t\n\t\n\ttype Query {\n\t\tlistadoAreaConocimiento(idioma: String): [AreaConocimiento]\n\t\tfiltrarAreasConocimiento(idioma: String,caracter: String): [AreaConocimiento]\n\t\t\n\t\t\n\t}\n\t\n\tinput conocimiento{\n\t\tusuariopropietario: String\n\t\ttitulo: String\n\t\tdescripcion: String\n\t\tidioma: String!\n\t}\n\t\n\ttype Mutation {\n\t\tcrearNuevaAreaConocimiento(etiqueta: conocimiento!): AreaConocimiento\n\t\teditarAreaConocimientoPregunta(id: String, titulo: String, \n\t\t\t\t\t\t\t\t\t\tdescripcion: String, idioma: String!,\n\t\t\t\t\t\t\t\t\t\tcorreo: String): AreaConocimiento\n\t\teliminarAreaConocimientoPregunta(id: String, idioma: String!, correo: String): AreaConocimiento\n\t}\n\n\n\n";

exports.default = AreaConocimiento;
//# sourceMappingURL=area-conocimiento.js.map