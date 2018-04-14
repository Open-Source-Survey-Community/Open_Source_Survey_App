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
				idEtiquetaCorreccion: "5ad26cb6dc13797289371c80",
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
});
//# sourceMappingURL=etiquetascorrecciones.test.js.map