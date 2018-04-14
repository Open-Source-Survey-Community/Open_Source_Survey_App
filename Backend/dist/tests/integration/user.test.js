"use strict";

/* eslint-disable quotes */
var tester = require('graphql-tester').tester;

/* eslint-disable no-undef */
describe("Modelo usuario", function () {

	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("El usuario deberia registrarse como nuevo usuario en la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearUsuario($correo: String!, $nombre: String,\n\t\t\t\t\t\t$urlImage: String, $rol: String, $acciones: String){\n\t\t\t\t\t\t\tcrearUsuario(correo: $correo,nombre: $nombre, urlImage: $urlImage,\n\t\t\t\t\t\t\t \t\t\t\trol: $rol, acciones: $acciones){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				correo: 'kevinandresortizmerchan@gmail.com',
				nombre: 'kevin Ortiz Merchan',
				urlImage: 'no image',
				rol: 'usuario',
				acciones: 'crear pregunta, crear encuesta, creacion contenido'
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearUsuario.nombre).toMatch(/kevin Ortiz/);
			expect(response.data.crearUsuario.correo).toMatch(/kevinandresortizmerchan@gmail.com/);
			done();
		});
	});
	it("El usuario deberia autenticarse como usuario existente en la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearUsuario($correo: String!, $nombre: String,\n\t\t\t\t\t\t$urlImage: String, $rol: String, $acciones: String){\n\t\t\t\t\t\t\tcrearUsuario(correo: $correo,nombre: $nombre, urlImage: $urlImage,\n\t\t\t\t\t\t\t \t\t\t\trol: $rol, acciones: $acciones){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				correo: 'kevinandresortizmerchan@gmail.com',
				nombre: 'kevin Ortiz Merchan',
				urlImage: 'no image',
				rol: 'usuario',
				acciones: 'crear pregunta, crear encuesta, creacion contenido'
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearUsuario.nombre).toMatch(/kevin Ortiz/);
			expect(response.data.crearUsuario.correo).toMatch(/kevinandresortizmerchan@gmail.com/);
			done();
		});
	});
	it("el usuario deberia add image a su coleccion en la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation addImage($id: String, $imagen: String){\n\t\t\t\t\t\t\taddImage(id: $id,imagen: $imagen){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\turlImage\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				imagen: "imagen2"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.addImage.urlImage).toMatch(/imagen2/);
			done();
		});
	});
	it("el usuario no deberia add image si no existe un id", function (done) {
		self.test(JSON.stringify({
			query: "mutation addImage($id: String, $imagen: String){\n\t\t\t\t\t\t\taddImage(id: $id,imagen: $imagen){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\turlImage\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "",
				imagen: "imagen2"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.addImage).toBe(null);
			done();
		});
	});
	it("el usuario deberia actualizar el apellido de la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarApellido($id: String, $apellido: String){\n\t\t\t\t\t\t\teditarApellido(id: $id,apellido: $apellido){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tapellido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				apellido: "Ortiz Merchan"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarApellido.apellido).toMatch(/Ortiz Merchan/);
			done();
		});
	});
	it("un usuario no podria actualizar el apellido de la base de datos si el id es null o vacio", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarApellido($id: String, $apellido: String){\n\t\t\t\t\t\t\teditarApellido(id: $id,apellido: $apellido){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tapellido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: undefined,
				apellido: "Andres Merchan"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarApellido).toBe(null);
			done();
		});
	});

	it("un usuario no deberia actualizar su apellido si el campo esta vacio o es nulo", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarApellido($id: String, $apellido: String){\n\t\t\t\t\t\t\teditarApellido(id: $id,apellido: $apellido){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tapellido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				apellido: null
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarApellido).toBe(null);
			done();
		});
	});

	it("un usuario deberia actualizar el nombre en la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				nombre: "Kevin Andres"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario.nombre).toMatch(/Andres/);
			done();
		});
	});

	it("un usuario no deberia actualizar un nombre en la base de datos si el id es nulo o el nombre que envia es nula", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "",
				nombre: "Kevin Andres"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: null,
				nombre: "Kevin Andres"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: undefined,
				nombre: "Kevin Andres"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				nombre: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				nombre: null
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				nombre: undefined
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarNombreUsuario($id: String, $nombre: String){\n\t\t\t\t\t\t\teditarNombreUsuario(id: $id,nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: undefined,
				nombre: undefined
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarNombreUsuario).toBe(null);
			done();
		});
	});

	it("un usuario deberia actualizar el wiki o biografia en la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation addWiki($id: String, $wiki: String){\n\t\t\t\t\t\t\taddWiki(id: $id,wiki: $wiki){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\twiki\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				wiki: "es una wiki de ejemplo"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.addWiki.wiki).toMatch(/es una wiki/);
			done();
		});
	});

	it("un usuario no deberia actualizar el wiki o biografia en la base de datos si el id es nulo o la" + "biografia es nula", function (done) {
		self.test(JSON.stringify({
			query: "mutation addWiki($id: String, $wiki: String){\n\t\t\t\t\t\t\taddWiki(id: $id,wiki: $wiki){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\twiki\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: null,
				wiki: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.addWiki).toBe(null);
			done();
		});
	});

	it("un usuario deberia actualizar el area academica en la base de datos", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarAreaAcademica($id: String, $area_academica: String){\n\t\t\t\t\t\t\teditarAreaAcademica(id: $id,area_academica: $area_academica){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tarea_academica\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				area_academica: "ingeniero en computacion"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarAreaAcademica.area_academica).toMatch(/computacion/);
			done();
		});
	});

	it("un usuario no deberia actualizar el area academica en la base de datos si el id es nulo", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarAreaAcademica($id: String, $area_academica: String){\n\t\t\t\t\t\t\teditarAreaAcademica(id: $id,area_academica: $area_academica){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tarea_academica\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: null,
				area_academica: "ingeniero en mecanica"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarAreaAcademica).toBe(null);
			done();
		});
	});
	it("un usuario deberia actualizar el grado academico en la base de datos ", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){\n\t\t\t\t\t\t\teditarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tgrado_academico\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				grado_academico: "ingeniero"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarGradoAcademicoUsuario.grado_academico).toMatch(/ingeniero/);
			done();
		});
	});

	it("un usuario no deberia actualizar el grado academico en la base de datos si el id es nulo 0" + "el grado academica es nulo ", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){\n\t\t\t\t\t\t\teditarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tgrado_academico\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "",
				grado_academico: "ingeniero"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarGradoAcademicoUsuario).toBe(null);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){\n\t\t\t\t\t\t\teditarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tgrado_academico\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: null,
				grado_academico: "ingeniero"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarGradoAcademicoUsuario).toBe(null);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){\n\t\t\t\t\t\t\teditarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tgrado_academico\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: undefined,
				grado_academico: "ingeniero"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarGradoAcademicoUsuario).toBe(null);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation editarGradoAcademicoUsuario($id: String, $grado_academico: String!){\n\t\t\t\t\t\t\teditarGradoAcademicoUsuario(id: $id,grado_academico: $grado_academico){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tgrado_academico\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				grado_academico: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarGradoAcademicoUsuario.grado_academico).toMatch("");
			done();
		});
	});
	it("un usuario deberia anadir a una institucion que pertenece en la base de datos ", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarInstitucionUsuario($id: String, $institucion: String!){\n\t\t\t\t\t\t\teditarInstitucionUsuario(id: $id,institucion: $institucion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tinstitucion\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e",
				institucion: "Escuela Superior Politecnica del Litoral"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarInstitucionUsuario.institucion).toMatch(/Escuela Superior/);
			done();
		});
	});
	it("un usuario no deberia anadir a una institucion que pertenece en la base de datos si el id es nulo", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarInstitucionUsuario($id: String, $institucion: String!){\n\t\t\t\t\t\t\teditarInstitucionUsuario(id: $id,institucion: $institucion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tinstitucion\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "",
				institucion: "Escuela Superior Politecnica del Litoral"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarInstitucionUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarInstitucionUsuario($id: String, $institucion: String!){\n\t\t\t\t\t\t\teditarInstitucionUsuario(id: $id,institucion: $institucion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tinstitucion\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: null,
				institucion: "Escuela Superior Politecnica del Litoral"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarInstitucionUsuario).toBe(null);
			done();
		});
		self.test(JSON.stringify({
			query: "mutation editarInstitucionUsuario($id: String, $institucion: String!){\n\t\t\t\t\t\t\teditarInstitucionUsuario(id: $id,institucion: $institucion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tinstitucion\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: undefined,
				institucion: "Escuela Superior Politecnica del Litoral"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarInstitucionUsuario).toBe(null);
			done();
		});
	});

	it("un usuario deberia mostrar informacion aerca del perfil del Usuario", function (done) {
		self.test(JSON.stringify({
			query: "query mostrarPerfilUsuario($id: String){\n\t\t\t\t\t\t\tmostrarPerfilUsuario(id: $id){\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: "5ac248c98a3f74223f16895e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.mostrarPerfilUsuario.nombre).toMatch(/Kevin/);
			done();
		});
	});
	it("un usuario no podria ver su informacion si el id es nulo", function (done) {
		self.test(JSON.stringify({
			query: "query mostrarPerfilUsuario($id: String){\n\t\t\t\t\t\t\tmostrarPerfilUsuario(id: $id){\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				id: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.mostrarPerfilUsuario).toBe(null);
			done();
		});
	});
	it("deveria devolver un array de usuario filtrados sin ningun caracter", function (done) {
		self.test(JSON.stringify({
			query: "query listaUsuariosByName($nombre: String){\n\t\t\t\t\t\t\tlistaUsuariosByName(nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				nombre: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listaUsuariosByName.length).toBe(2);
			done();
		});
	});

	it("deveria devolver un array de usuario filtrados con un caracter", function (done) {
		self.test(JSON.stringify({
			query: "query listaUsuariosByName($nombre: String){\n\t\t\t\t\t\t\tlistaUsuariosByName(nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				nombre: "M"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listaUsuariosByName.length).toBe(1);
			done();
		});
	});

	it("deveria devolver un array de usuario filtrados con mas de un  caracter", function (done) {
		self.test(JSON.stringify({
			query: "query listaUsuariosByName($nombre: String){\n\t\t\t\t\t\t\tlistaUsuariosByName(nombre: $nombre){\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				nombre: "KEVIN"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listaUsuariosByName.length).toBe(2);
			done();
		});
	});

	it("deveria devolver un array de usuario de Usuarios", function (done) {
		self.test(JSON.stringify({
			query: "query listarTodosUsuarios{\n\t\t\t\t\t\t\tlistarTodosUsuarios{\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}"
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listarTodosUsuarios.length).toBe(2);
			done();
		});
	});
});
//# sourceMappingURL=user.test.js.map