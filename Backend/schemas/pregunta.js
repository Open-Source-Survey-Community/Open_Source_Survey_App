const Pregunta = `
			type Pregunta {
				_id: ID!
				descripcion: String
				usuario_ID: Usuario
				identificador: Int
				historial_cambios: [Pregunta]
				registroActual: Boolean
				imagen: String
				fecha_creacion: String
				fecha_cierre: String
				estado: String
				tipoPregunta: String
				areaconocimiento: [AreaConocimiento]
				discusiones: [DiscusionPregunta]
				respuestas: [String]
			
			}
			
			type PreguntaConnection {
				totalCount: Int
				edges : [PreguntaEdge]
				pageInfo: PageInfo
			
			}
			
			type PreguntaEdge {
				cursor: String
				node: Pregunta
			
			}
			
			
			type Query {
				verMyPreguntaActual(idPregunta: String!): Pregunta
				verListadoMisPreguntasActuales(idUsuario: String): [Pregunta]
				verListadoMisPreguntasActualesByEstado(idUsuario: String, estado: String): [Pregunta]
				listadoPreguntasActuales(after: String,limit: Int, word: String): PreguntaConnection
				listadoPreguntasActualesByEstado(after: String, limit: Int, word: String, estado: String): PreguntaConnection
				historialImagenesUsadasByUserinAPregunta(idUsuario: String,idPregunta: String): Pregunta
				listadoUsuariosDistintosCreadoPreguntas :[Usuario]
				listadoAreasConocimientosUsadasPreguntas: [AreaConocimiento]
				cargarListadoPreguntasByAreasConocimiento(after: String,limit: Int, word: String,idAreaConocimiento: String): PreguntaConnection
				
			}
			input PreguntaInput{
				descripcion: String!
				usuario_ID: ID!
				imagen: String
				fecha_creacion: String!
				tipoPregunta: String
				areaconocimiento: [ID!]!
				respuestas: [String]
	
			}
			
			type Mutation {
				crearPregunta(pregunta: PreguntaInput): Pregunta
				editarPregunta(idPregunta: String, pregunta: PreguntaInput): Pregunta
				eliminarPregunta(idPregunta: String!, correoUsuario: String!): Pregunta
				rollbackPreguntaAnterior(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta
				rollbackDescripcionPregunta(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta
				rollbackRespuestasPregunta(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta
				rollbackImagenPregunta(idPregunta: String, idPreguntaAnterior: String, ownerQuestion: String): Pregunta
			}
			
			


`;

export default Pregunta;