const AreaConocimiento = `
	type AreaConocimiento {
		usuariopropietario: Usuario
		titulo: String
		descripcion: String
		idioma: String
	}
	
	
	type Query {
		listadoAreaConocimiento(idioma: String): [AreaConocimiento]
		filtrarAreasConocimiento(idioma: String,caracter: String): [AreaConocimiento]
		
		
	}
	
	input conocimiento{
		usuariopropietario: String
		titulo: String
		descripcion: String
		idioma: String!
	}
	
	type Mutation {
		crearNuevaAreaConocimiento(etiqueta: conocimiento!): AreaConocimiento
		editarAreaConocimientoPregunta(id: String, titulo: String, 
										descripcion: String, idioma: String!,
										correo: String): AreaConocimiento
		eliminarAreaConocimientoPregunta(id: String, idioma: String!, correo: String): AreaConocimiento
	}



`;


export default AreaConocimiento;