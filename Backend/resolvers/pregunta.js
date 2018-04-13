/* eslint-disable no-unused-vars */
export default {
	Query: {
		verMyPreguntaActual: (parent, args, {models}) => {
			return models.Pregunta.findOne({_id: args.idPregunta,
				registroActual: true })
				.populate("usuario_ID")
				.populate("areaconocimiento")
				.then(pregunta => {
					return pregunta;
				}).catch(error=> {
					if (error){
						throw new Error(error);
					}
				});

		},
		listadoPreguntasActuales : (parent, args, {models}) => {
			let edgePreguntaArray = [];
			let cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor){
				cursor = 0;
			}
			let edgePreguntaInfoPromise = new Promise((resolve, reject)=> {
				let edges = models.Pregunta.find({identificador:{$gt:cursor},registroActual: true,
					descripcion: new RegExp(args.word, "i")}, (err, result) => {
					if(err){
						reject(err);
					}
				}).populate("usuario_ID")
					.populate("areaconocimiento")
					.limit(args.limit).cursor();

				edges.on("data", res => {
					edgePreguntaArray.push({
						cursor : Buffer.from((res.identificador).toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end",()=> {
					let endCursor = edgePreguntaArray.length > 0 ? edgePreguntaArray[edgePreguntaArray.length - 1].cursor:NaN;
					let hasNextPage = new Promise((resolve, reject)=> {
						if (endCursor) {
							let cursorFinal = parseInt(Buffer.from(endCursor,"base64").toString("ascii"));
							models.Pregunta.where("identificador").gt(cursorFinal).count({registroActual:true},(err, count)=> {
								if (err) {
									reject(err);
								}
								count > 0 ? resolve(true): resolve(false);
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
			let totalPagesPromise = new Promise((resolve, reject) => {
				models.Pregunta.count((err, count) => {
					if (err) {
						reject(err);
					}else {
						resolve(count);
					}
				});
			});
			let listPaginatePregunta = Promise.all([edgePreguntaInfoPromise, totalPagesPromise]).then((values) => {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo:{
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage:values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginatePregunta;
		},
		verListadoMisPreguntasActuales: (parent, args, {models})=> {
			if (args.idUsuario) {
				return models.Pregunta.find({usuario_ID: args.idUsuario, registroActual: true})
					.populate("usuario_ID")
					.populate("areaconocimiento")
					.then(listadoMisPreguntas => {
						return listadoMisPreguntas;
					})
					.catch(error => {
						if (error) {
							throw new Error(error);
						}
					});
			} else {
				throw new Error("It neccessary to ID of a usuario, para retrieve the information");
			}

		},
		verListadoMisPreguntasActualesByEstado: (parent, args, {models})=> {
			let estado;
			if (args.idUsuario){
				if (!args.estado){
					estado = "revision";
				}
				else {
					estado = args.estado;
				}
				return models.Pregunta.find({usuario_ID: args.idUsuario, registroActual: true, estado: estado})
					.populate("usuario_ID")
					.populate("areaconocimiento")
					.then(listadoPreguntas => {
						return listadoPreguntas;
					}).catch(error => {
						if (error){
							throw new Error(error);
						}
					});
			} else {
				throw new Error("It neccessary to ID of a usuario, para retrieve the information");
			}

		},
		listadoPreguntasActualesByEstado: (parent, args, {models}) => {
			let edgePreguntaArray = [];
			let cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor){
				cursor = 0;
			}
			let edgePreguntaInfoPromise = new Promise((resolve, reject)=> {
				let edges = models.Pregunta.find({identificador:{$gt:cursor},registroActual: true,
					descripcion: new RegExp(args.word, "i"),estado: args.estado}, (err, result) => {
					if(err){
						reject(err);
					}
				}).populate("usuario_ID")
					.populate("areaconocimiento")
					.limit(args.limit).cursor();

				edges.on("data", res => {
					edgePreguntaArray.push({
						cursor : Buffer.from((res.identificador).toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end",()=> {
					let endCursor = edgePreguntaArray.length > 0 ? edgePreguntaArray[edgePreguntaArray.length - 1].cursor:NaN;
					let hasNextPage = new Promise((resolve, reject)=> {
						if (endCursor) {
							let cursorFinal = parseInt(Buffer.from(endCursor,"base64").toString("ascii"));
							models.Pregunta.where("identificador").gt(cursorFinal).count({registroActual:true},(err, count)=> {
								if (err) {
									reject(err);
								}
								count > 0 ? resolve(true): resolve(false);
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
			let totalPagesPromise = new Promise((resolve, reject) => {
				models.Pregunta.count((err, count) => {
					if (err) {
						reject(err);
					}else {
						resolve(count);
					}
				});
			});
			let listPaginatePregunta = Promise.all([edgePreguntaInfoPromise, totalPagesPromise]).then((values) => {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo:{
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage:values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginatePregunta;
		},
		historialImagenesUsadasByUserinAPregunta: (parent, args, {models}) => {
			return models.Pregunta.findOne({_id: args.idPregunta, usuario_ID: args.idUsuario},"historial_cambios estado")
				.then(pregunta => {
					if (pregunta.estado === "revision" || pregunta.estado === "estable"){
						return pregunta;

					} else {
						throw new Error("you can to access to list Images of a closed(reject) question");
					}

				}).catch(error => {
					if (error){
						throw new Error(error);
					}
				});
		}
	},
	Mutation: {
		crearPregunta: (parent, args, {models}) => {
			if (args.pregunta.descripcion && args.pregunta.usuario_ID && args.pregunta.areaconocimiento.length > 0) {
				return models.Pregunta.count()
					.then(existenPreguntasCreadas => {
						if (existenPreguntasCreadas) {
							args.pregunta.identificador = existenPreguntasCreadas + 1;
						}
						const objectNewPregunta = new models.Pregunta(args.pregunta);
						return objectNewPregunta.save()
							.then(documento => {
								return documento;
							})
							.catch(error => {
								if (error) {
									throw new Error(error);
								}
							});

					}).catch(error=> {
						if (error){
							throw new Error(error);
						}
					});

			} else {
				throw new Error("there is empties fields, is not possible save a new question");
			}

		},
		editarPregunta: (parent, args, {models}) => {
			return models.Pregunta.findById(args.idPregunta)
				.then(documento => {
					if (documento.usuario_ID == args.pregunta.usuario_ID ) {
						if (documento.estado === "revision" || documento.estado === "estable"){
							let preguntaAnterior = {
								descripcion: documento.descripcion,
								imagen: documento.imagen,
								estado: documento.estado,
								fecha_creacion: documento.fecha_creacion,
								tipoPregunta: documento.tipoPregunta,
								areaconocimiento: documento.areaconocimiento,
								respuestas: documento.respuestas
							};

							return models.Pregunta.findByIdAndUpdate(args.idPregunta,
								{$push:{historial_cambios: preguntaAnterior},
									$set:{descripcion: args.pregunta.descripcion,
										imagen: args.pregunta.imagen,
										fecha_creacion: args.pregunta.fecha_creacion,
										tipoPregunta: args.pregunta.tipoPregunta,
										areaconocimiento: args.pregunta.areaconocimiento,
										respuestas: args.pregunta.respuestas
									}}
								,{new : true})
								.then(documentoActualizado => {
									return documentoActualizado;
								}).catch(error=> {
									if (error) {
										throw new Error(error);
									}
								});
						} else {
							throw new Error("this questions is closed!!, because the commite member decided " +
								"reject this question, so you should, create a new one");
						}
					}else {
						throw new Error("you are not own this question, so you can not update");
					}
				})
				.catch(error => {
					if (error) {
						throw new Error(error);
					}
				});

		},
		eliminarPregunta: (parent, args, {models}) => {
			return models.User.findOne({correo: args.correoUsuario},"_id")
				.then(idUsuario => {
					return models.Pregunta.findOne({_id: args.idPregunta, usuario_ID: idUsuario})
						.then(documentoPregunta => {
							if (documentoPregunta.estado === "revision" || documentoPregunta.estado === "rechazada") {
								return models.Pregunta.findByIdAndUpdate(args.idPregunta, {$set:{registroActual: false}},{new: true})
									.then(documentoPregunta => {
										return documentoPregunta;
									}).catch(error => {
										if (error) {
											throw new Error(error);
										}
									});
							} else {
								throw new Error("this questions is accepted, is not possible delete this question");
							}

						}).catch(error => {
							if (error) {
								throw new Error(error);
							}
						});

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}

				});

		},
		rollbackPreguntaAnterior: (parent, args, {models}) => {
			return models.Pregunta.findOne({"_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior },{"historial_cambios.$":1,"estado":1})
				.populate("usuario_ID")
				.then(preguntaAnterior => {
					if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion){
						if ((preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable")
								|| (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision")
							|| (preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") ){
							return models.Pregunta.findByIdAndUpdate(args.idPregunta,{
								$set: {descripcion: preguntaAnterior.historial_cambios[0].descripcion,
									imagen: preguntaAnterior.historial_cambios[0].imagen,
									estado: preguntaAnterior.historial_cambios[0].estado,
									fecha_creacion: preguntaAnterior.historial_cambios[0].fecha_creacion,
									tipoPregunta: preguntaAnterior.historial_cambios[0].tipoPregunta,
									areaconocimiento: preguntaAnterior.historial_cambios[0].areaconocimiento,
									respuestas: preguntaAnterior.historial_cambios[0].respuestas}
							},{new: true}).then(pregunta => {
								return pregunta;

							}).catch(error => {
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

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		},
		rollbackDescripcionPregunta: (parent, args, {models}) => {
			return models.Pregunta.findOne({"_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior },{"historial_cambios.$":1,"estado":1})
				.populate("usuario_ID")
				.then(preguntaAnterior => {
					if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion){
						if ((preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable")
							|| (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision")
							|| (preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") ){
							return models.Pregunta.findByIdAndUpdate(args.idPregunta,{
								$set: {descripcion: preguntaAnterior.historial_cambios[0].descripcion}
							},{new: true}).then(pregunta => {
								return pregunta;

							}).catch(error => {
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

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});

		},
		rollbackRespuestasPregunta: (parent, args, {models}) => {
			return models.Pregunta.findOne({"_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior },{"historial_cambios.$":1,"estado":1})
				.populate("usuario_ID")
				.then(preguntaAnterior => {
					if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion){
						if ((preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable")
							|| (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision")
							|| (preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") ){
							return models.Pregunta.findByIdAndUpdate(args.idPregunta,{
								$set: {respuestas: preguntaAnterior.historial_cambios[0].respuestas}
							},{new: true}).then(pregunta => {
								return pregunta;

							}).catch(error => {
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

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});

		},
		rollbackImagenPregunta: (parent, args, {models}) => {
			return models.Pregunta.findOne({"_id": args.idPregunta,
				"historial_cambios._id": args.idPreguntaAnterior },{"historial_cambios.$":1,"estado":1})
				.populate("usuario_ID")
				.then(preguntaAnterior => {
					if (preguntaAnterior.usuario_ID.correo === args.ownerQuestion){
						if ((preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "estable")
							|| (preguntaAnterior.estado === "revision" && preguntaAnterior.historial_cambios[0].estado === "revision")
							|| (preguntaAnterior.estado === "estable" && preguntaAnterior.historial_cambios[0].estado === "revision") ){
							return models.Pregunta.findByIdAndUpdate(args.idPregunta,{
								$set: {imagen: preguntaAnterior.historial_cambios[0].imagen}
							},{new: true}).then(pregunta => {
								return pregunta;

							}).catch(error => {
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

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});

		}

	}
};
