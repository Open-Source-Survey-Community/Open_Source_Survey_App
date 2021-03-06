const Comentario = `
		type Comentario{
			_id: ID!
			creador_comentario: Usuario
			identificador: Int
			habilitado: Boolean
			contenido: String
			fecha_creacion: String
			fecha_actualizacion: String
			votacion: [Voto]
			listaSubComentarios:[Comentario]
		}
		
		type Voto{
			usuario_creador: Usuario
			like: Int
			dislike: Int
			favoritos: Int
		}
		
		type Votacion{
			like: Int
			dislike: Int
		}
		
		type ComentarioConnection {
			edges: [Comentario]
			hasnextElement: Boolean
		}
		
		input ComentarioInput {
			contenido: String
			creador_comentario:ID!
			fecha_creacion: String!
		}
		type Query{
			verComentario(idComentario: String): Comentario
			verListaSubComentarios(idComentario: String): Comentario
			verComentariosAsociadosPregunta(idPregunta: String, limit: Int, index: Int):ComentarioConnection
			verComentariosAsociadosDiscusionPregunta(idDiscusionPregunta: String, limit: Int, index: Int):ComentarioConnection
		}
		
		type Mutation {
			crearComentarioAnexadaAPregunta(comentario: ComentarioInput, idPregunta: String!): Comentario
			crearComentarioAnexadaADiscusionPregunta(comentario: ComentarioInput, idDiscusionPregunta: String!): Comentario
			crearSubComentarioAnexadaAComentario(comentario: ComentarioInput, idComentario: String): Comentario
			editarComentario(contenido: String, idComentario: String, idUsuario: String!):Comentario
			colocarLikesComentario(idUsuario: String, idComentario: String):Votacion
			colocarDisLikesComentario(idUsuario: String, idComentario: String):Votacion
			colocarFavoritosComentario(idUsuario: String, idComentario: String):Int

		}

`;
export default Comentario;