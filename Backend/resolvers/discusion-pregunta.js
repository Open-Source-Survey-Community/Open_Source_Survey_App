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

		}

	}

};