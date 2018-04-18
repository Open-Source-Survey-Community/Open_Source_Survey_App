/* eslint-disable no-unused-vars */
export default {

	Query: {
		getListaIssuesByQuestions: (parent, args, {models}) => {
			let edgeDiscusionPreguntaArray = [];
			let cursor = parseInt(Buffer.from(args.after, "base64").toString("ascii"));
			if (!cursor){
				cursor = 0;
			}
			if(!args.limit){
				args.limit = 5;
			}
			let edgeDiscusionPreguntaInfoPromise = new Promise((resolve, reject)=> {
				let edges = models.discusionPregunta.find({identificador:{$gt:cursor},pregunta_ID: args.idPregunta}, (err, result) => {
					if(err){
						reject(err);
					}
				}).populate("creador_correccion")
					.populate("estado_correccion.usuario_creador_estado")
					.limit(args.limit).cursor();

				edges.on("data", res => {
					edgeDiscusionPreguntaArray.push({
						cursor : Buffer.from((res.identificador).toString()).toString("base64"),
						node: res
					});
				});
				edges.on("end",()=> {
					let endCursor = edgeDiscusionPreguntaArray.length > 0 ? edgeDiscusionPreguntaArray[edgeDiscusionPreguntaArray.length - 1].cursor:NaN;
					let hasNextPage = new Promise((resolve, reject)=> {
						if (endCursor) {
							let cursorFinal = parseInt(Buffer.from(endCursor,"base64").toString("ascii"));
							models.discusionPregunta.where("identificador").gt(cursorFinal).count({},(err, count)=> {
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
						edges: edgeDiscusionPreguntaArray,
						pageInfo: {
							endCursor: endCursor,
							hasnextPage: hasNextPage
						}
					});
				});
			});
			let totalPagesPromise = new Promise((resolve, reject) => {
				models.discusionPregunta.count((err, count) => {
					if (err) {
						reject(err);
					}else {
						resolve(count);
					}
				});
			});
			let listPaginateDiscusionPregunta = Promise.all([edgeDiscusionPreguntaInfoPromise, totalPagesPromise]).then((values) => {
				return {
					edges: values[0].edges,
					totalCount: values[1],
					pageInfo:{
						endCursor: values[0].pageInfo.endCursor,
						hasnextPage:values[0].pageInfo.hasnextPage
					}
				};
			});
			return listPaginateDiscusionPregunta;
		},
		getListaUsuariosAsignadoEstadoCorreccionPregunta: (parent, args, {models}) => {
			return models.discusionPregunta.findById(args.idDiscusionPregunta)
				.populate("estado_correccion.usuario_creador_estado")
				.then(listaUsuarios => {
					return listaUsuarios;
				}).catch(error => {
					if(error){
						throw new Error(error);
					}
				});
		},
		loadDiscusionPregunta: (parent, args, {models}) => {
			return models.discusionPregunta.findById(args.idDiscusionPregunta)
				.populate("creador_correccion")
				.populate("estado_correccion.usuario_creador_estado")
				.populate({
					path:"pregunta_ID",
					populate:{
						path: "areaconocimiento",
						model: "areas-conocimiento"
					}
				})
				.populate({
					path:"pregunta_ID",
					populate:{
						path: "usuario_ID",
						model: "usuario"
					}
				})
				.then(documento => {
					return documento;
				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		},
		loadListaDiscusionesGeneradasByPregunta: (parent, args, {models}) => {
			return models.Pregunta.findOne({_id:args.idPregunta}, {discusiones:{$slice: args.limit}})
				.populate({
					path: "discusiones",
					populate:{
						path:"creador_correccion",
						model:"usuario"
					}
				})
				.populate({
					path: "discusiones",
					populate:{
						path:"estado_correccion.usuario_creador_estado",
						model:"usuario"
					}

				}).then(listadoDiscusionesPregunta => {
					return listadoDiscusionesPregunta.discusiones;

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}

				});
		}
	},
	Mutation: {
		nuevaDiscusionPregunta : (parent, args, {models}) => {
			return models.discusionPregunta.findOne({titulo: args.discusionPregunta.titulo})
				.then(discusionPregunta => {
					if(discusionPregunta) {
						throw new Error("you already create this question, you can't create the same correction two times");
					}else{
						return models.discusionPregunta.count()
							.then(numeroDiscusionesPregunta => {
								if (numeroDiscusionesPregunta){
									args.discusionPregunta.identificador = numeroDiscusionesPregunta + 1;
								}
								const discusion_pregunta = new models.discusionPregunta(args.discusionPregunta);
								return discusion_pregunta.save()
									.then(documento => {
										return models.Pregunta.findByIdAndUpdate(args.discusionPregunta.pregunta_ID,
											{$push:{discusiones:documento}},
											{new: true})
											.then(()=> {
												return documento;

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
							}).catch(error => {
								if (error) {
									throw new Error(error);
								}
							});

					}

				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});

		},
		editarDiscusionPregunta: (parent, args, {models}) => {
			return models.discusionPregunta.findOne({"_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario"},{"estado_correccion.$":1})
				.then(discusionPregunta => {
					if (discusionPregunta.estado_correccion[0].asignacion === "pendiente"){
						throw new Error("the question creator's is editing the content, thanks to your issues," +
							"you can not make change to a issues, in state pending");
					}else if (discusionPregunta.estado_correccion[0].asignacion === "cerrado") {
						throw new Error("the issues was reject by a committee member, so you must create a new one issues");
					}else if (discusionPregunta.estado_correccion[0].asignacion === "resuelto") {
						throw new Error("the creator this issues already accept the change of the question creator, so you decided " +
							"marked this issues like solved!, you should create other issues");
					}else {
						return models.discusionPregunta.update({_id: args.idDiscusionPregunta, creador_correccion: args.discusionPregunta.creador_correccion},
							args.discusionPregunta)
							.then(documentoAfectado => {
								if (documentoAfectado.n === 1){
									return true;

								}else{
									throw new Error("This user can't edit this question, because he is not the owner");
								}

							}).catch(error => {
								if (error){
									throw new  Error(error);
								}
							});
					}

				}).catch(error => {
					if (error){
						throw new Error(error);
					}
				});


		},
		eliminarDiscusionPregunta: (parent, args, {models}) => {
			return models.discusionPregunta.findOne({"_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario"},{"estado_correccion.$":1})
				.then(discusionPregunta => {
					if (discusionPregunta.estado_correccion[0].asignacion === "pendiente"){
						throw new Error("the question creator's is editing the content, thanks to your issues," +
							"you can not delete this issues, in state pending");
					}else {
						return models.discusionPregunta.update({_id: args.idDiscusionPregunta,creador_correccion: args.creador_correccion},
							{habilitada: false})
							.then(correccionActualizada => {
								if (correccionActualizada.n === 1) {
									return true;
								} else {
									throw new Error("This user can't edit this question, because he is not the owner");
								}
							}).catch(error => {
								if (error){
									throw new Error(error);
								}
							});
					}
				}).catch(error => {
					if (error){
						throw new Error(error);
					}
				});

		},
		editarMyDiscusionPreguntaByTitulo: (parent, args, {models}) => {
			return models.discusionPregunta.findOne({"_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario"},
				{"estado_correccion.$":1})
				.then(discusionPregunta => {
					if (discusionPregunta.estado_correccion[0].asignacion === "pendiente"){
						throw new Error("the question creator's is editing the content, thanks to your issues," +
							"you can not make change to a issues, in state pending");
					}else if (discusionPregunta.estado_correccion[0].asignacion === "cerrado") {
						throw new Error("the issues was reject by a committee member, so you must create a new one issues");
					}else if (discusionPregunta.estado_correccion[0].asignacion === "resuelto") {
						throw new Error("you already accept the change of the question creator, so you decided " +
							"marked this issues like solved!, you should create other issues");
					}else{
						return models.discusionPregunta.findById(args.idDiscusionPregunta, "creador_correccion")
							.populate("creador_correccion")
							.then(correccionPregunta => {
								if (correccionPregunta.creador_correccion.correo === args.correoUsuario) {
									return models.discusionPregunta.findByIdAndUpdate(args.idDiscusionPregunta,
										{$set: {titulo: args.titulo}},{new: true})
										.then(correccionPreguntaActualizada => {
											return correccionPreguntaActualizada;
										}).catch(error => {
											if (error) {
												throw new Error(error);
											}

										});
								}else {
									throw new Error("this question issue you can not edit, because you are not the owner");
								}
							}).catch(error => {
								if (error) {
									throw new Error(error);
								}
							});
					}
				})
				.catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		},
		editarMyDiscusionPreguntaByDescripcion: (parent, args, {models}) => {
			return models.discusionPregunta.findOne({"_id": args.idDiscusionPregunta, "estado_correccion.rol": "usuario"},
				{"estado_correccion.$":1})
				.then(discusionPregunta => {
					if (discusionPregunta.estado_correccion[0].asignacion === "pendiente"){
						throw new Error("the question creator's is editing the content, thanks to your issues," +
							"you can not make change to a issues, in state pending");
					}else if (discusionPregunta.estado_correccion[0].asignacion === "cerrado") {
						throw new Error("the issues was reject by a committee member, so you must create a new one issues");
					}else if (discusionPregunta.estado_correccion[0].asignacion === "resuelto") {
						throw new Error("you already accept the change of the question creator, so you decided " +
							"marked this issues like solved!, you should create other issues");
					} else {
						return models.discusionPregunta.findById(args.idDiscusionPregunta, "creador_correccion")
							.populate("creador_correccion")
							.then(correccionPregunta => {
								if (correccionPregunta.creador_correccion.correo === args.correoUsuario) {
									return models.discusionPregunta.findByIdAndUpdate(args.idDiscusionPregunta,
										{$set: {descripcion: args.descripcion}},{new: true})
										.then(correccionPreguntaActualizada => {
											return correccionPreguntaActualizada;
										}).catch(error => {
											if (error) {
												throw new Error(error);
											}

										});
								}else {
									throw new Error("this question issue you can not edit, because you are not the owner");
								}

							}).catch(error => {
								if (error) {
									throw new Error(error);
								}
							});
					}
				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		},
		aprobarEstadoMyDiscusionPregunta: (parent, args, {models}) => {
			return models.discusionPregunta.findById(args.idDiscusionPregunta)
				.then(documentoDiscusionPregunta => {
					if (documentoDiscusionPregunta.habilitada){
						return models.discusionPregunta.findOne({"_id": args.idDiscusionPregunta,
							"estado_correccion.usuario_creador_estado": documentoDiscusionPregunta.creador_correccion},
						{"estado_correccion.$":1})
							.then(arrayFiltrado => {
								if(arrayFiltrado.estado_correccion[0]["asignacion"]!== "cerrado" && arrayFiltrado.estado_correccion[0]["asignacion"]!== "resuelto"){
									return models.discusionPregunta.findOneAndUpdate({"_id": args.idDiscusionPregunta,
										"estado_correccion.usuario_creador_estado": documentoDiscusionPregunta.creador_correccion},
									{$set: {"estado_correccion.$.asignacion":"resuelto",
										"estado_correccion.$.observacion":"el usuario ha cerrado esta discusion," +
												"debido que el creador de la pregunta, realizo los cambios respectivos",
										"fecha_cierre": new Date()}},
									{new: true}).then(discusionAprovada => {
										return discusionAprovada;
									}).catch(error => {
										throw new Error(error);
									});
								}else{
									throw new Error("you can't approved a issues questions, that already is closed or solved!");
								}
							}).catch(error => {
								if (error) {
									throw new Error(error);
								}
							});
					}else{
						throw new Error("you can't approved a question issues, that you had closed!");
					}
				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		}
	}

};