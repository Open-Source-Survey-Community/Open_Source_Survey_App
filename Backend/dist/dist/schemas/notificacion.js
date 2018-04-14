"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Notificacion = "\n\tscalar Date\n\ttype Notificacion {\n\t\tusuario_emisor: Usuario\n\t\tfecha_creacion: Date\n\t\ttipo: String\n\t\tdescripcion: String\n\t\tleido:Boolean\n\t}\n\t\n\ttype Query {\n\t\tgetNumeroNotificacionUsuario(id: String, tipo: String): Int\n\t\tloadListaNotificacionesUsuario(id: String!, tipo: String): [Notificacion]\n\t\tloadListaNotificacionesMasRecientesNoLeidas(id: String!, tipo: String): [Notificacion]\n\t}\n\t\t\n\ttype Mutation {\n\t\tcrearNotificacionUsuario(tipo: String, descripcion: String, idEmisor: String, idReceptor: String): Notificacion\n\t\tsetAllNotificacionesLikeLeida(id: String, tipo: String):Boolean\n\t\tsetNotificacionLeida(tipo: String, idNotificacion: String):Notificacion\n\t\t\n\t\t\n\t}\n";

exports.default = Notificacion;
//# sourceMappingURL=notificacion.js.map