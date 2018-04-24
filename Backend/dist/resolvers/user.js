"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {

	Query: {
		mostrarPerfilUsuario: function mostrarPerfilUsuario(parent, args, _ref) {
			var models = _ref.models;

			if (args.id) {
				return models.User.findById(args.id).then(function (usuario) {
					return usuario;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		listaUsuariosByName: function listaUsuariosByName(parent, args, _ref2) {
			var models = _ref2.models;

			return models.User.find({
				"nombre": new RegExp(args.nombre, "i")
			}).then(function (resultados) {
				return resultados;
			}).catch(function (error) {
				if (error) {
					return null;
				}
			});
		},
		listarTodosUsuarios: function listarTodosUsuarios(parent, args, _ref3) {
			var models = _ref3.models;

			return models.User.find().then(function (usuarios) {
				return usuarios;
			}).catch(function (error) {
				if (error) {
					return null;
				}
			});
		}
	},
	Mutation: {
		crearUsuario: function crearUsuario(parent, args, _ref4) {
			var models = _ref4.models;

			return models.User.findOne({
				correo: args.correo
			}, "_id nombre apellido correo urlImage wiki institucion grado_academico area_academica roles").then(function (response) {
				if (!response) {
					var userInstance = new models.User({ correo: args.correo,
						nombre: args.nombre,
						urlImage: args.urlImage,
						roles: [{ rol: args.rol, Acciones: [args.acciones] }] });
					return userInstance.save().then(function (documento) {
						return documento;
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				} else {
					return response;
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		editarInstitucionUsuario: function editarInstitucionUsuario(parent, args, _ref5) {
			var models = _ref5.models;

			if (args.id) {
				return models.User.findByIdAndUpdate(args.id, { $set: { institucion: args.institucion } }, { upsert: true, new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		editarGradoAcademicoUsuario: function editarGradoAcademicoUsuario(parent, args, _ref6) {
			var models = _ref6.models;

			if (args.id) {
				return models.User.findByIdAndUpdate(args.id, { $set: { grado_academico: args.grado_academico } }, { upsert: true, new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		editarAreaAcademica: function editarAreaAcademica(parent, args, _ref7) {
			var models = _ref7.models;

			if (args.id) {
				return models.User.findByIdAndUpdate(args.id, { $set: { area_academica: args.area_academica } }, { new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		addWiki: function addWiki(parent, args, _ref8) {
			var models = _ref8.models;

			if (args.id) {
				return models.User.findByIdAndUpdate(args.id, { $set: { wiki: args.wiki } }, { new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		editarNombreUsuario: function editarNombreUsuario(parent, args, _ref9) {
			var models = _ref9.models;

			if (args.id && args.nombre) {
				return models.User.findByIdAndUpdate(args.id, { $set: { nombre: args.nombre } }, { new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		editarApellido: function editarApellido(parent, args, _ref10) {
			var models = _ref10.models;

			if (args.id && args.apellido) {
				return models.User.findByIdAndUpdate(args.id, { $set: { apellido: args.apellido } }, { new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		},
		addImage: function addImage(parent, args, _ref11) {
			var models = _ref11.models;

			if (args.id) {
				return models.User.findByIdAndUpdate(args.id, { $set: { urlImage: args.imagen } }, { new: true }).then(function (documento) {
					return documento;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				return null;
			}
		}
	}

};
//# sourceMappingURL=user.js.map