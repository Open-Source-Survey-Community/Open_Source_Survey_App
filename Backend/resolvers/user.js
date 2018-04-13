export default {

	Query:{
		mostrarPerfilUsuario: (parent, args, {models})=>{
			if (args.id){
				return	models.User.findById(args.id)
					.then(usuario=>{
						return usuario;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}

					});
			}else {
				return null;
			}
		},
		listaUsuariosByName: (parent, args, {models})=> {
			return models.User.find({
				"nombre": new RegExp(args.nombre, "i")
			})
				.then(resultados =>{
					return resultados;
				}).catch(error =>{
					if (error){
						return null;
					}
				});

		},
		listarTodosUsuarios: (parent, args, {models})=> {
			return models.User.find()
				.then(usuarios=>{
					return usuarios;
				}).catch(error=>{
					if (error){
						return null;
					}
				});
		}
	},
	Mutation:{
		crearUsuario: (parent, args, {models})=> {
			return 	models.User.findOne({
				correo: args.correo
			},"_id nombre apellido correo urlImage wiki institucion grado_academico area_academica roles").then(response=>{
				if (!response){
					let userInstance = new models.User({correo: args.correo,
						nombre: args.nombre,
						urlImage: args.urlImage,
						roles: [{rol:args.rol, Acciones: [args.acciones]}]});
					userInstance.save().then(documento => {
						return documento;
					}).catch((error) => {
						if(error){
							throw new Error(error);
						}
					});
				} else {
					return response;
				}
			}).catch((error) => {
				if (error){
					throw new Error(error);
				}
			});

		},
		editarInstitucionUsuario:(parent, args, {models})=>{
			if (args.id ) {
				return models.User.findByIdAndUpdate(args.id,{$set:{institucion:args.institucion}},{upsert: true,new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});
			}else {
				return null;
			}
		},
		editarGradoAcademicoUsuario: (parent, args, {models})=>{
			if (args.id ) {
				return models.User.findByIdAndUpdate(args.id,{$set:{grado_academico:args.grado_academico}},{upsert: true,new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});
			}else {
				return null;
			}
		},
		editarAreaAcademica: (parent, args, {models})=>{
			if (args.id) {
				return models.User.findByIdAndUpdate(args.id,{$set:{area_academica:args.area_academica}},{new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});
			}else {
				return null;

			}
		},
		addWiki: (parent, args, {models})=>{
			if (args.id) {
				return models.User.findByIdAndUpdate(args.id,{$set:{wiki:args.wiki}},{new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});

			}else {
				return null;
			}
		},
		editarNombreUsuario: (parent, args, {models})=>{
			if (args.id && args.nombre) {
				return models.User.findByIdAndUpdate(args.id,{$set:{nombre:args.nombre}},{new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});

			}else {
				return null;
			}
		},
		editarApellido: (parent, args, {models})=>{
			if (args.id && args.apellido){
				return models.User.findByIdAndUpdate(args.id,{$set:{apellido:args.apellido}},{new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});
			}else {
				return null;
			}
		},
		addImage: (parent, args, {models})=>{
			if (args.id){
				return models.User.findByIdAndUpdate(args.id,{$set:{urlImage:args.imagen}},{new: true})
					.then(documento=>{
						return documento;
					}).catch(error=>{
						if (error){
							throw new Error(error);
						}
					});

			}else {
				return null;
			}
		}
	}

};