"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	Query: {
		listadoEtiquetasCorrecciones: function listadoEtiquetasCorrecciones(parent, args, _ref) {
			var models = _ref.models;

			if (args.idioma) {
				return models.etiquetaCorrecciones.find({ idioma: args.idioma }).populate("usuariopropietario").then(function (documentoEtiquetaCorrecciones) {
					return documentoEtiquetaCorrecciones;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				throw new Error("is neccessary a lenguage to filter tags");
			}
		},
		filtrarEtiquetasCorrecciones: function filtrarEtiquetasCorrecciones(parent, args, _ref2) {
			var models = _ref2.models;

			return models.etiquetaCorrecciones.find({ idioma: args.idioma, etiqueta: new RegExp(args.caracter, "i") }).populate("usuariopropietario").limit(10).then(function (documento) {
				return documento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		filtrarMyEtiquetasCorrecciones: function filtrarMyEtiquetasCorrecciones(parent, args, _ref3) {
			var models = _ref3.models;

			if (!args.limit) {
				args.limit = 10;
			} else {
				args.limit = args.limit * 10;
			}

			return models.etiquetaCorrecciones.find({ usuariopropietario: args.usuario_ID,
				etiqueta: new RegExp(args.caracter, "i") }).populate("usuariopropietario").limit(args.limit).then(function (documento) {
				return documento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}

	},
	Mutation: {
		crearNuevaEtiquetaCorrecciones: function crearNuevaEtiquetaCorrecciones(parent, args, _ref4) {
			var models = _ref4.models;

			return models.etiquetaCorrecciones.findOne({ etiqueta: { $regex: new RegExp(args.etiqueta.etiqueta, "i") } }).then(function (etiqueta) {
				if (etiqueta) {
					throw new Error("this tag already exist in the collection");
				} else {
					var etiquetaCorrecciones = new models.etiquetaCorrecciones(args.etiqueta);
					return etiquetaCorrecciones.save().then(function (documento) {
						return documento;
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		editarEtiquetaCorrecciontoPregunta: function editarEtiquetaCorrecciontoPregunta(parent, args, _ref5) {
			var models = _ref5.models;

			return models.etiquetaCorrecciones.findById(args.idEtiquetaCorreccion, "usuariopropietario").populate("usuariopropietario").then(function (documentoEtiquetaCorreccion) {
				if (documentoEtiquetaCorreccion.usuariopropietario.correo === args.correoUsuario) {
					return models.discusionPregunta.count({ etiquetas_correcciones: args.idEtiquetaCorreccion,
						habilitada: true }).then(function (numeroDiscusionesPreguntas) {
						if (numeroDiscusionesPreguntas > 0) {
							throw new Error("you can't edit this tag, because other users are using the same tag");
						} else {
							return models.etiquetaCorrecciones.findByIdAndUpdate(args.idEtiquetaCorreccion, { $set: { color: args.color, descripcion: args.descripcion, etiqueta: args.etiqueta } }, { new: true }).then(function (etiquetaCorreccionEditada) {
								return etiquetaCorreccionEditada;
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						}
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				} else {
					throw new Error("you can't edit this tag because you are not the owner");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		eliminarEtiquetaCorreccionPregunta: function eliminarEtiquetaCorreccionPregunta(parent, args, _ref6) {
			var models = _ref6.models;

			return models.etiquetaCorrecciones.findById(args.idEtiquetaCorreccion, "usuariopropietario").populate("usuariopropietario").then(function (documentoEtiquetaCorreccion) {
				if (documentoEtiquetaCorreccion.usuariopropietario.correo === args.correoUsuario) {
					return models.discusionPregunta.count({ etiquetas_correcciones: args.idEtiquetaCorreccion,
						habilitada: true }).then(function (numeroDiscusionesPreguntas) {
						if (numeroDiscusionesPreguntas > 0) {
							throw new Error("you can't edit this tag, because other users are using the same tag");
						} else {
							return models.etiquetaCorrecciones.findByIdAndRemove(args.idEtiquetaCorreccion).then(function (etiquetaCorreccionEditada) {
								return etiquetaCorreccionEditada;
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						}
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				} else {
					throw new Error("you can't edit this tag because you are not the owner");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}

	}

};
//# sourceMappingURL=etiquetas-correcciones.js.map