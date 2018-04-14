"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	Query: {
		listadoAreaConocimiento: function listadoAreaConocimiento(parent, args, _ref) {
			var models = _ref.models;

			return models.areasConocimiento.find({ idioma: args.idioma }).populate("usuariopropietario").then(function (listaArasConocimientos) {
				return listaArasConocimientos;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		filtrarAreasConocimiento: function filtrarAreasConocimiento(parent, args, _ref2) {
			var models = _ref2.models;

			return models.areasConocimiento.find({ titulo: new RegExp(args.caracter, "i"), idioma: args.idioma }).populate("usuariopropietario").then(function (listaAreasConocimiento) {
				return listaAreasConocimiento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}

	},
	Mutation: {
		crearNuevaAreaConocimiento: function crearNuevaAreaConocimiento(parent, args, _ref3) {
			var models = _ref3.models;

			var area = new models.areasConocimiento(args.etiqueta);
			return area.save().then(function (documento) {
				return documento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		editarAreaConocimientoPregunta: function editarAreaConocimientoPregunta(parent, args, _ref4) {
			var models = _ref4.models;

			return models.areasConocimiento.findOne({ _id: args.id }).populate("usuariopropietario").then(function (documento) {
				if (documento.usuariopropietario.correo !== args.correo) {
					if (args.idioma === "es") {
						throw new Error("no puede editar esta etiqueta porque usted no es el propietario");
					} else if (args.idioma === "en") {
						throw new Error("you can not edit this tag because you are not the own! ");
					}
				} else {
					return models.Pregunta.count({ areaconocimiento: args.id }).then(function (numeroEtiquetasConocimiento) {
						if (numeroEtiquetasConocimiento > 0) {
							if (args.idioma === "en") {
								throw new Error(numeroEtiquetasConocimiento + "questions have these tag!");
							} else if (args.idioma === "es") {
								throw new Error(numeroEtiquetasConocimiento + "preguntas estan usando determinada etiqueta");
							}
						} else {
							return models.areasConocimiento.findByIdAndUpdate(args.id, { $set: { titulo: args.titulo, descripcion: args.descripcion, idioma: args.idioma } }, { new: true }).populate("usuariopropietario").then(function (documento) {
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
				}
			});
		},
		eliminarAreaConocimientoPregunta: function eliminarAreaConocimientoPregunta(parent, args, _ref5) {
			var models = _ref5.models;

			return models.areasConocimiento.findOne({ _id: args.id }).populate("usuariopropietario").then(function (documento) {
				if (documento.usuariopropietario.correo !== args.correo) {
					if (args.idioma === "es") {
						throw new Error("no puede eliminar esta etiqueta porque usted no es el propietario");
					} else if (args.idioma === "en") {
						throw new Error("you can not delete this tag because you are not the own! ");
					}
				} else {
					return models.Pregunta.count({ areaconocimiento: args.id }).then(function (numeroEtiquetasConocimiento) {
						if (numeroEtiquetasConocimiento > 0) {
							if (args.idioma === "en") {
								throw new Error(numeroEtiquetasConocimiento + "questions having these tag!");
							} else if (args.idioma === "es") {
								throw new Error(numeroEtiquetasConocimiento + "preguntas estan usando determinada etiqueta");
							}
						} else {
							return models.areasConocimiento.findByIdAndRemove(args.id).populate("usuariopropietario").then(function (documento) {
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
				}
			});
		}
	}
};
//# sourceMappingURL=area-conocimiento.js.map