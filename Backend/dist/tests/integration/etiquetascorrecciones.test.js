"use strict";

/* eslint-disable quotes,no-undef */

var tester = require('graphql-tester').tester;

describe("Modelo etiquetas de correcciones, aqui se describe la logica" + "de negocio para las preguntas y encuestas ", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder crear una nueva etiqueta de correccion ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){\n\t\t\t\t\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
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
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/pregunta muy extensa/);

			done();
		});
	});
	it("Deberia poder crear otra nueva etiqueta de correccion ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){\n\t\t\t\t\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
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
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/pregunta repetida/);

			done();
		});
	});
	it("No Deberia poder crear otra nueva etiqueta de correccion, si ya existe en la base de datos ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){\n\t\t\t\t\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
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
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});
	it("No Deberia poder crear otra nueva etiqueta de correccion, si ya existe en la base de datos aun si cambia " + "de MINUSCULA A MAYUSCULA  ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){\n\t\t\t\t\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
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
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});
	it("Deberia poder crear otra nueva etiqueta de correccion, alternando " + "de MINUSCULA A MAYUSCULA  ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){\n\t\t\t\t\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
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
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/Pregunta Repetida de encuesta/);
			done();
		});
	});
	it("Deberia poder crear una nueva etiqueta_correccion de preguntas que nadie ha usado", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaEtiquetaCorrecciones($etiqueta: etiquetaCorreccionesInput!){\n\t\t\t\t\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: $etiqueta){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
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
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/pregunta muy extensa y confusa/);
			done();
		});
	});
	it("Deberia poder editar una etiqueta que he creado, pero nadie ha usado  ", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, $color: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$descripcion: String, $etiqueta: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$correoUsuario: String){\n\t\t\t\t\t\teditarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion, color: $color,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, etiqueta: $etiqueta,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcorreoUsuario: $correoUsuario){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
			variables: {
				idEtiquetaCorreccion: "5ad27ad1604bc47d9d775f7e",
				color: "#FAAASS",
				descripcion: "otra descripcion",
				etiqueta: "etiqueta de ejemplo",
				correoUsuario: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarEtiquetaCorrecciontoPregunta.etiqueta).toMatch(/etiqueta de ejemplo/);
			done();
		});
	});
	it("Deberia no poder editar una etiqueta que no he creado ", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, $color: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$descripcion: String, $etiqueta: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$correoUsuario: String){\n\t\t\t\t\t\teditarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion, color: $color,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, etiqueta: $etiqueta,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcorreoUsuario: $correoUsuario){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
			variables: {
				idEtiquetaCorreccion: "5ad26cb6dc13797289371c80",
				color: "#FAAASS",
				descripcion: "otra descripcion",
				etiqueta: "etiqueta de ejemplo",
				correoUsuario: "kevinandresortizmerchan@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't edit this tag because you are not the owner/);
			done();
		});
	});
	it("Deberia no poder editar una etiqueta de correccion ya que otros " + "usuarios la estan usando ", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, $color: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$descripcion: String, $etiqueta: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$correoUsuario: String){\n\t\t\t\t\t\teditarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion, color: $color,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, etiqueta: $etiqueta,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcorreoUsuario: $correoUsuario){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
			variables: {
				idEtiquetaCorreccion: "5ad224fcd47c4b51302491ce",
				color: "#FAAASS",
				descripcion: "otra descripcion",
				etiqueta: "etiqueta de ejemplo",
				correoUsuario: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't edit this tag, because other users are using the same tag/);
			done();
		});
	});
	it("Deberia no poder eliminar una etiqueta de correccion ya que otros " + "usuarios la estan usando ", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarEtiquetaCorrecciontoPregunta($idEtiquetaCorreccion: String, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$correoUsuario: String){\n\t\t\t\t\t\teliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcorreoUsuario: $correoUsuario){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
			variables: {
				idEtiquetaCorreccion: "5ad224fcd47c4b51302491ce",
				correoUsuario: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't edit this tag, because other users are using the same tag/);
			done();
		});
	});
	it("Deberia no poder eliminar una etiqueta que no he creado ", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarEtiquetaCorreccionPregunta($idEtiquetaCorreccion: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$correoUsuario: String){\n\t\t\t\t\t\teliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcorreoUsuario: $correoUsuario){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
			variables: {
				idEtiquetaCorreccion: "5ad26cb6dc13797289371c80",
				correoUsuario: "kevinandresortizmerchan456@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't edit this tag because you are not the owner/);
			done();
		});
	});
	it("Deberia poder eliminar una etiqueta que he creado, pero nadie ha usado  ", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarEtiquetaCorreccionPregunta($idEtiquetaCorreccion: String,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t$correoUsuario: String){\n\t\t\t\t\t\teliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: $idEtiquetaCorreccion,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcorreoUsuario: $correoUsuario){\n\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\tetiqueta\t\t\n\t\t\t\t\t\t}\t\t\n\t\t\t\t}",
			variables: {
				idEtiquetaCorreccion: "5ad27ad1604bc47d9d775f7e",
				correoUsuario: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.eliminarEtiquetaCorreccionPregunta.etiqueta).toMatch(/etiqueta de ejemplo/);
			done();
		});
	});
	it("Deberia poder ver el listado de etiquetas de correcciones por idioma", function (done) {
		self.test(JSON.stringify({
			query: "query listadoEtiquetasCorrecciones($idioma: String){\n\t\t\t\t\t\t\t  listadoEtiquetasCorrecciones(idioma: $idioma){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: "en"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoEtiquetasCorrecciones[0].usuariopropietario.nombre).toMatch(/Kevin/);
			expect(response.data.listadoEtiquetasCorrecciones.length).toBe(3);
			done();
		});
	});
	it("Deberia ver un mensaje de error indicando que deberia existir el idioma en que quiero que se carguen " + "las etiquetas", function (done) {
		self.test(JSON.stringify({
			query: "query listadoEtiquetasCorrecciones($idioma: String){\n\t\t\t\t\t\t\t  listadoEtiquetasCorrecciones(idioma: $idioma){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/is neccessary a lenguage to filter tags/);
			done();
		});
		self.test(JSON.stringify({
			query: "query listadoEtiquetasCorrecciones($idioma: String){\n\t\t\t\t\t\t\t  listadoEtiquetasCorrecciones(idioma: $idioma){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: null
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/is neccessary a lenguage to filter tags/);
			done();
		});
		self.test(JSON.stringify({
			query: "query listadoEtiquetasCorrecciones($idioma: String){\n\t\t\t\t\t\t\t  listadoEtiquetasCorrecciones(idioma: $idioma){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: undefined
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/is neccessary a lenguage to filter tags/);
			done();
		});
	});
	it("Deberia poder ver el listado de todas las etiquetas cuando no ingreso ningun caracter", function (done) {
		self.test(JSON.stringify({
			query: "query filtrarEtiquetasCorrecciones($idioma: String, $caracter: String){\n\t\t\t\t\t\t\t  filtrarEtiquetasCorrecciones(idioma: $idioma, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: "en",
				caracter: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarEtiquetasCorrecciones.length).toBe(3);
			done();
		});
	});
	it("Deberia poder ver el listado de una etiqueta cuando ingreso un caracter", function (done) {
		self.test(JSON.stringify({
			query: "query filtrarEtiquetasCorrecciones($idioma: String, $caracter: String){\n\t\t\t\t\t\t\t  filtrarEtiquetasCorrecciones(idioma: $idioma, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: "en",
				caracter: "extensa"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarEtiquetasCorrecciones.length).toBe(1);
			done();
		});
	});
	it("Deberia poder ver los 10 primeras etiquetas que yo he desarrollado, sin ningun filtro", function (done) {
		self.test(JSON.stringify({
			query: "query filtrarMyEtiquetasCorrecciones($usuario_ID: String!, $limit: Int){\n\t\t\t\t\t\t\t  filtrarMyEtiquetasCorrecciones(usuario_ID: $usuario_ID, limit: $limit){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				usuario_ID: "5ac248c98a3f74223f16895e",
				limit: 0
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarMyEtiquetasCorrecciones.length).toBe(3);
			done();
		});
		self.test(JSON.stringify({
			query: "query filtrarMyEtiquetasCorrecciones($usuario_ID: String!, $limit: Int, $caracter: String){\n\t\t\t\t\t\t\t  filtrarMyEtiquetasCorrecciones(usuario_ID: $usuario_ID, limit: $limit, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcolor\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				usuario_ID: "5ac248c98a3f74223f16895e",
				limit: 1,
				caracter: "extensa"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarMyEtiquetasCorrecciones.length).toBe(1);
			done();
		});
	});
});
//# sourceMappingURL=etiquetascorrecciones.test.js.map