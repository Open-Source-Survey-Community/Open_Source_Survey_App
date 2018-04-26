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

		},
		colocarLikesComentario: (parent, args, {models})=>{
			return models.Comentario.findOne({"_id": args.idComentario, "votacion.usuario_creador": args.idUsuario},{"votacion.$":1})
				.then(comentario => {
					if(comentario){
						if(comentario.votacion[0].like === 1 && comentario.votacion[0].dislike === 0){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.like":0}
							},{new: true})
								.then(() => {
									return {like:-1, dislike:0};
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});

						}else if(comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 1){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.like":1,"votacion.$.dislike":0}
							},{new: true})
								.populate("votacion.usuario_creador")
								.then(() => {
									return {like:1, dislike:-1};
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});
						}else if(comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 0){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.like":1}
							},{new: true})
								.populate("votacion.usuario_creador")
								.then(() => {
									return {like:1, dislike:0};
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});
						}

					}else{
						return models.Comentario.findByIdAndUpdate(args.idComentario,
							{$push:{"votacion":{"usuario_creador": args.idUsuario, "like":1, "dislike":0, "favoritos":0}}
							},{new: true})
							.populate("votacion.usuario_creador")
							.then(() => {
								return {like:1, dislike:0};
							}).catch(error => {
								if(error){
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