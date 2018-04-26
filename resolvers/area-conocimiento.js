export default {
	Query: {
		listadoAreaConocimiento: (parent, args, {models}) => {
			return models.areasConocimiento.find({idioma: args.idioma})
				.populate("usuariopropietario")
				.then(listaArasConocimientos => {
					return listaArasConocimientos;
				})
				.catch(error => {
					if (error) {
						throw new Error(error);
					}

				});
		},
		filtrarAreasConocimiento: (parent, args, {models}) => {
			return models.areasConocimiento.find({titulo: new RegExp(args.caracter,"i"), idioma: args.idioma})
				.populate("usuariopropietario")
				.then(listaAreasConocimiento => {
					return listaAreasConocimiento;
				}).catch(error => {
					if (error) {
						throw new Error(error);
					}

				});

		}

	},
	Mutation: {
		crearNuevaAreaConocimiento: (parent, args, {models}) => {
			const area = new models.areasConocimiento(args.etiqueta);
			return area.save()
				.then(documento => {
					return documento;
				})
				.catch(error => {
					if (error) {
						throw new Error(error);
					}
				});
		},
		editarAreaConocimientoPregunta: (parent, args, {models}) => {
			return models.areasConocimiento.findOne({_id: args.id}).populate("usuariopropietario")
				.then(documento => {
					if (documento.usuariopropietario.correo !== args.correo) {
						if (args.idioma === "es") {
							throw new Error("no puede editar esta etiqueta porque usted no es el propietario");
						}
						else if(args.idioma === "en") {
							throw new Error("you can not edit this tag because you are not the own! ");

						}
					} else {
						return models.Pregunta.count({areaconocimiento: args.id })
							.then(numeroEtiquetasConocimiento => {
								if (numeroEtiquetasConocimiento > 0) {
									if (args.idioma === "en") {
										throw new Error(numeroEtiquetasConocimiento + "questions have these tag!");
									}
									else if (args.idioma === "es"){
										throw new Error(numeroEtiquetasConocimiento + "preguntas estan usando determinada etiqueta");

									}
								} else {
									return models.areasConocimiento.findByIdAndUpdate(args.id,
										{$set: {titulo: args.titulo, descripcion: args.descripcion, idioma: args.idioma}},
										{new: true})
										.populate("usuariopropietario")
										.then(documento => {
											return documento;
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
				});

		},
		eliminarAreaConocimientoPregunta: (parent, args, {models}) => {
			return models.areasConocimiento.findOne({_id: args.id}).populate("usuariopropietario")
				.then(documento => {
					if (documento.usuariopropietario.correo !== args.correo) {
						if (args.idioma === "es") {
							throw new Error("no puede eliminar esta etiqueta porque usted no es el propietario");
						}
						else if(args.idioma === "en") {
							throw new Error("you can not delete this tag because you are not the own! ");

						}
					} else {
						return models.Pregunta.count({areaconocimiento: args.id })
							.then(numeroEtiquetasConocimiento => {
								if (numeroEtiquetasConocimiento > 0) {
									if (args.idioma === "en") {
										throw new Error(numeroEtiquetasConocimiento + "questions having these tag!");
									}
									else if (args.idioma === "es"){
										throw new Error(numeroEtiquetasConocimiento + "preguntas estan usando determinada etiqueta");

									}
								} else {
									return models.areasConocimiento.findByIdAndRemove(args.id).populate("usuariopropietario")
										.then(documento => {
											return documento;
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
				});

		}
	}
};