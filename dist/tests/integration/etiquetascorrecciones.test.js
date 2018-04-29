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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2ludGVncmF0aW9uL2V0aXF1ZXRhc2NvcnJlY2Npb25lcy50ZXN0LmpzIl0sIm5hbWVzIjpbInRlc3RlciIsInJlcXVpcmUiLCJkZXNjcmliZSIsInNlbGYiLCJ0ZXN0IiwidXJsIiwiY29udGVudFR5cGUiLCJpdCIsImRvbmUiLCJKU09OIiwic3RyaW5naWZ5IiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJldGlxdWV0YSIsInVzdWFyaW9wcm9waWV0YXJpbyIsImlkaW9tYSIsImNvbG9yIiwiZGVzY3JpcGNpb24iLCJjYXRlZ29yaWEiLCJ0aGVuIiwiZXhwZWN0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJ0b0JlIiwic3VjY2VzcyIsImRhdGEiLCJjcmVhck51ZXZhRXRpcXVldGFDb3JyZWNjaW9uZXMiLCJ0b01hdGNoIiwiaWRFdGlxdWV0YUNvcnJlY2Npb24iLCJjb3JyZW9Vc3VhcmlvIiwiZWRpdGFyRXRpcXVldGFDb3JyZWNjaW9udG9QcmVndW50YSIsImVycm9ycyIsIm1lc3NhZ2UiLCJlbGltaW5hckV0aXF1ZXRhQ29ycmVjY2lvblByZWd1bnRhIiwibGlzdGFkb0V0aXF1ZXRhc0NvcnJlY2Npb25lcyIsIm5vbWJyZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNhcmFjdGVyIiwiZmlsdHJhckV0aXF1ZXRhc0NvcnJlY2Npb25lcyIsInVzdWFyaW9fSUQiLCJsaW1pdCIsImZpbHRyYXJNeUV0aXF1ZXRhc0NvcnJlY2Npb25lcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLGdCQUFSLEVBQTBCRCxNQUF6Qzs7QUFFQUUsU0FBUyxpRUFDUiw0Q0FERCxFQUMrQyxZQUFXO0FBQ3pELEtBQU1DLE9BQU8sSUFBYjtBQUNBQSxNQUFLQyxJQUFMLEdBQVlKLE9BQU87QUFDbEJLLE9BQUssaUNBRGE7QUFFbEJDLGVBQWE7QUFGSyxFQUFQLENBQVo7QUFJQUMsSUFBRyx1REFBSCxFQUE0RCxVQUFVQyxJQUFW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LENBMWhCRCIsImZpbGUiOiJldGlxdWV0YXNjb3JyZWNjaW9uZXMudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHF1b3Rlcyxuby11bmRlZiAqL1xuXG5jb25zdCB0ZXN0ZXIgPSByZXF1aXJlKCdncmFwaHFsLXRlc3RlcicpLnRlc3RlcjtcblxuZGVzY3JpYmUoXCJNb2RlbG8gZXRpcXVldGFzIGRlIGNvcnJlY2Npb25lcywgYXF1aSBzZSBkZXNjcmliZSBsYSBsb2dpY2FcIiArXG5cdFwiZGUgbmVnb2NpbyBwYXJhIGxhcyBwcmVndW50YXMgeSBlbmN1ZXN0YXMgXCIsIGZ1bmN0aW9uICgpe1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGNyZWFyIHVuYSBudWV2YSBldGlxdWV0YSBkZSBjb3JyZWNjaW9uIFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhck51ZXZhRXRpcXVldGFDb3JyZWNjaW9uZXMoJGV0aXF1ZXRhOiBldGlxdWV0YUNvcnJlY2Npb25lc0lucHV0ISl7XG5cdFx0XHRcdFx0XHRjcmVhck51ZXZhRXRpcXVldGFDb3JyZWNjaW9uZXMoZXRpcXVldGE6ICRldGlxdWV0YSl7XG5cdFx0XHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdGV0aXF1ZXRhXHRcdFxuXHRcdFx0XHRcdFx0fVx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGV0aXF1ZXRhOiB7XG5cdFx0XHRcdFx0XHR1c3VhcmlvcHJvcGlldGFyaW86IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0XHRpZGlvbWE6IFwiZW5cIixcblx0XHRcdFx0XHRcdGNvbG9yOiBcIiNGRkZFQ0FcIixcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImVzIHVuYSBldGlxdWV0YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0XHRldGlxdWV0YTogXCJwcmVndW50YSBtdXkgZXh0ZW5zYVwiLFxuXHRcdFx0XHRcdFx0Y2F0ZWdvcmlhOiBcInByZWd1bnRhXCJcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcy5ldGlxdWV0YSkudG9NYXRjaCgvcHJlZ3VudGEgbXV5IGV4dGVuc2EvKTtcblxuXHRcdFx0XHRkb25lKCk7XG5cblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGNyZWFyIG90cmEgbnVldmEgZXRpcXVldGEgZGUgY29ycmVjY2lvbiBcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJOdWV2YUV0aXF1ZXRhQ29ycmVjY2lvbmVzKCRldGlxdWV0YTogZXRpcXVldGFDb3JyZWNjaW9uZXNJbnB1dCEpe1xuXHRcdFx0XHRcdFx0Y3JlYXJOdWV2YUV0aXF1ZXRhQ29ycmVjY2lvbmVzKGV0aXF1ZXRhOiAkZXRpcXVldGEpe1xuXHRcdFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHRldGlxdWV0YVx0XHRcblx0XHRcdFx0XHRcdH1cdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRldGlxdWV0YToge1xuXHRcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0aWRpb21hOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRjb2xvcjogXCIjRkZGRUNBXCIsXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlcyBvdHJhIGV0aXF1ZXRhIGRlIGVqZW1wbG9cIixcblx0XHRcdFx0XHRcdGV0aXF1ZXRhOiBcInByZWd1bnRhIHJlcGV0aWRhXCIsXG5cdFx0XHRcdFx0XHRjYXRlZ29yaWE6IFwicHJlZ3VudGFcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcy5ldGlxdWV0YSkudG9NYXRjaCgvcHJlZ3VudGEgcmVwZXRpZGEvKTtcblxuXHRcdFx0XHRkb25lKCk7XG5cblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJObyBEZWJlcmlhIHBvZGVyIGNyZWFyIG90cmEgbnVldmEgZXRpcXVldGEgZGUgY29ycmVjY2lvbiwgc2kgeWEgZXhpc3RlIGVuIGxhIGJhc2UgZGUgZGF0b3MgXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcygkZXRpcXVldGE6IGV0aXF1ZXRhQ29ycmVjY2lvbmVzSW5wdXQhKXtcblx0XHRcdFx0XHRcdGNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcyhldGlxdWV0YTogJGV0aXF1ZXRhKXtcblx0XHRcdFx0XHRcdFx0Y29sb3Jcblx0XHRcdFx0XHRcdFx0ZXRpcXVldGFcdFx0XG5cdFx0XHRcdFx0XHR9XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0ZXRpcXVldGE6IHtcblx0XHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbzogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRcdGlkaW9tYTogXCJlblwiLFxuXHRcdFx0XHRcdFx0Y29sb3I6IFwiI0ZGRkVDQVwiLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiZXMgb3RyYSBldGlxdWV0YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0XHRldGlxdWV0YTogXCJwcmVndW50YSByZXBldGlkYVwiLFxuXHRcdFx0XHRcdFx0Y2F0ZWdvcmlhOiBcInByZWd1bnRhXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiTm8gRGViZXJpYSBwb2RlciBjcmVhciBvdHJhIG51ZXZhIGV0aXF1ZXRhIGRlIGNvcnJlY2Npb24sIHNpIHlhIGV4aXN0ZSBlbiBsYSBiYXNlIGRlIGRhdG9zIGF1biBzaSBjYW1iaWEgXCIgK1xuXHRcdFwiZGUgTUlOVVNDVUxBIEEgTUFZVVNDVUxBICBcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJOdWV2YUV0aXF1ZXRhQ29ycmVjY2lvbmVzKCRldGlxdWV0YTogZXRpcXVldGFDb3JyZWNjaW9uZXNJbnB1dCEpe1xuXHRcdFx0XHRcdFx0Y3JlYXJOdWV2YUV0aXF1ZXRhQ29ycmVjY2lvbmVzKGV0aXF1ZXRhOiAkZXRpcXVldGEpe1xuXHRcdFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHRldGlxdWV0YVx0XHRcblx0XHRcdFx0XHRcdH1cdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRldGlxdWV0YToge1xuXHRcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0aWRpb21hOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRjb2xvcjogXCIjRkZGRUNBXCIsXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlcyBvdHJhIGV0aXF1ZXRhIGRlIGVqZW1wbG9cIixcblx0XHRcdFx0XHRcdGV0aXF1ZXRhOiBcIlByZWd1bnRhIFJlcGV0aWRhXCIsXG5cdFx0XHRcdFx0XHRjYXRlZ29yaWE6IFwicHJlZ3VudGFcIlxuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblxuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgY3JlYXIgb3RyYSBudWV2YSBldGlxdWV0YSBkZSBjb3JyZWNjaW9uLCBhbHRlcm5hbmRvIFwiICtcblx0XHRcImRlIE1JTlVTQ1VMQSBBIE1BWVVTQ1VMQSAgXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcygkZXRpcXVldGE6IGV0aXF1ZXRhQ29ycmVjY2lvbmVzSW5wdXQhKXtcblx0XHRcdFx0XHRcdGNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcyhldGlxdWV0YTogJGV0aXF1ZXRhKXtcblx0XHRcdFx0XHRcdFx0Y29sb3Jcblx0XHRcdFx0XHRcdFx0ZXRpcXVldGFcdFx0XG5cdFx0XHRcdFx0XHR9XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0ZXRpcXVldGE6IHtcblx0XHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbzogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRcdGlkaW9tYTogXCJlblwiLFxuXHRcdFx0XHRcdFx0Y29sb3I6IFwiI0ZGRkVDQVwiLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiZXMgb3RyYSBldGlxdWV0YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0XHRldGlxdWV0YTogXCJQcmVndW50YSBSZXBldGlkYSBkZSBlbmN1ZXN0YVwiLFxuXHRcdFx0XHRcdFx0Y2F0ZWdvcmlhOiBcInByZWd1bnRhXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhck51ZXZhRXRpcXVldGFDb3JyZWNjaW9uZXMuZXRpcXVldGEpLnRvTWF0Y2goL1ByZWd1bnRhIFJlcGV0aWRhIGRlIGVuY3Vlc3RhLyk7XG5cdFx0XHRcdGRvbmUoKTtcblxuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgY3JlYXIgdW5hIG51ZXZhIGV0aXF1ZXRhX2NvcnJlY2Npb24gZGUgcHJlZ3VudGFzIHF1ZSBuYWRpZSBoYSB1c2Fkb1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhck51ZXZhRXRpcXVldGFDb3JyZWNjaW9uZXMoJGV0aXF1ZXRhOiBldGlxdWV0YUNvcnJlY2Npb25lc0lucHV0ISl7XG5cdFx0XHRcdFx0XHRjcmVhck51ZXZhRXRpcXVldGFDb3JyZWNjaW9uZXMoZXRpcXVldGE6ICRldGlxdWV0YSl7XG5cdFx0XHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdGV0aXF1ZXRhXHRcdFxuXHRcdFx0XHRcdFx0fVx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGV0aXF1ZXRhOiB7XG5cdFx0XHRcdFx0XHR1c3VhcmlvcHJvcGlldGFyaW86IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0XHRpZGlvbWE6IFwiZW5cIixcblx0XHRcdFx0XHRcdGNvbG9yOiBcIiNGRkZFQ0FcIixcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImVzdGEgZXMgb3RyYSBudWV2YSBldGlxdWV0YSBkZSBlamVtcGxvIHF1ZSBzZSBoYSBjcmVhZG9cIixcblx0XHRcdFx0XHRcdGV0aXF1ZXRhOiBcInByZWd1bnRhIG11eSBleHRlbnNhIHkgY29uZnVzYVwiLFxuXHRcdFx0XHRcdFx0Y2F0ZWdvcmlhOiBcInByZWd1bnRhXCJcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyTnVldmFFdGlxdWV0YUNvcnJlY2Npb25lcy5ldGlxdWV0YSkudG9NYXRjaCgvcHJlZ3VudGEgbXV5IGV4dGVuc2EgeSBjb25mdXNhLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGVkaXRhciB1bmEgZXRpcXVldGEgcXVlIGhlIGNyZWFkbywgcGVybyBuYWRpZSBoYSB1c2FkbyAgXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckV0aXF1ZXRhQ29ycmVjY2lvbnRvUHJlZ3VudGEoJGlkRXRpcXVldGFDb3JyZWNjaW9uOiBTdHJpbmcsICRjb2xvcjogU3RyaW5nLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRkZXNjcmlwY2lvbjogU3RyaW5nLCAkZXRpcXVldGE6IFN0cmluZyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkY29ycmVvVXN1YXJpbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdGVkaXRhckV0aXF1ZXRhQ29ycmVjY2lvbnRvUHJlZ3VudGEoaWRFdGlxdWV0YUNvcnJlY2Npb246ICRpZEV0aXF1ZXRhQ29ycmVjY2lvbiwgY29sb3I6ICRjb2xvcixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiAkZGVzY3JpcGNpb24sIGV0aXF1ZXRhOiAkZXRpcXVldGEsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOiAkY29ycmVvVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdGV0aXF1ZXRhXHRcdFxuXHRcdFx0XHRcdFx0fVx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRXRpcXVldGFDb3JyZWNjaW9uOiBcIjVhZDI3YWQxNjA0YmM0N2Q5ZDc3NWY3ZVwiLFxuXHRcdFx0XHRcdGNvbG9yOiBcIiNGQUFBU1NcIixcblx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJvdHJhIGRlc2NyaXBjaW9uXCIsXG5cdFx0XHRcdFx0ZXRpcXVldGE6IFwiZXRpcXVldGEgZGUgZWplbXBsb1wiLFxuXHRcdFx0XHRcdGNvcnJlb1VzdWFyaW86IFwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW4xMTFAZ21haWwuY29tXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhckV0aXF1ZXRhQ29ycmVjY2lvbnRvUHJlZ3VudGEuZXRpcXVldGEpLnRvTWF0Y2goL2V0aXF1ZXRhIGRlIGVqZW1wbG8vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgbm8gcG9kZXIgZWRpdGFyIHVuYSBldGlxdWV0YSBxdWUgbm8gaGUgY3JlYWRvIFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJFdGlxdWV0YUNvcnJlY2Npb250b1ByZWd1bnRhKCRpZEV0aXF1ZXRhQ29ycmVjY2lvbjogU3RyaW5nLCAkY29sb3I6IFN0cmluZyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkZGVzY3JpcGNpb246IFN0cmluZywgJGV0aXF1ZXRhOiBTdHJpbmcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JGNvcnJlb1VzdWFyaW86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRlZGl0YXJFdGlxdWV0YUNvcnJlY2Npb250b1ByZWd1bnRhKGlkRXRpcXVldGFDb3JyZWNjaW9uOiAkaWRFdGlxdWV0YUNvcnJlY2Npb24sIGNvbG9yOiAkY29sb3IsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogJGRlc2NyaXBjaW9uLCBldGlxdWV0YTogJGV0aXF1ZXRhLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8pe1xuXHRcdFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHRldGlxdWV0YVx0XHRcblx0XHRcdFx0XHRcdH1cdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZEV0aXF1ZXRhQ29ycmVjY2lvbjogXCI1YWQyNmNiNmRjMTM3OTcyODkzNzFjODBcIixcblx0XHRcdFx0XHRjb2xvcjogXCIjRkFBQVNTXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwib3RyYSBkZXNjcmlwY2lvblwiLFxuXHRcdFx0XHRcdGV0aXF1ZXRhOiBcImV0aXF1ZXRhIGRlIGVqZW1wbG9cIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC95b3UgY2FuJ3QgZWRpdCB0aGlzIHRhZyBiZWNhdXNlIHlvdSBhcmUgbm90IHRoZSBvd25lci8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBubyBwb2RlciBlZGl0YXIgdW5hIGV0aXF1ZXRhIGRlIGNvcnJlY2Npb24geWEgcXVlIG90cm9zIFwiICtcblx0XHRcInVzdWFyaW9zIGxhIGVzdGFuIHVzYW5kbyBcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyRXRpcXVldGFDb3JyZWNjaW9udG9QcmVndW50YSgkaWRFdGlxdWV0YUNvcnJlY2Npb246IFN0cmluZywgJGNvbG9yOiBTdHJpbmcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JGRlc2NyaXBjaW9uOiBTdHJpbmcsICRldGlxdWV0YTogU3RyaW5nLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRjb3JyZW9Vc3VhcmlvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0ZWRpdGFyRXRpcXVldGFDb3JyZWNjaW9udG9QcmVndW50YShpZEV0aXF1ZXRhQ29ycmVjY2lvbjogJGlkRXRpcXVldGFDb3JyZWNjaW9uLCBjb2xvcjogJGNvbG9yLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246ICRkZXNjcmlwY2lvbiwgZXRpcXVldGE6ICRldGlxdWV0YSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvcnJlb1VzdWFyaW86ICRjb3JyZW9Vc3VhcmlvKXtcblx0XHRcdFx0XHRcdFx0Y29sb3Jcblx0XHRcdFx0XHRcdFx0ZXRpcXVldGFcdFx0XG5cdFx0XHRcdFx0XHR9XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWRFdGlxdWV0YUNvcnJlY2Npb246IFwiNWFkMjI0ZmNkNDdjNGI1MTMwMjQ5MWNlXCIsXG5cdFx0XHRcdFx0Y29sb3I6IFwiI0ZBQUFTU1wiLFxuXHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcIm90cmEgZGVzY3JpcGNpb25cIixcblx0XHRcdFx0XHRldGlxdWV0YTogXCJldGlxdWV0YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzogXCJrZXZpbmFuZHJlc29ydGl6bWVyY2hhbjExMUBnbWFpbC5jb21cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgveW91IGNhbid0IGVkaXQgdGhpcyB0YWcsIGJlY2F1c2Ugb3RoZXIgdXNlcnMgYXJlIHVzaW5nIHRoZSBzYW1lIHRhZy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBubyBwb2RlciBlbGltaW5hciB1bmEgZXRpcXVldGEgZGUgY29ycmVjY2lvbiB5YSBxdWUgb3Ryb3MgXCIgK1xuXHRcdFwidXN1YXJpb3MgbGEgZXN0YW4gdXNhbmRvIFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlbGltaW5hckV0aXF1ZXRhQ29ycmVjY2lvbnRvUHJlZ3VudGEoJGlkRXRpcXVldGFDb3JyZWNjaW9uOiBTdHJpbmcsIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRjb3JyZW9Vc3VhcmlvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0ZWxpbWluYXJFdGlxdWV0YUNvcnJlY2Npb25QcmVndW50YShpZEV0aXF1ZXRhQ29ycmVjY2lvbjogJGlkRXRpcXVldGFDb3JyZWNjaW9uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8pe1xuXHRcdFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHRldGlxdWV0YVx0XHRcblx0XHRcdFx0XHRcdH1cdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZEV0aXF1ZXRhQ29ycmVjY2lvbjogXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2VcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC95b3UgY2FuJ3QgZWRpdCB0aGlzIHRhZywgYmVjYXVzZSBvdGhlciB1c2VycyBhcmUgdXNpbmcgdGhlIHNhbWUgdGFnLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgbm8gcG9kZXIgZWxpbWluYXIgdW5hIGV0aXF1ZXRhIHF1ZSBubyBoZSBjcmVhZG8gXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVsaW1pbmFyRXRpcXVldGFDb3JyZWNjaW9uUHJlZ3VudGEoJGlkRXRpcXVldGFDb3JyZWNjaW9uOiBTdHJpbmcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JGNvcnJlb1VzdWFyaW86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRlbGltaW5hckV0aXF1ZXRhQ29ycmVjY2lvblByZWd1bnRhKGlkRXRpcXVldGFDb3JyZWNjaW9uOiAkaWRFdGlxdWV0YUNvcnJlY2Npb24sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOiAkY29ycmVvVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdGV0aXF1ZXRhXHRcdFxuXHRcdFx0XHRcdFx0fVx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRXRpcXVldGFDb3JyZWNjaW9uOiBcIjVhZDI2Y2I2ZGMxMzc5NzI4OTM3MWM4MFwiLFxuXHRcdFx0XHRcdGNvcnJlb1VzdWFyaW86IFwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW40NTZAZ21haWwuY29tXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UpLnRvTWF0Y2goL3lvdSBjYW4ndCBlZGl0IHRoaXMgdGFnIGJlY2F1c2UgeW91IGFyZSBub3QgdGhlIG93bmVyLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgZWxpbWluYXIgdW5hIGV0aXF1ZXRhIHF1ZSBoZSBjcmVhZG8sIHBlcm8gbmFkaWUgaGEgdXNhZG8gIFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlbGltaW5hckV0aXF1ZXRhQ29ycmVjY2lvblByZWd1bnRhKCRpZEV0aXF1ZXRhQ29ycmVjY2lvbjogU3RyaW5nLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRjb3JyZW9Vc3VhcmlvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0ZWxpbWluYXJFdGlxdWV0YUNvcnJlY2Npb25QcmVndW50YShpZEV0aXF1ZXRhQ29ycmVjY2lvbjogJGlkRXRpcXVldGFDb3JyZWNjaW9uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8pe1xuXHRcdFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHRldGlxdWV0YVx0XHRcblx0XHRcdFx0XHRcdH1cdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZEV0aXF1ZXRhQ29ycmVjY2lvbjogXCI1YWQyN2FkMTYwNGJjNDdkOWQ3NzVmN2VcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lbGltaW5hckV0aXF1ZXRhQ29ycmVjY2lvblByZWd1bnRhLmV0aXF1ZXRhKS50b01hdGNoKC9ldGlxdWV0YSBkZSBlamVtcGxvLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgdmVyIGVsIGxpc3RhZG8gZGUgZXRpcXVldGFzIGRlIGNvcnJlY2Npb25lcyBwb3IgaWRpb21hXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhZG9FdGlxdWV0YXNDb3JyZWNjaW9uZXMoJGlkaW9tYTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ICBsaXN0YWRvRXRpcXVldGFzQ29ycmVjY2lvbmVzKGlkaW9tYTogJGlkaW9tYSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZGlvbWE6XCJlblwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5saXN0YWRvRXRpcXVldGFzQ29ycmVjY2lvbmVzWzBdLnVzdWFyaW9wcm9waWV0YXJpby5ub21icmUpLnRvTWF0Y2goL0tldmluLyk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhZG9FdGlxdWV0YXNDb3JyZWNjaW9uZXMubGVuZ3RoKS50b0JlKDMpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiRGViZXJpYSB2ZXIgdW4gbWVuc2FqZSBkZSBlcnJvciBpbmRpY2FuZG8gcXVlIGRlYmVyaWEgZXhpc3RpciBlbCBpZGlvbWEgZW4gcXVlIHF1aWVybyBxdWUgc2UgY2FyZ3VlbiBcIiArXG5cdFx0XCJsYXMgZXRpcXVldGFzXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhZG9FdGlxdWV0YXNDb3JyZWNjaW9uZXMoJGlkaW9tYTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ICBsaXN0YWRvRXRpcXVldGFzQ29ycmVjY2lvbmVzKGlkaW9tYTogJGlkaW9tYSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZGlvbWE6XCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgvaXMgbmVjY2Vzc2FyeSBhIGxlbmd1YWdlIHRvIGZpbHRlciB0YWdzLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBsaXN0YWRvRXRpcXVldGFzQ29ycmVjY2lvbmVzKCRpZGlvbWE6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgbGlzdGFkb0V0aXF1ZXRhc0NvcnJlY2Npb25lcyhpZGlvbWE6ICRpZGlvbWEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRpb21hOm51bGxcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UpLnRvTWF0Y2goL2lzIG5lY2Nlc3NhcnkgYSBsZW5ndWFnZSB0byBmaWx0ZXIgdGFncy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgbGlzdGFkb0V0aXF1ZXRhc0NvcnJlY2Npb25lcygkaWRpb21hOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHQgIGxpc3RhZG9FdGlxdWV0YXNDb3JyZWNjaW9uZXMoaWRpb21hOiAkaWRpb21hKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvcHJvcGlldGFyaW8ge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Y29sb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkaW9tYTp1bmRlZmluZWRcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UpLnRvTWF0Y2goL2lzIG5lY2Nlc3NhcnkgYSBsZW5ndWFnZSB0byBmaWx0ZXIgdGFncy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciBlbCBsaXN0YWRvIGRlIHRvZGFzIGxhcyBldGlxdWV0YXMgY3VhbmRvIG5vIGluZ3Jlc28gbmluZ3VuIGNhcmFjdGVyXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGZpbHRyYXJFdGlxdWV0YXNDb3JyZWNjaW9uZXMoJGlkaW9tYTogU3RyaW5nLCAkY2FyYWN0ZXI6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgZmlsdHJhckV0aXF1ZXRhc0NvcnJlY2Npb25lcyhpZGlvbWE6ICRpZGlvbWEsIGNhcmFjdGVyOiAkY2FyYWN0ZXIpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRpb21hOlwiZW5cIixcblx0XHRcdFx0XHRjYXJhY3RlcjogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZmlsdHJhckV0aXF1ZXRhc0NvcnJlY2Npb25lcy5sZW5ndGgpLnRvQmUoMyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgdmVyIGVsIGxpc3RhZG8gZGUgdW5hIGV0aXF1ZXRhIGN1YW5kbyBpbmdyZXNvIHVuIGNhcmFjdGVyXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGZpbHRyYXJFdGlxdWV0YXNDb3JyZWNjaW9uZXMoJGlkaW9tYTogU3RyaW5nLCAkY2FyYWN0ZXI6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgZmlsdHJhckV0aXF1ZXRhc0NvcnJlY2Npb25lcyhpZGlvbWE6ICRpZGlvbWEsIGNhcmFjdGVyOiAkY2FyYWN0ZXIpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRjb2xvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRpb21hOlwiZW5cIixcblx0XHRcdFx0XHRjYXJhY3RlcjogXCJleHRlbnNhXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmZpbHRyYXJFdGlxdWV0YXNDb3JyZWNjaW9uZXMubGVuZ3RoKS50b0JlKDEpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciBsb3MgMTAgcHJpbWVyYXMgZXRpcXVldGFzIHF1ZSB5byBoZSBkZXNhcnJvbGxhZG8sIHNpbiBuaW5ndW4gZmlsdHJvXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGZpbHRyYXJNeUV0aXF1ZXRhc0NvcnJlY2Npb25lcygkdXN1YXJpb19JRDogU3RyaW5nISwgJGxpbWl0OiBJbnQpe1xuXHRcdFx0XHRcdFx0XHQgIGZpbHRyYXJNeUV0aXF1ZXRhc0NvcnJlY2Npb25lcyh1c3VhcmlvX0lEOiAkdXN1YXJpb19JRCwgbGltaXQ6ICRsaW1pdCl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGNvbG9yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHR1c3VhcmlvX0lEOlwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0bGltaXQ6IDBcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmZpbHRyYXJNeUV0aXF1ZXRhc0NvcnJlY2Npb25lcy5sZW5ndGgpLnRvQmUoMyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBmaWx0cmFyTXlFdGlxdWV0YXNDb3JyZWNjaW9uZXMoJHVzdWFyaW9fSUQ6IFN0cmluZyEsICRsaW1pdDogSW50LCAkY2FyYWN0ZXI6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgZmlsdHJhck15RXRpcXVldGFzQ29ycmVjY2lvbmVzKHVzdWFyaW9fSUQ6ICR1c3VhcmlvX0lELCBsaW1pdDogJGxpbWl0LCBjYXJhY3RlcjogJGNhcmFjdGVyKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvcHJvcGlldGFyaW8ge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Y29sb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdHVzdWFyaW9fSUQ6XCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRsaW1pdDogMSxcblx0XHRcdFx0XHRjYXJhY3RlcjogXCJleHRlbnNhXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmZpbHRyYXJNeUV0aXF1ZXRhc0NvcnJlY2Npb25lcy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFxuXHR9KTtcblxufSk7Il19