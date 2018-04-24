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
				registroActual: true }).populate("usuario_ID").populate("areaconocimiento").populate("discusiones").then(function (pregunta) {
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
				return models.Pregunta.find({ usuario_ID: args.idUsuario, registroActual: true }).populate("usuario_ID").populate("areaconocimiento").populate("discusiones").sort({ "fecha_creacion": -1 }).then(function (listadoMisPreguntas) {
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
				return models.Pregunta.find({ usuario_ID: args.idUsuario, registroActual: true, estado: estado }).populate("usuario_ID").populate("areaconocimiento").populate("discusiones").sort({ "fecha_creacion": -1 }).then(function (listadoPreguntas) {
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
		}
	},
	Mutation: {
		crearPregunta: function crearPregunta(parent, args, _ref10) {
			var models = _ref10.models;

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
		editarPregunta: function editarPregunta(parent, args, _ref11) {
			var models = _ref11.models;

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
		eliminarPregunta: function eliminarPregunta(parent, args, _ref12) {
			var models = _ref12.models;

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
		rollbackPreguntaAnterior: function rollbackPreguntaAnterior(parent, args, _ref13) {
			var models = _ref13.models;

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
		rollbackDescripcionPregunta: function rollbackDescripcionPregunta(parent, args, _ref14) {
			var models = _ref14.models;

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
		rollbackRespuestasPregunta: function rollbackRespuestasPregunta(parent, args, _ref15) {
			var models = _ref15.models;

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
		rollbackImagenPregunta: function rollbackImagenPregunta(parent, args, _ref16) {
			var models = _ref16.models;

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
		asignarPreguntasAMiembroComite: function asignarPreguntasAMiembroComite(parent, args, _ref17) {
			var models = _ref17.models;

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
		asignarEstadoPregunta: function asignarEstadoPregunta(parent, args, _ref18) {
			var models = _ref18.models;

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
		transferirListaPreguntasDesignadasAUsuario: function transferirListaPreguntasDesignadasAUsuario(parent, args, _ref19) {
			var models = _ref19.models;

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
//# sourceMappingURL=pregunta.js.map