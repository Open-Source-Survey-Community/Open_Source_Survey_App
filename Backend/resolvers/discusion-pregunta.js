/* eslint-disable no-unused-vars */
export default {

	Query: {

	},
	Mutation: {
		nuevaDiscusionPregunta : (parent, args, {models}) => {
			return models.discusionPregunta.findOne({titulo: args.discusionPregunta.titulo})
				.then(discusionPregunta => {
					if(discusionPregunta) {
						throw new Error("you already create this question, you can create the same correction two times");
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
						throw new Error("you already accept the change of the question creator, so you decided " +
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
		}
	}

};