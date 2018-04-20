/* eslint-disable no-undef,quotes */
const tester = require("graphql-tester").tester;

describe("Escenario Crear pregunta", function ( ) {
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	/**
	 * Pregunta con casilla de verificacion, usuario 5ac248c98a3f74223f16895e
	 */
	it("El usuario deberia crear una nueva pregunta con respuesta de casilla de verificacion", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "Pregunta con respuesta de casilla de verificacion",
						usuario_ID: "5ac248c98a3f74223f16895e",
						imagen: "imagen de casilla de verificacion",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearPregunta.descripcion).toMatch(/casilla de verificacion/);
				expect(response.data.crearPregunta.imagen).toMatch(/imagen/);
				done();
			});
	});
	/**
	 * Pregunta con casilla de verificacion, usuario 5ac248c98a3f74223f16895e
	 */
	it("El usuario deberia crear una nueva pregunta con respuesta de una sola opcion por escoger", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "Pregunta con opciones multiples",
						usuario_ID: "5ac248c98a3f74223f16895e",
						fecha_creacion: new Date(),
						tipoPregunta: "opciones multiples",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: ["una","dos", "tres", "cuatro"]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearPregunta.descripcion).toMatch(/Pregunta con opciones multiples/);
				expect(response.data.crearPregunta.imagen).toMatch(/no/);
				done();
			});
	});
	/**
	 * Pregunta con casilla de verificacion, usuario 5ac248c98a3f74223f16895e
	 */
	it("El usuario deberia crear una nueva pregunta con respuesta de tipo si o no", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "Pregunta con opciones de si o no",
						usuario_ID: "5ac248c98a3f74223f16895e",
						fecha_creacion: new Date(),
						tipoPregunta: "Si_No",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearPregunta.descripcion).toMatch(/Pregunta con opciones de si o no/);
				expect(response.data.crearPregunta.imagen).toMatch(/no/);
				done();
			});
	});

	/**
	 * Pregunta con casilla de verificacion, usuario 5ac248c98a3f74223f16895e
	 */
	it("El usuario deberia crear una nueva pregunta con respuesta de tipo abierta", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "Pregunta de ejemplo de tipo abierta",
						usuario_ID: "5ac248c98a3f74223f16895e",
						fecha_creacion: new Date(),
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearPregunta.descripcion).toMatch(/Pregunta de ejemplo de tipo abierta/);
				expect(response.data.crearPregunta.imagen).toMatch(/no/);
				done();
			});
	});

	/**
	 * Pregunta con casilla de verificacion, usuario 5ac248c98a3f74223f16895e
	 */
	it("El usuario deberia crear una nueva pregunta con respuesta de tipo rating", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "Pregunta de ejemplo de rating",
						usuario_ID: "5ac248c98a3f74223f16895e",
						fecha_creacion: new Date(),
						tipoPregunta: "escala",
						respuestas: [1,2,3,4,6,7],
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearPregunta.descripcion).toMatch(/Pregunta de ejemplo de rating/);
				expect(response.data.crearPregunta.imagen).toMatch(/no/);
				done();
			});
	});

});

describe("Escenario editar Pregunta", function () {
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder editar una pregunta, enviando un identificador de usuario como parametro de busqueda", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarPregunta($idPregunta: String, $pregunta: PreguntaInput ){
							editarPregunta(idPregunta: $idPregunta,pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					estado	
							 				}				
						}`,
				variables:{
					idPregunta: "5acde1c58cdf5a5284349713",
					pregunta: {
						descripcion: "Pregunta editada de ejemplo version 9",
						usuario_ID: "5ac248c98a3f74223f16895e",
						fecha_creacion: new Date(),
						imagen: "imagen de ejemplo numero 5",
						tipoPregunta: "lista_desplegable",
						respuestas: ["una lista","dos lista","tres lista"],
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarPregunta.descripcion).toMatch(/version 9/);
				expect(response.data.editarPregunta.imagen).toMatch(/numero 5/);
				done();
			});

	});
	it("Deberia no poder editar una pregunta, ya que no soy el autor de la pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarPregunta($idPregunta: String, $pregunta: PreguntaInput ){
							editarPregunta(idPregunta: $idPregunta,pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					idPregunta: "5ac8ef4f6b873951705728c3",
					pregunta: {
						descripcion: "Pregunta editada de ejemplo version 5",
						usuario_ID: "5ac248c98a3f74223f16111e",
						fecha_creacion: new Date(),
						imagen: "imagen de ejemplo numero 5",
						tipoPregunta: "lista_desplegable",
						respuestas: ["una lista","dos lista","tres lista"],
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				done();
			});

	});

	it("Deberia poder editar una pregunta si el estado de la pregunta es en revision o aceptada", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarPregunta($idPregunta: String, $pregunta: PreguntaInput ){
							editarPregunta(idPregunta: $idPregunta,pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					idPregunta: "5acde1c58cdf5a5284349713",
					pregunta: {
						descripcion: "Pregunta anteriormente editada",
						usuario_ID: "5ac248c98a3f74223f16895e",
						fecha_creacion: new Date(),
						imagen: "imagen de ejemplo numero 5",
						tipoPregunta: "lista_desplegable",
						respuestas: ["una lista","dos lista","tres lista"],
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarPregunta.descripcion).toMatch(/anteriormente editada/);
				done();
			});
	});

});

describe("Validaciones en el modelo Pregunta", function () {
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("No deberia poder guardar una pregunta si la descripcion esta vacia o es nula, el" +
		"resultado que se espera es obtener un error, describiendo el valor faltante", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "",
						usuario_ID: "5ac248c98a3f74223f16895e",
						imagen: "imagen1",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.data.crearPregunta).toBe(null);
				expect(response.errors.length).toBe(1);
				done();
			});

		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: null,
						usuario_ID: "5ac248c98a3f74223f16895e",
						imagen: "imagen1",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(400);
				expect(response.success).toBe(false);
				expect(response.data).toBe(undefined);
				expect(response.errors.length).toBe(1);
				done();
			});

		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: undefined,
						usuario_ID: "5ac248c98a3f74223f16895e",
						imagen: "imagen1",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(400);
				expect(response.success).toBe(false);
				expect(response.data).toBe(undefined);
				expect(response.errors.length).toBe(1);
				done();
			});

	});

	it("No deberia poder crear una nueva pregunta si el usuario ID es vacio ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "pregunta de ejemplo",
						usuario_ID: "",
						imagen: "imagen1",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.data.crearPregunta).toBe(null);
				expect(response.errors.length).toBe(1);
				done();
			});

		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "pregunta de ejemplo",
						usuario_ID: null,
						imagen: "imagen1",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(400);
				expect(response.success).toBe(false);
				expect(response.data).toBe(undefined);
				expect(response.errors.length).toBe(1);
				done();
			});
	});

	it("No deberia poder guardar una nueva pregunta si la fecha de creacion esta vacia", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "pregunta de ejemplo",
						usuario_ID: "5ac248c98a3f74223f16895e",
						imagen: "imagen1",
						fecha_creacion: null,
						tipoPregunta: "casilla verficacion",
						areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(400);
				expect(response.success).toBe(false);
				expect(response.data).toBe(undefined);
				expect(response.errors.length).toBe(1);
				done();
			});
		
	});
	it("No deberia poder guardar una nueva pregunta si el area de conocimiento esta vacia", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearPregunta($pregunta: PreguntaInput ){
							crearPregunta(pregunta: $pregunta){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					pregunta: {
						descripcion: "pregunta de ejemplo",
						usuario_ID: "5ac248c98a3f74223f16895e",
						imagen: "imagen1",
						fecha_creacion: new Date(),
						tipoPregunta: "casilla verficacion",
						areaconocimiento: [],
						respuestas: [1,2,3,4,5,6]
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.data.crearPregunta).toBe(null);
				expect(response.errors.length).toBe(1);
				done();
			});

	});

});

describe("Escenario eliminar Pregunta", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("Deberia eliminar una pregunta si el estado de la pregunta es revision o rechazada", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarPregunta($idPregunta: String!, $correoUsuario: String! ){
							eliminarPregunta(idPregunta: $idPregunta, correoUsuario: $correoUsuario){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					idPregunta: "5acc3cdb4f18012415badf23",
					correoUsuario: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});
		
	});
});

describe("Consultas al modelo Pregunta", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder ver una determinada pregunta ", function (done) {
		self
			.test(JSON.stringify({
				query: `query verMyPreguntaActual($idPregunta: String!){
							  verMyPreguntaActual(idPregunta: $idPregunta){
							 					descripcion
							 					imagen
							 					estado
							 				}				
						}`,
				variables:{
					idPregunta: "5acc3cdb4f18012415badf23"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});
		
	});
	it("Deberia poder la lista de imagenes que he usado en una pregunta que se encuestra en estado de revision", function (done) {
		self
			.test(JSON.stringify({
				query: `query historialImagenesUsadasByUserinAPregunta($idPregunta: String, $idUsuario: String){
							  historialImagenesUsadasByUserinAPregunta(idPregunta: $idPregunta, idUsuario: $idUsuario){
							 					historial_cambios {
							 						imagen
							 					}
							 				}				
						}`,
				variables:{
					idPregunta: "5acde1c58cdf5a5284349713",
					idUsuario: "5ac248c98a3f74223f16895e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.historialImagenesUsadasByUserinAPregunta.historial_cambios.length).toBe(2);
				done();
			});
	});
	it("Deberia poder cargar la lista de preguntas, segun el area de conocimiento", function (done) {
		self
			.test(JSON.stringify({
				query: `query cargarListadoPreguntasByAreasConocimiento($after: String, $limit: Int,$word: String,$idAreaConocimiento: String ){
							  cargarListadoPreguntasByAreasConocimiento(after: $after, limit: $limit, word: $word, idAreaConocimiento:$idAreaConocimiento){
							 					totalCount
							 				}				
						}`,
				variables:{
					after:"",
					limit:5,
					word:"",
					idAreaConocimiento:"5ac8e07bd3fe0e46a4a06085"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.cargarListadoPreguntasByAreasConocimiento.totalCount).toBe(4);
				done();
			});
	});
	it("Deberia poder ver la lista de las areas conocimientos que se han usado en una pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query listadoAreasConocimientosUsadasPreguntas{
							  listadoAreasConocimientosUsadasPreguntas{
							 					titulo
							 				}				
						}`
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listadoAreasConocimientosUsadasPreguntas.length).toBe(2);
				done();
			});
	});
	it("Deberia no poder ver la informacion de un usuario, si no provee un identificador " +
		"de la pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query verMyPreguntaActual($idPregunta: String!){
							  verMyPreguntaActual(idPregunta: $idPregunta){
							 					descripcion
							 					imagen
							 					estado	
							 				}				
						}`,
				variables:{
					idPregunta: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});

	});
	it("Deberia poder ver el usuario propietario de determinada Pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query verMyPreguntaActual($idPregunta: String!){
							  verMyPreguntaActual(idPregunta: $idPregunta){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idPregunta: "5acc3cdb4f18012415badf23"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.verMyPreguntaActual.usuario_ID.nombre).toMatch(/Kevin/);
				expect(response.data.verMyPreguntaActual.usuario_ID.correo).toMatch(/kevinandresortizmerchan111@gmail.com/);
				done();
			});
		
	});
	it("Deberia no poder ver una pregunta, si no envio un identificador a dicha pregunta ", function (done) {
		self
			.test(JSON.stringify({
				query: `query verMyPreguntaActual($idPregunta: String!){
							  verMyPreguntaActual(idPregunta: $idPregunta){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idPregunta: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verMyPreguntaActual($idPregunta: String!){
							  verMyPreguntaActual(idPregunta: $idPregunta){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idPregunta: null
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verMyPreguntaActual($idPregunta: String!){
							  verMyPreguntaActual(idPregunta: $idPregunta){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idPregunta: undefined
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
	});
	it("Deberia poder ver el listado de las preguntas actuales de un usuarios", function (done) {
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActuales($idUsuario: String){
							  verListadoMisPreguntasActuales(idUsuario: $idUsuario){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: "5ac248c98a3f74223f16895e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.verListadoMisPreguntasActuales.length).toBe(5);
				done();
			});
		
	});
	it("Deberia poder ver el listado de los usuarios distintos que han creado preguntas", function (done) {
		self
			.test(JSON.stringify({
				query: `query listadoUsuariosDistintosCreadoPreguntas{
							  listadoUsuariosDistintosCreadoPreguntas{
							 					nombre
							 					correo
							 				}				
						}`,
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listadoUsuariosDistintosCreadoPreguntas.length).toBe(1);
				done();
			});

	});
	it("Deberia no poder ver el listado de las preguntas de un usuarios si, no envio un identificador del usuario ", function (done) {
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActuales($idUsuario: String){
							  verListadoMisPreguntasActuales(idUsuario: $idUsuario){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActuales($idUsuario: String){
							  verListadoMisPreguntasActuales(idUsuario: $idUsuario){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: null
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActuales($idUsuario: String){
							  verListadoMisPreguntasActuales(idUsuario: $idUsuario){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: undefined
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});

	});
	it("Deberia poder ver el listado de preguntas actuales by estado", function (done) {
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){
							  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: "5ac248c98a3f74223f16895e",
					estado: "revision"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.verListadoMisPreguntasActualesByEstado.length).toBe(5);
				done();
			});
		
	});
	it("Deberia no poder ver el listado de preguntas actuales by estado ", function (done) {
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){
							  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: "",
					estado: "revision"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){
							  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: null,
					estado: "revision"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){
							  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: undefined,
					estado: "revision"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){
							  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){
							 					descripcion
							 					imagen
							 					estado
							 					usuario_ID {
							 						nombre
							 						correo
							 					}	
							 				}				
						}`,
				variables:{
					idUsuario: "5ac248c98a3f74223f16895e",
					estado: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.verListadoMisPreguntasActualesByEstado.length).toBe(5);
				done();
			});
		
	});
});

describe("Paginacion sobre el modelo Preguntas", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("deberia poder ver los primeros 3 preguntas", function (done) {
		self
			.test(JSON.stringify({
				query: `query listadoPreguntasActuales($after: String!, $limit: Int, $word: String){
							  listadoPreguntasActuales(after: $after, limit: $limit, word: $word){
							 					totalCount
							 					edges {
							 						cursor
							 						node{
							 						 descripcion
							 						 imagen
							 						 usuario_ID{
							 						 	nombre
							 						 	apellido
							 						 	correo
							 						 }	
							 						}
							 					}
							 					pageInfo {
							 						endCursor
							 						hasnextPage
							 					}
							 				}				
						}`,
				variables:{
					after: "",
					limit: 3,
					word: ""
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listadoPreguntasActuales.totalCount).toBe(5);
				expect(response.data.listadoPreguntasActuales.edges.length).toBe(3);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query listadoPreguntasActuales($after: String!, $limit: Int){
							  listadoPreguntasActuales(after: $after, limit: $limit){
							 					totalCount
							 					edges {
							 						cursor
							 						node{
							 						 descripcion
							 						 imagen
							 						 usuario_ID{
							 						 	nombre
							 						 	apellido
							 						 	correo
							 						 }	
							 						}
							 					}
							 					pageInfo {
							 						endCursor
							 						hasnextPage
							 					}
							 				}				
						}`,
				variables:{
					after: null,
					limit: 3
				}
			}))
			.then(response => {
				expect(response.status).toBe(400);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query listadoPreguntasActuales($after: String!, $limit: Int){
							  listadoPreguntasActuales(after: $after, limit: $limit){
							 					totalCount
							 					edges {
							 						cursor
							 						node{
							 						 descripcion
							 						 imagen
							 						 usuario_ID{
							 						 	nombre
							 						 	apellido
							 						 	correo
							 						 }	
							 						}
							 					}
							 					pageInfo {
							 						endCursor
							 						hasnextPage
							 					}
							 				}				
						}`,
				variables:{
					after: undefined,
					limit: 3
				}
			}))
			.then(response => {
				expect(response.status).toBe(400);
				done();
			});
	});

	it("Deberia pode obtener todas los documentos", function (done) {
		self
			.test(JSON.stringify({
				query: `query listadoPreguntasActuales($after: String!, $limit: Int){
							  listadoPreguntasActuales(after: $after, limit: $limit){
							 					totalCount
							 					edges {
							 						cursor
							 						node{
							 						 descripcion
							 						 imagen
							 						 usuario_ID{
							 						 	nombre
							 						 	apellido
							 						 	correo
							 						 }	
							 						}
							 					}
							 					pageInfo {
							 						endCursor
							 						hasnextPage
							 					}
							 				}				
						}`,
				variables:{
					after: "",
					limit: 5
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listadoPreguntasActuales.totalCount).toBe(5);
				expect(response.data.listadoPreguntasActuales.edges.length).toBe(5);
				expect(response.data.listadoPreguntasActuales.pageInfo.hasnextPage).toBe(false);
				done();
			});
	});

});

describe("Hacer rollback de las pregunta", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder retornar a una pregunta anterior si el estado" +
		"de mi pregunta es de revision y la pregunta que deseo hacer" +
		"rollback se encuentra en un estado estable " +
		"estable ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables:{
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.rollbackPreguntaAnterior.descripcion).toMatch(/Pregunta con respuesta de casilla de verificacion/);
				done();
			});

	});

	it("Deberia poder hacer rollback de una pregunta que su estado actual sea de" +
		"revision y la pregunta que deseo hacer rollback sea de revision", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e877dfe80644e79a9b1",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.rollbackPreguntaAnterior.descripcion).toMatch(/Pregunta editada de ejemplo version 9/);
				done();
			});


	});
	it("Deberia poder hacer rollback de una pregunta que su estado actual sea " +
		"estable y la pregunta que deseo hacer rollback sea de revision", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e877dfe80644e79a9b1",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.rollbackPreguntaAnterior.descripcion).toMatch(/Pregunta editada de ejemplo version 9/);
				done();
			});


	});
	it("No Deberia poder hacer rollback de una pregunta que su estado actual sea " +
		"revision y la pregunta que deseo hacer rollback sea rechazada", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				done();
			});


	});
	it("No Deberia poder hacer rollback de una pregunta que su estado actual sea " +
		"estable y la pregunta que deseo hacer rollback sea rechazada", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				done();
			});


	});
	it("No Deberia poder hacer rollback de una pregunta que su estado actual sea " +
		"rechazado y la pregunta que deseo hacer rollback sea estable", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				done();
			});


	});
	it("No Deberia poder hacer rollback de una pregunta si yo no soy propietario de dicha pregunta ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan497@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				done();
			});


	});
	it("Deberia poder hacer rollback solamente de la descripcion de la pregunta si yo soy propietario de dicha pregunta" +
		"y ademas esa pregunta tiene un estado de revision, y la pregunta que deseo hacer" +
		"rollback presenta un estado de estable", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackDescripcionPregunta($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackDescripcionPregunta(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					estado	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.rollbackDescripcionPregunta.descripcion).toMatch(/Pregunta con respuesta de casilla de verificacion/);
				expect(response.data.rollbackDescripcionPregunta.estado).toMatch(/revision/);
				done();
			});


	});
	it("Deberia poder hacer rollback solamente de la respuestas de la pregunta si yo soy propietario de dicha pregunta" +
		"y ademas esa pregunta tiene un estado de revision, y la pregunta que deseo hacer" +
		"rollback presenta un estado de estable", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation rollbackRespuestasPregunta($idPregunta: String, $idPreguntaAnterior: String, 
									$ownerQuestion: String){
							rollbackRespuestasPregunta(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,
									ownerQuestion: $ownerQuestion){
							 					_id
							 					descripcion
							 					imagen
							 					identificador
							 					respuestas	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349713",
					idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
					ownerQuestion: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.rollbackRespuestasPregunta.descripcion).toMatch(/Pregunta editada/);
				done();
			});


	});
});
