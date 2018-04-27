export default {

	Query:{
		verComentario: (parent, args, {models})=>{
			return models.Comentario.findById(args.idComentario)
				.populate("creador_comentario")
				.populate("listaSubComentarios")
				.populate("votacion.usuario_creador")
				.then(comentario => {
					return comentario;
				}).catch(error =>{
					if (error){
						throw new Error(error);
					}
				});
		},
        verListaSubComentarios: (parent, args, {models})=>{
			return models.Comentario.findById(args.idComentario,"listaSubComentarios")
                .populate({
					path:"listaSubComentarios",
					populate:{
						path: "creador_comentario",
						model:"usuario"
					}
                })
				.populate({
					path:"listaSubComentarios",
					populate:{
						path:"votacion.usuario_creador",
						model:"usuario"
					}
				})
				.then(listaSubdocumentos =>{
					return listaSubdocumentos;
				}).catch(error =>{
					throw new Error(error);
				});
		},
		verComentariosAsociadosPregunta: (parent, args, {models})=>{
			let hasnextPage = new Promise((resolve, reject) =>{
				let valor= args.index + 1;
				let tamanoPaginas = args.limit * valor;
				return models.Pregunta.findById(args.idPregunta,"comentarios")
					.then(listaComentarios =>{
						if (tamanoPaginas >= listaComentarios.comentarios.length){
							resolve(false);
						}else{
							resolve(true);
						}
					}).catch(error =>{
						reject(error);
					});
			});
			let edges = new Promise((resolve, reject) =>{
               return models.Pregunta.findById(args.idPregunta,"comentarios")
					.skip(args.index*args.limit)
					.limit(args.limit)
                    .populate({
                        path:"comentarios",
                        populate:{
                            path:"creador_comentario",
                            model: "usuario"
                        }
                    })
                    .populate({
                        path: "comentarios",
                        populate:{
                            path:"votacion.usuario_creador",
                            model:"usuario"
                        }
                    })
                    .then(listaComentarios =>{
						resolve(listaComentarios.comentarios);

                    }).catch(error =>{
                    reject(error);
                });
			});
			return Promise.all([hasnextPage, edges]).then(valores =>{
				return {
					edges: valores[1],
					hasnextElement: valores[0]
				}
			}).catch(error =>{
				throw new Error(error);
			});
		},
		verComentariosAsociadosDiscusionPregunta: (parent, args, {models})=>{
            let hasnextPage = new Promise((resolve, reject) =>{
                let valor= args.index + 1;
                let tamanoPaginas = args.limit * valor;
                return models.discusionPregunta.findById(args.idDiscusionPregunta,"comentarios")
                    .then(listaComentarios =>{
                        if (tamanoPaginas >= listaComentarios.comentarios.length){
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    }).catch(error =>{
                        reject(error);
                    });
            });
            let edges = new Promise((resolve, reject) =>{
                return models.discusionPregunta.findById(args.idDiscusionPregunta,"comentarios")
                    .skip(args.index*args.limit)
                    .limit(args.limit)
                    .populate({
                        path:"comentarios",
                        populate:{
                            path:"creador_comentario",
                            model: "usuario"
                        }
                    })
                    .populate({
                        path: "comentarios",
                        populate:{
                            path:"votacion.usuario_creador",
                            model:"usuario"
                        }
                    })
                    .then(listaComentarios =>{
                        resolve(listaComentarios.comentarios);

                    }).catch(error =>{
                        reject(error);
                    });
            });
            return Promise.all([hasnextPage, edges]).then(valores =>{
                return {
                    edges: valores[1],
                    hasnextElement: valores[0]
                }
            }).catch(error =>{
                throw new Error(error);
            });
		}
	},
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
						return models.Comentario.findByIdAndUpdate(args.idComentario,
							{$set:{contenido: args.contenido,fecha_actualizacion: new Date}},
							{new: true})
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
		},
		colocarDisLikesComentario: (parent, args, {models})=>{
			return models.Comentario.findOne({"_id": args.idComentario, "votacion.usuario_creador": args.idUsuario},{"votacion.$":1})
				.then(comentario => {
					if(comentario){
						if(comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 1){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.dislike":0}
							},{new: true})
								.then(() => {
									return {like:0, dislike:-1};
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});

						}else if(comentario.votacion[0].like === 1 && comentario.votacion[0].dislike === 0){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.like":0,"votacion.$.dislike":1}
							},{new: true})
								.then(() => {
									return {like:-1, dislike:1};
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});
						}else if(comentario.votacion[0].like === 0 && comentario.votacion[0].dislike === 0){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.dislike":1}
							},{new: true})
								.then(() => {
									return {like:0, dislike:1};
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});
						}

					}else{
						return models.Comentario.findByIdAndUpdate(args.idComentario,
							{$push:{"votacion":{"usuario_creador": args.idUsuario, "like":0, "dislike":1, "favoritos":0}}
							},{new: true})
							.then(() => {
								return {like:0, dislike:1};
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
		},
		colocarFavoritosComentario: (parent, args, {models})=>{
			return models.Comentario.findOne({"_id": args.idComentario, "votacion.usuario_creador": args.idUsuario},{"votacion.$":1})
				.then(comentario => {
					if(comentario){
						if(comentario.votacion[0].favoritos === 1){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.favoritos":0}
							},{new: true})
								.then(() => {
									return 0;
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});

						}else if(comentario.votacion[0].favoritos === 0){
							return models.Comentario.findOneAndUpdate({"_id":args.idComentario,"votacion.usuario_creador": args.idUsuario},{
								$set:{"votacion.$.usuario_creador": args.idUsuario, "votacion.$.favoritos":1}
							},{new: true})
								.then(() => {
									return 1;
								}).catch(error => {
									if(error){
										throw new Error(error);
									}
								});
						}

					}else{
						return models.Comentario.findByIdAndUpdate(args.idComentario,
							{$push:{"votacion":{"usuario_creador": args.idUsuario, "like":0, "dislike":0, "favoritos":1}}
							},{new: true})
							.populate("votacion.usuario_creador")
							.then(() => {
								return 1;
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