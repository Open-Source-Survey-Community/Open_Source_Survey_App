export default {
	Query:{
		verRolUsuario: (parent, args, {models})=>{
			models.User.findById(args.id)
				.then(usuario=>{
					const rol ={
						_id: usuario._id,
						rol: usuario.roles[0].rol,
						Acciones: usuario.roles[0].Acciones
					};
					return rol;
				})
				.catch(error => {
					return error;
				});

		}

	},
	Mutation:{
		editarRolUsuario: (parent, args, {models})=>{
			models.User.findByIdAndUpdate(args.id, {$set:{"roles.0.rol": args.rol, "roles.0.Acciones": args.acciones}},
				{upsert: true, new: true})
				.then(usuario => {
					return usuario.roles;
				})
				.catch(error => {
					if (error){
						return error;
					}
				});
		}
	}
};