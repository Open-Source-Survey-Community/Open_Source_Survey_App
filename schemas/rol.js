const Rol = `
	type Rol {
		_id: ID!
		rol: String
		Acciones: [String]
		estado: Int	
	}
	
	type Query {
		verRolUsuario(id: String): Rol
			
	}
		
	type Mutation {
		editarRolUsuario(id: String!,rol: String, acciones: [String]): Rol
	}

`;

export  default Rol;