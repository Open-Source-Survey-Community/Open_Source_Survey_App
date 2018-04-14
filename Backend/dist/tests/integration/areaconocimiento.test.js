"use strict";

/* eslint-disable quotes,no-undef */

var tester = require('graphql-tester').tester;

describe("Modelo area-conocimiento", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("deberia poder crear un nuevo area de conocimiento ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaAreaConocimiento($etiqueta: conocimiento!){\n\t\t\t\t\t\t\tcrearNuevaAreaConocimiento(etiqueta: $etiqueta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				etiqueta: {
					usuariopropietario: "5ac248c98a3f74223f16895e",
					titulo: "calculo1",
					descripcion: "ejemplo de descripcion de calculo",
					idioma: "es"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaAreaConocimiento.titulo).toMatch(/calculo1/);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation crearNuevaAreaConocimiento($etiqueta: conocimiento!){\n\t\t\t\t\t\t\tcrearNuevaAreaConocimiento(etiqueta: $etiqueta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				etiqueta: {
					usuariopropietario: "5ac24c758e4a6a23d4869ac7",
					titulo: "geometria2",
					descripcion: "ejemplo de descripcion de  geometria2",
					idioma: "es"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaAreaConocimiento.titulo).toMatch(/geometria/);
			done();
		});
	});
	it("Deberia no poder editar un area de conocimiento que no he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarAreaConocimientoPregunta($id: String, $titulo: String, \n\t\t\t\t\t\t\t\t$descripcion: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teditarAreaConocimientoPregunta(id: $id, titulo: $titulo, \n\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55975",
				titulo: "ejemplo1",
				descripcion: "ejemplo de descripcion",
				idioma: "en",
				correo: "kevinandresortizmerchan@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("Deberia poder editar un area de conocimiento que he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarAreaConocimientoPregunta($id: String, $titulo: String, \n\t\t\t\t\t\t\t\t$descripcion: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teditarAreaConocimientoPregunta(id: $id, titulo: $titulo, \n\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55975",
				titulo: "ejemplo editada",
				descripcion: "ejemplo de descripcioneditada",
				idioma: "en",
				correo: "kevinandresortizmerchan111@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia no poder eliminar un area de conocimiento que no he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarAreaConocimientoPregunta($id: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teliminarAreaConocimientoPregunta(id: $id,  idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55975",
				idioma: "en",
				correo: "kevinandresortizmerchan@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});

	it("Deberia poder eliminar un area de conocimiento que he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarAreaConocimientoPregunta($id: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teliminarAreaConocimientoPregunta(id: $id,  idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55976",
				idioma: "en",
				correo: "kevinandresortizmerchan@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.eliminarAreaConocimientoPregunta.usuariopropietario.nombre).toMatch(/kevin/);
			done();
		});
	});

	it("Listar todas las areas de conocimiento basadas en un idioma ", function (done) {
		self.test(JSON.stringify({
			query: "query listadoAreaConocimiento($idioma: String){\n\t\t\t\t\t\t\tlistadoAreaConocimiento(idioma: $idioma){\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\t\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: "es"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoAreaConocimiento.length).toBe(2);
			done();
		});
	});

	it("filtrar todas las areas de conocimiento basadas en un idioma y por un caracter ", function (done) {
		self.test(JSON.stringify({
			query: "query filtrarAreasConocimiento($idioma: String, $caracter: String){\n\t\t\t\t\t\t\tfiltrarAreasConocimiento(idioma: $idioma, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\t\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				caracter: "g",
				idioma: "es"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarAreasConocimiento.length).toBe(1);
			done();
		});
		self.test(JSON.stringify({
			query: "query filtrarAreasConocimiento($idioma: String, $caracter: String){\n\t\t\t\t\t\t\tfiltrarAreasConocimiento(idioma: $idioma, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\t\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				caracter: "",
				idioma: "es"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarAreasConocimiento.length).toBe(2);
			done();
		});
	});
});
//# sourceMappingURL=areaconocimiento.test.js.map