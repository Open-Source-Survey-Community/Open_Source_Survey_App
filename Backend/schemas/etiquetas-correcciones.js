const EtiquetasCorrecciones = `
	type EtiquetaCorrecciones {
		_id: ID!
		usuariopropietario: Usuario
		idioma: String
		color: String
		descripcion: String
		etiqueta: String
		categoria: String
	}
	
	
	type Query {
	   ## Muestra el listado de etiquetas de correcciones que se han elaborado
	   listadoEtiquetasCorrecciones(idioma: String): [EtiquetaCorrecciones]
	   ## filtra el listado de etiquetas de correcciones por un caracter o varios caracteres que se ingresa
	   filtrarEtiquetasCorrecciones(idioma: String, caracter: String): [EtiquetaCorrecciones]
	}
	
	
	input etiquetaCorreccionesInput {
		usuariopropietario: ID!
		idioma: String
		color: String!
		descripcion: String
		etiqueta: String!
		categoria: String
	}

	type Mutation {
		## Crea una nueva etiqueta de correccion.(este procedimiento es general ) 
		crearNuevaEtiquetaCorrecciones(etiqueta: etiquetaCorreccionesInput!): EtiquetaCorrecciones
		## edita una etiqueta de correccion, pero se debe verificar si soy propietario de dicha etiqueta
		## si algun otro usuario esta usando dicha etiqueta
		## las edicion se ha hace sobre el modelo de Discusion de Pregunta									
		editarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: String, color: String, descripcion: String,
											etiqueta: String, correoUsuario: String): EtiquetaCorrecciones
		## elimina una etiqueta de correccion, solamente si soy el creador de dicha etiqueta
		## solamente puedo eliminar si nadie mas esta usando esa etiqueta en una Pregunta
		eliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: String, correoUsuario: String): EtiquetaCorrecciones
	
	}


`;

export default EtiquetasCorrecciones;