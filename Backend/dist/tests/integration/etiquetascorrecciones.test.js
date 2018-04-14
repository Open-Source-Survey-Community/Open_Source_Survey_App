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
					etiqueta: "pregunta muy extensa"
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
					etiqueta: "pregunta repetida"
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
					etiqueta: "pregunta repetida"
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
					etiqueta: "Pregunta Repetida"
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
					etiqueta: "Pregunta Repetida de encuesta"
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaEtiquetaCorrecciones.etiqueta).toMatch(/Pregunta Repetida de encuesta/);
			done();
		});
	});
});
//# sourceMappingURL=etiquetascorrecciones.test.js.map