"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var meritosUsuario = "\n        type Query{\n            getCantidadPreguntasElaboradasByUsuario(idUsuario: String):Int\n            getListaPreguntasElaboradasByUsuario(idUsuario: String):[Pregunta]\n            getCantidadCorreccionesPreguntasElaboradasByUsuario(idUsuario: String):Int\n            getListaCorreccionesPreguntasElaboradasByUsuario(idUsuario: String):[DiscusionPregunta]\n            getCantidadComentariosElaboradosByUsuario(idUsuario: String): Int\n            getListaComentariosElaboradasByUsuario(idUsuario: String): [Comentario]\n        }\n";

exports.default = meritosUsuario;
//# sourceMappingURL=meritos_usuarios.js.map