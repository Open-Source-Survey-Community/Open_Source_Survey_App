/* eslint-disable quotes */
const tester = require('graphql-tester').tester;

/* eslint-disable no-undef */
describe("Modelo usuario", function (){

	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it ("El usuario deberia registrarse como nuevo usuario en la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation crearUsuario($correo: String!, $nombre: String,
						$urlImage: String, $rol: String, $acciones: String){
							crearUsuario(correo: $correo,nombre: $nombre, urlImage: $urlImage,
							 				rol: $rol, acciones: $acciones){
							 					_id
							 					correo
							 					nombre	
							 				}				
						}`,
				variables:{
					correo: 'kevinandresortizmerchan@gmail.com',
					nombre: 'kevin Ortiz Merchan',
					urlImage: 'no image',
					rol: 'usuario',
					acciones: 'crear pregunta, crear encuesta, creacion contenido'
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearUsuario.nombre).toMatch(/kevin Ortiz/);
				expect(response.data.crearUsuario.correo).toMatch(/kevinandresortizmerchan@gmail.com/);
				done();
			});
	});
	it ("El usuario deberia autenticarse como usuario existente en la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation crearUsuario($correo: String!, $nombre: String,
						$urlImage: String, $rol: String, $acciones: String){
							crearUsuario(correo: $correo,nombre: $nombre, urlImage: $urlImage,
							 				rol: $rol, acciones: $acciones){
							 					_id
							 					correo
							 					nombre	
							 				}				
						}`,
				variables:{
					correo: 'kevinandresortizmerchan@gmail.com',
					nombre: 'kevin Ortiz Merchan',
					urlImage: 'no image',
					rol: 'usuario',
					acciones: 'crear pregunta, crear encuesta, creacion contenido'
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearUsuario.nombre).toMatch(/kevin Ortiz/);
				expect(response.data.crearUsuario.correo).toMatch(/kevinandresortizmerchan@gmail.com/);
				done();
			});
	});
	it ("el usuario deberia add image a su coleccion en la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation addImage($id: String, $imagen: String){
							addImage(id: $id,imagen: $imagen){
							 					_id
							 					urlImage	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					imagen: "imagen2"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.addImage.urlImage).toMatch(/imagen2/);
				done();
			});
	});
	it ("el usuario no deberia add image si no existe un id",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation addImage($id: String, $imagen: String){
							addImage(id: $id,imagen: $imagen){
							 					_id
							 					urlImage	
							 				}				
						}`,
				variables:{
					id: "",
					imagen: "imagen2"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.addImage).toBe(null);
				done();
			});
	});
	it ("el usuario deberia actualizar el apellido de la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarApellido($id: String, $apellido: String){
							editarApellido(id: $id,apellido: $apellido){
							 					_id
							 					apellido	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					apellido: "Ortiz Merchan"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarApellido.apellido).toMatch(/Ortiz Merchan/);
				done();
			});
	});
	it ("un usuario no podria actualizar el apellido de la base de datos si el id es null o vacio",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarApellido($id: String, $apellido: String){
							editarApellido(id: $id,apellido: $apellido){
							 					_id
							 					apellido	
							 				}				
						}`,
				variables:{
					id: undefined,
					apellido: "Andres Merchan"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarApellido).toBe(null);
				done();
			});
	});

	it ("un usuario no deberia actualizar su apellido si el campo esta vacio o es nulo",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarApellido($id: String, $apellido: String){
							editarApellido(id: $id,apellido: $apellido){
							 					_id
							 					apellido	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					apellido: null
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarApellido).toBe(null);
				done();
			});
	});

	it ("un usuario deberia actualizar el nombre en la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					nombre: "Kevin Andres"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario.nombre).toMatch(/Andres/);
				done();
			});

	});

	it ("un usuario no deberia actualizar un nombre en la base de datos si el id es nulo o el nombre que envia es nula",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: "",
					nombre: "Kevin Andres"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: null,
					nombre: "Kevin Andres"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: undefined,
					nombre: "Kevin Andres"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					nombre: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					nombre: null
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					nombre: undefined
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarNombreUsuario($id: String, $nombre: String){
							editarNombreUsuario(id: $id,nombre: $nombre){
							 					_id
							 					nombre	
							 				}				
						}`,
				variables:{
					id: undefined,
					nombre: undefined
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarNombreUsuario).toBe(null);
				done();
			});
	});

	it ("un usuario deberia actualizar el wiki o biografia en la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation addWiki($id: String, $wiki: String){
							addWiki(id: $id,wiki: $wiki){
							 					_id
							 					wiki	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					wiki: "es una wiki de ejemplo"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.addWiki.wiki).toMatch(/es una wiki/);
				done();
			});
	});

	it ("un usuario no deberia actualizar el wiki o biografia en la base de datos si el id es nulo o la" +
		"biografia es nula",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation addWiki($id: String, $wiki: String){
							addWiki(id: $id,wiki: $wiki){
							 					_id
							 					wiki	
							 				}				
						}`,
				variables:{
					id: null,
					wiki: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.addWiki).toBe(null);
				done();
			});

	});

	it ("un usuario deberia actualizar el area academica en la base de datos",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarAreaAcademica($id: String, $area_academica: String){
							editarAreaAcademica(id: $id,area_academica: $area_academica){
							 					_id
							 					area_academica	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					area_academica: "ingeniero en computacion"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarAreaAcademica.area_academica).toMatch(/computacion/);
				done();
			});
	});

	it ("un usuario no deberia actualizar el area academica en la base de datos si el id es nulo" ,(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarAreaAcademica($id: String, $area_academica: String){
							editarAreaAcademica(id: $id,area_academica: $area_academica){
							 					_id
							 					area_academica	
							 				}				
						}`,
				variables:{
					id: null,
					area_academica: "ingeniero en mecanica"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarAreaAcademica).toBe(null);
				done();
			});

	});
	it ("un usuario deberia actualizar el grado academico en la base de datos ",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){
							editarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){
							 					_id
							 					grado_academico	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					grado_academico: "ingeniero"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarGradoAcademicoUsuario.grado_academico).toMatch(/ingeniero/);
				done();
			});

	});

	it ("un usuario no deberia actualizar el grado academico en la base de datos si el id es nulo 0" +
		"el grado academica es nulo ",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){
							editarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){
							 					_id
							 					grado_academico	
							 				}				
						}`,
				variables:{
					id: "",
					grado_academico: "ingeniero"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarGradoAcademicoUsuario).toBe(null);
				done();
			});

		self
			.test(JSON.stringify({
				query: `mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){
							editarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){
							 					_id
							 					grado_academico	
							 				}				
						}`,
				variables:{
					id: null,
					grado_academico: "ingeniero"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarGradoAcademicoUsuario).toBe(null);
				done();
			});

		self
			.test(JSON.stringify({
				query: `mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){
							editarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){
							 					_id
							 					grado_academico	
							 				}				
						}`,
				variables:{
					id: undefined,
					grado_academico: "ingeniero"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarGradoAcademicoUsuario).toBe(null);
				done();
			});


		self
			.test(JSON.stringify({
				query: `mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){
							editarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){
							 					_id
							 					grado_academico	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					grado_academico: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarGradoAcademicoUsuario.grado_academico).toMatch("");
				done();
			});


	});
	it ("un usuario deberia anadir a una institucion que pertenece en la base de datos ",(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarInstitucionUsuario($id: String, $institucion: String!){
							editarInstitucionUsuario(id: $id,institucion: $institucion){
							 					_id
							 					institucion	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e",
					institucion: "Escuela Superior Politecnica del Litoral"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarInstitucionUsuario.institucion).toMatch(/Escuela Superior/);
				done();
			});

	});
	it ("un usuario no deberia anadir a una institucion que pertenece en la base de datos si el id es nulo" ,(done)=>{
		self
			.test(JSON.stringify({
				query: `mutation editarInstitucionUsuario($id: String, $institucion: String!){
							editarInstitucionUsuario(id: $id,institucion: $institucion){
							 					_id
							 					institucion	
							 				}				
						}`,
				variables:{
					id: "",
					institucion: "Escuela Superior Politecnica del Litoral"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarInstitucionUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarInstitucionUsuario($id: String, $institucion: String!){
							editarInstitucionUsuario(id: $id,institucion: $institucion){
							 					_id
							 					institucion	
							 				}				
						}`,
				variables:{
					id: null,
					institucion: "Escuela Superior Politecnica del Litoral"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarInstitucionUsuario).toBe(null);
				done();
			});
		self
			.test(JSON.stringify({
				query: `mutation editarInstitucionUsuario($id: String, $institucion: String!){
							editarInstitucionUsuario(id: $id,institucion: $institucion){
							 					_id
							 					institucion	
							 				}				
						}`,
				variables:{
					id: undefined,
					institucion: "Escuela Superior Politecnica del Litoral"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarInstitucionUsuario).toBe(null);
				done();
			});

	});

	it ("un usuario deberia mostrar informacion aerca del perfil del Usuario",(done)=>{
		self
			.test(JSON.stringify({
				query: `query mostrarPerfilUsuario($id: String){
							mostrarPerfilUsuario(id: $id){
							 					nombre	
							 				}				
						}`,
				variables:{
					id: "5ac248c98a3f74223f16895e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.mostrarPerfilUsuario.nombre).toMatch(/Kevin/);
				done();
			});


	});
	it ("un usuario no podria ver su informacion si el id es nulo",(done)=>{
		self
			.test(JSON.stringify({
				query: `query mostrarPerfilUsuario($id: String){
							mostrarPerfilUsuario(id: $id){
							 					nombre	
							 				}				
						}`,
				variables:{
					id: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.mostrarPerfilUsuario).toBe(null);
				done();
			});

	});
	it ("deveria devolver un array de usuario filtrados sin ningun caracter",(done)=>{
		self
			.test(JSON.stringify({
				query: `query listaUsuariosByName($nombre: String){
							listaUsuariosByName(nombre: $nombre){
							 					nombre	
							 				}				
						}`,
				variables:{
					nombre: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listaUsuariosByName.length).toBe(2);
				done();
			});

	});

	it ("deveria devolver un array de usuario filtrados con un caracter",(done)=>{
		self
			.test(JSON.stringify({
				query: `query listaUsuariosByName($nombre: String){
							listaUsuariosByName(nombre: $nombre){
							 					nombre	
							 				}				
						}`,
				variables:{
					nombre: "M"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listaUsuariosByName.length).toBe(1);
				done();
			});

	});

	it ("deveria devolver un array de usuario filtrados con mas de un  caracter",(done)=>{
		self
			.test(JSON.stringify({
				query: `query listaUsuariosByName($nombre: String){
							listaUsuariosByName(nombre: $nombre){
							 					nombre	
							 				}				
						}`,
				variables:{
					nombre: "KEVIN"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listaUsuariosByName.length).toBe(2);
				done();
			});

	});

	it ("deveria devolver un array de usuario de Usuarios",(done)=>{
		self
			.test(JSON.stringify({
				query: `query listarTodosUsuarios{
							listarTodosUsuarios{
							 					nombre	
							 				}				
						}`
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listarTodosUsuarios.length).toBe(2);
				done();
			});

	});


});