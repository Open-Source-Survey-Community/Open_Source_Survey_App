/* eslint-disable quotes,no-undef */

const tester = require('graphql-tester').tester;

describe("Modelo area-conocimiento", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("deberia poder crear un nuevo area de conocimiento ", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation crearNuevaAreaConocimiento($etiqueta: conocimiento!){
							crearNuevaAreaConocimiento(etiqueta: $etiqueta){
								titulo
								descripcion

							}
				
				}`,
				variables: {
					etiqueta:{
						usuariopropietario: "5ac248c98a3f74223f16895e",
						titulo: "calculo1",
						descripcion: "ejemplo de descripcion de calculo",
						idioma: "es"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearNuevaAreaConocimiento.titulo).toMatch(/calculo1/);
				done();
			});

		self
			.test(JSON.stringify({
				query: `mutation crearNuevaAreaConocimiento($etiqueta: conocimiento!){
							crearNuevaAreaConocimiento(etiqueta: $etiqueta){
								titulo
								descripcion
							}
				
				}`,
				variables: {
					etiqueta:{
						usuariopropietario: "5ac24c758e4a6a23d4869ac7",
						titulo: "geometria2",
						descripcion: "ejemplo de descripcion de  geometria2",
						idioma: "es"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearNuevaAreaConocimiento.titulo).toMatch(/geometria/);
				done();
			});

	});
	it("Deberia no poder editar un area de conocimiento que no he creado", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation editarAreaConocimientoPregunta($id: String, $titulo: String, 
								$descripcion: String, $idioma: String!, $correo: String){
							editarAreaConocimientoPregunta(id: $id, titulo: $titulo, 
												descripcion: $descripcion, idioma: $idioma, correo: $correo){
								titulo
								descripcion
								idioma
								usuariopropietario {
									nombre
									apellido
									correo		
								}
							}
				
				}`,
				variables: {
					id: "5ac79b6e371cfe28edf55975",
					titulo: "ejemplo1",
					descripcion: "ejemplo de descripcion",
					idioma: "en",
					correo: "kevinandresortizmerchan@gmail.com"
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				done();
			});


	});
	it("Deberia poder editar un area de conocimiento que he creado", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation editarAreaConocimientoPregunta($id: String, $titulo: String, 
								$descripcion: String, $idioma: String!, $correo: String){
							editarAreaConocimientoPregunta(id: $id, titulo: $titulo, 
												descripcion: $descripcion, idioma: $idioma, correo: $correo){
								titulo
								descripcion
								idioma
								usuariopropietario {
									nombre
									apellido
									correo		
								}
							}
				
				}`,
				variables: {
					id: "5ac79b6e371cfe28edf55975",
					titulo: "ejemplo editada",
					descripcion: "ejemplo de descripcioneditada",
					idioma: "en",
					correo: "kevinandresortizmerchan111@gmail.com"
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});



	});
	it("Deberia no poder eliminar un area de conocimiento que no he creado", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation eliminarAreaConocimientoPregunta($id: String, $idioma: String!, $correo: String){
							eliminarAreaConocimientoPregunta(id: $id,  idioma: $idioma, correo: $correo){
								titulo
								descripcion
								idioma
								usuariopropietario {
									nombre
									apellido
									correo		
								}
							}
				
				}`,
				variables: {
					id: "5ac79b6e371cfe28edf55975",
					idioma: "en",
					correo: "kevinandresortizmerchan@gmail.com"
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				done();
			});



	});

	it("Deberia poder eliminar un area de conocimiento que he creado", (done) => {
		self
			.test(JSON.stringify({
				query: `mutation eliminarAreaConocimientoPregunta($id: String, $idioma: String!, $correo: String){
							eliminarAreaConocimientoPregunta(id: $id,  idioma: $idioma, correo: $correo){
								titulo
								descripcion
								idioma
								usuariopropietario {
									nombre
									apellido
									correo		
								}
							}
				
				}`,
				variables: {
					id: "5ac79b6e371cfe28edf55976",
					idioma: "en",
					correo: "kevinandresortizmerchan@gmail.com"
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.eliminarAreaConocimientoPregunta.usuariopropietario.nombre).toMatch(/kevin/);
				done();
			});



	});








	it("Listar todas las areas de conocimiento basadas en un idioma ", (done) => {
		self
			.test(JSON.stringify({
				query: `query listadoAreaConocimiento($idioma: String){
							listadoAreaConocimiento(idioma: $idioma){
							 					titulo
							 					descripcion	
							 					usuariopropietario {
							 						nombre
							 						apellido
							 						correo
							 					}
							 				}				
						}`,
				variables: {
					idioma: "es"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.listadoAreaConocimiento.length).toBe(2);
				done();
			});
	});

	it("filtrar todas las areas de conocimiento basadas en un idioma y por un caracter ", (done) => {
		self
			.test(JSON.stringify({
				query: `query filtrarAreasConocimiento($idioma: String, $caracter: String){
							filtrarAreasConocimiento(idioma: $idioma, caracter: $caracter){
							 					titulo
							 					descripcion	
							 					usuariopropietario {
							 						nombre
							 						apellido
							 						correo
							 					}
							 				}				
						}`,
				variables: {
					caracter: "g",
					idioma: "es"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.filtrarAreasConocimiento.length).toBe(1);
				done();
			});
		self
			.test(JSON.stringify({
				query: `query filtrarAreasConocimiento($idioma: String, $caracter: String){
							filtrarAreasConocimiento(idioma: $idioma, caracter: $caracter){
							 					titulo
							 					descripcion	
							 					usuariopropietario {
							 						nombre
							 						apellido
							 						correo
							 					}
							 				}				
						}`,
				variables: {
					caracter: "",
					idioma: "es"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.filtrarAreasConocimiento.length).toBe(2);
				done();
			});
	});

});
