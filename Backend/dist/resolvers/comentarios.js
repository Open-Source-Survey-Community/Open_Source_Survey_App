"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {

	Mutation: {
		crearComentarioAnexadaAPregunta: function crearComentarioAnexadaAPregunta(parent, args, _ref) {
			var models = _ref.models;

			return models.Comentario.count().then(function (existenComentariosCreados) {
				if (existenComentariosCreados) {
					args.comentario.identificador = existenComentariosCreados + 1;
				}
				var objetoComentario = new models.Comentario(args.comentario);
				return objetoComentario.save().then(function (comentarioGuardado) {
					return models.Pregunta.findByIdAndUpdate(args.idPregunta, {
						$push: { comentarios: comentarioGuardado }
					}, { new: true }).then(function () {
						return models.Comentario.populate(comentarioGuardado, "creador_comentario");
					}).catch(function (error) {
						throw new Error(error);
					});
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			}).catch(function (error) {
				throw new Error(error);
			});
		},
		crearComentarioAnexadaADiscusionPregunta: function crearComentarioAnexadaADiscusionPregunta(parent, args, _ref2) {
			var models = _ref2.models;

			return models.Comentario.count().then(function (existenComentariosCreados) {
				if (existenComentariosCreados) {
					args.comentario.identificador = existenComentariosCreados + 1;
				}
				var objetoComentario = new models.Comentario(args.comentario);
				return objetoComentario.save().then(function (comentarioGuardado) {
					return models.discusionPregunta.findByIdAndUpdate(args.idDiscusionPregunta, {
						$push: { comentarios: comentarioGuardado }
					}, { new: true }).then(function () {
						return models.Comentario.populate(comentarioGuardado, "creador_comentario");
					}).catch(function (error) {
						throw new Error(error);
					});
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			}).catch(function (error) {
				throw new Error(error);
			});
		},
		crearSubComentarioAnexadaAComentario: function crearSubComentarioAnexadaAComentario(parent, args, _ref3) {
			var models = _ref3.models;

			return models.Comentario.count().then(function (existenComentariosCreados) {
				if (existenComentariosCreados) {
					args.comentario.identificador = existenComentariosCreados + 1;
				}
				var objetoComentario = new models.Comentario(args.comentario);
				return objetoComentario.save().then(function (comentarioGuardado) {
					return models.Comentario.findByIdAndUpdate(args.idComentario, {
						$push: { listaSubComentarios: comentarioGuardado }
					}, { new: true }).then(function () {
						return models.Comentario.populate(comentarioGuardado, "creador_comentario");
					}).catch(function (error) {
						throw new Error(error);
					});
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			}).catch(function (error) {
				throw new Error(error);
			});
		},
		editarComentario: function editarComentario(parent, args, _ref4) {
			var models = _ref4.models;

			return models.Comentario.findById(args.idComentario).then(function (registroComentario) {
				if (registroComentario.creador_comentario == args.idUsuario) {
					return models.Comentario.findByIdAndUpdate(args.idComentario, { $set: { contenido: args.contenido } }, { new: true }).populate("creador_comentario").then(function (comentarioActualizado) {
						return comentarioActualizado;
					}).catch(function (error) {
						throw new Error(error);
					});
				} else {
					throw new Error("this users is not the owner this question");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}
	}
};
//# sourceMappingURL=comentarios.js.map