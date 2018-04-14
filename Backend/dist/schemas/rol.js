"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Rol = "\n\ttype Rol {\n\t\t_id: ID!\n\t\trol: String\n\t\tAcciones: [String]\n\t\testado: Int\t\n\t}\n\t\n\ttype Query {\n\t\tverRolUsuario(id: String): Rol\n\t\t\t\n\t}\n\t\t\n\ttype Mutation {\n\t\teditarRolUsuario(id: String!,rol: String, acciones: [String]): Rol\n\t}\n\n";

exports.default = Rol;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NjaGVtYXMvcm9sLmpzIl0sIm5hbWVzIjpbIlJvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxvUkFBTjs7a0JBbUJnQkEsRyIsImZpbGUiOiJyb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSb2wgPSBgXG5cdHR5cGUgUm9sIHtcblx0XHRfaWQ6IElEIVxuXHRcdHJvbDogU3RyaW5nXG5cdFx0QWNjaW9uZXM6IFtTdHJpbmddXG5cdFx0ZXN0YWRvOiBJbnRcdFxuXHR9XG5cdFxuXHR0eXBlIFF1ZXJ5IHtcblx0XHR2ZXJSb2xVc3VhcmlvKGlkOiBTdHJpbmcpOiBSb2xcblx0XHRcdFxuXHR9XG5cdFx0XG5cdHR5cGUgTXV0YXRpb24ge1xuXHRcdGVkaXRhclJvbFVzdWFyaW8oaWQ6IFN0cmluZyEscm9sOiBTdHJpbmcsIGFjY2lvbmVzOiBbU3RyaW5nXSk6IFJvbFxuXHR9XG5cbmA7XG5cbmV4cG9ydCAgZGVmYXVsdCBSb2w7Il19