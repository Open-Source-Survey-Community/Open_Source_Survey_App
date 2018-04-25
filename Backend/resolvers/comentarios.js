export default {

	Mutation:{
		crearComentarioAnexadaAPregunta: (parent, args, {models})=>{
			return models.Comentario.count()
				.then(existenComentariosCreados => {
					if (existenComentariosCreados){
						args.comentario.identificador = existenComentariosCreados + 1;
					}
					const objetoComentario = new models.Comentario(args.comentario);
					return objetoComentario.save()
						.then(comentarioGuardado => {
							return models.Pregunta.findByIdAndUpdate(args.idPregunta,{
								$push:{comentarios:comentarioGuardado}
							},{new:true})
								.then(() => {
									return models.Comentario.populate(comentarioGuardado,"creador_comentario");
								}).catch(error => {
									throw new Error(error);
								});
						}).catch(error => {
							if (error){
								throw new Error(error);
							}
						});
				}).catch(error => {
					throw new Error(error);
				});
		},
		crearComentarioAnexadaADiscusionPregunta: (parent, args, {models})=>{
			return models.Comentario.count()
				.then(existenComentariosCreados => {
					if (existenComentariosCreados){
						args.comentario.identificador = existenComentariosCreados + 1;
					}
					const objetoComentario = new models.Comentario(args.comentario);
					return objetoComentario.save()
						.then(comentarioGuardado => {
							return models.discusionPregunta.findByIdAndUpdate(args.idDiscusionPregunta,{
								$push:{comentarios:comentarioGuardado}
							},{new:true})
								.then(() => {
									return models.Comentario.populate(comentarioGuardado,"creador_comentario");
								}).catch(error => {
									throw new Error(error);
								});
						}).catch(error => {
							if (error){
								throw new Error(error);
							}
						});
				}).catch(error => {
					throw new Error(error);
				});
		},
		crearSubComentarioAnexadaAComentario: (parent, args, {models})=>{
			return models.Comentario.count()
				.then(existenComentariosCreados => {
					if (existenComentariosCreados){
						args.comentario.identificador = existenComentariosCreados + 1;
					}
					const objetoComentario = new models.Comentario(args.comentario);
					return objetoComentario.save()
						.then(comentarioGuardado => {
							return models.Comentario.findByIdAndUpdate(args.idComentario,{
								$push:{listaSubComentarios:comentarioGuardado}
							},{new:true})
								.then(() => {
									return models.Comentario.populate(comentarioGuardado,"creador_comentario");
								}).catch(error => {
									throw new Error(error);
								});
						}).catch(error => {
							if (error){
								throw new Error(error);
							}
						});
				}).catch(error => {
					throw new Error(error);
				});
		},
		editarComentario: (parent, args, {models}) => {
			return models.Comentario.findById(args.idComentario)
				.then(registroComentario => {
					if (registroComentario.creador_comentario == args.idUsuario){
						return models.Comentario.findByIdAndUpdate(args.idComentario,{$set:{contenido: args.contenido}},{new: true})
							.populate("creador_comentario")
							.then(comentarioActualizado=>{
								return comentarioActualizado;
							}).catch(error => {
								throw new Error(error);
							});
					}else{
						throw new Error("this users is not the owner this question");
					}
				}).catch(error => {
					if (error){
						throw new Error(error);
					}
				});

		}
	}
};