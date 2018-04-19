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
//# sourceMappingURL=discusion-pregunta.js.map