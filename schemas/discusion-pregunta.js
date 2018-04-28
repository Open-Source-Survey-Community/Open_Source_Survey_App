const DiscusionPregunta = `
	type DiscusionPregunta {
		_id: ID!
		titulo: String
		identificador: Int
		etiquetas_correcciones: [EtiquetaCorrecciones]
		descripcion: String
		tipo_correccion: [String]
		creador_correccion: Usuario
		estado_correccion: [EstadoCorreccion]
		fecha_creacion: String
		fecha_cierre: String
		pregunta_ID: Pregunta
		habilitada: Boolean
	}
	
	
	type EstadoCorreccion {
		usuario_creador_estado : Usuario
		rol: String
		asignacion: String
		observacion: String

	}
	type DiscusionPreguntaConnection {
		totalCount: Int
		edges : [DiscusionPreguntaEdge]
		pageInfo: PageInfo
			
	}
			
	type DiscusionPreguntaEdge {
		cursor: String
		node: DiscusionPregunta		
	}
	
	input estadoCorreccionPreguntaInput{
		usuario_creador_estado: ID!
		rol: String
		asignacion: String
		observacion: String
	}
	
	input discusionPreguntaInput {
		titulo: String!
		etiquetas_correcciones: [ID]!
		descripcion: String
		tipo_correccion: [String]
		creador_correccion: ID!
		estado_correccion: [estadoCorreccionPreguntaInput]
		fecha_creacion: String
		pregunta_ID: ID!
	}
	
			
	
	type Query{
		##Get the list paginated of the issues question related to question
		getListaIssuesByQuestions(limit: Int, after: String,idPregunta: String!): DiscusionPreguntaConnection
		
		## Este query me permite obtener la lista de los usuarios que han asignado
		## los estados de correcciones de una pregunta, aqui se deben cargar informacion 
		## tanto del creador de la correccion, como son los moderadores
		getListaUsuariosAsignadoEstadoCorreccionPregunta(idDiscusionPregunta: String!): DiscusionPregunta
		
		##Carga la informacion completa referente a una Correccion de Pregunta
		## el parametro necesario es el idDiscusionPregunta
		loadDiscusionPregunta(idDiscusionPregunta: String): DiscusionPregunta
		
		##esta consulta se debe realizar cuando se desea generar un datatable de correcciones de preguntas
		loadListaDiscusionesGeneradasByPregunta(idPregunta: String, limit: Int):[DiscusionPregunta]
		
		##Esta consulta carga los primeros 10 correcciones de pregunta que fueron creadas
		## tomando como parametro la fecha de creacion
		loadFirstDiscusionesPreguntasRecienCreadas: [DiscusionPregunta]
		
		##la informacion que devuelve esta consulta, es una lista de todas
		##las correcciones referentes a una pregunta que han sido creadas, o han sido actualizadas
		##esta accion es solo mostrada para los moderadores
		loadListaCorreccionesByPreguntasCreadasEditadas(idPregunta: String, usuario: String, limit: Int): [DiscusionPregunta]
		
		##Mostrar informacion paginada de las correcciones de preguntas, por los 5 posibles estados 
		## Estados de una correccion de pregunta
		##Creado:Lista de correcciones de preguntas que han sido recien creadas
		##Editado:Lista de correcciones de preguntas que han sido editadas
		##Pendiente:Lista de correcciones de preguntas que han sido aceptada por un moderador y que esperan la correccion del usuario
		##Cerrado: Lista de correcciones de preguntas que han sido rechazadas por un moderador
		##Resuelto: Lista de correcciones de preguntas que han sido marcadas como resueltas por el creador de la correccion pregunta
		loadListaCorreccionesPreguntasByEstado(idPregunta: String, estado: String,limit: Int, after: String): DiscusionPreguntaConnection
		
		
		loadlistaUsuariosCreadoCorreccionesPreguntas(idPregunta: String): [Usuario]
	
	}
	
	type Mutation {
		## crea una nueva discusion de una Pregunta  
		nuevaDiscusionPregunta(discusionPregunta: discusionPreguntaInput): DiscusionPregunta
	
		## editar una discusion que  ha sido previamente creada
		## esta operacion solamente puede ser efectuada por el creador de la discusion
		editarDiscusionPregunta(idDiscusionPregunta: String!, discusionPregunta: discusionPreguntaInput): Boolean
		
		## eliminar discusion de una pregunta
		## Esta accion indica que un usuario decide eliminar una discusion de una pregunta que ha 
		## desarrollado, de manera previa
		eliminarDiscusionPregunta(idDiscusionPregunta: String!, creador_correccion: String): Boolean
		
		##edicion Rapida de Discusiones de pregunta
		##Esta accion indica que un usuario creador de una discusion, puede editar de manera rapida el titulo
		editarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: String!, correoUsuario: String!, titulo: String): DiscusionPregunta
	
		##Esta accion indica que un usuario creador de una discusion, puede editar de manera rapida, la descripcion de una pregunta
		editarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: String!, correoUsuario: String!, descripcion: String): DiscusionPregunta
		
		## Esta accion cambia el estado de una discusion de una pregunta a resuelto
		## Esta accion solamente lo puede realizar el creador de la discusion de la pregunta
		aprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: String): DiscusionPregunta
		
		asignarEstadoACorrecciondePregunta(idDiscusionPregunta: String, idUsuario: String, estado: String, observacion: String): DiscusionPregunta
	}

`;
export default DiscusionPregunta;