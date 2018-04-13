const Notificacion = `
	scalar Date
	type Notificacion {
		usuario_emisor: Usuario
		fecha_creacion: Date
		tipo: String
		descripcion: String
		leido:Boolean
	}
	
	type Query {
		getNumeroNotificacionUsuario(id: String, tipo: String): Int
		loadListaNotificacionesUsuario(id: String!, tipo: String): [Notificacion]
		loadListaNotificacionesMasRecientesNoLeidas(id: String!, tipo: String): [Notificacion]
	}
		
	type Mutation {
		crearNotificacionUsuario(tipo: String, descripcion: String, idEmisor: String, idReceptor: String): Notificacion
		setAllNotificacionesLikeLeida(id: String, tipo: String):Boolean
		setNotificacionLeida(tipo: String, idNotificacion: String):Notificacion
		
		
	}
`;

export default Notificacion;