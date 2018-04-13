const User = `
		type Usuario {
			_id: ID!
			nombre: String
			apellido: String
			correo: String
			urlImage: String
			wiki: String
			institucion: String
			grado_academico: String
			area_academica: String
			roles: [Rol]
		}
		
		
		type Query {
			mostrarPerfilUsuario(id: String): Usuario
			listaUsuariosByName(nombre: String): [Usuario]
			listarTodosUsuarios: [Usuario]
		}
		
		type Mutation {
			crearUsuario(correo: String! , nombre: String, urlImage: String, rol: String, acciones: String): Usuario
			editarInstitucionUsuario(id: String, institucion: String): Usuario
			editarGradoAcademicoUsuario(id: String, grado_academico: String!): Usuario
			editarAreaAcademica(id: String, area_academica: String): Usuario
			addWiki(id: String, wiki: String): Usuario
			editarNombreUsuario(id: String, nombre: String): Usuario
			editarApellido(id: String, apellido: String): Usuario
			addImage(id: String, imagen: String): Usuario
		}
`;

export default User;