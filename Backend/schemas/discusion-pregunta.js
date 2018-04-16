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
	
	type Mutation {
		## crea una nueva discusion de una Pregunta  
		nuevaDiscusionPregunta(discusionPregunta: discusionPreguntaInput): DiscusionPregunta
	
		## editar una discusion que  ha sido previamente creada
		## esta operacion solamente puede ser efectuada por el creador de la discusion
		editarDiscusionPregunta(idDiscusionPregunta: String!, discusionPregunta: discusionPreguntaInput): Boolean
		
	
	
	}
	



`;
export default DiscusionPregunta;