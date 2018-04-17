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
	}

`;
export default DiscusionPregunta;