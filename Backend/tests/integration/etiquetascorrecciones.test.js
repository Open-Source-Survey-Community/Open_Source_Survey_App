/* eslint-disable quotes,no-undef */

const tester = require('graphql-tester').tester;

describe("Modelo etiquetas de correcciones, aqui se describe la logica" +
	"de negocio para las preguntas y encuestas ", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder crear una nueva etiqueta de correccion ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){
						crearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){
							color
							etiqueta		
						}		
				}`,
				variables: {
					etiqueta: {
						usuariopropietario: "5ac248c98a3f74223f16895e",
						idioma: "en",
						color: "#FFFECA",
						descripcion: "es una etiqueta de ejemplo",
						etiqueta: "pregunta muy extensa",
						categoria: "pregunta"

					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/pregunta muy extensa/);

				done();

			});
	});
	it("Deberia poder crear otra nueva etiqueta de correccion ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){
						crearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){
							color
							etiqueta		
						}		
				}`,
				variables: {
					etiqueta: {
						usuariopropietario: "5ac248c98a3f74223f16895e",
						idioma: "en",
						color: "#FFFECA",
						descripcion: "es otra etiqueta de ejemplo",
						etiqueta: "pregunta repetida",
						categoria: "pregunta"
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/pregunta repetida/);

				done();

			});
	});
	it("No Deberia poder crear otra nueva etiqueta de correccion, si ya existe en la base de datos ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){
						crearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){
							color
							etiqueta		
						}		
				}`,
				variables: {
					etiqueta: {
						usuariopropietario: "5ac248c98a3f74223f16895e",
						idioma: "en",
						color: "#FFFECA",
						descripcion: "es otra etiqueta de ejemplo",
						etiqueta: "pregunta repetida",
						categoria: "pregunta"
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();

			});
	});
	it("No Deberia poder crear otra nueva etiqueta de correccion, si ya existe en la base de datos aun si cambia " +
		"de MINUSCULA A MAYUSCULA  ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){
						crearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){
							color
							etiqueta		
						}		
				}`,
				variables: {
					etiqueta: {
						usuariopropietario: "5ac248c98a3f74223f16895e",
						idioma: "en",
						color: "#FFFECA",
						descripcion: "es otra etiqueta de ejemplo",
						etiqueta: "Pregunta Repetida",
						categoria: "pregunta"

					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();

			});
	});
	it("Deberia poder crear otra nueva etiqueta de correccion, alternando " +
		"de MINUSCULA A MAYUSCULA  ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){
						crearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){
							color
							etiqueta		
						}		
				}`,
				variables: {
					etiqueta: {
						usuariopropietario: "5ac248c98a3f74223f16895e",
						idioma: "en",
						color: "#FFFECA",
						descripcion: "es otra etiqueta de ejemplo",
						etiqueta: "Pregunta Repetida de encuesta",
						categoria: "pregunta"
					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/Pregunta Repetida de encuesta/);
				done();

			});
	});
	it("Deberia poder crear una nueva etiqueta_correccion de preguntas que nadie ha usado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){
						crearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){
							color
							etiqueta		
						}		
				}`,
				variables: {
					etiqueta: {
						usuariopropietario: "5ac248c98a3f74223f16895e",
						idioma: "en",
						color: "#FFFECA",
						descripcion: "esta es otra nueva etiqueta de ejemplo que se ha creado",
						etiqueta: "pregunta muy extensa y confusa",
						categoria: "pregunta"

					}
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/pregunta muy extensa y confusa/);
				done();
			});
	});
	it("Deberia poder editar una etiqueta que he creado, pero nadie ha usado  ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, $color: String,
																	$descripcion: String, $etiqueta: String,
																	$correoUsuario: String){
						editarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion, color: $color,
															descripcion: $descripcion, etiqueta: $etiqueta,
															correoUsuario: $correoUsuario){
							color
							etiqueta		
						}		
				}`,
				variables: {
					idEtiquetaCorreccion: "5ad27ad1604bc47d9d775f7e",
					color: "#FAAASS",
					descripcion: "otra descripcion",
					etiqueta: "etiqueta de ejemplo",
					correoUsuario: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarEtiquetaCorrecciontoPregunta.etiqueta).toMatch(/etiqueta de ejemplo/);
				done();
			});
		
	});
	it("Deberia no poder editar una etiqueta que no he creado ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, $color: String,
																	$descripcion: String, $etiqueta: String,
																	$correoUsuario: String){
						editarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion, color: $color,
															descripcion: $descripcion, etiqueta: $etiqueta,
															correoUsuario: $correoUsuario){
							color
							etiqueta		
						}		
				}`,
				variables: {
					idEtiquetaCorreccion: "5ad26cb6dc13797289371c80",
					color: "#FAAASS",
					descripcion: "otra descripcion",
					etiqueta: "etiqueta de ejemplo",
					correoUsuario: "kevinandresortizmerchan@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't edit this tag because you are not the owner/);
				done();
			});
		
	});
	it("Deberia no poder editar una etiqueta de correccion ya que otros " +
		"usuarios la estan usando ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, $color: String,
																	$descripcion: String, $etiqueta: String,
																	$correoUsuario: String){
						editarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion, color: $color,
															descripcion: $descripcion, etiqueta: $etiqueta,
															correoUsuario: $correoUsuario){
							color
							etiqueta		
						}		
				}`,
				variables: {
					idEtiquetaCorreccion: "5ad224fcd47c4b51302491ce",
					color: "#FAAASS",
					descripcion: "otra descripcion",
					etiqueta: "etiqueta de ejemplo",
					correoUsuario: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't edit this tag, because other users are using the same tag/);
				done();
			});
		
	});
	it("Deberia no poder eliminar una etiqueta de correccion ya que otros " +
		"usuarios la estan usando ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, 
																	$correoUsuario: String){
						eliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion,
															correoUsuario: $correoUsuario){
							color
							etiqueta		
						}		
				}`,
				variables: {
					idEtiquetaCorreccion: "5ad224fcd47c4b51302491ce",
					correoUsuario: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't edit this tag, because other users are using the same tag/);
				done();
			});

	});
	it("Deberia no poder eliminar una etiqueta que no he creado ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarEtiquetaCorreccionPregunta($idEtiquetaCorreccion: String,
																	$correoUsuario: String){
						eliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion,
															correoUsuario: $correoUsuario){
							color
							etiqueta		
						}		
				}`,
				variables: {
					idEtiquetaCorreccion: "5ad26cb6dc13797289371c80",
					correoUsuario: "kevinandresortizmerchan456@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't edit this tag because you are not the owner/);
				done();
			});

	});
	it("Deberia poder eliminar una etiqueta que he creado, pero nadie ha usado  ", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarEtiquetaCorreccionPregunta($idEtiquetaCorreccion: String,
																	$correoUsuario: String){
						eliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion,
															correoUsuario: $correoUsuario){
							color
							etiqueta		
						}		
				}`,
				variables: {
					idEtiquetaCorreccion: "5ad27ad1604bc47d9d775f7e",
					correoUsuario: "kevinandresortizmerchan111@gmail.com"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.eliminarEtiquetaCorreccionPregunta.etiqueta).toMatch(/etiqueta de ejemplo/);
				done();
			});

	});


});