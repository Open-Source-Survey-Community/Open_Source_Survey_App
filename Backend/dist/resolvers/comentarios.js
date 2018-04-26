"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {

	Query: {
		verComentario: function verComentario(parent, args, _ref) {
			var models = _ref.models;

			return models.Comentario.findById(args.idComentario).populate("creador_comentario").populate("listaSubComentarios").populate("votacion.usuario_creador").then(function (comentario) {
				return comentario;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}
	},
	Mutation: {
		crearComentarioAnexadaAPregunta: function crearComentarioAnexadaAPregunta(parent, args, _ref2) {
			var models = _ref2.models;

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
		crearComentarioAnexadaADiscusionPregunta: function crearComentarioAnexadaADiscusionPregunta(parent, args, _ref3) {
			var models = _ref3.models;

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
		crearSubComentarioAnexadaAComentario: function crearSubComentarioAnexadaAComentario(parent, args, _ref4) {
			var models = _ref4.models;

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
		editarComentario: function editarComentario(parent, args, _ref5) {
			var models = _ref5.models;

			return models.Comentario.findById(args.idComentario).then(function (registroComentario) {
				if (registroComentario.creador_comentario == args.idUsuario) {
					return models.Comentario.findByIdAndUpdate(args.idComentario, { $set: { contenido: args.contenido, fecha_actualizacion: new Date() } }, { new: true }).populate("creador_comentario").then(function (comentarioActualizado) {
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
		},
		colocarLikesComentario: function colocarLikesComentario(parent, args, _ref6) {
			var models = _ref6.models;

			return models.Comentario.findOne({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, { "votacion.$": 1 }).then(function (comentario) {
				if (comentario) {
					if (comentario.votacion[0].like === 1 && comentario.votacion[0].dislike === 0) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.like": 0 }
						}, { new: true }).then(function () {
							return { like: -1, dislike: 0 };
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else if (comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 1) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.like": 1, "votacion.$.dislike": 0 }
						}, { new: true }).then(function () {
							return { like: 1, dislike: -1 };
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else if (comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 0) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.like": 1 }
						}, { new: true }).then(function () {
							return { like: 1, dislike: 0 };
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					}
				} else {
					return models.Comentario.findByIdAndUpdate(args.idComentario, { $push: { "votacion": { "usuario_creador": args.idUsuario, "like": 1, "dislike": 0, "favoritos": 0 } }
					}, { new: true }).then(function () {
						return { like: 1, dislike: 0 };
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
		colocarDisLikesComentario: function colocarDisLikesComentario(parent, args, _ref7) {
			var models = _ref7.models;

			return models.Comentario.findOne({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, { "votacion.$": 1 }).then(function (comentario) {
				if (comentario) {
					if (comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 1) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.dislike": 0 }
						}, { new: true }).then(function () {
							return { like: 0, dislike: -1 };
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else if (comentario.votacion[0].like === 1 && comentario.votacion[0].dislike === 0) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.like": 0, "votacion.$.dislike": 1 }
						}, { new: true }).then(function () {
							return { like: -1, dislike: 1 };
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else if (comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 0) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.dislike": 1 }
						}, { new: true }).then(function () {
							return { like: 0, dislike: 1 };
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					}
				} else {
					return models.Comentario.findByIdAndUpdate(args.idComentario, { $push: { "votacion": { "usuario_creador": args.idUsuario, "like": 0, "dislike": 1, "favoritos": 0 } }
					}, { new: true }).then(function () {
						return { like: 0, dislike: 1 };
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
		colocarFavoritosComentario: function colocarFavoritosComentario(parent, args, _ref8) {
			var models = _ref8.models;

			return models.Comentario.findOne({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, { "votacion.$": 1 }).then(function (comentario) {
				if (comentario) {
					if (comentario.votacion[0].favoritos === 1) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.favoritos": 0 }
						}, { new: true }).then(function () {
							return 0;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else if (comentario.votacion[0].favoritos === 0) {
						return models.Comentario.findOneAndUpdate({ "_id": args.idComentario, "votacion.usuario_creador": args.idUsuario }, {
							$set: { "votacion.$.usuario_creador": args.idUsuario, "votacion.$.favoritos": 1 }
						}, { new: true }).then(function () {
							return 1;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					}
				} else {
					return models.Comentario.findByIdAndUpdate(args.idComentario, { $push: { "votacion": { "usuario_creador": args.idUsuario, "like": 0, "dislike": 0, "favoritos": 1 } }
					}, { new: true }).populate("votacion.usuario_creador").then(function () {
						return 1;
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
	}
};
//# sourceMappingURL=comentarios.js.map