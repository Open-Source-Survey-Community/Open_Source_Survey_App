import asyncloop from "node-async-loop";

export default {
	Query:{
		getNumeroNotificacionUsuario: (parent, args, {models})=>{
			models.User.findOne({_id:args.id}, "notificaciones")
				.populate({
					path:"notificaciones",
					match:{
						leido: false, tipo: args.tipo
					}
				})
				.then(listaNotificaciones=>{
					return listaNotificaciones.length;
				})
				.catch(error => {
					if (error){
						return 0;
					}

				});
		},
		loadListaNotificacionesUsuario: (parent, args, {models})=>{
			models.User.findOne({_id: args.id}, "notificaciones")
				.populate({path:"notificaciones",
					match:{tipo: args.tipo},
					populate: {
						path: "usuario_emisor",
						model:"usuario"
					}})
				.then(listaNotificaciones=>{
					return listaNotificaciones;
				})
				.catch(error=>{
					if (error){
						return null;
					}

				});
		},
		loadListaNotificacionesMasRecientesNoLeidas: (parent, args, {models})=>{
			models.User.find({_id: args.id},"notificaciones")
				.populate({path:"notificaciones",
					match:{leido: false, tipo: args.tipo},
					options:{
						sort:{
							fecha_creacion: "asc"
						},
						limit:10},
					populate: {
						path: "usuario_emisor",
						model:"usuario"
					}})
				.then(ArrayNotificaciones=>{
					return ArrayNotificaciones;

				})
				.catch(Error => {
					if (Error){
						return null;
					}

				});


		}
	},
	Mutation:{
		crearNotificacionUsuario:(parent, args, {models})=>{
			models.User.findById(args.idEmisor)
				.then(usuario=>{
					let notificacionSchema = {
						usuario_emisor : usuario._id,
						tipo: usuario.tipo,
						descripcion: usuario.descripcion
					};
					let notificacion = new models.Notificacion(notificacionSchema);
					notificacion.save()
						.then(document => {
							models.User.findByIdAndUpdate(args.idReceptor,{
								$push:{
									"notificaciones":document
								}
							},{
								upsert: true
							}).then(() => {
								return document;
							}).catch(errorActualizacion => {
								return errorActualizacion;
							});
						})
						.catch(() => {
							return null;
						});
				})
				.catch(() => {
					return null;
				});

		},
		setAllNotificacionesLikeLeida: (parent, args, {models})=>{
			models.User.findById(args.id,"notificaciones")
				.populate({
					path: "notificaciones",
					match: {
						tipo: args.tipo,
						leido: false
					}
				})
				.then(arrayNotificaciones=>{
					asyncloop(arrayNotificaciones, (item, next) =>{
						models.Notificacion.findByIdAndUpdate(item._id, {
							$set:{leido: true}
						});
						next();
					},(error)=>{
						if (error){
							return false;
						}
					});
				})
				.catch(Error => {
					if (Error){
						return false;
					}
				});
		},
		setNotificacionLeida: (parent, args, {models})=>{
			models.Notificacion.update({_id: args.idNotificacion, tipo: args.tipo},{$set: {leido: true}},{upsert: true, new: true})
				.then(documento => documento)
				.catch(error => error);
		}
	}
};