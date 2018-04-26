
const Colaborador = `
	type Colaborador {
		_id: ID!
		rol: String
		usuarioColaborador: Usuario
	}	
	type Query {
	  	getColaboradorUsuario(id: String, idColaborador: String): Colaborador
		cargarListaColaboradoresUsuario(id: String): [Colaborador]
		getNumeroColaboradoresUsuario(id: String): Int
	  
	}
		
	type Mutation {
		editarRolColaboradorUsuario(id:String, idColaborador: String, rol: String): Boolean
		addColaboradorUsuario(id: String, idColaborador: String ): [Colaborador]
		eliminarUsuarioColaborador(id: String, idColaborador: String): Boolean
	}
`;

export  default Colaborador;
