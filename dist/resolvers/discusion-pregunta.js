"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable no-unused-vars */
exports.default = {
	Query: {
		getListaIssuesByQuestions: function getListaIssuesByQuestions(parent, args, _ref) {
			var models = _ref.models;

			var edgeDiscusionPreguntaArray = [];
			var cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor) {
				cursor = 0;
			}
			if (!args.limit) {
				args.limit = 5;
			}
			var edgeDiscusionPreguntaInfoPromise = new Promise(function (resolve, reject) {
				var edges = models.discusionPregunta.find({ identificador: { $gt: cursor }, pregunta_ID: args.idPregunta }, function (err, result) {
					if (err) {
						reject(err);
					}
				}).populate("creador_correccion").populate("etiquetas_correcciones").populate("estado_correccion.usuario_creador_estado").limit(args.limit).cursor();

				edges.on("data", function (res) {
					edgeDiscusionPreguntaArray.push({
						cursor: Buffer.from(res.identificador.toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end", function () {
					var endCursor = edgeDiscusionPreguntaArray.length > 0 ? edgeDiscusionPreguntaArray[edgeDiscusionPreguntaArray.length - 1].cursor : NaN;
					var hasNextPage = new Promise(function (resolve, reject) {
						if (endCursor) {
							var cursorFinal = parseInt(Buffer.from(endCursor, "base64").toString("ascii"));
							models.discusionPregunta.where("identificador").gt(cursorFinal).count({ pregunta_ID: args.idPregunta }, function (err, count) {
								if (err) {
									reject(err);
								}
								count > 0 ? resolve(true) : resolve(false);
							});
						} else {
							resolve(false);
						}
					});
					resolve({
						edges: edgeDiscusionPreguntaArray,
						pageInfo: {
							endCursor: endCursor,
							hasnextPage: hasNextPage
						}
					});
				});
			});
			var totalPagesPromise = new Promise(function (resolve, reject) {
				models.discusionPregunta.count({ pregunta_ID: args.idPregunta }, function (err, count) {
					if (err) {
						reject(err);
					} else {
						resolve(count);
					}
				});
			});
			var listPaginateDiscusionPregunta = Promise.all([edgeDiscusionPreguntaInfoPromise, totalPagesPromise]).then(function (values) {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo: {
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage: values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginateDiscusionPregunta;
		},
		getListaUsuariosAsignadoEstadoCorreccionPregunta: function getListaUsuariosAsignadoEstadoCorreccionPregunta(parent, args, _ref2) {
			var models = _ref2.models;

			return models.discusionPregunta.findById(args.idDiscusionPregunta).populate("estado_correccion.usuario_creador_estado").then(function (listaUsuarios) {
				return listaUsuarios;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		loadDiscusionPregunta: function loadDiscusionPregunta(parent, args, _ref3) {
			var models = _ref3.models;

			return models.discusionPregunta.findById(args.idDiscusionPregunta).populate("creador_correccion").populate("estado_correccion.usuario_creador_estado").populate("etiquetas_correcciones").populate({
				path: "pregunta_ID",
				populate: {
					path: "areaconocimiento",
					model: "areas-conocimiento"
				}
			}).populate({
				path: "pregunta_ID",
				populate: {
					path: "usuario_ID",
					model: "usuario"
				}
			}).then(function (documento) {
				return documento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		loadListaDiscusionesGeneradasByPregunta: function loadListaDiscusionesGeneradasByPregunta(parent, args, _ref4) {
			var models = _ref4.models;

			return models.Pregunta.findOne({ _id: args.idPregunta }, { discusiones: { $slice: args.limit } }).populate({
				path: "discusiones",
				populate: {
					path: "creador_correccion",
					model: "usuario"
				}
			}).populate({
				path: "discusiones",
				populate: {
					path: "estado_correccion.usuario_creador_estado",
					model: "usuario"
				}

			}).populate({
				path: "discusiones",
				populate: {
					path: "etiquetas_correcciones",
					model: "etiqueta-correcciones"
				}
			}).then(function (listadoDiscusionesPregunta) {
				return listadoDiscusionesPregunta.discusiones;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		loadFirstDiscusionesPreguntasRecienCreadas: function loadFirstDiscusionesPreguntasRecienCreadas(parent, args, _ref5) {
			var models = _ref5.models;

			return models.discusionPregunta.find({ habilitada: true }).populate("creador_correccion").populate("pregunta_ID").populate("etiquetas_correcciones").sort({ fecha_creacion: -1 }).limit(5).then(function (listaDiscusionesPregunta) {
				return listaDiscusionesPregunta;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		loadListaCorreccionesByPreguntasCreadasEditadas: function loadListaCorreccionesByPreguntasCreadasEditadas(parent, args, _ref6) {
			var models = _ref6.models;

			return models.User.findById(args.usuario, "roles").then(function (rolUsuario) {
				if (rolUsuario.roles[0].rol === "moderador") {
					return models.discusionPregunta.find({ "pregunta_ID": args.idPregunta,
						"estado_correccion.rol": "usuario",
						$or: [{ "estado_correccion.asignacion": "creado" }, { "estado_correccion.asignacion": "editado" }] }).populate("etiquetas_correcciones").populate("creador_correccion").populate("pregunta_ID").populate("estado_correccion.usuario_creador_estado").limit(args.limit).then(function (listadoCorreccionesPregunta) {
						return listadoCorreccionesPregunta;
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				} else {
					throw new Error("this users is not member committe, so you can't get this information");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		loadListaCorreccionesPreguntasByEstado: function loadListaCorreccionesPreguntasByEstado(parent, args, _ref7) {
			var models = _ref7.models;

			var edgeDiscusionPreguntaArray = [];
			var cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor) {
				cursor = 0;
			}
			if (!args.limit) {
				args.limit = 5;
			}
			var edgeDiscusionPreguntaInfoPromise = new Promise(function (resolve, reject) {
				var edges = models.discusionPregunta.find({ identificador: { $gt: cursor }, pregunta_ID: args.idPregunta,
					"estado_correccion.asignacion": args.estado }, function (err, result) {
					if (err) {
						reject(err);
					}
				}).populate("creador_correccion").populate("etiquetas_correcciones").populate("estado_correccion.usuario_creador_estado").limit(args.limit).cursor();

				edges.on("data", function (res) {
					edgeDiscusionPreguntaArray.push({
						cursor: Buffer.from(res.identificador.toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end", function () {
					var endCursor = edgeDiscusionPreguntaArray.length > 0 ? edgeDiscusionPreguntaArray[edgeDiscusionPreguntaArray.length - 1].cursor : NaN;
					var hasNextPage = new Promise(function (resolve, reject) {
						if (endCursor) {
							var cursorFinal = parseInt(Buffer.from(endCursor, "base64").toString("ascii"));
							models.discusionPregunta.where("identificador").gt(cursorFinal).count({ pregunta_ID: args.idPregunta, "estado_correccion.asignacion": args.estado }, function (err, count) {
								if (err) {
									reject(err);
								}
								count > 0 ? resolve(true) : resolve(false);
							});
						} else {
							resolve(false);
						}
					});
					resolve({
						edges: edgeDiscusionPreguntaArray,
						pageInfo: {
							endCursor: endCursor,
							hasnextPage: hasNextPage
						}
					});
				});
			});
			var totalPagesPromise = new Promise(function (resolve, reject) {
				models.discusionPregunta.count({ pregunta_ID: args.idPregunta, "estado_correccion.asignacion": args.estado }, function (err, count) {
					if (err) {
						reject(err);
					} else {
						resolve(count);
					}
				});
			});
			var listPaginateDiscusionPregunta = Promise.all([edgeDiscusionPreguntaInfoPromise, totalPagesPromise]).then(function (values) {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo: {
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage: values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginateDiscusionPregunta;
		},
		loadlistaUsuariosCreadoCorreccionesPreguntas: function loadlistaUsuariosCreadoCorreccionesPreguntas(parent, args, _ref8) {
			var models = _ref8.models;

			return models.discusionPregunta.distinct("creador_correccion", { "pregunta_ID": args.idPregunta }).then(function (listaUsuariosDistintos) {
				return models.User.find({ "_id": { $in: listaUsuariosDistintos } }).then(function (listaUsuarios) {
					return listaUsuarios;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}
	},
	Mutation: {
		nuevaDiscusionPregunta: function nuevaDiscusionPregunta(parent, args, _ref9) {
			var models = _ref9.models;

			return models.discusionPregunta.findOne({ titulo: args.discusionPregunta.titulo }).then(function (discusionPregunta) {
				if (discusionPregunta) {
					throw new Error("you already create this question, you can't create the same correction two times");
				} else {
					return models.discusionPregunta.count().then(function (numeroDiscusionesPregunta) {
						if (numeroDiscusionesPregunta) {
							args.discusionPregunta.identificador = numeroDiscusionesPregunta + 1;
						}
						var discusion_pregunta = new models.discusionPregunta(args.discusionPregunta);
						return discusion_pregunta.save().then(function (documento) {
							return models.Pregunta.findByIdAndUpdate(args.discusionPregunta.pregunta_ID, { $push: { discusiones: documento } }, { new: true }).then(function () {
								return documento;
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
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
		editarDiscusionPregunta: function editarDiscusionPregunta(parent, args, _ref10) {
			var models = _ref10.models;

			return models.discusionPregunta.findOne({ "_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario" }, { "estado_correccion.$": 1 }).then(function (discusionPregunta) {
				if (discusionPregunta.estado_correccion[0].asignacion === "pendiente") {
					throw new Error("the question creator's is editing the content, thanks to your issues," + "you can not make change to a issues, in state pending");
				} else if (discusionPregunta.estado_correccion[0].asignacion === "cerrado") {
					throw new Error("the issues was reject by a committee member, so you must create a new one issues");
				} else if (discusionPregunta.estado_correccion[0].asignacion === "resuelto") {
					throw new Error("the creator this issues already accept the change of the question creator, so you decided " + "marked this issues like solved!, you should create other issues");
				} else {
					return models.discusionPregunta.update({ _id: args.idDiscusionPregunta, creador_correccion: args.discusionPregunta.creador_correccion }, args.discusionPregunta).then(function (documentoAfectado) {
						if (documentoAfectado.n === 1) {
							return true;
						} else {
							throw new Error("This user can't edit this question, because he is not the owner");
						}
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
		eliminarDiscusionPregunta: function eliminarDiscusionPregunta(parent, args, _ref11) {
			var models = _ref11.models;

			return models.discusionPregunta.findOne({ "_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario" }, { "estado_correccion.$": 1 }).then(function (discusionPregunta) {
				if (discusionPregunta.estado_correccion[0].asignacion === "pendiente") {
					throw new Error("the question creator's is editing the content, thanks to your issues," + "you can not delete this issues, in state pending");
				} else {
					return models.discusionPregunta.update({ _id: args.idDiscusionPregunta, creador_correccion: args.creador_correccion }, { habilitada: false }).then(function (correccionActualizada) {
						if (correccionActualizada.n === 1) {
							return true;
						} else {
							throw new Error("This user can't edit this question, because he is not the owner");
						}
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
		editarMyDiscusionPreguntaByTitulo: function editarMyDiscusionPreguntaByTitulo(parent, args, _ref12) {
			var models = _ref12.models;

			return models.discusionPregunta.findOne({ "_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario" }, { "estado_correccion.$": 1 }).then(function (discusionPregunta) {
				if (discusionPregunta.estado_correccion[0].asignacion === "pendiente") {
					throw new Error("the question creator's is editing the content, thanks to your issues," + "you can not make change to a issues, in state pending");
				} else if (discusionPregunta.estado_correccion[0].asignacion === "cerrado") {
					throw new Error("the issues was reject by a committee member, so you must create a new one issues");
				} else if (discusionPregunta.estado_correccion[0].asignacion === "resuelto") {
					throw new Error("you already accept the change of the question creator, so you decided " + "marked this issues like solved!, you should create other issues");
				} else {
					return models.discusionPregunta.findById(args.idDiscusionPregunta, "creador_correccion").populate("creador_correccion").then(function (correccionPregunta) {
						if (correccionPregunta.creador_correccion.correo === args.correoUsuario) {
							return models.discusionPregunta.findByIdAndUpdate(args.idDiscusionPregunta, { $set: { titulo: args.titulo } }, { new: true }).then(function (correccionPreguntaActualizada) {
								return correccionPreguntaActualizada;
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						} else {
							throw new Error("this question issue you can not edit, because you are not the owner");
						}
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
		editarMyDiscusionPreguntaByDescripcion: function editarMyDiscusionPreguntaByDescripcion(parent, args, _ref13) {
			var models = _ref13.models;

			return models.discusionPregunta.findOne({ "_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario" }, { "estado_correccion.$": 1 }).then(function (discusionPregunta) {
				if (discusionPregunta.estado_correccion[0].asignacion === "pendiente") {
					throw new Error("the question creator's is editing the content, thanks to your issues," + "you can not make change to a issues, in state pending");
				} else if (discusionPregunta.estado_correccion[0].asignacion === "cerrado") {
					throw new Error("the issues was reject by a committee member, so you must create a new one issues");
				} else if (discusionPregunta.estado_correccion[0].asignacion === "resuelto") {
					throw new Error("you already accept the change of the question creator, so you decided " + "marked this issues like solved!, you should create other issues");
				} else {
					return models.discusionPregunta.findById(args.idDiscusionPregunta, "creador_correccion").populate("creador_correccion").then(function (correccionPregunta) {
						if (correccionPregunta.creador_correccion.correo === args.correoUsuario) {
							return models.discusionPregunta.findByIdAndUpdate(args.idDiscusionPregunta, { $set: { descripcion: args.descripcion } }, { new: true }).then(function (correccionPreguntaActualizada) {
								return correccionPreguntaActualizada;
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						} else {
							throw new Error("this question issue you can not edit, because you are not the owner");
						}
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
		aprobarEstadoMyDiscusionPregunta: function aprobarEstadoMyDiscusionPregunta(parent, args, _ref14) {
			var models = _ref14.models;

			return models.discusionPregunta.findById(args.idDiscusionPregunta).then(function (documentoDiscusionPregunta) {
				if (documentoDiscusionPregunta.habilitada) {
					return models.discusionPregunta.findOne({ "_id": args.idDiscusionPregunta,
						"estado_correccion.usuario_creador_estado": documentoDiscusionPregunta.creador_correccion }, { "estado_correccion.$": 1 }).then(function (arrayFiltrado) {
						if (arrayFiltrado.estado_correccion[0]["asignacion"] !== "cerrado" && arrayFiltrado.estado_correccion[0]["asignacion"] !== "resuelto") {
							return models.discusionPregunta.findOneAndUpdate({ "_id": args.idDiscusionPregunta,
								"estado_correccion.usuario_creador_estado": documentoDiscusionPregunta.creador_correccion }, { $set: { "estado_correccion.$.asignacion": "resuelto",
									"estado_correccion.$.observacion": "el usuario ha cerrado esta discusion," + "debido que el creador de la pregunta, realizo los cambios respectivos",
									"fecha_cierre": new Date() } }, { new: true }).then(function (discusionAprovada) {
								return discusionAprovada;
							}).catch(function (error) {
								throw new Error(error);
							});
						} else {
							throw new Error("you can't approved a issues questions, that already is closed or solved!");
						}
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				} else {
					throw new Error("you can't approved a question issues, that you had closed!");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		asignarEstadoACorrecciondePregunta: function asignarEstadoACorrecciondePregunta(parent, args, _ref15) {
			var models = _ref15.models;

			return models.discusionPregunta.findOne({ "_id": args.idDiscusionPregunta }, "creador_correccion, estado_correccion").populate("creador_correccion").then(function (usuario) {
				if (usuario.creador_correccion._id == args.idUsuario) {
					throw new Error("the owner of this issues, can't approved or reject this!!");
				} else {
					if (usuario.estado_correccion[0].asignacion === "pendiente" || usuario.estado_correccion.asignacion === "cerrado") {
						throw new Error("this issues was already assigned by a committe member, you can't change this!");
					} else if (usuario.estado_correccion[0].asignacion === "resuelto") {
						throw new Error("this issues was already marked like solved, by the owner this content");
					} else {
						if (args.estado === "rechazado") {
							return models.discusionPregunta.findOneAndUpdate({ "_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario" }, { $set: { "estado_correccion.$.asignacion": "cerrado", "fecha_cierre": new Date() } }, { new: true }).then(function (discusionActualizada) {
								return models.discusionPregunta.findOneAndUpdate({ "_id": discusionActualizada._id }, { $push: { "estado_correccion": { "observacion": args.observacion, "usuario_creador_estado": args.idUsuario,
											"rol": "moderador", "asignacion": "rechazado" } } }, { new: true }).populate("estado_correccion.usuario_creador_estado").then(function (correccionActualizada) {
									return correccionActualizada;
								});
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						} else if (args.estado === "aceptado") {
							return models.discusionPregunta.findOneAndUpdate({ "_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario" }, { $set: { "estado_correccion.$.asignacion": "pendiente" } }, { new: true }).then(function (discusionActualizada) {
								return models.discusionPregunta.findOneAndUpdate({ "_id": discusionActualizada._id }, { $push: { "estado_correccion": { "observacion": args.observacion, "usuario_creador_estado": args.idUsuario,
											"rol": "moderador", "asignacion": "aceptado" } } }, { new: true }).populate("estado_correccion.usuario_creador_estado").populate("pregunta_ID").then(function (correccionActualizada) {
									if (discusionActualizada.pregunta_ID.estado === "estable") {
										return models.Pregunta.findByIdAndUpdate(discusionActualizada.pregunta_ID._id, { $set: { estado: "revision" } }, { new: true }).then(function () {
											return correccionActualizada;
										}).catch(function (error) {
											if (error) {
												throw new Error(error);
											}
										});
									}
									return correccionActualizada;
								});
							}).catch(function (error) {
								if (error) {
									throw new Error(error);
								}
							});
						}
					}
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}
	}

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Jlc29sdmVycy9kaXNjdXNpb24tcHJlZ3VudGEuanMiXSwibmFtZXMiOlsiUXVlcnkiLCJnZXRMaXN0YUlzc3Vlc0J5UXVlc3Rpb25zIiwicGFyZW50IiwiYXJncyIsIm1vZGVscyIsImVkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5IiwiY3Vyc29yIiwicGFyc2VJbnQiLCJCdWZmZXIiLCJmcm9tIiwiYWZ0ZXIiLCJ0b1N0cmluZyIsImxpbWl0IiwiZWRnZURpc2N1c2lvblByZWd1bnRhSW5mb1Byb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVkZ2VzIiwiZGlzY3VzaW9uUHJlZ3VudGEiLCJmaW5kIiwiaWRlbnRpZmljYWRvciIsIiRndCIsInByZWd1bnRhX0lEIiwiaWRQcmVndW50YSIsImVyciIsInJlc3VsdCIsInBvcHVsYXRlIiwib24iLCJwdXNoIiwicmVzIiwibm9kZSIsImVuZEN1cnNvciIsImxlbmd0aCIsIk5hTiIsImhhc05leHRQYWdlIiwiY3Vyc29yRmluYWwiLCJ3aGVyZSIsImd0IiwiY291bnQiLCJwYWdlSW5mbyIsImhhc25leHRQYWdlIiwidG90YWxQYWdlc1Byb21pc2UiLCJsaXN0UGFnaW5hdGVEaXNjdXNpb25QcmVndW50YSIsImFsbCIsInRoZW4iLCJ2YWx1ZXMiLCJ0b3RhbENvdW50IiwiZ2V0TGlzdGFVc3Vhcmlvc0FzaWduYWRvRXN0YWRvQ29ycmVjY2lvblByZWd1bnRhIiwiZmluZEJ5SWQiLCJpZERpc2N1c2lvblByZWd1bnRhIiwibGlzdGFVc3VhcmlvcyIsImNhdGNoIiwiZXJyb3IiLCJFcnJvciIsImxvYWREaXNjdXNpb25QcmVndW50YSIsInBhdGgiLCJtb2RlbCIsImRvY3VtZW50byIsImxvYWRMaXN0YURpc2N1c2lvbmVzR2VuZXJhZGFzQnlQcmVndW50YSIsIlByZWd1bnRhIiwiZmluZE9uZSIsIl9pZCIsImRpc2N1c2lvbmVzIiwiJHNsaWNlIiwibGlzdGFkb0Rpc2N1c2lvbmVzUHJlZ3VudGEiLCJsb2FkRmlyc3REaXNjdXNpb25lc1ByZWd1bnRhc1JlY2llbkNyZWFkYXMiLCJoYWJpbGl0YWRhIiwic29ydCIsImZlY2hhX2NyZWFjaW9uIiwibGlzdGFEaXNjdXNpb25lc1ByZWd1bnRhIiwibG9hZExpc3RhQ29ycmVjY2lvbmVzQnlQcmVndW50YXNDcmVhZGFzRWRpdGFkYXMiLCJVc2VyIiwidXN1YXJpbyIsInJvbFVzdWFyaW8iLCJyb2xlcyIsInJvbCIsIiRvciIsImxpc3RhZG9Db3JyZWNjaW9uZXNQcmVndW50YSIsImxvYWRMaXN0YUNvcnJlY2Npb25lc1ByZWd1bnRhc0J5RXN0YWRvIiwiZXN0YWRvIiwibG9hZGxpc3RhVXN1YXJpb3NDcmVhZG9Db3JyZWNjaW9uZXNQcmVndW50YXMiLCJkaXN0aW5jdCIsIiRpbiIsImxpc3RhVXN1YXJpb3NEaXN0aW50b3MiLCJNdXRhdGlvbiIsIm51ZXZhRGlzY3VzaW9uUHJlZ3VudGEiLCJ0aXR1bG8iLCJudW1lcm9EaXNjdXNpb25lc1ByZWd1bnRhIiwiZGlzY3VzaW9uX3ByZWd1bnRhIiwic2F2ZSIsImZpbmRCeUlkQW5kVXBkYXRlIiwiJHB1c2giLCJuZXciLCJlZGl0YXJEaXNjdXNpb25QcmVndW50YSIsImVzdGFkb19jb3JyZWNjaW9uIiwiYXNpZ25hY2lvbiIsInVwZGF0ZSIsImNyZWFkb3JfY29ycmVjY2lvbiIsImRvY3VtZW50b0FmZWN0YWRvIiwibiIsImVsaW1pbmFyRGlzY3VzaW9uUHJlZ3VudGEiLCJjb3JyZWNjaW9uQWN0dWFsaXphZGEiLCJlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlUaXR1bG8iLCJjb3JyZWNjaW9uUHJlZ3VudGEiLCJjb3JyZW8iLCJjb3JyZW9Vc3VhcmlvIiwiJHNldCIsImNvcnJlY2Npb25QcmVndW50YUFjdHVhbGl6YWRhIiwiZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5RGVzY3JpcGNpb24iLCJkZXNjcmlwY2lvbiIsImFwcm9iYXJFc3RhZG9NeURpc2N1c2lvblByZWd1bnRhIiwiZG9jdW1lbnRvRGlzY3VzaW9uUHJlZ3VudGEiLCJhcnJheUZpbHRyYWRvIiwiZmluZE9uZUFuZFVwZGF0ZSIsIkRhdGUiLCJkaXNjdXNpb25BcHJvdmFkYSIsImFzaWduYXJFc3RhZG9BQ29ycmVjY2lvbmRlUHJlZ3VudGEiLCJpZFVzdWFyaW8iLCJkaXNjdXNpb25BY3R1YWxpemFkYSIsIm9ic2VydmFjaW9uIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO2tCQUNlO0FBQ2RBLFFBQU87QUFDTkMsNkJBQTJCLG1DQUFDQyxNQUFELEVBQVNDLElBQVQsUUFBNEI7QUFBQSxPQUFaQyxNQUFZLFFBQVpBLE1BQVk7O0FBQ3RELE9BQUlDLDZCQUE2QixFQUFqQztBQUNBLE9BQUlDLFNBQVNDLFNBQVNDLE9BQU9DLElBQVAsQ0FBWU4sS0FBS08sS0FBakIsRUFBd0IsUUFBeEIsRUFBa0NDLFFBQWxDLENBQTJDLE9BQTNDLENBQVQsQ0FBYjtBQUNBLE9BQUksQ0FBQ0wsTUFBTCxFQUFZO0FBQ1hBLGFBQVMsQ0FBVDtBQUNBO0FBQ0QsT0FBRyxDQUFDSCxLQUFLUyxLQUFULEVBQWU7QUFDZFQsU0FBS1MsS0FBTCxHQUFhLENBQWI7QUFDQTtBQUNELE9BQUlDLG1DQUFtQyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW9CO0FBQ3RFLFFBQUlDLFFBQVFiLE9BQU9jLGlCQUFQLENBQXlCQyxJQUF6QixDQUE4QixFQUFDQyxlQUFjLEVBQUNDLEtBQUlmLE1BQUwsRUFBZixFQUE0QmdCLGFBQWFuQixLQUFLb0IsVUFBOUMsRUFBOUIsRUFBeUYsVUFBQ0MsR0FBRCxFQUFNQyxNQUFOLEVBQWlCO0FBQ3JILFNBQUdELEdBQUgsRUFBTztBQUNOUixhQUFPUSxHQUFQO0FBQ0E7QUFDRCxLQUpXLEVBSVRFLFFBSlMsQ0FJQSxvQkFKQSxFQUtWQSxRQUxVLENBS0Qsd0JBTEMsRUFNVkEsUUFOVSxDQU1ELDBDQU5DLEVBT1ZkLEtBUFUsQ0FPSlQsS0FBS1MsS0FQRCxFQU9RTixNQVBSLEVBQVo7O0FB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LEVBQzNGLGNBQWEsVUFEOEUsRUFBckIsRUFBUCxFQUEzRSxFQUN1QyxFQUFDekIsS0FBSyxJQUFOLEVBRHZDLEVBRUxsRSxRQUZLLENBRUksMENBRkosRUFHTEEsUUFISyxDQUdJLGFBSEosRUFJTGtCLElBSkssQ0FJQSxpQ0FBeUI7QUFDOUIsYUFBSTBFLHFCQUFxQmhHLFdBQXJCLENBQWlDeUQsTUFBakMsS0FBNEMsU0FBaEQsRUFBMEQ7QUFDekQsaUJBQU8zRSxPQUFPdUQsUUFBUCxDQUFnQitCLGlCQUFoQixDQUFrQzRCLHFCQUFxQmhHLFdBQXJCLENBQWlDdUMsR0FBbkUsRUFDTixFQUFDNkMsTUFBSyxFQUFDM0IsUUFBUSxVQUFULEVBQU4sRUFETSxFQUNzQixFQUFDYSxLQUFLLElBQU4sRUFEdEIsRUFFTGhELElBRkssQ0FFQSxZQUFNO0FBQ1gsa0JBQU95RCxxQkFBUDtBQUNBLFdBSkssRUFJSGxELEtBSkcsQ0FJRyxpQkFBUztBQUNqQixlQUFHQyxLQUFILEVBQVM7QUFDUixrQkFBTSxJQUFJQyxLQUFKLENBQVVELEtBQVYsQ0FBTjtBQUNBO0FBQ0QsV0FSSyxDQUFQO0FBU0E7QUFDRCxnQkFBT2lELHFCQUFQO0FBQ0EsU0FqQkssQ0FBUDtBQW1CQSxRQXRCSyxFQXNCSGxELEtBdEJHLENBc0JHLGlCQUFTO0FBQ2pCLFlBQUlDLEtBQUosRUFBVTtBQUNULGVBQU0sSUFBSUMsS0FBSixDQUFVRCxLQUFWLENBQU47QUFDQTtBQUNELFFBMUJLLENBQVA7QUEyQkE7QUFDRDtBQUNEO0FBQ0QsSUF6REssRUF5REhELEtBekRHLENBeURHLGlCQUFTO0FBQ2pCLFFBQUlDLEtBQUosRUFBVTtBQUNULFdBQU0sSUFBSUMsS0FBSixDQUFVRCxLQUFWLENBQU47QUFDQTtBQUNELElBN0RLLENBQVA7QUE4REE7QUExU1E7O0FBM1JJLEMiLCJmaWxlIjoiZGlzY3VzaW9uLXByZWd1bnRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0UXVlcnk6IHtcblx0XHRnZXRMaXN0YUlzc3Vlc0J5UXVlc3Rpb25zOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0bGV0IGVkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5ID0gW107XG5cdFx0XHRsZXQgY3Vyc29yID0gcGFyc2VJbnQoQnVmZmVyLmZyb20oYXJncy5hZnRlciwgXCJiYXNlNjRcIikudG9TdHJpbmcoXCJhc2NpaVwiKSk7XG5cdFx0XHRpZiAoIWN1cnNvcil7XG5cdFx0XHRcdGN1cnNvciA9IDA7XG5cdFx0XHR9XG5cdFx0XHRpZighYXJncy5saW1pdCl7XG5cdFx0XHRcdGFyZ3MubGltaXQgPSA1O1xuXHRcdFx0fVxuXHRcdFx0bGV0IGVkZ2VEaXNjdXNpb25QcmVndW50YUluZm9Qcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRcdGxldCBlZGdlcyA9IG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5maW5kKHtpZGVudGlmaWNhZG9yOnskZ3Q6Y3Vyc29yfSxwcmVndW50YV9JRDogYXJncy5pZFByZWd1bnRhfSwgKGVyciwgcmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0aWYoZXJyKXtcblx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkucG9wdWxhdGUoXCJjcmVhZG9yX2NvcnJlY2Npb25cIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJldGlxdWV0YXNfY29ycmVjY2lvbmVzXCIpXG5cdFx0XHRcdFx0LnBvcHVsYXRlKFwiZXN0YWRvX2NvcnJlY2Npb24udXN1YXJpb19jcmVhZG9yX2VzdGFkb1wiKVxuXHRcdFx0XHRcdC5saW1pdChhcmdzLmxpbWl0KS5jdXJzb3IoKTtcblxuXHRcdFx0XHRlZGdlcy5vbihcImRhdGFcIiwgcmVzID0+IHtcblx0XHRcdFx0XHRlZGdlRGlzY3VzaW9uUHJlZ3VudGFBcnJheS5wdXNoKHtcblx0XHRcdFx0XHRcdGN1cnNvciA6IEJ1ZmZlci5mcm9tKChyZXMuaWRlbnRpZmljYWRvcikudG9TdHJpbmcoKSkudG9TdHJpbmcoXCJiYXNlNjRcIiksXG5cdFx0XHRcdFx0XHRub2RlOiByZXNcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGVkZ2VzLm9uKFwiZW5kXCIsKCk9PiB7XG5cdFx0XHRcdFx0bGV0IGVuZEN1cnNvciA9IGVkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5Lmxlbmd0aCA+IDAgPyBlZGdlRGlzY3VzaW9uUHJlZ3VudGFBcnJheVtlZGdlRGlzY3VzaW9uUHJlZ3VudGFBcnJheS5sZW5ndGggLSAxXS5jdXJzb3I6TmFOO1xuXHRcdFx0XHRcdGxldCBoYXNOZXh0UGFnZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGVuZEN1cnNvcikge1xuXHRcdFx0XHRcdFx0XHRsZXQgY3Vyc29yRmluYWwgPSBwYXJzZUludChCdWZmZXIuZnJvbShlbmRDdXJzb3IsXCJiYXNlNjRcIikudG9TdHJpbmcoXCJhc2NpaVwiKSk7XG5cdFx0XHRcdFx0XHRcdG1vZGVscy5kaXNjdXNpb25QcmVndW50YS53aGVyZShcImlkZW50aWZpY2Fkb3JcIikuZ3QoY3Vyc29yRmluYWwpLmNvdW50KHtwcmVndW50YV9JRDogYXJncy5pZFByZWd1bnRhfSwoZXJyLCBjb3VudCk9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNvdW50ID4gMCA/IHJlc29sdmUodHJ1ZSk6IHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh7XG5cdFx0XHRcdFx0XHRlZGdlczogZWRnZURpc2N1c2lvblByZWd1bnRhQXJyYXksXG5cdFx0XHRcdFx0XHRwYWdlSW5mbzoge1xuXHRcdFx0XHRcdFx0XHRlbmRDdXJzb3I6IGVuZEN1cnNvcixcblx0XHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2U6IGhhc05leHRQYWdlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgdG90YWxQYWdlc1Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5jb3VudCh7cHJlZ3VudGFfSUQ6IGFyZ3MuaWRQcmVndW50YX0sKGVyciwgY291bnQpID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGNvdW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgbGlzdFBhZ2luYXRlRGlzY3VzaW9uUHJlZ3VudGEgPSBQcm9taXNlLmFsbChbZWRnZURpc2N1c2lvblByZWd1bnRhSW5mb1Byb21pc2UsIHRvdGFsUGFnZXNQcm9taXNlXSkudGhlbigodmFsdWVzKSA9PiB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZWRnZXM6IHZhbHVlc1swXS5lZGdlcyxcblx0XHRcdFx0XHR0b3RhbENvdW50OiB2YWx1ZXNbMV0sXG5cdFx0XHRcdFx0cGFnZUluZm86e1xuXHRcdFx0XHRcdFx0ZW5kQ3Vyc29yOiB2YWx1ZXNbMF0ucGFnZUluZm8uZW5kQ3Vyc29yLFxuXHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2U6dmFsdWVzWzBdLnBhZ2VJbmZvLmhhc25leHRQYWdlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbGlzdFBhZ2luYXRlRGlzY3VzaW9uUHJlZ3VudGE7XG5cdFx0fSxcblx0XHRnZXRMaXN0YVVzdWFyaW9zQXNpZ25hZG9Fc3RhZG9Db3JyZWNjaW9uUHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRCeUlkKGFyZ3MuaWREaXNjdXNpb25QcmVndW50YSlcblx0XHRcdFx0LnBvcHVsYXRlKFwiZXN0YWRvX2NvcnJlY2Npb24udXN1YXJpb19jcmVhZG9yX2VzdGFkb1wiKVxuXHRcdFx0XHQudGhlbihsaXN0YVVzdWFyaW9zID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbGlzdGFVc3Vhcmlvcztcblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmKGVycm9yKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGxvYWREaXNjdXNpb25QcmVndW50YTogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZEJ5SWQoYXJncy5pZERpc2N1c2lvblByZWd1bnRhKVxuXHRcdFx0XHQucG9wdWxhdGUoXCJjcmVhZG9yX2NvcnJlY2Npb25cIilcblx0XHRcdFx0LnBvcHVsYXRlKFwiZXN0YWRvX2NvcnJlY2Npb24udXN1YXJpb19jcmVhZG9yX2VzdGFkb1wiKVxuXHRcdFx0XHQucG9wdWxhdGUoXCJldGlxdWV0YXNfY29ycmVjY2lvbmVzXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZSh7XG5cdFx0XHRcdFx0cGF0aDpcInByZWd1bnRhX0lEXCIsXG5cdFx0XHRcdFx0cG9wdWxhdGU6e1xuXHRcdFx0XHRcdFx0cGF0aDogXCJhcmVhY29ub2NpbWllbnRvXCIsXG5cdFx0XHRcdFx0XHRtb2RlbDogXCJhcmVhcy1jb25vY2ltaWVudG9cIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnBvcHVsYXRlKHtcblx0XHRcdFx0XHRwYXRoOlwicHJlZ3VudGFfSURcIixcblx0XHRcdFx0XHRwb3B1bGF0ZTp7XG5cdFx0XHRcdFx0XHRwYXRoOiBcInVzdWFyaW9fSURcIixcblx0XHRcdFx0XHRcdG1vZGVsOiBcInVzdWFyaW9cIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oZG9jdW1lbnRvID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRvO1xuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRsb2FkTGlzdGFEaXNjdXNpb25lc0dlbmVyYWRhc0J5UHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRPbmUoe19pZDphcmdzLmlkUHJlZ3VudGF9LCB7ZGlzY3VzaW9uZXM6eyRzbGljZTogYXJncy5saW1pdH19KVxuXHRcdFx0XHQucG9wdWxhdGUoe1xuXHRcdFx0XHRcdHBhdGg6IFwiZGlzY3VzaW9uZXNcIixcblx0XHRcdFx0XHRwb3B1bGF0ZTp7XG5cdFx0XHRcdFx0XHRwYXRoOlwiY3JlYWRvcl9jb3JyZWNjaW9uXCIsXG5cdFx0XHRcdFx0XHRtb2RlbDpcInVzdWFyaW9cIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnBvcHVsYXRlKHtcblx0XHRcdFx0XHRwYXRoOiBcImRpc2N1c2lvbmVzXCIsXG5cdFx0XHRcdFx0cG9wdWxhdGU6e1xuXHRcdFx0XHRcdFx0cGF0aDpcImVzdGFkb19jb3JyZWNjaW9uLnVzdWFyaW9fY3JlYWRvcl9lc3RhZG9cIixcblx0XHRcdFx0XHRcdG1vZGVsOlwidXN1YXJpb1wiXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5wb3B1bGF0ZSh7XG5cdFx0XHRcdFx0cGF0aDogXCJkaXNjdXNpb25lc1wiLFxuXHRcdFx0XHRcdHBvcHVsYXRlOntcblx0XHRcdFx0XHRcdHBhdGg6XCJldGlxdWV0YXNfY29ycmVjY2lvbmVzXCIsXG5cdFx0XHRcdFx0XHRtb2RlbDpcImV0aXF1ZXRhLWNvcnJlY2Npb25lc1wiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihsaXN0YWRvRGlzY3VzaW9uZXNQcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RhZG9EaXNjdXNpb25lc1ByZWd1bnRhLmRpc2N1c2lvbmVzO1xuXG5cdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bG9hZEZpcnN0RGlzY3VzaW9uZXNQcmVndW50YXNSZWNpZW5DcmVhZGFzOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5maW5kKHtoYWJpbGl0YWRhOiB0cnVlfSlcblx0XHRcdFx0LnBvcHVsYXRlKFwiY3JlYWRvcl9jb3JyZWNjaW9uXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZShcInByZWd1bnRhX0lEXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZShcImV0aXF1ZXRhc19jb3JyZWNjaW9uZXNcIilcblx0XHRcdFx0LnNvcnQoe2ZlY2hhX2NyZWFjaW9uOiAtMX0pXG5cdFx0XHRcdC5saW1pdCg1KVxuXHRcdFx0XHQudGhlbihsaXN0YURpc2N1c2lvbmVzUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBsaXN0YURpc2N1c2lvbmVzUHJlZ3VudGE7XG5cdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3Ipe1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bG9hZExpc3RhQ29ycmVjY2lvbmVzQnlQcmVndW50YXNDcmVhZGFzRWRpdGFkYXM6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KT0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuVXNlci5maW5kQnlJZChhcmdzLnVzdWFyaW8sIFwicm9sZXNcIilcblx0XHRcdFx0LnRoZW4ocm9sVXN1YXJpbyA9PiB7XG5cdFx0XHRcdFx0aWYgKHJvbFVzdWFyaW8ucm9sZXNbMF0ucm9sID09PSBcIm1vZGVyYWRvclwiKXtcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZCh7XCJwcmVndW50YV9JRFwiOiBhcmdzLmlkUHJlZ3VudGEsXG5cdFx0XHRcdFx0XHRcdFwiZXN0YWRvX2NvcnJlY2Npb24ucm9sXCI6IFwidXN1YXJpb1wiLFxuXHRcdFx0XHRcdFx0XHQkb3I6IFtcblx0XHRcdFx0XHRcdFx0XHR7XCJlc3RhZG9fY29ycmVjY2lvbi5hc2lnbmFjaW9uXCI6IFwiY3JlYWRvXCJ9LFxuXHRcdFx0XHRcdFx0XHRcdHtcImVzdGFkb19jb3JyZWNjaW9uLmFzaWduYWNpb25cIjogXCJlZGl0YWRvXCJ9XG5cdFx0XHRcdFx0XHRcdF19KVxuXHRcdFx0XHRcdFx0XHQucG9wdWxhdGUoXCJldGlxdWV0YXNfY29ycmVjY2lvbmVzXCIpXG5cdFx0XHRcdFx0XHRcdC5wb3B1bGF0ZShcImNyZWFkb3JfY29ycmVjY2lvblwiKVxuXHRcdFx0XHRcdFx0XHQucG9wdWxhdGUoXCJwcmVndW50YV9JRFwiKVxuXHRcdFx0XHRcdFx0XHQucG9wdWxhdGUoXCJlc3RhZG9fY29ycmVjY2lvbi51c3VhcmlvX2NyZWFkb3JfZXN0YWRvXCIpXG5cdFx0XHRcdFx0XHRcdC5saW1pdChhcmdzLmxpbWl0KVxuXHRcdFx0XHRcdFx0XHQudGhlbihsaXN0YWRvQ29ycmVjY2lvbmVzUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBsaXN0YWRvQ29ycmVjY2lvbmVzUHJlZ3VudGE7XG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoaXMgdXNlcnMgaXMgbm90IG1lbWJlciBjb21taXR0ZSwgc28geW91IGNhbid0IGdldCB0aGlzIGluZm9ybWF0aW9uXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGxvYWRMaXN0YUNvcnJlY2Npb25lc1ByZWd1bnRhc0J5RXN0YWRvOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0bGV0IGVkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5ID0gW107XG5cdFx0XHRsZXQgY3Vyc29yID0gcGFyc2VJbnQoQnVmZmVyLmZyb20oYXJncy5hZnRlciwgXCJiYXNlNjRcIikudG9TdHJpbmcoXCJhc2NpaVwiKSk7XG5cdFx0XHRpZiAoIWN1cnNvcil7XG5cdFx0XHRcdGN1cnNvciA9IDA7XG5cdFx0XHR9XG5cdFx0XHRpZighYXJncy5saW1pdCl7XG5cdFx0XHRcdGFyZ3MubGltaXQgPSA1O1xuXHRcdFx0fVxuXHRcdFx0bGV0IGVkZ2VEaXNjdXNpb25QcmVndW50YUluZm9Qcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRcdGxldCBlZGdlcyA9IG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5maW5kKHtpZGVudGlmaWNhZG9yOnskZ3Q6Y3Vyc29yfSxwcmVndW50YV9JRDogYXJncy5pZFByZWd1bnRhLFxuXHRcdFx0XHRcdFwiZXN0YWRvX2NvcnJlY2Npb24uYXNpZ25hY2lvblwiIDogYXJncy5lc3RhZG99LCAoZXJyLCByZXN1bHQpID0+IHtcblx0XHRcdFx0XHRpZihlcnIpe1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5wb3B1bGF0ZShcImNyZWFkb3JfY29ycmVjY2lvblwiKVxuXHRcdFx0XHRcdC5wb3B1bGF0ZShcImV0aXF1ZXRhc19jb3JyZWNjaW9uZXNcIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJlc3RhZG9fY29ycmVjY2lvbi51c3VhcmlvX2NyZWFkb3JfZXN0YWRvXCIpXG5cdFx0XHRcdFx0LmxpbWl0KGFyZ3MubGltaXQpLmN1cnNvcigpO1xuXG5cdFx0XHRcdGVkZ2VzLm9uKFwiZGF0YVwiLCByZXMgPT4ge1xuXHRcdFx0XHRcdGVkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5LnB1c2goe1xuXHRcdFx0XHRcdFx0Y3Vyc29yIDogQnVmZmVyLmZyb20oKHJlcy5pZGVudGlmaWNhZG9yKS50b1N0cmluZygpKS50b1N0cmluZyhcImJhc2U2NFwiKSxcblx0XHRcdFx0XHRcdG5vZGU6IHJlc1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZWRnZXMub24oXCJlbmRcIiwoKT0+IHtcblx0XHRcdFx0XHRsZXQgZW5kQ3Vyc29yID0gZWRnZURpc2N1c2lvblByZWd1bnRhQXJyYXkubGVuZ3RoID4gMCA/IGVkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5W2VkZ2VEaXNjdXNpb25QcmVndW50YUFycmF5Lmxlbmd0aCAtIDFdLmN1cnNvcjpOYU47XG5cdFx0XHRcdFx0bGV0IGhhc05leHRQYWdlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kQ3Vyc29yKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBjdXJzb3JGaW5hbCA9IHBhcnNlSW50KEJ1ZmZlci5mcm9tKGVuZEN1cnNvcixcImJhc2U2NFwiKS50b1N0cmluZyhcImFzY2lpXCIpKTtcblx0XHRcdFx0XHRcdFx0bW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLndoZXJlKFwiaWRlbnRpZmljYWRvclwiKS5ndChjdXJzb3JGaW5hbClcblx0XHRcdFx0XHRcdFx0XHQuY291bnQoe3ByZWd1bnRhX0lEOiBhcmdzLmlkUHJlZ3VudGEsXCJlc3RhZG9fY29ycmVjY2lvbi5hc2lnbmFjaW9uXCI6YXJncy5lc3RhZG99LChlcnIsIGNvdW50KT0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb3VudCA+IDAgPyByZXNvbHZlKHRydWUpOiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh7XG5cdFx0XHRcdFx0XHRlZGdlczogZWRnZURpc2N1c2lvblByZWd1bnRhQXJyYXksXG5cdFx0XHRcdFx0XHRwYWdlSW5mbzoge1xuXHRcdFx0XHRcdFx0XHRlbmRDdXJzb3I6IGVuZEN1cnNvcixcblx0XHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2U6IGhhc05leHRQYWdlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgdG90YWxQYWdlc1Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5jb3VudCh7cHJlZ3VudGFfSUQ6IGFyZ3MuaWRQcmVndW50YSxcImVzdGFkb19jb3JyZWNjaW9uLmFzaWduYWNpb25cIjphcmdzLmVzdGFkb30sKGVyciwgY291bnQpID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGNvdW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgbGlzdFBhZ2luYXRlRGlzY3VzaW9uUHJlZ3VudGEgPSBQcm9taXNlLmFsbChbZWRnZURpc2N1c2lvblByZWd1bnRhSW5mb1Byb21pc2UsIHRvdGFsUGFnZXNQcm9taXNlXSkudGhlbigodmFsdWVzKSA9PiB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZWRnZXM6IHZhbHVlc1swXS5lZGdlcyxcblx0XHRcdFx0XHR0b3RhbENvdW50OiB2YWx1ZXNbMV0sXG5cdFx0XHRcdFx0cGFnZUluZm86e1xuXHRcdFx0XHRcdFx0ZW5kQ3Vyc29yOiB2YWx1ZXNbMF0ucGFnZUluZm8uZW5kQ3Vyc29yLFxuXHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2U6dmFsdWVzWzBdLnBhZ2VJbmZvLmhhc25leHRQYWdlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbGlzdFBhZ2luYXRlRGlzY3VzaW9uUHJlZ3VudGE7XG5cdFx0fSxcblx0XHRsb2FkbGlzdGFVc3Vhcmlvc0NyZWFkb0NvcnJlY2Npb25lc1ByZWd1bnRhczogKHBhcmVudCwgYXJncywge21vZGVsc30pPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5kaXN0aW5jdChcImNyZWFkb3JfY29ycmVjY2lvblwiLHtcInByZWd1bnRhX0lEXCI6IGFyZ3MuaWRQcmVndW50YX0pXG5cdFx0XHRcdC50aGVuKGxpc3RhVXN1YXJpb3NEaXN0aW50b3MgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBtb2RlbHMuVXNlci5maW5kKHtcIl9pZFwiOnskaW46bGlzdGFVc3Vhcmlvc0Rpc3RpbnRvc319KVxuXHRcdFx0XHRcdFx0LnRoZW4obGlzdGFVc3VhcmlvcyA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBsaXN0YVVzdWFyaW9zO1xuXHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXJyb3Ipe1xuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cdE11dGF0aW9uOiB7XG5cdFx0bnVldmFEaXNjdXNpb25QcmVndW50YSA6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmUoe3RpdHVsbzogYXJncy5kaXNjdXNpb25QcmVndW50YS50aXR1bG99KVxuXHRcdFx0XHQudGhlbihkaXNjdXNpb25QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0aWYoZGlzY3VzaW9uUHJlZ3VudGEpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBhbHJlYWR5IGNyZWF0ZSB0aGlzIHF1ZXN0aW9uLCB5b3UgY2FuJ3QgY3JlYXRlIHRoZSBzYW1lIGNvcnJlY3Rpb24gdHdvIHRpbWVzXCIpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5jb3VudCgpXG5cdFx0XHRcdFx0XHRcdC50aGVuKG51bWVyb0Rpc2N1c2lvbmVzUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChudW1lcm9EaXNjdXNpb25lc1ByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0XHRcdGFyZ3MuZGlzY3VzaW9uUHJlZ3VudGEuaWRlbnRpZmljYWRvciA9IG51bWVyb0Rpc2N1c2lvbmVzUHJlZ3VudGEgKyAxO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjb25zdCBkaXNjdXNpb25fcHJlZ3VudGEgPSBuZXcgbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhKGFyZ3MuZGlzY3VzaW9uUHJlZ3VudGEpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBkaXNjdXNpb25fcHJlZ3VudGEuc2F2ZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihkb2N1bWVudG8gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkQW5kVXBkYXRlKGFyZ3MuZGlzY3VzaW9uUHJlZ3VudGEucHJlZ3VudGFfSUQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyRwdXNoOntkaXNjdXNpb25lczpkb2N1bWVudG99fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7bmV3OiB0cnVlfSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbigoKT0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb2N1bWVudG87XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0ZWRpdGFyRGlzY3VzaW9uUHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmUoe1wiX2lkXCI6IGFyZ3MuaWREaXNjdXNpb25QcmVndW50YSwgXCJlc3RhZG9fY29ycmVjY2lvbi5yb2xcIjogXCJ1c3VhcmlvXCJ9LHtcImVzdGFkb19jb3JyZWNjaW9uLiRcIjoxfSlcblx0XHRcdFx0LnRoZW4oZGlzY3VzaW9uUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdGlmIChkaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5hc2lnbmFjaW9uID09PSBcInBlbmRpZW50ZVwiKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoZSBxdWVzdGlvbiBjcmVhdG9yJ3MgaXMgZWRpdGluZyB0aGUgY29udGVudCwgdGhhbmtzIHRvIHlvdXIgaXNzdWVzLFwiICtcblx0XHRcdFx0XHRcdFx0XCJ5b3UgY2FuIG5vdCBtYWtlIGNoYW5nZSB0byBhIGlzc3VlcywgaW4gc3RhdGUgcGVuZGluZ1wiKTtcblx0XHRcdFx0XHR9ZWxzZSBpZiAoZGlzY3VzaW9uUHJlZ3VudGEuZXN0YWRvX2NvcnJlY2Npb25bMF0uYXNpZ25hY2lvbiA9PT0gXCJjZXJyYWRvXCIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoZSBpc3N1ZXMgd2FzIHJlamVjdCBieSBhIGNvbW1pdHRlZSBtZW1iZXIsIHNvIHlvdSBtdXN0IGNyZWF0ZSBhIG5ldyBvbmUgaXNzdWVzXCIpO1xuXHRcdFx0XHRcdH1lbHNlIGlmIChkaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5hc2lnbmFjaW9uID09PSBcInJlc3VlbHRvXCIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoZSBjcmVhdG9yIHRoaXMgaXNzdWVzIGFscmVhZHkgYWNjZXB0IHRoZSBjaGFuZ2Ugb2YgdGhlIHF1ZXN0aW9uIGNyZWF0b3IsIHNvIHlvdSBkZWNpZGVkIFwiICtcblx0XHRcdFx0XHRcdFx0XCJtYXJrZWQgdGhpcyBpc3N1ZXMgbGlrZSBzb2x2ZWQhLCB5b3Ugc2hvdWxkIGNyZWF0ZSBvdGhlciBpc3N1ZXNcIik7XG5cdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVscy5kaXNjdXNpb25QcmVndW50YS51cGRhdGUoe19pZDogYXJncy5pZERpc2N1c2lvblByZWd1bnRhLCBjcmVhZG9yX2NvcnJlY2Npb246IGFyZ3MuZGlzY3VzaW9uUHJlZ3VudGEuY3JlYWRvcl9jb3JyZWNjaW9ufSxcblx0XHRcdFx0XHRcdFx0YXJncy5kaXNjdXNpb25QcmVndW50YSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oZG9jdW1lbnRvQWZlY3RhZG8gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChkb2N1bWVudG9BZmVjdGFkby5uID09PSAxKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHVzZXIgY2FuJ3QgZWRpdCB0aGlzIHF1ZXN0aW9uLCBiZWNhdXNlIGhlIGlzIG5vdCB0aGUgb3duZXJcIik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3Ipe1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3ICBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblxuXHRcdH0sXG5cdFx0ZWxpbWluYXJEaXNjdXNpb25QcmVndW50YTogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZE9uZSh7XCJfaWRcIjogYXJncy5pZERpc2N1c2lvblByZWd1bnRhLCBcImVzdGFkb19jb3JyZWNjaW9uLnJvbFwiOiBcInVzdWFyaW9cIn0se1wiZXN0YWRvX2NvcnJlY2Npb24uJFwiOjF9KVxuXHRcdFx0XHQudGhlbihkaXNjdXNpb25QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0aWYgKGRpc2N1c2lvblByZWd1bnRhLmVzdGFkb19jb3JyZWNjaW9uWzBdLmFzaWduYWNpb24gPT09IFwicGVuZGllbnRlXCIpe1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhlIHF1ZXN0aW9uIGNyZWF0b3IncyBpcyBlZGl0aW5nIHRoZSBjb250ZW50LCB0aGFua3MgdG8geW91ciBpc3N1ZXMsXCIgK1xuXHRcdFx0XHRcdFx0XHRcInlvdSBjYW4gbm90IGRlbGV0ZSB0aGlzIGlzc3VlcywgaW4gc3RhdGUgcGVuZGluZ1wiKTtcblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLnVwZGF0ZSh7X2lkOiBhcmdzLmlkRGlzY3VzaW9uUHJlZ3VudGEsY3JlYWRvcl9jb3JyZWNjaW9uOiBhcmdzLmNyZWFkb3JfY29ycmVjY2lvbn0sXG5cdFx0XHRcdFx0XHRcdHtoYWJpbGl0YWRhOiBmYWxzZX0pXG5cdFx0XHRcdFx0XHRcdC50aGVuKGNvcnJlY2Npb25BY3R1YWxpemFkYSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvcnJlY2Npb25BY3R1YWxpemFkYS5uID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhpcyB1c2VyIGNhbid0IGVkaXQgdGhpcyBxdWVzdGlvbiwgYmVjYXVzZSBoZSBpcyBub3QgdGhlIG93bmVyXCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0ZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5VGl0dWxvOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5maW5kT25lKHtcIl9pZFwiOiBhcmdzLmlkRGlzY3VzaW9uUHJlZ3VudGEsIFwiZXN0YWRvX2NvcnJlY2Npb24ucm9sXCI6IFwidXN1YXJpb1wifSxcblx0XHRcdFx0e1wiZXN0YWRvX2NvcnJlY2Npb24uJFwiOjF9KVxuXHRcdFx0XHQudGhlbihkaXNjdXNpb25QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0aWYgKGRpc2N1c2lvblByZWd1bnRhLmVzdGFkb19jb3JyZWNjaW9uWzBdLmFzaWduYWNpb24gPT09IFwicGVuZGllbnRlXCIpe1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhlIHF1ZXN0aW9uIGNyZWF0b3IncyBpcyBlZGl0aW5nIHRoZSBjb250ZW50LCB0aGFua3MgdG8geW91ciBpc3N1ZXMsXCIgK1xuXHRcdFx0XHRcdFx0XHRcInlvdSBjYW4gbm90IG1ha2UgY2hhbmdlIHRvIGEgaXNzdWVzLCBpbiBzdGF0ZSBwZW5kaW5nXCIpO1xuXHRcdFx0XHRcdH1lbHNlIGlmIChkaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5hc2lnbmFjaW9uID09PSBcImNlcnJhZG9cIikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhlIGlzc3VlcyB3YXMgcmVqZWN0IGJ5IGEgY29tbWl0dGVlIG1lbWJlciwgc28geW91IG11c3QgY3JlYXRlIGEgbmV3IG9uZSBpc3N1ZXNcIik7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGRpc2N1c2lvblByZWd1bnRhLmVzdGFkb19jb3JyZWNjaW9uWzBdLmFzaWduYWNpb24gPT09IFwicmVzdWVsdG9cIikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IGFscmVhZHkgYWNjZXB0IHRoZSBjaGFuZ2Ugb2YgdGhlIHF1ZXN0aW9uIGNyZWF0b3IsIHNvIHlvdSBkZWNpZGVkIFwiICtcblx0XHRcdFx0XHRcdFx0XCJtYXJrZWQgdGhpcyBpc3N1ZXMgbGlrZSBzb2x2ZWQhLCB5b3Ugc2hvdWxkIGNyZWF0ZSBvdGhlciBpc3N1ZXNcIik7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRCeUlkKGFyZ3MuaWREaXNjdXNpb25QcmVndW50YSwgXCJjcmVhZG9yX2NvcnJlY2Npb25cIilcblx0XHRcdFx0XHRcdFx0LnBvcHVsYXRlKFwiY3JlYWRvcl9jb3JyZWNjaW9uXCIpXG5cdFx0XHRcdFx0XHRcdC50aGVuKGNvcnJlY2Npb25QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvcnJlY2Npb25QcmVndW50YS5jcmVhZG9yX2NvcnJlY2Npb24uY29ycmVvID09PSBhcmdzLmNvcnJlb1VzdWFyaW8pIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZEJ5SWRBbmRVcGRhdGUoYXJncy5pZERpc2N1c2lvblByZWd1bnRhLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7JHNldDoge3RpdHVsbzogYXJncy50aXR1bG99fSx7bmV3OiB0cnVlfSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oY29ycmVjY2lvblByZWd1bnRhQWN0dWFsaXphZGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjb3JyZWNjaW9uUHJlZ3VudGFBY3R1YWxpemFkYTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhpcyBxdWVzdGlvbiBpc3N1ZSB5b3UgY2FuIG5vdCBlZGl0LCBiZWNhdXNlIHlvdSBhcmUgbm90IHRoZSBvd25lclwiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlEZXNjcmlwY2lvbjogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZE9uZSh7XCJfaWRcIjogYXJncy5pZERpc2N1c2lvblByZWd1bnRhLCBcImVzdGFkb19jb3JyZWNjaW9uLnJvbFwiOiBcInVzdWFyaW9cIn0sXG5cdFx0XHRcdHtcImVzdGFkb19jb3JyZWNjaW9uLiRcIjoxfSlcblx0XHRcdFx0LnRoZW4oZGlzY3VzaW9uUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdGlmIChkaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5hc2lnbmFjaW9uID09PSBcInBlbmRpZW50ZVwiKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoZSBxdWVzdGlvbiBjcmVhdG9yJ3MgaXMgZWRpdGluZyB0aGUgY29udGVudCwgdGhhbmtzIHRvIHlvdXIgaXNzdWVzLFwiICtcblx0XHRcdFx0XHRcdFx0XCJ5b3UgY2FuIG5vdCBtYWtlIGNoYW5nZSB0byBhIGlzc3VlcywgaW4gc3RhdGUgcGVuZGluZ1wiKTtcblx0XHRcdFx0XHR9ZWxzZSBpZiAoZGlzY3VzaW9uUHJlZ3VudGEuZXN0YWRvX2NvcnJlY2Npb25bMF0uYXNpZ25hY2lvbiA9PT0gXCJjZXJyYWRvXCIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoZSBpc3N1ZXMgd2FzIHJlamVjdCBieSBhIGNvbW1pdHRlZSBtZW1iZXIsIHNvIHlvdSBtdXN0IGNyZWF0ZSBhIG5ldyBvbmUgaXNzdWVzXCIpO1xuXHRcdFx0XHRcdH1lbHNlIGlmIChkaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5hc2lnbmFjaW9uID09PSBcInJlc3VlbHRvXCIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBhbHJlYWR5IGFjY2VwdCB0aGUgY2hhbmdlIG9mIHRoZSBxdWVzdGlvbiBjcmVhdG9yLCBzbyB5b3UgZGVjaWRlZCBcIiArXG5cdFx0XHRcdFx0XHRcdFwibWFya2VkIHRoaXMgaXNzdWVzIGxpa2Ugc29sdmVkISwgeW91IHNob3VsZCBjcmVhdGUgb3RoZXIgaXNzdWVzXCIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRCeUlkKGFyZ3MuaWREaXNjdXNpb25QcmVndW50YSwgXCJjcmVhZG9yX2NvcnJlY2Npb25cIilcblx0XHRcdFx0XHRcdFx0LnBvcHVsYXRlKFwiY3JlYWRvcl9jb3JyZWNjaW9uXCIpXG5cdFx0XHRcdFx0XHRcdC50aGVuKGNvcnJlY2Npb25QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvcnJlY2Npb25QcmVndW50YS5jcmVhZG9yX2NvcnJlY2Npb24uY29ycmVvID09PSBhcmdzLmNvcnJlb1VzdWFyaW8pIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZEJ5SWRBbmRVcGRhdGUoYXJncy5pZERpc2N1c2lvblByZWd1bnRhLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7JHNldDoge2Rlc2NyaXBjaW9uOiBhcmdzLmRlc2NyaXBjaW9ufX0se25ldzogdHJ1ZX0pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGNvcnJlY2Npb25QcmVndW50YUFjdHVhbGl6YWRhID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY29ycmVjY2lvblByZWd1bnRhQWN0dWFsaXphZGE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoaXMgcXVlc3Rpb24gaXNzdWUgeW91IGNhbiBub3QgZWRpdCwgYmVjYXVzZSB5b3UgYXJlIG5vdCB0aGUgb3duZXJcIik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGFwcm9iYXJFc3RhZG9NeURpc2N1c2lvblByZWd1bnRhOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5kaXNjdXNpb25QcmVndW50YS5maW5kQnlJZChhcmdzLmlkRGlzY3VzaW9uUHJlZ3VudGEpXG5cdFx0XHRcdC50aGVuKGRvY3VtZW50b0Rpc2N1c2lvblByZWd1bnRhID0+IHtcblx0XHRcdFx0XHRpZiAoZG9jdW1lbnRvRGlzY3VzaW9uUHJlZ3VudGEuaGFiaWxpdGFkYSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmUoe1wiX2lkXCI6IGFyZ3MuaWREaXNjdXNpb25QcmVndW50YSxcblx0XHRcdFx0XHRcdFx0XCJlc3RhZG9fY29ycmVjY2lvbi51c3VhcmlvX2NyZWFkb3JfZXN0YWRvXCI6IGRvY3VtZW50b0Rpc2N1c2lvblByZWd1bnRhLmNyZWFkb3JfY29ycmVjY2lvbn0sXG5cdFx0XHRcdFx0XHR7XCJlc3RhZG9fY29ycmVjY2lvbi4kXCI6MX0pXG5cdFx0XHRcdFx0XHRcdC50aGVuKGFycmF5RmlsdHJhZG8gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmKGFycmF5RmlsdHJhZG8uZXN0YWRvX2NvcnJlY2Npb25bMF1bXCJhc2lnbmFjaW9uXCJdIT09IFwiY2VycmFkb1wiICYmIGFycmF5RmlsdHJhZG8uZXN0YWRvX2NvcnJlY2Npb25bMF1bXCJhc2lnbmFjaW9uXCJdIT09IFwicmVzdWVsdG9cIil7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmVBbmRVcGRhdGUoe1wiX2lkXCI6IGFyZ3MuaWREaXNjdXNpb25QcmVndW50YSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJlc3RhZG9fY29ycmVjY2lvbi51c3VhcmlvX2NyZWFkb3JfZXN0YWRvXCI6IGRvY3VtZW50b0Rpc2N1c2lvblByZWd1bnRhLmNyZWFkb3JfY29ycmVjY2lvbn0sXG5cdFx0XHRcdFx0XHRcdFx0XHR7JHNldDoge1wiZXN0YWRvX2NvcnJlY2Npb24uJC5hc2lnbmFjaW9uXCI6XCJyZXN1ZWx0b1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImVzdGFkb19jb3JyZWNjaW9uLiQub2JzZXJ2YWNpb25cIjpcImVsIHVzdWFyaW8gaGEgY2VycmFkbyBlc3RhIGRpc2N1c2lvbixcIiArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImRlYmlkbyBxdWUgZWwgY3JlYWRvciBkZSBsYSBwcmVndW50YSwgcmVhbGl6byBsb3MgY2FtYmlvcyByZXNwZWN0aXZvc1wiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImZlY2hhX2NpZXJyZVwiOiBuZXcgRGF0ZSgpfX0sXG5cdFx0XHRcdFx0XHRcdFx0XHR7bmV3OiB0cnVlfSkudGhlbihkaXNjdXNpb25BcHJvdmFkYSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBkaXNjdXNpb25BcHJvdmFkYTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IGNhbid0IGFwcHJvdmVkIGEgaXNzdWVzIHF1ZXN0aW9ucywgdGhhdCBhbHJlYWR5IGlzIGNsb3NlZCBvciBzb2x2ZWQhXCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IGNhbid0IGFwcHJvdmVkIGEgcXVlc3Rpb24gaXNzdWVzLCB0aGF0IHlvdSBoYWQgY2xvc2VkIVwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGFzaWduYXJFc3RhZG9BQ29ycmVjY2lvbmRlUHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmUoe1wiX2lkXCI6IGFyZ3MuaWREaXNjdXNpb25QcmVndW50YX0sXCJjcmVhZG9yX2NvcnJlY2Npb24sIGVzdGFkb19jb3JyZWNjaW9uXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZShcImNyZWFkb3JfY29ycmVjY2lvblwiKVxuXHRcdFx0XHQudGhlbih1c3VhcmlvID0+IHtcblx0XHRcdFx0XHRpZih1c3VhcmlvLmNyZWFkb3JfY29ycmVjY2lvbi5faWQgPT0gYXJncy5pZFVzdWFyaW8pe1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhlIG93bmVyIG9mIHRoaXMgaXNzdWVzLCBjYW4ndCBhcHByb3ZlZCBvciByZWplY3QgdGhpcyEhXCIpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0aWYgKHVzdWFyaW8uZXN0YWRvX2NvcnJlY2Npb25bMF0uYXNpZ25hY2lvbiA9PT0gXCJwZW5kaWVudGVcIiB8fCB1c3VhcmlvLmVzdGFkb19jb3JyZWNjaW9uLmFzaWduYWNpb24gPT09IFwiY2VycmFkb1wiKXtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhpcyBpc3N1ZXMgd2FzIGFscmVhZHkgYXNzaWduZWQgYnkgYSBjb21taXR0ZSBtZW1iZXIsIHlvdSBjYW4ndCBjaGFuZ2UgdGhpcyFcIik7XG5cdFx0XHRcdFx0XHR9ZWxzZSBpZih1c3VhcmlvLmVzdGFkb19jb3JyZWNjaW9uWzBdLmFzaWduYWNpb24gPT09IFwicmVzdWVsdG9cIikge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0aGlzIGlzc3VlcyB3YXMgYWxyZWFkeSBtYXJrZWQgbGlrZSBzb2x2ZWQsIGJ5IHRoZSBvd25lciB0aGlzIGNvbnRlbnRcIik7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0aWYgKGFyZ3MuZXN0YWRvID09PSBcInJlY2hhemFkb1wiKXtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmVBbmRVcGRhdGUoe1wiX2lkXCI6YXJncy5pZERpc2N1c2lvblByZWd1bnRhLFwiZXN0YWRvX2NvcnJlY2Npb24ucm9sXCI6XCJ1c3VhcmlvXCJ9LFxuXHRcdFx0XHRcdFx0XHRcdFx0eyRzZXQ6IHtcImVzdGFkb19jb3JyZWNjaW9uLiQuYXNpZ25hY2lvblwiOiBcImNlcnJhZG9cIixcImZlY2hhX2NpZXJyZVwiOiBuZXcgRGF0ZSgpfX0se25ldzogdHJ1ZX0pXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihkaXNjdXNpb25BY3R1YWxpemFkYSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZE9uZUFuZFVwZGF0ZSh7XCJfaWRcIjpkaXNjdXNpb25BY3R1YWxpemFkYS5faWR9LHskcHVzaDp7XCJlc3RhZG9fY29ycmVjY2lvblwiOntcIm9ic2VydmFjaW9uXCI6YXJncy5vYnNlcnZhY2lvbixcInVzdWFyaW9fY3JlYWRvcl9lc3RhZG9cIjogYXJncy5pZFVzdWFyaW8sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJyb2xcIjpcIm1vZGVyYWRvclwiLFwiYXNpZ25hY2lvblwiOlwicmVjaGF6YWRvXCJ9fX0se25ldzogdHJ1ZX0pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBvcHVsYXRlKFwiZXN0YWRvX2NvcnJlY2Npb24udXN1YXJpb19jcmVhZG9yX2VzdGFkb1wiKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGNvcnJlY2Npb25BY3R1YWxpemFkYSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY29ycmVjY2lvbkFjdHVhbGl6YWRhO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3Ipe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihhcmdzLmVzdGFkbyA9PT0gXCJhY2VwdGFkb1wiKXtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmRpc2N1c2lvblByZWd1bnRhLmZpbmRPbmVBbmRVcGRhdGUoe1wiX2lkXCI6YXJncy5pZERpc2N1c2lvblByZWd1bnRhLFwiZXN0YWRvX2NvcnJlY2Npb24ucm9sXCI6XCJ1c3VhcmlvXCJ9LFxuXHRcdFx0XHRcdFx0XHRcdFx0eyRzZXQ6IHtcImVzdGFkb19jb3JyZWNjaW9uLiQuYXNpZ25hY2lvblwiOiBcInBlbmRpZW50ZVwifX0se25ldzogdHJ1ZX0pXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihkaXNjdXNpb25BY3R1YWxpemFkYSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuZGlzY3VzaW9uUHJlZ3VudGEuZmluZE9uZUFuZFVwZGF0ZSh7XCJfaWRcIjpkaXNjdXNpb25BY3R1YWxpemFkYS5faWR9LHskcHVzaDp7XCJlc3RhZG9fY29ycmVjY2lvblwiOntcIm9ic2VydmFjaW9uXCI6YXJncy5vYnNlcnZhY2lvbixcInVzdWFyaW9fY3JlYWRvcl9lc3RhZG9cIjogYXJncy5pZFVzdWFyaW8sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJyb2xcIjpcIm1vZGVyYWRvclwiLFwiYXNpZ25hY2lvblwiOlwiYWNlcHRhZG9cIn19fSx7bmV3OiB0cnVlfSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucG9wdWxhdGUoXCJlc3RhZG9fY29ycmVjY2lvbi51c3VhcmlvX2NyZWFkb3JfZXN0YWRvXCIpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBvcHVsYXRlKFwicHJlZ3VudGFfSURcIilcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihjb3JyZWNjaW9uQWN0dWFsaXphZGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGRpc2N1c2lvbkFjdHVhbGl6YWRhLnByZWd1bnRhX0lELmVzdGFkbyA9PT0gXCJlc3RhYmxlXCIpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkQW5kVXBkYXRlKGRpc2N1c2lvbkFjdHVhbGl6YWRhLnByZWd1bnRhX0lELl9pZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7JHNldDp7ZXN0YWRvOiBcInJldmlzaW9uXCJ9fSx7bmV3OiB0cnVlfSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY29ycmVjY2lvbkFjdHVhbGl6YWRhO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGVycm9yKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjb3JyZWNjaW9uQWN0dWFsaXphZGE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cbn07Il19