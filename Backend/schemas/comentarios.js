const Comentario = `
		type Comentario{
			_id: ID!
			creador_comentario: Usuario
			identificador: Int
			habilitado: Boolean
			contenido: String
			fecha_creacion: String
			fecha_actualizacion: String
			likes: [Like]
			dislikes: [Dislike]
			favoritos: [Favoritos]
			listaSubComentarios:[Comentario]
		}
		
		type Like{
			usuario_creador: Usuario
			voto: Int
		}
		
		type Dislike{
			usuario_creador: Usuario
			voto: Int
		}
		type Favoritos{
			usuario_creador: Usuario
			voto: Int
		}
		type ComentarioConnection {
			totalCount: Int
			edges: [ComentarioEdge]
			pageInfo: PageInfo
		}
		type ComentarioEdge {
			cursor: String
			node: Comentario
		}
		
		input ComentarioInput {
			contenido: String
			creador_comentario:ID!
			fecha_creacion: String!
		}
		
		
		type Mutation {
			crearComentarioAnexadaAPregunta(comentario: ComentarioInput, idPregunta: String!): Comentario
			crearComentarioAnexadaADiscusionPregunta(comentario: ComentarioInput, idDiscusionPregunta: String!): Comentario
			crearSubComentarioAnexadaAComentario(comentario: ComentarioInput, idComentario: String): Comentario
			editarComentario(contenido: String, idComentario: String, idUsuario: String!):Comentario
		}

`;
export default Comentario;