"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	Query: {
		verMyPreguntaActual: function verMyPreguntaActual(parent, args, _ref) {
			var models = _ref.models;

			return models.Pregunta.findOne({ _id: args.idPregunta,
				registroActual: true }).populate("usuario_ID").populate("estados_asignados.usuario").populate("areaconocimiento").populate("discusiones").then(function (pregunta) {
				return pregunta;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		listadoPreguntasActuales: function listadoPreguntasActuales(parent, args, _ref2) {
			var models = _ref2.models;

			var edgePreguntaArray = [];
			var cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor) {
				cursor = 0;
			}
			var edgePreguntaInfoPromise = new Promise(function (resolve, reject) {
				var edges = models.Pregunta.find({ identificador: { $gt: cursor }, registroActual: true,
					descripcion: new RegExp(args.word, "i") }, function (err, result) {
					if (err) {
						reject(err);
					}
				}).populate("usuario_ID").populate("estados_asignados.usuario").populate("areaconocimiento").populate("discusiones").limit(args.limit).cursor();

				edges.on("data", function (res) {
					edgePreguntaArray.push({
						cursor: Buffer.from(res.identificador.toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end", function () {
					var endCursor = edgePreguntaArray.length > 0 ? edgePreguntaArray[edgePreguntaArray.length - 1].cursor : NaN;
					var hasNextPage = new Promise(function (resolve, reject) {
						if (endCursor) {
							var cursorFinal = parseInt(Buffer.from(endCursor, "base64").toString("ascii"));
							models.Pregunta.where("identificador").gt(cursorFinal).count({ registroActual: true }, function (err, count) {
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
						edges: edgePreguntaArray,
						pageInfo: {
							endCursor: endCursor,
							hasnextPage: hasNextPage
						}
					});
				});
			});
			var totalPagesPromise = new Promise(function (resolve, reject) {
				models.Pregunta.count({ registroActual: true }, function (err, count) {
					if (err) {
						reject(err);
					} else {
						resolve(count);
					}
				});
			});
			var listPaginatePregunta = Promise.all([edgePreguntaInfoPromise, totalPagesPromise]).then(function (values) {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo: {
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage: values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginatePregunta;
		},
		verListadoMisPreguntasActuales: function verListadoMisPreguntasActuales(parent, args, _ref3) {
			var models = _ref3.models;

			if (args.idUsuario) {
				return models.Pregunta.find({ usuario_ID: args.idUsuario, registroActual: true }).populate("usuario_ID").populate("estados_asignados.usuario").populate("areaconocimiento").populate("discusiones").sort({ "fecha_creacion": -1 }).then(function (listadoMisPreguntas) {
					return listadoMisPreguntas;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				throw new Error("It neccessary to ID of a usuario, para retrieve the information");
			}
		},
		verListadoMisPreguntasActualesByEstado: function verListadoMisPreguntasActualesByEstado(parent, args, _ref4) {
			var models = _ref4.models;

			var estado = void 0;
			if (args.idUsuario) {
				if (!args.estado) {
					estado = "revision";
				} else {
					estado = args.estado;
				}
				return models.Pregunta.find({ usuario_ID: args.idUsuario, registroActual: true, estado: estado }).populate("usuario_ID").populate("estados_asignados.usuario").populate("areaconocimiento").populate("discusiones").sort({ "fecha_creacion": -1 }).then(function (listadoPreguntas) {
					return listadoPreguntas;
				}).catch(function (error) {
					if (error) {
						throw new Error(error);
					}
				});
			} else {
				throw new Error("It neccessary to ID of a usuario, para retrieve the information");
			}
		},
		listadoPreguntasActualesByEstado: function listadoPreguntasActualesByEstado(parent, args, _ref5) {
			var models = _ref5.models;

			var edgePreguntaArray = [];
			var cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor) {
				cursor = 0;
			}
			var edgePreguntaInfoPromise = new Promise(function (resolve, reject) {
				var edges = models.Pregunta.find({ identificador: { $gt: cursor }, registroActual: true,
					descripcion: new RegExp(args.word, "i"), estado: args.estado }, function (err, result) {
					if (err) {
						reject(err);
					}
				}).populate("usuario_ID").populate("estados_asignados.usuario").populate("areaconocimiento").populate("discusiones").limit(args.limit).cursor();

				edges.on("data", function (res) {
					edgePreguntaArray.push({
						cursor: Buffer.from(res.identificador.toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end", function () {
					var endCursor = edgePreguntaArray.length > 0 ? edgePreguntaArray[edgePreguntaArray.length - 1].cursor : NaN;
					var hasNextPage = new Promise(function (resolve, reject) {
						if (endCursor) {
							var cursorFinal = parseInt(Buffer.from(endCursor, "base64").toString("ascii"));
							models.Pregunta.where("identificador").gt(cursorFinal).count({ registroActual: true }, function (err, count) {
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
						edges: edgePreguntaArray,
						pageInfo: {
							endCursor: endCursor,
							hasnextPage: hasNextPage
						}
					});
				});
			});
			var totalPagesPromise = new Promise(function (resolve, reject) {
				models.Pregunta.count(function (err, count) {
					if (err) {
						reject(err);
					} else {
						resolve(count);
					}
				});
			});
			var listPaginatePregunta = Promise.all([edgePreguntaInfoPromise, totalPagesPromise]).then(function (values) {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo: {
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage: values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginatePregunta;
		},
		historialImagenesUsadasByUserinAPregunta: function historialImagenesUsadasByUserinAPregunta(parent, args, _ref6) {
			var models = _ref6.models;

			return models.Pregunta.findOne({ _id: args.idPregunta, usuario_ID: args.idUsuario }, "historial_cambios estado").then(function (pregunta) {
				if (pregunta.estado === "revision" || pregunta.estado === "estable") {
					return pregunta;
				} else {
					throw new Error("you can to access to list Images of a closed(reject) question");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		listadoUsuariosDistintosCreadoPreguntas: function listadoUsuariosDistintosCreadoPreguntas(parent, args, _ref7) {
			var models = _ref7.models;

			return models.Pregunta.distinct("usuario_ID").then(function (listaUsuariosDistintos) {
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
		},
		listadoAreasConocimientosUsadasPreguntas: function listadoAreasConocimientosUsadasPreguntas(parent, args, _ref8) {
			var models = _ref8.models;

			return models.areasConocimiento.distinct("titulo").then(function (listaAreasConocimientosUsadas) {
				return listaAreasConocimientosUsadas;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		cargarListadoPreguntasByAreasConocimiento: function cargarListadoPreguntasByAreasConocimiento(parent, args, _ref9) {
			var models = _ref9.models;

			var edgePreguntaArray = [];
			var cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor) {
				cursor = 0;
			}
			var edgePreguntaInfoPromise = new Promise(function (resolve, reject) {
				var edges = models.Pregunta.find({ identificador: { $gt: cursor }, registroActual: true,
					descripcion: new RegExp(args.word, "i"), areaconocimiento: args.idAreaConocimiento }, function (err, result) {
					if (err) {
						reject(err);
					}
				}).populate("usuario_ID").populate("areaconocimiento").populate("discusiones").limit(args.limit).cursor();

				edges.on("data", function (res) {
					edgePreguntaArray.push({
						cursor: Buffer.from(res.identificador.toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end", function () {
					var endCursor = edgePreguntaArray.length > 0 ? edgePreguntaArray[edgePreguntaArray.length - 1].cursor : NaN;
					var hasNextPage = new Promise(function (resolve, reject) {
						if (endCursor) {
							var cursorFinal = parseInt(Buffer.from(endCursor, "base64").toString("ascii"));
							models.Pregunta.where("identificador").gt(cursorFinal).count({ registroActual: true,
								areaconocimiento: args.idAreaConocimiento }, function (err, count) {
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
						edges: edgePreguntaArray,
						pageInfo: {
							endCursor: endCursor,
							hasnextPage: hasNextPage
						}
					});
				});
			});
			var totalPagesPromise = new Promise(function (resolve, reject) {
				models.Pregunta.count({ areaconocimiento: args.idAreaConocimiento, registroActual: true }, function (err, count) {
					if (err) {
						reject(err);
					} else {
						resolve(count);
					}
				});
			});
			var listPaginatePregunta = Promise.all([edgePreguntaInfoPromise, totalPagesPromise]).then(function (values) {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo: {
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage: values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginatePregunta;
		},
		cargarListaPreguntasAsignadasRevisor: function cargarListaPreguntasAsignadasRevisor(parent, args, _ref10) {
			var models = _ref10.models;

			return models.Pregunta.find({ "estados_asignados.usuario": args.idUsuario, "registroActual": true }).populate("usuario_ID").populate("areaconocimiento").populate("estados_asignados.usuario").populate("discusiones").sort({ "fecha_creacion": -1 }).then(function (listaPreguntas) {
				return listaPreguntas;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}
	},
	Mutation: {
		crearPregunta: function crearPregunta(parent, args, _ref11) {
			var models = _ref11.models;

			if (args.pregunta.descripcion && args.pregunta.usuario_ID && args.pregunta.areaconocimiento.length > 0) {
				return models.Pregunta.count().then(function (existenPreguntasCreadas) {
					if (existenPreguntasCreadas) {
						args.pregunta.identificador = existenPreguntasCreadas + 1;
					}
					var objectNewPregunta = new models.Pregunta(args.pregunta);
					return objectNewPregunta.save().then(function (documento) {
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
			} else {
				throw new Error("there is empties fields, is not possible save a new question");
			}
		},
		editarPregunta: function editarPregunta(parent, args, _ref12) {
			var models = _ref12.models;

			return models.Pregunta.findById(args.idPregunta).then(function (documento) {
				if (documento.usuario_ID == args.pregunta.usuario_ID) {
					if (documento.estado === "revision" || documento.estado === "estable") {
						var preguntaAnterior = {
							descripcion: documento.descripcion,
							imagen: documento.imagen,
							estado: documento.estado,
							fecha_creacion: documento.fecha_creacion,
							tipoPregunta: documento.tipoPregunta,
							areaconocimiento: documento.areaconocimiento,
							respuestas: documento.respuestas
						};

						return models.Pregunta.findByIdAndUpdate(args.idPregunta, { $push: { historial_cambios: preguntaAnterior },
							$set: { descripcion: args.pregunta.descripcion,
								imagen: args.pregunta.imagen,
								fecha_creacion: args.pregunta.fecha_creacion,
								tipoPregunta: args.pregunta.tipoPregunta,
								areaconocimiento: args.pregunta.areaconocimiento,
								respuestas: args.pregunta.respuestas
							} }, { new: true }).then(function (documentoActualizado) {
							return documentoActualizado;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else {
						throw new Error("this questions is closed!!, because the commite member decided " + "reject this question, so you should, create a new one");
					}
				} else {
					throw new Error("you are not own this question, so you can not update");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		eliminarPregunta: function eliminarPregunta(parent, args, _ref13) {
			var models = _ref13.models;

			return models.User.findOne({ correo: args.correoUsuario }, "_id").then(function (idUsuario) {
				return models.Pregunta.findOne({ _id: args.idPregunta, usuario_ID: idUsuario }).then(function (documentoPregunta) {
					if (documentoPregunta.estado === "revision" || documentoPregunta.estado === "rechazada") {
						return models.Pregunta.findByIdAndUpdate(args.idPregunta, { $set: { registroActual: false } }, { new: true }).then(function (documentoPregunta) {
							return documentoPregunta;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else {
						throw new Error("this questions is accepted, is not possible delete this question");
					}
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
		},
		rollbackPreguntaAnterior: function rollbackPreguntaAnterior(parent, args, _ref14) {
			var models = _ref14.models;

			return models.Pregunta.findOne({ "_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior }, { "historial_cambios.$": 1, "estado": 1 }).populate("usuario_ID").then(function (preguntaAnterior) {
				if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion) {
					if (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable" || preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision" || preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") {
						return models.Pregunta.findByIdAndUpdate(args.idPregunta, {
							$set: { descripcion: preguntaAnterior.historial_cambios[0].descripcion,
								imagen: preguntaAnterior.historial_cambios[0].imagen,
								estado: preguntaAnterior.historial_cambios[0].estado,
								fecha_creacion: preguntaAnterior.historial_cambios[0].fecha_creacion,
								tipoPregunta: preguntaAnterior.historial_cambios[0].tipoPregunta,
								areaconocimiento: preguntaAnterior.historial_cambios[0].areaconocimiento,
								respuestas: preguntaAnterior.historial_cambios[0].respuestas }
						}, { new: true }).then(function (pregunta) {
							return pregunta;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else {
						throw new Error("the rule to make rollback this question is not correct");
					}
				} else {
					throw new Error("you can't make rollback this question because you are not the owner!!");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		rollbackDescripcionPregunta: function rollbackDescripcionPregunta(parent, args, _ref15) {
			var models = _ref15.models;

			return models.Pregunta.findOne({ "_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior }, { "historial_cambios.$": 1, "estado": 1 }).populate("usuario_ID").then(function (preguntaAnterior) {
				if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion) {
					if (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable" || preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision" || preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") {
						return models.Pregunta.findByIdAndUpdate(args.idPregunta, {
							$set: { descripcion: preguntaAnterior.historial_cambios[0].descripcion }
						}, { new: true }).then(function (pregunta) {
							return pregunta;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else {
						throw new Error("the rule to make rollback this question is not correct");
					}
				} else {
					throw new Error("you can't make rollback this question because you are not the owner!!");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		rollbackRespuestasPregunta: function rollbackRespuestasPregunta(parent, args, _ref16) {
			var models = _ref16.models;

			return models.Pregunta.findOne({ "_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior }, { "historial_cambios.$": 1, "estado": 1 }).populate("usuario_ID").then(function (preguntaAnterior) {
				if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion) {
					if (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable" || preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision" || preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") {
						return models.Pregunta.findByIdAndUpdate(args.idPregunta, {
							$set: { respuestas: preguntaAnterior.historial_cambios[0].respuestas }
						}, { new: true }).then(function (pregunta) {
							return pregunta;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else {
						throw new Error("the rule to make rollback this question is not correct");
					}
				} else {
					throw new Error("you can't make rollback this question because you are not the owner!!");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		rollbackImagenPregunta: function rollbackImagenPregunta(parent, args, _ref17) {
			var models = _ref17.models;

			return models.Pregunta.findOne({ "_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior }, { "historial_cambios.$": 1, "estado": 1 }).populate("usuario_ID").then(function (preguntaAnterior) {
				if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion) {
					if (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable" || preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision" || preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") {
						return models.Pregunta.findByIdAndUpdate(args.idPregunta, {
							$set: { imagen: preguntaAnterior.historial_cambios[0].imagen }
						}, { new: true }).then(function (pregunta) {
							return pregunta;
						}).catch(function (error) {
							if (error) {
								throw new Error(error);
							}
						});
					} else {
						throw new Error("the rule to make rollback this question is not correct");
					}
				} else {
					throw new Error("you can't make rollback this question because you are not the owner!!");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		asignarPreguntasAMiembroComite: function asignarPreguntasAMiembroComite(parent, args, _ref18) {
			var models = _ref18.models;

			return models.User.findById(args.idUsuario).then(function (registroUsuario) {
				if (registroUsuario.roles[0].rol === "comite") {
					return new Promise(function (resolve, reject) {
						_async2.default.eachSeries(args.arrayPreguntas, function (item, next) {
							return models.Pregunta.findById(item).populate("usuario_ID").populate("areaconocimiento").then(function (registroPregunta) {
								if (registroPregunta.usuario_ID._id == args.idUsuario) {
									reject("the user " + registroPregunta.usuario_ID.nombre + " already create " + "this questions, with title" + registroPregunta.descripcion + "so, can't" + "accept or revoque a question that the same create!");
								} else if (registroPregunta.estados_asignados.length || registroPregunta.estados_asignados.usuario == args.idUsuario) {
									reject("Already exist a user assigned to this questions, you can't assign" + "to more one people ");
								} else {
									return models.Pregunta.findByIdAndUpdate(item, {
										$push: { estados_asignados: { usuario: args.idUsuario,
												estado_asignado: "revisor",
												observacion: "A committe member need put a short description about your decision",
												fecha_asignacion: new Date() } }
									}, { new: true }).then(function (preguntaActualizada) {
										if (preguntaActualizada) {
											next();
										}
									});
								}
							}).catch(function (error) {
								if (error) {
									reject(error);
								}
							});
						}, function (error) {
							if (error) {
								reject(error);
							}
							resolve(true);
						});
					});
				} else {
					throw new Error("this user isn't committe member, so that you can't assign this question");
				}
			}).catch(function (error) {
				throw new Error(error);
			});
		},
		asignarEstadoPregunta: function asignarEstadoPregunta(parent, args, _ref19) {
			var models = _ref19.models;

			return models.Pregunta.findById(args.idPregunta).then(function (registroPregunta) {
				if (registroPregunta.usuario_ID == args.idUsuario) {
					throw new Error("you can't re-assign a state if you" + "are the owner the question");
				} else if (registroPregunta.estados_asignados[0].usuario == args.idUsuario) {
					return models.Pregunta.findOneAndUpdate({ _id: args.idPregunta, "estados_asignados.usuario": args.idUsuario }, {
						$set: { "estado": args.estado, "estados_asignados.$.estado_asignado": args.estado,
							"estados_asignados.$.observacion": args.observacion }
					}, { new: true }).then(function (preguntaActualizada) {
						return preguntaActualizada;
					}).catch(function (errorActualizar) {
						throw new Error(errorActualizar);
					});
				} else {
					throw new Error("this users is not be able to assign this state to this question" + "because was not assigned ");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		transferirListaPreguntasDesignadasAUsuario: function transferirListaPreguntasDesignadasAUsuario(parent, args, _ref20) {
			var models = _ref20.models;

			return models.User.findById(args.idUsuarioDesignado).then(function (usuario) {
				if (usuario.roles[0].rol === "comite") {
					return models.Pregunta.update({ "estados_asignados.usuario": args.idUsuarioActivo }, {
						$set: { "estados_asignados.$.usuario": args.idUsuarioDesignado }
					}, { multi: true, new: true }).then(function (actualizada) {
						if (actualizada.n > 0) {
							return true;
						} else {
							return false;
						}
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				} else {
					throw new Error("only commite member can assigned this questions");
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}
	}
}; /* eslint-disable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Jlc29sdmVycy9wcmVndW50YS5qcyJdLCJuYW1lcyI6WyJRdWVyeSIsInZlck15UHJlZ3VudGFBY3R1YWwiLCJwYXJlbnQiLCJhcmdzIiwibW9kZWxzIiwiUHJlZ3VudGEiLCJmaW5kT25lIiwiX2lkIiwiaWRQcmVndW50YSIsInJlZ2lzdHJvQWN0dWFsIiwicG9wdWxhdGUiLCJ0aGVuIiwicHJlZ3VudGEiLCJjYXRjaCIsImVycm9yIiwiRXJyb3IiLCJsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXMiLCJlZGdlUHJlZ3VudGFBcnJheSIsImN1cnNvciIsInBhcnNlSW50IiwiQnVmZmVyIiwiZnJvbSIsImFmdGVyIiwidG9TdHJpbmciLCJlZGdlUHJlZ3VudGFJbmZvUHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZWRnZXMiLCJmaW5kIiwiaWRlbnRpZmljYWRvciIsIiRndCIsImRlc2NyaXBjaW9uIiwiUmVnRXhwIiwid29yZCIsImVyciIsInJlc3VsdCIsImxpbWl0Iiwib24iLCJwdXNoIiwicmVzIiwibm9kZSIsImVuZEN1cnNvciIsImxlbmd0aCIsIk5hTiIsImhhc05leHRQYWdlIiwiY3Vyc29yRmluYWwiLCJ3aGVyZSIsImd0IiwiY291bnQiLCJwYWdlSW5mbyIsImhhc25leHRQYWdlIiwidG90YWxQYWdlc1Byb21pc2UiLCJsaXN0UGFnaW5hdGVQcmVndW50YSIsImFsbCIsInZhbHVlcyIsInRvdGFsQ291bnQiLCJ2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXMiLCJpZFVzdWFyaW8iLCJ1c3VhcmlvX0lEIiwic29ydCIsImxpc3RhZG9NaXNQcmVndW50YXMiLCJ2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbyIsImVzdGFkbyIsImxpc3RhZG9QcmVndW50YXMiLCJsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbyIsImhpc3RvcmlhbEltYWdlbmVzVXNhZGFzQnlVc2VyaW5BUHJlZ3VudGEiLCJsaXN0YWRvVXN1YXJpb3NEaXN0aW50b3NDcmVhZG9QcmVndW50YXMiLCJkaXN0aW5jdCIsIlVzZXIiLCIkaW4iLCJsaXN0YVVzdWFyaW9zRGlzdGludG9zIiwibGlzdGFVc3VhcmlvcyIsImxpc3RhZG9BcmVhc0Nvbm9jaW1pZW50b3NVc2FkYXNQcmVndW50YXMiLCJhcmVhc0Nvbm9jaW1pZW50byIsImxpc3RhQXJlYXNDb25vY2ltaWVudG9zVXNhZGFzIiwiY2FyZ2FyTGlzdGFkb1ByZWd1bnRhc0J5QXJlYXNDb25vY2ltaWVudG8iLCJhcmVhY29ub2NpbWllbnRvIiwiaWRBcmVhQ29ub2NpbWllbnRvIiwiY2FyZ2FyTGlzdGFQcmVndW50YXNBc2lnbmFkYXNSZXZpc29yIiwibGlzdGFQcmVndW50YXMiLCJNdXRhdGlvbiIsImNyZWFyUHJlZ3VudGEiLCJleGlzdGVuUHJlZ3VudGFzQ3JlYWRhcyIsIm9iamVjdE5ld1ByZWd1bnRhIiwic2F2ZSIsImRvY3VtZW50byIsImVkaXRhclByZWd1bnRhIiwiZmluZEJ5SWQiLCJwcmVndW50YUFudGVyaW9yIiwiaW1hZ2VuIiwiZmVjaGFfY3JlYWNpb24iLCJ0aXBvUHJlZ3VudGEiLCJyZXNwdWVzdGFzIiwiZmluZEJ5SWRBbmRVcGRhdGUiLCIkcHVzaCIsImhpc3RvcmlhbF9jYW1iaW9zIiwiJHNldCIsIm5ldyIsImRvY3VtZW50b0FjdHVhbGl6YWRvIiwiZWxpbWluYXJQcmVndW50YSIsImNvcnJlbyIsImNvcnJlb1VzdWFyaW8iLCJkb2N1bWVudG9QcmVndW50YSIsInJvbGxiYWNrUHJlZ3VudGFBbnRlcmlvciIsImlkUHJlZ3VudGFBbnRlcmlvciIsIm93bmVyUXVlc3Rpb24iLCJyb2xsYmFja0Rlc2NyaXBjaW9uUHJlZ3VudGEiLCJyb2xsYmFja1Jlc3B1ZXN0YXNQcmVndW50YSIsInJvbGxiYWNrSW1hZ2VuUHJlZ3VudGEiLCJhc2lnbmFyUHJlZ3VudGFzQU1pZW1icm9Db21pdGUiLCJyZWdpc3Ryb1VzdWFyaW8iLCJyb2xlcyIsInJvbCIsImVhY2hTZXJpZXMiLCJhcnJheVByZWd1bnRhcyIsIml0ZW0iLCJuZXh0IiwicmVnaXN0cm9QcmVndW50YSIsIm5vbWJyZSIsImVzdGFkb3NfYXNpZ25hZG9zIiwidXN1YXJpbyIsImVzdGFkb19hc2lnbmFkbyIsIm9ic2VydmFjaW9uIiwiZmVjaGFfYXNpZ25hY2lvbiIsIkRhdGUiLCJwcmVndW50YUFjdHVhbGl6YWRhIiwiYXNpZ25hckVzdGFkb1ByZWd1bnRhIiwiZmluZE9uZUFuZFVwZGF0ZSIsImVycm9yQWN0dWFsaXphciIsInRyYW5zZmVyaXJMaXN0YVByZWd1bnRhc0Rlc2lnbmFkYXNBVXN1YXJpbyIsImlkVXN1YXJpb0Rlc2lnbmFkbyIsInVwZGF0ZSIsImlkVXN1YXJpb0FjdGl2byIsIm11bHRpIiwiYWN0dWFsaXphZGEiLCJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ2RBLFFBQU87QUFDTkMsdUJBQXFCLDZCQUFDQyxNQUFELEVBQVNDLElBQVQsUUFBNEI7QUFBQSxPQUFaQyxNQUFZLFFBQVpBLE1BQVk7O0FBQ2hELFVBQU9BLE9BQU9DLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCLEVBQUNDLEtBQUtKLEtBQUtLLFVBQVg7QUFDOUJDLG9CQUFnQixJQURjLEVBQXhCLEVBRUxDLFFBRkssQ0FFSSxZQUZKLEVBR0xBLFFBSEssQ0FHSSwyQkFISixFQUlMQSxRQUpLLENBSUksa0JBSkosRUFLTEEsUUFMSyxDQUtJLGFBTEosRUFNTEMsSUFOSyxDQU1BLG9CQUFZO0FBQ2pCLFdBQU9DLFFBQVA7QUFDQSxJQVJLLEVBUUhDLEtBUkcsQ0FRRyxpQkFBUTtBQUNoQixRQUFJQyxLQUFKLEVBQVU7QUFDVCxXQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0E7QUFDRCxJQVpLLENBQVA7QUFjQSxHQWhCSztBQWlCTkUsNEJBQTJCLGtDQUFDZCxNQUFELEVBQVNDLElBQVQsU0FBNEI7QUFBQSxPQUFaQyxNQUFZLFNBQVpBLE1BQVk7O0FBQ3RELE9BQUlh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LE1BQTNFLEVBRUwsRUFBQ0csT0FBTSxJQUFQLEVBQVlwQyxLQUFJLElBQWhCLEVBRkssRUFFa0J2RixJQUZsQixDQUV1Qix1QkFBZTtBQUM1QyxVQUFHNEgsWUFBWUMsQ0FBWixHQUFlLENBQWxCLEVBQW9CO0FBQ25CLGNBQU8sSUFBUDtBQUNBLE9BRkQsTUFFSztBQUNKLGNBQU8sS0FBUDtBQUNBO0FBQ0QsTUFSTSxFQVFKM0gsS0FSSSxDQVFFLGlCQUFRO0FBQ2hCLFVBQUdDLEtBQUgsRUFBUztBQUNSLGFBQU0sSUFBSUMsS0FBSixDQUFVRCxLQUFWLENBQU47QUFDQTtBQUNELE1BWk0sQ0FBUDtBQWNBLEtBZkQsTUFlSztBQUNKLFdBQU0sSUFBSUMsS0FBSixDQUFVLGlEQUFWLENBQU47QUFDQTtBQUVELElBckJLLEVBcUJIRixLQXJCRyxDQXFCRyxpQkFBUztBQUNqQixRQUFJQyxLQUFKLEVBQVU7QUFDVCxXQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0E7QUFDRCxJQXpCSyxDQUFQO0FBMEJBO0FBeFdRO0FBalZJLEMsRUFIZiIsImZpbGUiOiJwcmVndW50YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgYXN5bmMgZnJvbSBcImFzeW5jXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0UXVlcnk6IHtcblx0XHR2ZXJNeVByZWd1bnRhQWN0dWFsOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kT25lKHtfaWQ6IGFyZ3MuaWRQcmVndW50YSxcblx0XHRcdFx0cmVnaXN0cm9BY3R1YWw6IHRydWUgfSlcblx0XHRcdFx0LnBvcHVsYXRlKFwidXN1YXJpb19JRFwiKVxuXHRcdFx0XHQucG9wdWxhdGUoXCJlc3RhZG9zX2FzaWduYWRvcy51c3VhcmlvXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZShcImFyZWFjb25vY2ltaWVudG9cIilcblx0XHRcdFx0LnBvcHVsYXRlKFwiZGlzY3VzaW9uZXNcIilcblx0XHRcdFx0LnRoZW4ocHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBwcmVndW50YTtcblx0XHRcdFx0fSkuY2F0Y2goZXJyb3I9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0bGlzdGFkb1ByZWd1bnRhc0FjdHVhbGVzIDogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdGxldCBlZGdlUHJlZ3VudGFBcnJheSA9IFtdO1xuXHRcdFx0bGV0IGN1cnNvciA9IHBhcnNlSW50KEJ1ZmZlci5mcm9tKGFyZ3MuYWZ0ZXIsIFwiYmFzZTY0XCIpLnRvU3RyaW5nKFwiYXNjaWlcIikpO1xuXHRcdFx0aWYgKCFjdXJzb3Ipe1xuXHRcdFx0XHRjdXJzb3IgPSAwO1xuXHRcdFx0fVxuXHRcdFx0bGV0IGVkZ2VQcmVndW50YUluZm9Qcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRcdGxldCBlZGdlcyA9IG1vZGVscy5QcmVndW50YS5maW5kKHtpZGVudGlmaWNhZG9yOnskZ3Q6Y3Vyc29yfSxyZWdpc3Ryb0FjdHVhbDogdHJ1ZSxcblx0XHRcdFx0XHRkZXNjcmlwY2lvbjogbmV3IFJlZ0V4cChhcmdzLndvcmQsIFwiaVwiKX0sIChlcnIsIHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdGlmKGVycil7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLnBvcHVsYXRlKFwidXN1YXJpb19JRFwiKVxuXHRcdFx0XHRcdC5wb3B1bGF0ZShcImVzdGFkb3NfYXNpZ25hZG9zLnVzdWFyaW9cIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJhcmVhY29ub2NpbWllbnRvXCIpXG5cdFx0XHRcdFx0LnBvcHVsYXRlKFwiZGlzY3VzaW9uZXNcIilcblx0XHRcdFx0XHQubGltaXQoYXJncy5saW1pdCkuY3Vyc29yKCk7XG5cblx0XHRcdFx0ZWRnZXMub24oXCJkYXRhXCIsIHJlcyA9PiB7XG5cdFx0XHRcdFx0ZWRnZVByZWd1bnRhQXJyYXkucHVzaCh7XG5cdFx0XHRcdFx0XHRjdXJzb3IgOiBCdWZmZXIuZnJvbSgocmVzLmlkZW50aWZpY2Fkb3IpLnRvU3RyaW5nKCkpLnRvU3RyaW5nKFwiYmFzZTY0XCIpLFxuXHRcdFx0XHRcdFx0bm9kZTogcmVzXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRlZGdlcy5vbihcImVuZFwiLCgpPT4ge1xuXHRcdFx0XHRcdGxldCBlbmRDdXJzb3IgPSBlZGdlUHJlZ3VudGFBcnJheS5sZW5ndGggPiAwID8gZWRnZVByZWd1bnRhQXJyYXlbZWRnZVByZWd1bnRhQXJyYXkubGVuZ3RoIC0gMV0uY3Vyc29yOk5hTjtcblx0XHRcdFx0XHRsZXQgaGFzTmV4dFBhZ2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcblx0XHRcdFx0XHRcdGlmIChlbmRDdXJzb3IpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGN1cnNvckZpbmFsID0gcGFyc2VJbnQoQnVmZmVyLmZyb20oZW5kQ3Vyc29yLFwiYmFzZTY0XCIpLnRvU3RyaW5nKFwiYXNjaWlcIikpO1xuXHRcdFx0XHRcdFx0XHRtb2RlbHMuUHJlZ3VudGEud2hlcmUoXCJpZGVudGlmaWNhZG9yXCIpLmd0KGN1cnNvckZpbmFsKS5jb3VudCh7cmVnaXN0cm9BY3R1YWw6dHJ1ZX0sKGVyciwgY291bnQpPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjb3VudCA+IDAgPyByZXNvbHZlKHRydWUpOiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdFx0ZWRnZXM6IGVkZ2VQcmVndW50YUFycmF5LFxuXHRcdFx0XHRcdFx0cGFnZUluZm86IHtcblx0XHRcdFx0XHRcdFx0ZW5kQ3Vyc29yOiBlbmRDdXJzb3IsXG5cdFx0XHRcdFx0XHRcdGhhc25leHRQYWdlOiBoYXNOZXh0UGFnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IHRvdGFsUGFnZXNQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRtb2RlbHMuUHJlZ3VudGEuY291bnQoe3JlZ2lzdHJvQWN0dWFsOnRydWV9LChlcnIsIGNvdW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShjb3VudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IGxpc3RQYWdpbmF0ZVByZWd1bnRhID0gUHJvbWlzZS5hbGwoW2VkZ2VQcmVndW50YUluZm9Qcm9taXNlLCB0b3RhbFBhZ2VzUHJvbWlzZV0pLnRoZW4oKHZhbHVlcykgPT4ge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVkZ2VzOiB2YWx1ZXNbMF0uZWRnZXMsXG5cdFx0XHRcdFx0dG90YWxDb3VudDogdmFsdWVzWzFdLFxuXHRcdFx0XHRcdHBhZ2VJbmZvOntcblx0XHRcdFx0XHRcdGVuZEN1cnNvcjogdmFsdWVzWzBdLnBhZ2VJbmZvLmVuZEN1cnNvcixcblx0XHRcdFx0XHRcdGhhc25leHRQYWdlOnZhbHVlc1swXS5wYWdlSW5mby5oYXNuZXh0UGFnZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGxpc3RQYWdpbmF0ZVByZWd1bnRhO1xuXHRcdH0sXG5cdFx0dmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSk9PiB7XG5cdFx0XHRpZiAoYXJncy5pZFVzdWFyaW8pIHtcblx0XHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kKHt1c3VhcmlvX0lEOiBhcmdzLmlkVXN1YXJpbywgcmVnaXN0cm9BY3R1YWw6IHRydWV9KVxuXHRcdFx0XHRcdC5wb3B1bGF0ZShcInVzdWFyaW9fSURcIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJlc3RhZG9zX2FzaWduYWRvcy51c3VhcmlvXCIpXG5cdFx0XHRcdFx0LnBvcHVsYXRlKFwiYXJlYWNvbm9jaW1pZW50b1wiKVxuXHRcdFx0XHRcdC5wb3B1bGF0ZShcImRpc2N1c2lvbmVzXCIpXG5cdFx0XHRcdFx0LnNvcnQoe1wiZmVjaGFfY3JlYWNpb25cIjotMX0pXG5cdFx0XHRcdFx0LnRoZW4obGlzdGFkb01pc1ByZWd1bnRhcyA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbGlzdGFkb01pc1ByZWd1bnRhcztcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG5lY2Nlc3NhcnkgdG8gSUQgb2YgYSB1c3VhcmlvLCBwYXJhIHJldHJpZXZlIHRoZSBpbmZvcm1hdGlvblwiKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cdFx0dmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG86IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KT0+IHtcblx0XHRcdGxldCBlc3RhZG87XG5cdFx0XHRpZiAoYXJncy5pZFVzdWFyaW8pe1xuXHRcdFx0XHRpZiAoIWFyZ3MuZXN0YWRvKXtcblx0XHRcdFx0XHRlc3RhZG8gPSBcInJldmlzaW9uXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0ZXN0YWRvID0gYXJncy5lc3RhZG87XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kKHt1c3VhcmlvX0lEOiBhcmdzLmlkVXN1YXJpbywgcmVnaXN0cm9BY3R1YWw6IHRydWUsIGVzdGFkbzogZXN0YWRvfSlcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJ1c3VhcmlvX0lEXCIpXG5cdFx0XHRcdFx0LnBvcHVsYXRlKFwiZXN0YWRvc19hc2lnbmFkb3MudXN1YXJpb1wiKVxuXHRcdFx0XHRcdC5wb3B1bGF0ZShcImFyZWFjb25vY2ltaWVudG9cIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJkaXNjdXNpb25lc1wiKVxuXHRcdFx0XHRcdC5zb3J0KHtcImZlY2hhX2NyZWFjaW9uXCI6LTF9KVxuXHRcdFx0XHRcdC50aGVuKGxpc3RhZG9QcmVndW50YXMgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGxpc3RhZG9QcmVndW50YXM7XG5cdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkl0IG5lY2Nlc3NhcnkgdG8gSUQgb2YgYSB1c3VhcmlvLCBwYXJhIHJldHJpZXZlIHRoZSBpbmZvcm1hdGlvblwiKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cdFx0bGlzdGFkb1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG86IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRsZXQgZWRnZVByZWd1bnRhQXJyYXkgPSBbXTtcblx0XHRcdGxldCBjdXJzb3IgPSBwYXJzZUludChCdWZmZXIuZnJvbShhcmdzLmFmdGVyLCBcImJhc2U2NFwiKS50b1N0cmluZyhcImFzY2lpXCIpKTtcblx0XHRcdGlmICghY3Vyc29yKXtcblx0XHRcdFx0Y3Vyc29yID0gMDtcblx0XHRcdH1cblx0XHRcdGxldCBlZGdlUHJlZ3VudGFJbmZvUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0XHRsZXQgZWRnZXMgPSBtb2RlbHMuUHJlZ3VudGEuZmluZCh7aWRlbnRpZmljYWRvcjp7JGd0OmN1cnNvcn0scmVnaXN0cm9BY3R1YWw6IHRydWUsXG5cdFx0XHRcdFx0ZGVzY3JpcGNpb246IG5ldyBSZWdFeHAoYXJncy53b3JkLCBcImlcIiksZXN0YWRvOiBhcmdzLmVzdGFkb30sIChlcnIsIHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdGlmKGVycil7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLnBvcHVsYXRlKFwidXN1YXJpb19JRFwiKVxuXHRcdFx0XHRcdC5wb3B1bGF0ZShcImVzdGFkb3NfYXNpZ25hZG9zLnVzdWFyaW9cIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJhcmVhY29ub2NpbWllbnRvXCIpXG5cdFx0XHRcdFx0LnBvcHVsYXRlKFwiZGlzY3VzaW9uZXNcIilcblx0XHRcdFx0XHQubGltaXQoYXJncy5saW1pdCkuY3Vyc29yKCk7XG5cblx0XHRcdFx0ZWRnZXMub24oXCJkYXRhXCIsIHJlcyA9PiB7XG5cdFx0XHRcdFx0ZWRnZVByZWd1bnRhQXJyYXkucHVzaCh7XG5cdFx0XHRcdFx0XHRjdXJzb3IgOiBCdWZmZXIuZnJvbSgocmVzLmlkZW50aWZpY2Fkb3IpLnRvU3RyaW5nKCkpLnRvU3RyaW5nKFwiYmFzZTY0XCIpLFxuXHRcdFx0XHRcdFx0bm9kZTogcmVzXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRlZGdlcy5vbihcImVuZFwiLCgpPT4ge1xuXHRcdFx0XHRcdGxldCBlbmRDdXJzb3IgPSBlZGdlUHJlZ3VudGFBcnJheS5sZW5ndGggPiAwID8gZWRnZVByZWd1bnRhQXJyYXlbZWRnZVByZWd1bnRhQXJyYXkubGVuZ3RoIC0gMV0uY3Vyc29yOk5hTjtcblx0XHRcdFx0XHRsZXQgaGFzTmV4dFBhZ2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcblx0XHRcdFx0XHRcdGlmIChlbmRDdXJzb3IpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGN1cnNvckZpbmFsID0gcGFyc2VJbnQoQnVmZmVyLmZyb20oZW5kQ3Vyc29yLFwiYmFzZTY0XCIpLnRvU3RyaW5nKFwiYXNjaWlcIikpO1xuXHRcdFx0XHRcdFx0XHRtb2RlbHMuUHJlZ3VudGEud2hlcmUoXCJpZGVudGlmaWNhZG9yXCIpLmd0KGN1cnNvckZpbmFsKS5jb3VudCh7cmVnaXN0cm9BY3R1YWw6dHJ1ZX0sKGVyciwgY291bnQpPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjb3VudCA+IDAgPyByZXNvbHZlKHRydWUpOiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdFx0ZWRnZXM6IGVkZ2VQcmVndW50YUFycmF5LFxuXHRcdFx0XHRcdFx0cGFnZUluZm86IHtcblx0XHRcdFx0XHRcdFx0ZW5kQ3Vyc29yOiBlbmRDdXJzb3IsXG5cdFx0XHRcdFx0XHRcdGhhc25leHRQYWdlOiBoYXNOZXh0UGFnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IHRvdGFsUGFnZXNQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRtb2RlbHMuUHJlZ3VudGEuY291bnQoKGVyciwgY291bnQpID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGNvdW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgbGlzdFBhZ2luYXRlUHJlZ3VudGEgPSBQcm9taXNlLmFsbChbZWRnZVByZWd1bnRhSW5mb1Byb21pc2UsIHRvdGFsUGFnZXNQcm9taXNlXSkudGhlbigodmFsdWVzKSA9PiB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZWRnZXM6IHZhbHVlc1swXS5lZGdlcyxcblx0XHRcdFx0XHR0b3RhbENvdW50OiB2YWx1ZXNbMV0sXG5cdFx0XHRcdFx0cGFnZUluZm86e1xuXHRcdFx0XHRcdFx0ZW5kQ3Vyc29yOiB2YWx1ZXNbMF0ucGFnZUluZm8uZW5kQ3Vyc29yLFxuXHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2U6dmFsdWVzWzBdLnBhZ2VJbmZvLmhhc25leHRQYWdlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbGlzdFBhZ2luYXRlUHJlZ3VudGE7XG5cdFx0fSxcblx0XHRoaXN0b3JpYWxJbWFnZW5lc1VzYWRhc0J5VXNlcmluQVByZWd1bnRhOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kT25lKHtfaWQ6IGFyZ3MuaWRQcmVndW50YSwgdXN1YXJpb19JRDogYXJncy5pZFVzdWFyaW99LFwiaGlzdG9yaWFsX2NhbWJpb3MgZXN0YWRvXCIpXG5cdFx0XHRcdC50aGVuKHByZWd1bnRhID0+IHtcblx0XHRcdFx0XHRpZiAocHJlZ3VudGEuZXN0YWRvID09PSBcInJldmlzaW9uXCIgfHwgcHJlZ3VudGEuZXN0YWRvID09PSBcImVzdGFibGVcIil7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJlZ3VudGE7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IGNhbiB0byBhY2Nlc3MgdG8gbGlzdCBJbWFnZXMgb2YgYSBjbG9zZWQocmVqZWN0KSBxdWVzdGlvblwiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRsaXN0YWRvVXN1YXJpb3NEaXN0aW50b3NDcmVhZG9QcmVndW50YXM6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmRpc3RpbmN0KFwidXN1YXJpb19JRFwiKVxuXHRcdFx0XHQudGhlbihsaXN0YVVzdWFyaW9zRGlzdGludG9zID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlVzZXIuZmluZCh7XCJfaWRcIjp7JGluOmxpc3RhVXN1YXJpb3NEaXN0aW50b3N9fSlcblx0XHRcdFx0XHRcdC50aGVuKGxpc3RhVXN1YXJpb3MgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbGlzdGFVc3Vhcmlvcztcblx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRsaXN0YWRvQXJlYXNDb25vY2ltaWVudG9zVXNhZGFzUHJlZ3VudGFzOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5hcmVhc0Nvbm9jaW1pZW50by5kaXN0aW5jdChcInRpdHVsb1wiKVxuXHRcdFx0XHQudGhlbihsaXN0YUFyZWFzQ29ub2NpbWllbnRvc1VzYWRhcz0+e1xuXHRcdFx0XHRcdHJldHVybiBsaXN0YUFyZWFzQ29ub2NpbWllbnRvc1VzYWRhcztcblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRjYXJnYXJMaXN0YWRvUHJlZ3VudGFzQnlBcmVhc0Nvbm9jaW1pZW50bzogKHBhcmVudCwgYXJncywge21vZGVsc30pPT57XG5cdFx0XHRsZXQgZWRnZVByZWd1bnRhQXJyYXkgPSBbXTtcblx0XHRcdGxldCBjdXJzb3IgPSBwYXJzZUludChCdWZmZXIuZnJvbShhcmdzLmFmdGVyLCBcImJhc2U2NFwiKS50b1N0cmluZyhcImFzY2lpXCIpKTtcblx0XHRcdGlmICghY3Vyc29yKXtcblx0XHRcdFx0Y3Vyc29yID0gMDtcblx0XHRcdH1cblx0XHRcdGxldCBlZGdlUHJlZ3VudGFJbmZvUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0XHRsZXQgZWRnZXMgPSBtb2RlbHMuUHJlZ3VudGEuZmluZCh7aWRlbnRpZmljYWRvcjp7JGd0OmN1cnNvcn0scmVnaXN0cm9BY3R1YWw6IHRydWUsXG5cdFx0XHRcdFx0ZGVzY3JpcGNpb246IG5ldyBSZWdFeHAoYXJncy53b3JkLCBcImlcIiksYXJlYWNvbm9jaW1pZW50bzogYXJncy5pZEFyZWFDb25vY2ltaWVudG99LCAoZXJyLCByZXN1bHQpID0+IHtcblx0XHRcdFx0XHRpZihlcnIpe1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5wb3B1bGF0ZShcInVzdWFyaW9fSURcIilcblx0XHRcdFx0XHQucG9wdWxhdGUoXCJhcmVhY29ub2NpbWllbnRvXCIpXG5cdFx0XHRcdFx0LnBvcHVsYXRlKFwiZGlzY3VzaW9uZXNcIilcblx0XHRcdFx0XHQubGltaXQoYXJncy5saW1pdCkuY3Vyc29yKCk7XG5cblx0XHRcdFx0ZWRnZXMub24oXCJkYXRhXCIsIHJlcyA9PiB7XG5cdFx0XHRcdFx0ZWRnZVByZWd1bnRhQXJyYXkucHVzaCh7XG5cdFx0XHRcdFx0XHRjdXJzb3IgOiBCdWZmZXIuZnJvbSgocmVzLmlkZW50aWZpY2Fkb3IpLnRvU3RyaW5nKCkpLnRvU3RyaW5nKFwiYmFzZTY0XCIpLFxuXHRcdFx0XHRcdFx0bm9kZTogcmVzXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRlZGdlcy5vbihcImVuZFwiLCgpPT4ge1xuXHRcdFx0XHRcdGxldCBlbmRDdXJzb3IgPSBlZGdlUHJlZ3VudGFBcnJheS5sZW5ndGggPiAwID8gZWRnZVByZWd1bnRhQXJyYXlbZWRnZVByZWd1bnRhQXJyYXkubGVuZ3RoIC0gMV0uY3Vyc29yOk5hTjtcblx0XHRcdFx0XHRsZXQgaGFzTmV4dFBhZ2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcblx0XHRcdFx0XHRcdGlmIChlbmRDdXJzb3IpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGN1cnNvckZpbmFsID0gcGFyc2VJbnQoQnVmZmVyLmZyb20oZW5kQ3Vyc29yLFwiYmFzZTY0XCIpLnRvU3RyaW5nKFwiYXNjaWlcIikpO1xuXHRcdFx0XHRcdFx0XHRtb2RlbHMuUHJlZ3VudGEud2hlcmUoXCJpZGVudGlmaWNhZG9yXCIpLmd0KGN1cnNvckZpbmFsKS5jb3VudCh7cmVnaXN0cm9BY3R1YWw6dHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBhcmdzLmlkQXJlYUNvbm9jaW1pZW50b30sKGVyciwgY291bnQpPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjb3VudCA+IDAgPyByZXNvbHZlKHRydWUpOiByZXNvbHZlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJlc29sdmUoe1xuXHRcdFx0XHRcdFx0ZWRnZXM6IGVkZ2VQcmVndW50YUFycmF5LFxuXHRcdFx0XHRcdFx0cGFnZUluZm86IHtcblx0XHRcdFx0XHRcdFx0ZW5kQ3Vyc29yOiBlbmRDdXJzb3IsXG5cdFx0XHRcdFx0XHRcdGhhc25leHRQYWdlOiBoYXNOZXh0UGFnZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IHRvdGFsUGFnZXNQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRtb2RlbHMuUHJlZ3VudGEuY291bnQoe2FyZWFjb25vY2ltaWVudG86IGFyZ3MuaWRBcmVhQ29ub2NpbWllbnRvLHJlZ2lzdHJvQWN0dWFsOnRydWV9LChlcnIsIGNvdW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShjb3VudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IGxpc3RQYWdpbmF0ZVByZWd1bnRhID0gUHJvbWlzZS5hbGwoW2VkZ2VQcmVndW50YUluZm9Qcm9taXNlLCB0b3RhbFBhZ2VzUHJvbWlzZV0pLnRoZW4oKHZhbHVlcykgPT4ge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVkZ2VzOiB2YWx1ZXNbMF0uZWRnZXMsXG5cdFx0XHRcdFx0dG90YWxDb3VudDogdmFsdWVzWzFdLFxuXHRcdFx0XHRcdHBhZ2VJbmZvOntcblx0XHRcdFx0XHRcdGVuZEN1cnNvcjogdmFsdWVzWzBdLnBhZ2VJbmZvLmVuZEN1cnNvcixcblx0XHRcdFx0XHRcdGhhc25leHRQYWdlOnZhbHVlc1swXS5wYWdlSW5mby5oYXNuZXh0UGFnZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGxpc3RQYWdpbmF0ZVByZWd1bnRhO1xuXHRcdH0sXG5cdFx0Y2FyZ2FyTGlzdGFQcmVndW50YXNBc2lnbmFkYXNSZXZpc29yOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSk9Pntcblx0XHRcdHJldHVybiBtb2RlbHMuUHJlZ3VudGEuZmluZCh7XCJlc3RhZG9zX2FzaWduYWRvcy51c3VhcmlvXCI6YXJncy5pZFVzdWFyaW8sIFwicmVnaXN0cm9BY3R1YWxcIjogdHJ1ZX0pXG5cdFx0XHRcdC5wb3B1bGF0ZShcInVzdWFyaW9fSURcIilcblx0XHRcdFx0LnBvcHVsYXRlKFwiYXJlYWNvbm9jaW1pZW50b1wiKVxuXHRcdFx0XHQucG9wdWxhdGUoXCJlc3RhZG9zX2FzaWduYWRvcy51c3VhcmlvXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZShcImRpc2N1c2lvbmVzXCIpXG5cdFx0XHRcdC5zb3J0KHtcImZlY2hhX2NyZWFjaW9uXCI6LTF9KVxuXHRcdFx0XHQudGhlbihsaXN0YVByZWd1bnRhcyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RhUHJlZ3VudGFzO1xuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXG5cdFx0fVxuXHR9LFxuXHRNdXRhdGlvbjoge1xuXHRcdGNyZWFyUHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRpZiAoYXJncy5wcmVndW50YS5kZXNjcmlwY2lvbiAmJiBhcmdzLnByZWd1bnRhLnVzdWFyaW9fSUQgJiYgYXJncy5wcmVndW50YS5hcmVhY29ub2NpbWllbnRvLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5jb3VudCgpXG5cdFx0XHRcdFx0LnRoZW4oZXhpc3RlblByZWd1bnRhc0NyZWFkYXMgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGV4aXN0ZW5QcmVndW50YXNDcmVhZGFzKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3MucHJlZ3VudGEuaWRlbnRpZmljYWRvciA9IGV4aXN0ZW5QcmVndW50YXNDcmVhZGFzICsgMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IG9iamVjdE5ld1ByZWd1bnRhID0gbmV3IG1vZGVscy5QcmVndW50YShhcmdzLnByZWd1bnRhKTtcblx0XHRcdFx0XHRcdHJldHVybiBvYmplY3ROZXdQcmVndW50YS5zYXZlKClcblx0XHRcdFx0XHRcdFx0LnRoZW4oZG9jdW1lbnRvID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRvO1xuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3I9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZXJyb3Ipe1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBpcyBlbXB0aWVzIGZpZWxkcywgaXMgbm90IHBvc3NpYmxlIHNhdmUgYSBuZXcgcXVlc3Rpb25cIik7XG5cdFx0XHR9XG5cblx0XHR9LFxuXHRcdGVkaXRhclByZWd1bnRhOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kQnlJZChhcmdzLmlkUHJlZ3VudGEpXG5cdFx0XHRcdC50aGVuKGRvY3VtZW50byA9PiB7XG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50by51c3VhcmlvX0lEID09IGFyZ3MucHJlZ3VudGEudXN1YXJpb19JRCApIHtcblx0XHRcdFx0XHRcdGlmIChkb2N1bWVudG8uZXN0YWRvID09PSBcInJldmlzaW9uXCIgfHwgZG9jdW1lbnRvLmVzdGFkbyA9PT0gXCJlc3RhYmxlXCIpe1xuXHRcdFx0XHRcdFx0XHRsZXQgcHJlZ3VudGFBbnRlcmlvciA9IHtcblx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogZG9jdW1lbnRvLmRlc2NyaXBjaW9uLFxuXHRcdFx0XHRcdFx0XHRcdGltYWdlbjogZG9jdW1lbnRvLmltYWdlbixcblx0XHRcdFx0XHRcdFx0XHRlc3RhZG86IGRvY3VtZW50by5lc3RhZG8sXG5cdFx0XHRcdFx0XHRcdFx0ZmVjaGFfY3JlYWNpb246IGRvY3VtZW50by5mZWNoYV9jcmVhY2lvbixcblx0XHRcdFx0XHRcdFx0XHR0aXBvUHJlZ3VudGE6IGRvY3VtZW50by50aXBvUHJlZ3VudGEsXG5cdFx0XHRcdFx0XHRcdFx0YXJlYWNvbm9jaW1pZW50bzogZG9jdW1lbnRvLmFyZWFjb25vY2ltaWVudG8sXG5cdFx0XHRcdFx0XHRcdFx0cmVzcHVlc3RhczogZG9jdW1lbnRvLnJlc3B1ZXN0YXNcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkQW5kVXBkYXRlKGFyZ3MuaWRQcmVndW50YSxcblx0XHRcdFx0XHRcdFx0XHR7JHB1c2g6e2hpc3RvcmlhbF9jYW1iaW9zOiBwcmVndW50YUFudGVyaW9yfSxcblx0XHRcdFx0XHRcdFx0XHRcdCRzZXQ6e2Rlc2NyaXBjaW9uOiBhcmdzLnByZWd1bnRhLmRlc2NyaXBjaW9uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpbWFnZW46IGFyZ3MucHJlZ3VudGEuaW1hZ2VuLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogYXJncy5wcmVndW50YS5mZWNoYV9jcmVhY2lvbixcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBhcmdzLnByZWd1bnRhLnRpcG9QcmVndW50YSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXJlYWNvbm9jaW1pZW50bzogYXJncy5wcmVndW50YS5hcmVhY29ub2NpbWllbnRvLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBhcmdzLnByZWd1bnRhLnJlc3B1ZXN0YXNcblx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0LHtuZXcgOiB0cnVlfSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbihkb2N1bWVudG9BY3R1YWxpemFkbyA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRvQWN0dWFsaXphZG87XG5cdFx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3I9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoaXMgcXVlc3Rpb25zIGlzIGNsb3NlZCEhLCBiZWNhdXNlIHRoZSBjb21taXRlIG1lbWJlciBkZWNpZGVkIFwiICtcblx0XHRcdFx0XHRcdFx0XHRcInJlamVjdCB0aGlzIHF1ZXN0aW9uLCBzbyB5b3Ugc2hvdWxkLCBjcmVhdGUgYSBuZXcgb25lXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBhcmUgbm90IG93biB0aGlzIHF1ZXN0aW9uLCBzbyB5b3UgY2FuIG5vdCB1cGRhdGVcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0fSxcblx0XHRlbGltaW5hclByZWd1bnRhOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5Vc2VyLmZpbmRPbmUoe2NvcnJlbzogYXJncy5jb3JyZW9Vc3VhcmlvfSxcIl9pZFwiKVxuXHRcdFx0XHQudGhlbihpZFVzdWFyaW8gPT4ge1xuXHRcdFx0XHRcdHJldHVybiBtb2RlbHMuUHJlZ3VudGEuZmluZE9uZSh7X2lkOiBhcmdzLmlkUHJlZ3VudGEsIHVzdWFyaW9fSUQ6IGlkVXN1YXJpb30pXG5cdFx0XHRcdFx0XHQudGhlbihkb2N1bWVudG9QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChkb2N1bWVudG9QcmVndW50YS5lc3RhZG8gPT09IFwicmV2aXNpb25cIiB8fCBkb2N1bWVudG9QcmVndW50YS5lc3RhZG8gPT09IFwicmVjaGF6YWRhXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkQW5kVXBkYXRlKGFyZ3MuaWRQcmVndW50YSwgeyRzZXQ6e3JlZ2lzdHJvQWN0dWFsOiBmYWxzZX19LHtuZXc6IHRydWV9KVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oZG9jdW1lbnRvUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRvUHJlZ3VudGE7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoaXMgcXVlc3Rpb25zIGlzIGFjY2VwdGVkLCBpcyBub3QgcG9zc2libGUgZGVsZXRlIHRoaXMgcXVlc3Rpb25cIik7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0cm9sbGJhY2tQcmVndW50YUFudGVyaW9yOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kT25lKHtcIl9pZFwiOiBhcmdzLmlkUHJlZ3VudGEsXG5cdFx0XHRcdFwiaGlzdG9yaWFsX2NhbWJpb3MuX2lkXCI6IGFyZ3MuaWRQcmVndW50YUFudGVyaW9yIH0se1wiaGlzdG9yaWFsX2NhbWJpb3MuJFwiOjEsXCJlc3RhZG9cIjoxfSlcblx0XHRcdFx0LnBvcHVsYXRlKFwidXN1YXJpb19JRFwiKVxuXHRcdFx0XHQudGhlbihwcmVndW50YUFudGVyaW9yID0+IHtcblx0XHRcdFx0XHRpZiAocHJlZ3VudGFBbnRlcmlvci51c3VhcmlvX0lELmNvcnJlbyA9PT0gYXJncy5vd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdGlmICgocHJlZ3VudGFBbnRlcmlvci5lc3RhZG8gPT09IFwicmV2aXNpb25cIiAmJiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmVzdGFkbyA9PT0gXCJlc3RhYmxlXCIpXG5cdFx0XHRcdFx0XHRcdFx0fHwgKHByZWd1bnRhQW50ZXJpb3IuZXN0YWRvID09PSBcInJldmlzaW9uXCIgJiYgcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5lc3RhZG8gPT09IFwicmV2aXNpb25cIilcblx0XHRcdFx0XHRcdFx0fHwgKHByZWd1bnRhQW50ZXJpb3IuZXN0YWRvID09PSBcImVzdGFibGVcIiAmJiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmVzdGFkbyA9PT0gXCJyZXZpc2lvblwiKSApe1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkQW5kVXBkYXRlKGFyZ3MuaWRQcmVndW50YSx7XG5cdFx0XHRcdFx0XHRcdFx0JHNldDoge2Rlc2NyaXBjaW9uOiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmRlc2NyaXBjaW9uLFxuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VuOiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmltYWdlbixcblx0XHRcdFx0XHRcdFx0XHRcdGVzdGFkbzogcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5lc3RhZG8sXG5cdFx0XHRcdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5mZWNoYV9jcmVhY2lvbixcblx0XHRcdFx0XHRcdFx0XHRcdHRpcG9QcmVndW50YTogcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS50aXBvUHJlZ3VudGEsXG5cdFx0XHRcdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmFyZWFjb25vY2ltaWVudG8sXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLnJlc3B1ZXN0YXN9XG5cdFx0XHRcdFx0XHRcdH0se25ldzogdHJ1ZX0pLnRoZW4ocHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBwcmVndW50YTtcblxuXHRcdFx0XHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoZSBydWxlIHRvIG1ha2Ugcm9sbGJhY2sgdGhpcyBxdWVzdGlvbiBpcyBub3QgY29ycmVjdFwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IGNhbid0IG1ha2Ugcm9sbGJhY2sgdGhpcyBxdWVzdGlvbiBiZWNhdXNlIHlvdSBhcmUgbm90IHRoZSBvd25lciEhXCIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRyb2xsYmFja0Rlc2NyaXBjaW9uUHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRPbmUoe1wiX2lkXCI6IGFyZ3MuaWRQcmVndW50YSxcblx0XHRcdFx0XCJoaXN0b3JpYWxfY2FtYmlvcy5faWRcIjogYXJncy5pZFByZWd1bnRhQW50ZXJpb3IgfSx7XCJoaXN0b3JpYWxfY2FtYmlvcy4kXCI6MSxcImVzdGFkb1wiOjF9KVxuXHRcdFx0XHQucG9wdWxhdGUoXCJ1c3VhcmlvX0lEXCIpXG5cdFx0XHRcdC50aGVuKHByZWd1bnRhQW50ZXJpb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChwcmVndW50YUFudGVyaW9yLnVzdWFyaW9fSUQuY29ycmVvID09PSBhcmdzLm93bmVyUXVlc3Rpb24pe1xuXHRcdFx0XHRcdFx0aWYgKChwcmVndW50YUFudGVyaW9yLmVzdGFkbyA9PT0gXCJyZXZpc2lvblwiICYmIHByZWd1bnRhQW50ZXJpb3IuaGlzdG9yaWFsX2NhbWJpb3NbMF0uZXN0YWRvID09PSBcImVzdGFibGVcIilcblx0XHRcdFx0XHRcdFx0fHwgKHByZWd1bnRhQW50ZXJpb3IuZXN0YWRvID09PSBcInJldmlzaW9uXCIgJiYgcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5lc3RhZG8gPT09IFwicmV2aXNpb25cIilcblx0XHRcdFx0XHRcdFx0fHwgKHByZWd1bnRhQW50ZXJpb3IuZXN0YWRvID09PSBcImVzdGFibGVcIiAmJiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmVzdGFkbyA9PT0gXCJyZXZpc2lvblwiKSApe1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkQW5kVXBkYXRlKGFyZ3MuaWRQcmVndW50YSx7XG5cdFx0XHRcdFx0XHRcdFx0JHNldDoge2Rlc2NyaXBjaW9uOiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmRlc2NyaXBjaW9ufVxuXHRcdFx0XHRcdFx0XHR9LHtuZXc6IHRydWV9KS50aGVuKHByZWd1bnRhID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcHJlZ3VudGE7XG5cblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgcnVsZSB0byBtYWtlIHJvbGxiYWNrIHRoaXMgcXVlc3Rpb24gaXMgbm90IGNvcnJlY3RcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBjYW4ndCBtYWtlIHJvbGxiYWNrIHRoaXMgcXVlc3Rpb24gYmVjYXVzZSB5b3UgYXJlIG5vdCB0aGUgb3duZXIhIVwiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0fSxcblx0XHRyb2xsYmFja1Jlc3B1ZXN0YXNQcmVndW50YTogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuUHJlZ3VudGEuZmluZE9uZSh7XCJfaWRcIjogYXJncy5pZFByZWd1bnRhLFxuXHRcdFx0XHRcImhpc3RvcmlhbF9jYW1iaW9zLl9pZFwiOiBhcmdzLmlkUHJlZ3VudGFBbnRlcmlvciB9LHtcImhpc3RvcmlhbF9jYW1iaW9zLiRcIjoxLFwiZXN0YWRvXCI6MX0pXG5cdFx0XHRcdC5wb3B1bGF0ZShcInVzdWFyaW9fSURcIilcblx0XHRcdFx0LnRoZW4ocHJlZ3VudGFBbnRlcmlvciA9PiB7XG5cdFx0XHRcdFx0aWYgKHByZWd1bnRhQW50ZXJpb3IudXN1YXJpb19JRC5jb3JyZW8gPT09IGFyZ3Mub3duZXJRdWVzdGlvbil7XG5cdFx0XHRcdFx0XHRpZiAoKHByZWd1bnRhQW50ZXJpb3IuZXN0YWRvID09PSBcInJldmlzaW9uXCIgJiYgcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5lc3RhZG8gPT09IFwiZXN0YWJsZVwiKVxuXHRcdFx0XHRcdFx0XHR8fCAocHJlZ3VudGFBbnRlcmlvci5lc3RhZG8gPT09IFwicmV2aXNpb25cIiAmJiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmVzdGFkbyA9PT0gXCJyZXZpc2lvblwiKVxuXHRcdFx0XHRcdFx0XHR8fCAocHJlZ3VudGFBbnRlcmlvci5lc3RhZG8gPT09IFwiZXN0YWJsZVwiICYmIHByZWd1bnRhQW50ZXJpb3IuaGlzdG9yaWFsX2NhbWJpb3NbMF0uZXN0YWRvID09PSBcInJldmlzaW9uXCIpICl7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuUHJlZ3VudGEuZmluZEJ5SWRBbmRVcGRhdGUoYXJncy5pZFByZWd1bnRhLHtcblx0XHRcdFx0XHRcdFx0XHQkc2V0OiB7cmVzcHVlc3RhczogcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5yZXNwdWVzdGFzfVxuXHRcdFx0XHRcdFx0XHR9LHtuZXc6IHRydWV9KS50aGVuKHByZWd1bnRhID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcHJlZ3VudGE7XG5cblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgcnVsZSB0byBtYWtlIHJvbGxiYWNrIHRoaXMgcXVlc3Rpb24gaXMgbm90IGNvcnJlY3RcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBjYW4ndCBtYWtlIHJvbGxiYWNrIHRoaXMgcXVlc3Rpb24gYmVjYXVzZSB5b3UgYXJlIG5vdCB0aGUgb3duZXIhIVwiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0fSxcblx0XHRyb2xsYmFja0ltYWdlblByZWd1bnRhOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kT25lKHtcIl9pZFwiOiBhcmdzLmlkUHJlZ3VudGEsXG5cdFx0XHRcdFwiaGlzdG9yaWFsX2NhbWJpb3MuX2lkXCI6IGFyZ3MuaWRQcmVndW50YUFudGVyaW9yIH0se1wiaGlzdG9yaWFsX2NhbWJpb3MuJFwiOjEsXCJlc3RhZG9cIjoxfSlcblx0XHRcdFx0LnBvcHVsYXRlKFwidXN1YXJpb19JRFwiKVxuXHRcdFx0XHQudGhlbihwcmVndW50YUFudGVyaW9yID0+IHtcblx0XHRcdFx0XHRpZiAocHJlZ3VudGFBbnRlcmlvci51c3VhcmlvX0lELmNvcnJlbyA9PT0gYXJncy5vd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdGlmICgocHJlZ3VudGFBbnRlcmlvci5lc3RhZG8gPT09IFwicmV2aXNpb25cIiAmJiBwcmVndW50YUFudGVyaW9yLmhpc3RvcmlhbF9jYW1iaW9zWzBdLmVzdGFkbyA9PT0gXCJlc3RhYmxlXCIpXG5cdFx0XHRcdFx0XHRcdHx8IChwcmVndW50YUFudGVyaW9yLmVzdGFkbyA9PT0gXCJyZXZpc2lvblwiICYmIHByZWd1bnRhQW50ZXJpb3IuaGlzdG9yaWFsX2NhbWJpb3NbMF0uZXN0YWRvID09PSBcInJldmlzaW9uXCIpXG5cdFx0XHRcdFx0XHRcdHx8IChwcmVndW50YUFudGVyaW9yLmVzdGFkbyA9PT0gXCJlc3RhYmxlXCIgJiYgcHJlZ3VudGFBbnRlcmlvci5oaXN0b3JpYWxfY2FtYmlvc1swXS5lc3RhZG8gPT09IFwicmV2aXNpb25cIikgKXtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5maW5kQnlJZEFuZFVwZGF0ZShhcmdzLmlkUHJlZ3VudGEse1xuXHRcdFx0XHRcdFx0XHRcdCRzZXQ6IHtpbWFnZW46IHByZWd1bnRhQW50ZXJpb3IuaGlzdG9yaWFsX2NhbWJpb3NbMF0uaW1hZ2VufVxuXHRcdFx0XHRcdFx0XHR9LHtuZXc6IHRydWV9KS50aGVuKHByZWd1bnRhID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcHJlZ3VudGE7XG5cblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgcnVsZSB0byBtYWtlIHJvbGxiYWNrIHRoaXMgcXVlc3Rpb24gaXMgbm90IGNvcnJlY3RcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBjYW4ndCBtYWtlIHJvbGxiYWNrIHRoaXMgcXVlc3Rpb24gYmVjYXVzZSB5b3UgYXJlIG5vdCB0aGUgb3duZXIhIVwiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0fSxcblx0XHRhc2lnbmFyUHJlZ3VudGFzQU1pZW1icm9Db21pdGU6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm5cdG1vZGVscy5Vc2VyLmZpbmRCeUlkKGFyZ3MuaWRVc3VhcmlvKVxuXHRcdFx0XHQudGhlbihyZWdpc3Ryb1VzdWFyaW8gPT4ge1xuXHRcdFx0XHRcdGlmKHJlZ2lzdHJvVXN1YXJpby5yb2xlc1swXS5yb2wgPT09IFwiY29taXRlXCIpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRcdFx0XHRcdGFzeW5jLmVhY2hTZXJpZXMoYXJncy5hcnJheVByZWd1bnRhcywgKGl0ZW0sIG5leHQpPT57XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuXHRtb2RlbHMuUHJlZ3VudGEuZmluZEJ5SWQoaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC5wb3B1bGF0ZShcInVzdWFyaW9fSURcIilcblx0XHRcdFx0XHRcdFx0XHRcdC5wb3B1bGF0ZShcImFyZWFjb25vY2ltaWVudG9cIilcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHJlZ2lzdHJvUHJlZ3VudGEgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZihyZWdpc3Ryb1ByZWd1bnRhLnVzdWFyaW9fSUQuX2lkID09IGFyZ3MuaWRVc3VhcmlvKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZWplY3QoXCJ0aGUgdXNlciBcIiArIHJlZ2lzdHJvUHJlZ3VudGEudXN1YXJpb19JRC5ub21icmUgKyBcIiBhbHJlYWR5IGNyZWF0ZSBcIiArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcInRoaXMgcXVlc3Rpb25zLCB3aXRoIHRpdGxlXCIgKyByZWdpc3Ryb1ByZWd1bnRhLmRlc2NyaXBjaW9uICsgXCJzbywgY2FuJ3RcIiArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImFjY2VwdCBvciByZXZvcXVlIGEgcXVlc3Rpb24gdGhhdCB0aGUgc2FtZSBjcmVhdGUhXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihyZWdpc3Ryb1ByZWd1bnRhLmVzdGFkb3NfYXNpZ25hZG9zLmxlbmd0aCB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlZ2lzdHJvUHJlZ3VudGEuZXN0YWRvc19hc2lnbmFkb3MudXN1YXJpbyA9PSBhcmdzLmlkVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVqZWN0KFwiQWxyZWFkeSBleGlzdCBhIHVzZXIgYXNzaWduZWQgdG8gdGhpcyBxdWVzdGlvbnMsIHlvdSBjYW4ndCBhc3NpZ25cIiArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcInRvIG1vcmUgb25lIHBlb3BsZSBcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuXHRtb2RlbHMuUHJlZ3VudGEuZmluZEJ5SWRBbmRVcGRhdGUoaXRlbSx7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkcHVzaDoge2VzdGFkb3NfYXNpZ25hZG9zOnt1c3VhcmlvOmFyZ3MuaWRVc3VhcmlvLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlc3RhZG9fYXNpZ25hZG86IFwicmV2aXNvclwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvYnNlcnZhY2lvbjogXCJBIGNvbW1pdHRlIG1lbWJlciBuZWVkIHB1dCBhIHNob3J0IGRlc2NyaXB0aW9uIGFib3V0IHlvdXIgZGVjaXNpb25cIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmVjaGFfYXNpZ25hY2lvbjogbmV3IERhdGV9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0se25ldzogdHJ1ZX0pLnRoZW4ocHJlZ3VudGFBY3R1YWxpemFkYSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAocHJlZ3VudGFBY3R1YWxpemFkYSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0fSwoZXJyb3IpPT57XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9KTtcblxuXG5cblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInRoaXMgdXNlciBpc24ndCBjb21taXR0ZSBtZW1iZXIsIHNvIHRoYXQgeW91IGNhbid0IGFzc2lnbiB0aGlzIHF1ZXN0aW9uXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRhc2lnbmFyRXN0YWRvUHJlZ3VudGE6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRCeUlkKGFyZ3MuaWRQcmVndW50YSlcblx0XHRcdFx0LnRoZW4ocmVnaXN0cm9QcmVndW50YSA9PiB7XG5cdFx0XHRcdFx0aWYgKHJlZ2lzdHJvUHJlZ3VudGEudXN1YXJpb19JRCA9PSBhcmdzLmlkVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3UgY2FuJ3QgcmUtYXNzaWduIGEgc3RhdGUgaWYgeW91XCIgK1xuXHRcdFx0XHRcdFx0XHRcImFyZSB0aGUgb3duZXIgdGhlIHF1ZXN0aW9uXCIpO1xuXHRcdFx0XHRcdH1lbHNlIGlmKHJlZ2lzdHJvUHJlZ3VudGEuZXN0YWRvc19hc2lnbmFkb3NbMF0udXN1YXJpbyA9PSBhcmdzLmlkVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmZpbmRPbmVBbmRVcGRhdGUoe19pZDphcmdzLmlkUHJlZ3VudGEsXCJlc3RhZG9zX2FzaWduYWRvcy51c3VhcmlvXCI6IGFyZ3MuaWRVc3VhcmlvfSx7XG5cdFx0XHRcdFx0XHRcdCRzZXQ6e1wiZXN0YWRvXCI6IGFyZ3MuZXN0YWRvLFwiZXN0YWRvc19hc2lnbmFkb3MuJC5lc3RhZG9fYXNpZ25hZG9cIjphcmdzLmVzdGFkbyxcblx0XHRcdFx0XHRcdFx0XHRcImVzdGFkb3NfYXNpZ25hZG9zLiQub2JzZXJ2YWNpb25cIjphcmdzLm9ic2VydmFjaW9ufVxuXHRcdFx0XHRcdFx0fSx7bmV3OiB0cnVlfSkudGhlbihwcmVndW50YUFjdHVhbGl6YWRhID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHByZWd1bnRhQWN0dWFsaXphZGE7XG5cdFx0XHRcdFx0XHR9KS5jYXRjaChlcnJvckFjdHVhbGl6YXIgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3JBY3R1YWxpemFyKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwidGhpcyB1c2VycyBpcyBub3QgYmUgYWJsZSB0byBhc3NpZ24gdGhpcyBzdGF0ZSB0byB0aGlzIHF1ZXN0aW9uXCIgK1xuXHRcdFx0XHRcdFx0XHRcImJlY2F1c2Ugd2FzIG5vdCBhc3NpZ25lZCBcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRyYW5zZmVyaXJMaXN0YVByZWd1bnRhc0Rlc2lnbmFkYXNBVXN1YXJpbzogKHBhcmVudCwgYXJncywge21vZGVsc30pPT57XG5cdFx0XHRyZXR1cm4gbW9kZWxzLlVzZXIuZmluZEJ5SWQoYXJncy5pZFVzdWFyaW9EZXNpZ25hZG8pXG5cdFx0XHRcdC50aGVuKHVzdWFyaW8gPT4ge1xuXHRcdFx0XHRcdGlmKHVzdWFyaW8ucm9sZXNbMF0ucm9sID09PSBcImNvbWl0ZVwiKXtcblx0XHRcdFx0XHRcdHJldHVybiBtb2RlbHMuUHJlZ3VudGEudXBkYXRlKHtcImVzdGFkb3NfYXNpZ25hZG9zLnVzdWFyaW9cIjogYXJncy5pZFVzdWFyaW9BY3Rpdm99LHtcblx0XHRcdFx0XHRcdFx0JHNldDp7XCJlc3RhZG9zX2FzaWduYWRvcy4kLnVzdWFyaW9cIjphcmdzLmlkVXN1YXJpb0Rlc2lnbmFkb31cblx0XHRcdFx0XHRcdH0se211bHRpOnRydWUsbmV3OnRydWV9KS50aGVuKGFjdHVhbGl6YWRhID0+IHtcblx0XHRcdFx0XHRcdFx0aWYoYWN0dWFsaXphZGEubiA+MCl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT57XG5cdFx0XHRcdFx0XHRcdGlmKGVycm9yKXtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwib25seSBjb21taXRlIG1lbWJlciBjYW4gYXNzaWduZWQgdGhpcyBxdWVzdGlvbnNcIik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3Ipe1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxufTtcbiJdfQ==