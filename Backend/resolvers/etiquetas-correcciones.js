export default {
	Query: {


	},
	Mutation : {
		crearNuevaEtiquetaCorrecciones: (parent, args, {models}) => {
			return models.etiquetaCorrecciones.findOne({etiqueta: {$regex: new RegExp(args.etiqueta.etiqueta, "i")}})
				.then(etiqueta => {
					if (etiqueta) {
						throw new Error("this tag already exist in the collection");
					}else{
						const etiquetaCorrecciones = new models.etiquetaCorrecciones(args.etiqueta);
						return etiquetaCorrecciones.save()
							.then(documento => {
								return documento;
							})
							.catch(error => {
								if (error) {
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
		editarEtiquetaCorrecciontoPregunta: (parent, args, {models}) => {
			return models.etiquetaCorrecciones.findById(args.idEtiquetaCorreccion,"usuariopropietario")
				.populate("usuariopropietario")
				.then(documentoEtiquetaCorreccion => {
					if(documentoEtiquetaCorreccion.usuariopropietario.correo === args.correoUsuario){
						return models.discusionPregunta.count({etiquetas_correcciones: args.idEtiquetaCorreccion,
							habilitada: true})
							.then(numeroDiscusionesPreguntas => {
								if (numeroDiscusionesPreguntas > 0) {
									throw new Error("you can't edit this tag, because other users are using the same tag");
								}else {
									return models.etiquetaCorrecciones.findByIdAndUpdate(args.idEtiquetaCorreccion,
										{$set:{color: args.color, descripcion: args.descripcion, etiqueta: args.etiqueta}},
										{new: true})
										.then(etiquetaCorreccionEditada => {
											return etiquetaCorreccionEditada;
										}).catch(error => {
											if (error) {
												throw new Error(error);
											}
										});

								}
							}).catch(error => {
								if (error){
									throw new Error(error);
								}
							});

					}else{
						throw new Error("you can't edit this tag because you are not the owner");
					}
				}).catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		}

	}

};