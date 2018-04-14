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
		}

	}

};