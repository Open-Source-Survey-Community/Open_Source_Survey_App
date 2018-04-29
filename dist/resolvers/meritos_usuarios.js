"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    Query: {
        getCantidadPreguntasElaboradasByUsuario: function getCantidadPreguntasElaboradasByUsuario(parent, args, _ref) {
            var models = _ref.models;

            return models.Pregunta.count({ "usuario_ID": args.idUsuario, "registroActual": true }).then(function (cantidadPreguntasElaboradas) {
                return cantidadPreguntasElaboradas;
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        getListaPreguntasElaboradasByUsuario: function getListaPreguntasElaboradasByUsuario(parent, args, _ref2) {
            var models = _ref2.models;

            return models.Pregunta.find({ "usuario_ID": args.idUsuario, "registroActual": true }).populate("areaconocimiento").sort({ "fecha_creacion": -1 }).limit(5).then(function (listaPreguntas) {
                return listaPreguntas;
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        getCantidadCorreccionesPreguntasElaboradasByUsuario: function getCantidadCorreccionesPreguntasElaboradasByUsuario(parent, args, _ref3) {
            var models = _ref3.models;

            return models.discusionPregunta.count({ "creador_correccion": args.idUsuario, "habilitada": true }).then(function (cantidadDiscusionPreguntasElaboradas) {
                return cantidadDiscusionPreguntasElaboradas;
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        getListaCorreccionesPreguntasElaboradasByUsuario: function getListaCorreccionesPreguntasElaboradasByUsuario(parent, args, _ref4) {
            var models = _ref4.models;

            return models.discusionPregunta.find({ "creador_correccion": args.idUsuario, "habilitada": true }).populate("etiquetas_correcciones").sort({ "fecha_creacion": -1 }).limit(5).then(function (listadiscusionPreguntas) {
                return listadiscusionPreguntas;
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        getCantidadComentariosElaboradosByUsuario: function getCantidadComentariosElaboradosByUsuario(parent, args, _ref5) {
            var models = _ref5.models;

            return models.Comentario.count({ "creador_comentario": args.idUsuario, "habilitada": true }).then(function (cantidadComentarios) {
                return cantidadComentarios;
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        getListaComentariosElaboradasByUsuario: function getListaComentariosElaboradasByUsuario(parent, args, _ref6) {
            var models = _ref6.models;

            return models.Comentario.find({ "creador_comentario": args.idUsuario, "habilitada": true }).populate("votacion.usuario_creador").sort({ "fecha_creacion": -1 }).limit(5).then(function (listaComentarios) {
                return listaComentarios;
            }).catch(function (error) {
                throw new Error(error);
            });
        }

    }
};
//# sourceMappingURL=meritos_usuarios.js.map