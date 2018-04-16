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

		},
		eliminarDiscusionPregunta: (parent, args, {models}) => {
			return models.discusionPregunta.update({_id: args.idDiscusionPregunta,creador_correccion: args.creador_correccion },
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

	}

};