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
				correo: 'juanpedro@gmail.com',
				nombre: 'juan pedro',
				urlImage: 'no image',
				rol: 'comite',
				acciones: 'crear pregunta, crear encuesta, creacion contenido'
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearUsuario.nombre).toMatch(/juan pedro/);
			expect(response.data.crearUsuario.correo).toMatch(/juanpedro@gmail.com/);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2ludGVncmF0aW9uL3VzZXIudGVzdC5qcyJdLCJuYW1lcyI6WyJ0ZXN0ZXIiLCJyZXF1aXJlIiwiZGVzY3JpYmUiLCJzZWxmIiwidGVzdCIsInVybCIsImNvbnRlbnRUeXBlIiwiaXQiLCJkb25lIiwiSlNPTiIsInN0cmluZ2lmeSIsInF1ZXJ5IiwidmFyaWFibGVzIiwiY29ycmVvIiwibm9tYnJlIiwidXJsSW1hZ2UiLCJyb2wiLCJhY2Npb25lcyIsInRoZW4iLCJleHBlY3QiLCJyZXNwb25zZSIsInN0YXR1cyIsInRvQmUiLCJzdWNjZXNzIiwiZGF0YSIsImNyZWFyVXN1YXJpbyIsInRvTWF0Y2giLCJpZCIsImltYWdlbiIsImFkZEltYWdlIiwiYXBlbGxpZG8iLCJlZGl0YXJBcGVsbGlkbyIsInVuZGVmaW5lZCIsImVkaXRhck5vbWJyZVVzdWFyaW8iLCJ3aWtpIiwiYWRkV2lraSIsImFyZWFfYWNhZGVtaWNhIiwiZWRpdGFyQXJlYUFjYWRlbWljYSIsImdyYWRvX2FjYWRlbWljbyIsImVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbyIsImluc3RpdHVjaW9uIiwiZWRpdGFySW5zdGl0dWNpb25Vc3VhcmlvIiwibW9zdHJhclBlcmZpbFVzdWFyaW8iLCJsaXN0YVVzdWFyaW9zQnlOYW1lIiwibGVuZ3RoIiwibGlzdGFyVG9kb3NVc3VhcmlvcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU1BLFNBQVNDLFFBQVEsZ0JBQVIsRUFBMEJELE1BQXpDOztBQUVBO0FBQ0FFLFNBQVMsZ0JBQVQsRUFBMkIsWUFBVzs7QUFFckMsS0FBTUMsT0FBTyxJQUFiO0FBQ0FBLE1BQUtDLElBQUwsR0FBWUosT0FBTztBQUNsQkssT0FBSyxpQ0FEYTtBQUVsQkMsZUFBYTtBQUZLLEVBQVAsQ0FBWjtBQUlBQyxJQUFJLHVFQUFKLEVBQTRFLFVBQUNDLElBQUQsRUFBUTtBQUNuRkwsT0FDRUMsSUFERixDQUNPSyxLQUFLQyxTQUFMLENBQWU7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QUNBSCxVQUFPQyxTQUFTSSxJQUFULENBQWNtQixtQkFBZCxDQUFrQ0MsTUFBekMsRUFBaUR0QixJQUFqRCxDQUFzRCxDQUF0RDtBQUNBZDtBQUNBLEdBaEJGO0FBa0JBLEVBbkJEOztBQXFCQUQsSUFBSSxrREFBSixFQUF1RCxVQUFDQyxJQUFELEVBQVE7QUFDOURMLE9BQ0VDLElBREYsQ0FDT0ssS0FBS0MsU0FBTCxDQUFlO0FBQ3BCQztBQURvQixHQUFmLENBRFAsRUFRRU8sSUFSRixDQVFPLG9CQUFZO0FBQ2pCQyxVQUFPQyxTQUFTQyxNQUFoQixFQUF3QkMsSUFBeEIsQ0FBNkIsR0FBN0I7QUFDQUgsVUFBT0MsU0FBU0csT0FBaEIsRUFBeUJELElBQXpCLENBQThCLElBQTlCO0FBQ0FILFVBQU9DLFNBQVNJLElBQVQsQ0FBY3FCLG1CQUFkLENBQWtDRCxNQUF6QyxFQUFpRHRCLElBQWpELENBQXNELENBQXREO0FBQ0FkO0FBQ0EsR0FiRjtBQWVBLEVBaEJEO0FBbUJBLENBN3RCRCIsImZpbGUiOiJ1c2VyLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBxdW90ZXMgKi9cbmNvbnN0IHRlc3RlciA9IHJlcXVpcmUoJ2dyYXBocWwtdGVzdGVyJykudGVzdGVyO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuZGVzY3JpYmUoXCJNb2RlbG8gdXN1YXJpb1wiLCBmdW5jdGlvbiAoKXtcblxuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0aXQgKFwiRWwgdXN1YXJpbyBkZWJlcmlhIHJlZ2lzdHJhcnNlIGNvbW8gbnVldm8gdXN1YXJpbyBlbiBsYSBiYXNlIGRlIGRhdG9zXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGNyZWFyVXN1YXJpbygkY29ycmVvOiBTdHJpbmchLCAkbm9tYnJlOiBTdHJpbmcsXG5cdFx0XHRcdFx0XHQkdXJsSW1hZ2U6IFN0cmluZywgJHJvbDogU3RyaW5nLCAkYWNjaW9uZXM6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGNyZWFyVXN1YXJpbyhjb3JyZW86ICRjb3JyZW8sbm9tYnJlOiAkbm9tYnJlLCB1cmxJbWFnZTogJHVybEltYWdlLFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRyb2w6ICRyb2wsIGFjY2lvbmVzOiAkYWNjaW9uZXMpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdG5vbWJyZVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0Y29ycmVvOiAnanVhbnBlZHJvQGdtYWlsLmNvbScsXG5cdFx0XHRcdFx0bm9tYnJlOiAnanVhbiBwZWRybycsXG5cdFx0XHRcdFx0dXJsSW1hZ2U6ICdubyBpbWFnZScsXG5cdFx0XHRcdFx0cm9sOiAnY29taXRlJyxcblx0XHRcdFx0XHRhY2Npb25lczogJ2NyZWFyIHByZWd1bnRhLCBjcmVhciBlbmN1ZXN0YSwgY3JlYWNpb24gY29udGVuaWRvJ1xuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJVc3VhcmlvLm5vbWJyZSkudG9NYXRjaCgvanVhbiBwZWRyby8pO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclVzdWFyaW8uY29ycmVvKS50b01hdGNoKC9qdWFucGVkcm9AZ21haWwuY29tLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQgKFwiRWwgdXN1YXJpbyBkZWJlcmlhIGF1dGVudGljYXJzZSBjb21vIHVzdWFyaW8gZXhpc3RlbnRlIGVuIGxhIGJhc2UgZGUgZGF0b3NcIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJVc3VhcmlvKCRjb3JyZW86IFN0cmluZyEsICRub21icmU6IFN0cmluZyxcblx0XHRcdFx0XHRcdCR1cmxJbWFnZTogU3RyaW5nLCAkcm9sOiBTdHJpbmcsICRhY2Npb25lczogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJVc3VhcmlvKGNvcnJlbzogJGNvcnJlbyxub21icmU6ICRub21icmUsIHVybEltYWdlOiAkdXJsSW1hZ2UsXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdHJvbDogJHJvbCwgYWNjaW9uZXM6ICRhY2Npb25lcyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0bm9tYnJlXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRjb3JyZW86ICdrZXZpbmFuZHJlc29ydGl6bWVyY2hhbkBnbWFpbC5jb20nLFxuXHRcdFx0XHRcdG5vbWJyZTogJ2tldmluIE9ydGl6IE1lcmNoYW4nLFxuXHRcdFx0XHRcdHVybEltYWdlOiAnbm8gaW1hZ2UnLFxuXHRcdFx0XHRcdHJvbDogJ3VzdWFyaW8nLFxuXHRcdFx0XHRcdGFjY2lvbmVzOiAnY3JlYXIgcHJlZ3VudGEsIGNyZWFyIGVuY3Vlc3RhLCBjcmVhY2lvbiBjb250ZW5pZG8nXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclVzdWFyaW8ubm9tYnJlKS50b01hdGNoKC9rZXZpbiBPcnRpei8pO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclVzdWFyaW8uY29ycmVvKS50b01hdGNoKC9rZXZpbmFuZHJlc29ydGl6bWVyY2hhbkBnbWFpbC5jb20vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdCAoXCJlbCB1c3VhcmlvIGRlYmVyaWEgYWRkIGltYWdlIGEgc3UgY29sZWNjaW9uIGVuIGxhIGJhc2UgZGUgZGF0b3NcIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gYWRkSW1hZ2UoJGlkOiBTdHJpbmcsICRpbWFnZW46IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGFkZEltYWdlKGlkOiAkaWQsaW1hZ2VuOiAkaW1hZ2VuKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1cmxJbWFnZVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0aW1hZ2VuOiBcImltYWdlbjJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuYWRkSW1hZ2UudXJsSW1hZ2UpLnRvTWF0Y2goL2ltYWdlbjIvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdCAoXCJlbCB1c3VhcmlvIG5vIGRlYmVyaWEgYWRkIGltYWdlIHNpIG5vIGV4aXN0ZSB1biBpZFwiLChkb25lKT0+e1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBhZGRJbWFnZSgkaWQ6IFN0cmluZywgJGltYWdlbjogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0YWRkSW1hZ2UoaWQ6ICRpZCxpbWFnZW46ICRpbWFnZW4pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVybEltYWdlXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCJcIixcblx0XHRcdFx0XHRpbWFnZW46IFwiaW1hZ2VuMlwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5hZGRJbWFnZSkudG9CZShudWxsKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdCAoXCJlbCB1c3VhcmlvIGRlYmVyaWEgYWN0dWFsaXphciBlbCBhcGVsbGlkbyBkZSBsYSBiYXNlIGRlIGRhdG9zXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckFwZWxsaWRvKCRpZDogU3RyaW5nLCAkYXBlbGxpZG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckFwZWxsaWRvKGlkOiAkaWQsYXBlbGxpZG86ICRhcGVsbGlkbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0YXBlbGxpZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdGFwZWxsaWRvOiBcIk9ydGl6IE1lcmNoYW5cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyQXBlbGxpZG8uYXBlbGxpZG8pLnRvTWF0Y2goL09ydGl6IE1lcmNoYW4vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdCAoXCJ1biB1c3VhcmlvIG5vIHBvZHJpYSBhY3R1YWxpemFyIGVsIGFwZWxsaWRvIGRlIGxhIGJhc2UgZGUgZGF0b3Mgc2kgZWwgaWQgZXMgbnVsbCBvIHZhY2lvXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckFwZWxsaWRvKCRpZDogU3RyaW5nLCAkYXBlbGxpZG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckFwZWxsaWRvKGlkOiAkaWQsYXBlbGxpZG86ICRhcGVsbGlkbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0YXBlbGxpZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0YXBlbGxpZG86IFwiQW5kcmVzIE1lcmNoYW5cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyQXBlbGxpZG8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdCAoXCJ1biB1c3VhcmlvIG5vIGRlYmVyaWEgYWN0dWFsaXphciBzdSBhcGVsbGlkbyBzaSBlbCBjYW1wbyBlc3RhIHZhY2lvIG8gZXMgbnVsb1wiLChkb25lKT0+e1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJBcGVsbGlkbygkaWQ6IFN0cmluZywgJGFwZWxsaWRvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJBcGVsbGlkbyhpZDogJGlkLGFwZWxsaWRvOiAkYXBlbGxpZG8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGFwZWxsaWRvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRhcGVsbGlkbzogbnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyQXBlbGxpZG8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdCAoXCJ1biB1c3VhcmlvIGRlYmVyaWEgYWN0dWFsaXphciBlbCBub21icmUgZW4gbGEgYmFzZSBkZSBkYXRvc1wiLChkb25lKT0+e1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJOb21icmVVc3VhcmlvKCRpZDogU3RyaW5nLCAkbm9tYnJlOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJOb21icmVVc3VhcmlvKGlkOiAkaWQsbm9tYnJlOiAkbm9tYnJlKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdG5vbWJyZTogXCJLZXZpbiBBbmRyZXNcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyTm9tYnJlVXN1YXJpby5ub21icmUpLnRvTWF0Y2goL0FuZHJlcy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblxuXHRpdCAoXCJ1biB1c3VhcmlvIG5vIGRlYmVyaWEgYWN0dWFsaXphciB1biBub21icmUgZW4gbGEgYmFzZSBkZSBkYXRvcyBzaSBlbCBpZCBlcyBudWxvIG8gZWwgbm9tYnJlIHF1ZSBlbnZpYSBlcyBudWxhXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhck5vbWJyZVVzdWFyaW8oJGlkOiBTdHJpbmcsICRub21icmU6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhck5vbWJyZVVzdWFyaW8oaWQ6ICRpZCxub21icmU6ICRub21icmUpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdG5vbWJyZVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWQ6IFwiXCIsXG5cdFx0XHRcdFx0bm9tYnJlOiBcIktldmluIEFuZHJlc1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJOb21icmVVc3VhcmlvKS50b0JlKG51bGwpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyTm9tYnJlVXN1YXJpbygkaWQ6IFN0cmluZywgJG5vbWJyZTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyTm9tYnJlVXN1YXJpbyhpZDogJGlkLG5vbWJyZTogJG5vbWJyZSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0bm9tYnJlXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogbnVsbCxcblx0XHRcdFx0XHRub21icmU6IFwiS2V2aW4gQW5kcmVzXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhck5vbWJyZVVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJOb21icmVVc3VhcmlvKCRpZDogU3RyaW5nLCAkbm9tYnJlOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJOb21icmVVc3VhcmlvKGlkOiAkaWQsbm9tYnJlOiAkbm9tYnJlKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0bm9tYnJlOiBcIktldmluIEFuZHJlc1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJOb21icmVVc3VhcmlvKS50b0JlKG51bGwpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyTm9tYnJlVXN1YXJpbygkaWQ6IFN0cmluZywgJG5vbWJyZTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyTm9tYnJlVXN1YXJpbyhpZDogJGlkLG5vbWJyZTogJG5vbWJyZSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0bm9tYnJlXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRub21icmU6IFwiXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhck5vbWJyZVVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJOb21icmVVc3VhcmlvKCRpZDogU3RyaW5nLCAkbm9tYnJlOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJOb21icmVVc3VhcmlvKGlkOiAkaWQsbm9tYnJlOiAkbm9tYnJlKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdG5vbWJyZTogbnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyTm9tYnJlVXN1YXJpbykudG9CZShudWxsKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhck5vbWJyZVVzdWFyaW8oJGlkOiBTdHJpbmcsICRub21icmU6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhck5vbWJyZVVzdWFyaW8oaWQ6ICRpZCxub21icmU6ICRub21icmUpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdG5vbWJyZVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0bm9tYnJlOiB1bmRlZmluZWRcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhck5vbWJyZVVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJOb21icmVVc3VhcmlvKCRpZDogU3RyaW5nLCAkbm9tYnJlOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJOb21icmVVc3VhcmlvKGlkOiAkaWQsbm9tYnJlOiAkbm9tYnJlKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0bm9tYnJlOiB1bmRlZmluZWRcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhck5vbWJyZVVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdCAoXCJ1biB1c3VhcmlvIGRlYmVyaWEgYWN0dWFsaXphciBlbCB3aWtpIG8gYmlvZ3JhZmlhIGVuIGxhIGJhc2UgZGUgZGF0b3NcIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gYWRkV2lraSgkaWQ6IFN0cmluZywgJHdpa2k6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGFkZFdpa2koaWQ6ICRpZCx3aWtpOiAkd2lraSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0d2lraVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0d2lraTogXCJlcyB1bmEgd2lraSBkZSBlamVtcGxvXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmFkZFdpa2kud2lraSkudG9NYXRjaCgvZXMgdW5hIHdpa2kvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdGl0IChcInVuIHVzdWFyaW8gbm8gZGViZXJpYSBhY3R1YWxpemFyIGVsIHdpa2kgbyBiaW9ncmFmaWEgZW4gbGEgYmFzZSBkZSBkYXRvcyBzaSBlbCBpZCBlcyBudWxvIG8gbGFcIiArXG5cdFx0XCJiaW9ncmFmaWEgZXMgbnVsYVwiLChkb25lKT0+e1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBhZGRXaWtpKCRpZDogU3RyaW5nLCAkd2lraTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0YWRkV2lraShpZDogJGlkLHdpa2k6ICR3aWtpKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR3aWtpXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogbnVsbCxcblx0XHRcdFx0XHR3aWtpOiBcIlwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5hZGRXaWtpKS50b0JlKG51bGwpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblxuXHRpdCAoXCJ1biB1c3VhcmlvIGRlYmVyaWEgYWN0dWFsaXphciBlbCBhcmVhIGFjYWRlbWljYSBlbiBsYSBiYXNlIGRlIGRhdG9zXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckFyZWFBY2FkZW1pY2EoJGlkOiBTdHJpbmcsICRhcmVhX2FjYWRlbWljYTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyQXJlYUFjYWRlbWljYShpZDogJGlkLGFyZWFfYWNhZGVtaWNhOiAkYXJlYV9hY2FkZW1pY2Epe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGFyZWFfYWNhZGVtaWNhXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRhcmVhX2FjYWRlbWljYTogXCJpbmdlbmllcm8gZW4gY29tcHV0YWNpb25cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyQXJlYUFjYWRlbWljYS5hcmVhX2FjYWRlbWljYSkudG9NYXRjaCgvY29tcHV0YWNpb24vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdGl0IChcInVuIHVzdWFyaW8gbm8gZGViZXJpYSBhY3R1YWxpemFyIGVsIGFyZWEgYWNhZGVtaWNhIGVuIGxhIGJhc2UgZGUgZGF0b3Mgc2kgZWwgaWQgZXMgbnVsb1wiICwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyQXJlYUFjYWRlbWljYSgkaWQ6IFN0cmluZywgJGFyZWFfYWNhZGVtaWNhOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJBcmVhQWNhZGVtaWNhKGlkOiAkaWQsYXJlYV9hY2FkZW1pY2E6ICRhcmVhX2FjYWRlbWljYSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0YXJlYV9hY2FkZW1pY2FcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiBudWxsLFxuXHRcdFx0XHRcdGFyZWFfYWNhZGVtaWNhOiBcImluZ2VuaWVybyBlbiBtZWNhbmljYVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJBcmVhQWNhZGVtaWNhKS50b0JlKG51bGwpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQgKFwidW4gdXN1YXJpbyBkZWJlcmlhIGFjdHVhbGl6YXIgZWwgZ3JhZG8gYWNhZGVtaWNvIGVuIGxhIGJhc2UgZGUgZGF0b3MgXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbygkaWQ6IFN0cmluZywgJGdyYWRvX2FjYWRlbWljbzogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbyhpZDogJGlkLGdyYWRvX2FjYWRlbWljbzogJGdyYWRvX2FjYWRlbWljbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Z3JhZG9fYWNhZGVtaWNvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRncmFkb19hY2FkZW1pY286IFwiaW5nZW5pZXJvXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpby5ncmFkb19hY2FkZW1pY28pLnRvTWF0Y2goL2luZ2VuaWVyby8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblxuXHRpdCAoXCJ1biB1c3VhcmlvIG5vIGRlYmVyaWEgYWN0dWFsaXphciBlbCBncmFkbyBhY2FkZW1pY28gZW4gbGEgYmFzZSBkZSBkYXRvcyBzaSBlbCBpZCBlcyBudWxvIDBcIiArXG5cdFx0XCJlbCBncmFkbyBhY2FkZW1pY2EgZXMgbnVsbyBcIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyR3JhZG9BY2FkZW1pY29Vc3VhcmlvKCRpZDogU3RyaW5nLCAkZ3JhZG9fYWNhZGVtaWNvOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyR3JhZG9BY2FkZW1pY29Vc3VhcmlvKGlkOiAkaWQsZ3JhZG9fYWNhZGVtaWNvOiAkZ3JhZG9fYWNhZGVtaWNvKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRncmFkb19hY2FkZW1pY29cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiBcIlwiLFxuXHRcdFx0XHRcdGdyYWRvX2FjYWRlbWljbzogXCJpbmdlbmllcm9cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyR3JhZG9BY2FkZW1pY29Vc3VhcmlvKS50b0JlKG51bGwpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJHcmFkb0FjYWRlbWljb1VzdWFyaW8oJGlkOiBTdHJpbmcsICRncmFkb19hY2FkZW1pY286IFN0cmluZyEpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJHcmFkb0FjYWRlbWljb1VzdWFyaW8oaWQ6ICRpZCxncmFkb19hY2FkZW1pY286ICRncmFkb19hY2FkZW1pY28pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGdyYWRvX2FjYWRlbWljb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWQ6IG51bGwsXG5cdFx0XHRcdFx0Z3JhZG9fYWNhZGVtaWNvOiBcImluZ2VuaWVyb1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJHcmFkb0FjYWRlbWljb1VzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbygkaWQ6IFN0cmluZywgJGdyYWRvX2FjYWRlbWljbzogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbyhpZDogJGlkLGdyYWRvX2FjYWRlbWljbzogJGdyYWRvX2FjYWRlbWljbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Z3JhZG9fYWNhZGVtaWNvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdGdyYWRvX2FjYWRlbWljbzogXCJpbmdlbmllcm9cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyR3JhZG9BY2FkZW1pY29Vc3VhcmlvKS50b0JlKG51bGwpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbygkaWQ6IFN0cmluZywgJGdyYWRvX2FjYWRlbWljbzogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpbyhpZDogJGlkLGdyYWRvX2FjYWRlbWljbzogJGdyYWRvX2FjYWRlbWljbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Z3JhZG9fYWNhZGVtaWNvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRncmFkb19hY2FkZW1pY286IFwiXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhckdyYWRvQWNhZGVtaWNvVXN1YXJpby5ncmFkb19hY2FkZW1pY28pLnRvTWF0Y2goXCJcIik7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblx0fSk7XG5cdGl0IChcInVuIHVzdWFyaW8gZGViZXJpYSBhbmFkaXIgYSB1bmEgaW5zdGl0dWNpb24gcXVlIHBlcnRlbmVjZSBlbiBsYSBiYXNlIGRlIGRhdG9zIFwiLChkb25lKT0+e1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJJbnN0aXR1Y2lvblVzdWFyaW8oJGlkOiBTdHJpbmcsICRpbnN0aXR1Y2lvbjogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckluc3RpdHVjaW9uVXN1YXJpbyhpZDogJGlkLGluc3RpdHVjaW9uOiAkaW5zdGl0dWNpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGluc3RpdHVjaW9uXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRpbnN0aXR1Y2lvbjogXCJFc2N1ZWxhIFN1cGVyaW9yIFBvbGl0ZWNuaWNhIGRlbCBMaXRvcmFsXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhckluc3RpdHVjaW9uVXN1YXJpby5pbnN0aXR1Y2lvbikudG9NYXRjaCgvRXNjdWVsYSBTdXBlcmlvci8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQgKFwidW4gdXN1YXJpbyBubyBkZWJlcmlhIGFuYWRpciBhIHVuYSBpbnN0aXR1Y2lvbiBxdWUgcGVydGVuZWNlIGVuIGxhIGJhc2UgZGUgZGF0b3Mgc2kgZWwgaWQgZXMgbnVsb1wiICwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFySW5zdGl0dWNpb25Vc3VhcmlvKCRpZDogU3RyaW5nLCAkaW5zdGl0dWNpb246IFN0cmluZyEpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJJbnN0aXR1Y2lvblVzdWFyaW8oaWQ6ICRpZCxpbnN0aXR1Y2lvbjogJGluc3RpdHVjaW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbnN0aXR1Y2lvblx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWQ6IFwiXCIsXG5cdFx0XHRcdFx0aW5zdGl0dWNpb246IFwiRXNjdWVsYSBTdXBlcmlvciBQb2xpdGVjbmljYSBkZWwgTGl0b3JhbFwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJJbnN0aXR1Y2lvblVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJJbnN0aXR1Y2lvblVzdWFyaW8oJGlkOiBTdHJpbmcsICRpbnN0aXR1Y2lvbjogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckluc3RpdHVjaW9uVXN1YXJpbyhpZDogJGlkLGluc3RpdHVjaW9uOiAkaW5zdGl0dWNpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGluc3RpdHVjaW9uXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogbnVsbCxcblx0XHRcdFx0XHRpbnN0aXR1Y2lvbjogXCJFc2N1ZWxhIFN1cGVyaW9yIFBvbGl0ZWNuaWNhIGRlbCBMaXRvcmFsXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhckluc3RpdHVjaW9uVXN1YXJpbykudG9CZShudWxsKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckluc3RpdHVjaW9uVXN1YXJpbygkaWQ6IFN0cmluZywgJGluc3RpdHVjaW9uOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFySW5zdGl0dWNpb25Vc3VhcmlvKGlkOiAkaWQsaW5zdGl0dWNpb246ICRpbnN0aXR1Y2lvbil7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW5zdGl0dWNpb25cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0aW5zdGl0dWNpb246IFwiRXNjdWVsYSBTdXBlcmlvciBQb2xpdGVjbmljYSBkZWwgTGl0b3JhbFwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJJbnN0aXR1Y2lvblVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXG5cdGl0IChcInVuIHVzdWFyaW8gZGViZXJpYSBtb3N0cmFyIGluZm9ybWFjaW9uIGFlcmNhIGRlbCBwZXJmaWwgZGVsIFVzdWFyaW9cIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgbW9zdHJhclBlcmZpbFVzdWFyaW8oJGlkOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRtb3N0cmFyUGVyZmlsVXN1YXJpbyhpZDogJGlkKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5tb3N0cmFyUGVyZmlsVXN1YXJpby5ub21icmUpLnRvTWF0Y2goL0tldmluLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblx0fSk7XG5cdGl0IChcInVuIHVzdWFyaW8gbm8gcG9kcmlhIHZlciBzdSBpbmZvcm1hY2lvbiBzaSBlbCBpZCBlcyBudWxvXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IG1vc3RyYXJQZXJmaWxVc3VhcmlvKCRpZDogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0bW9zdHJhclBlcmZpbFVzdWFyaW8oaWQ6ICRpZCl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0bm9tYnJlXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZDogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEubW9zdHJhclBlcmZpbFVzdWFyaW8pLnRvQmUobnVsbCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdCAoXCJkZXZlcmlhIGRldm9sdmVyIHVuIGFycmF5IGRlIHVzdWFyaW8gZmlsdHJhZG9zIHNpbiBuaW5ndW4gY2FyYWN0ZXJcIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgbGlzdGFVc3Vhcmlvc0J5TmFtZSgkbm9tYnJlOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRsaXN0YVVzdWFyaW9zQnlOYW1lKG5vbWJyZTogJG5vbWJyZSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0bm9tYnJlXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRub21icmU6IFwiXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhVXN1YXJpb3NCeU5hbWUubGVuZ3RoKS50b0JlKDIpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblxuXHRpdCAoXCJkZXZlcmlhIGRldm9sdmVyIHVuIGFycmF5IGRlIHVzdWFyaW8gZmlsdHJhZG9zIGNvbiB1biBjYXJhY3RlclwiLChkb25lKT0+e1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBsaXN0YVVzdWFyaW9zQnlOYW1lKCRub21icmU6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGxpc3RhVXN1YXJpb3NCeU5hbWUobm9tYnJlOiAkbm9tYnJlKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdG5vbWJyZTogXCJNXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhVXN1YXJpb3NCeU5hbWUubGVuZ3RoKS50b0JlKDEpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblxuXHRpdCAoXCJkZXZlcmlhIGRldm9sdmVyIHVuIGFycmF5IGRlIHVzdWFyaW8gZmlsdHJhZG9zIGNvbiBtYXMgZGUgdW4gIGNhcmFjdGVyXCIsKGRvbmUpPT57XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhVXN1YXJpb3NCeU5hbWUoJG5vbWJyZTogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0bGlzdGFVc3Vhcmlvc0J5TmFtZShub21icmU6ICRub21icmUpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdG5vbWJyZVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0bm9tYnJlOiBcIktFVklOXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhVXN1YXJpb3NCeU5hbWUubGVuZ3RoKS50b0JlKDIpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblxuXHRpdCAoXCJkZXZlcmlhIGRldm9sdmVyIHVuIGFycmF5IGRlIHVzdWFyaW8gZGUgVXN1YXJpb3NcIiwoZG9uZSk9Pntcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgbGlzdGFyVG9kb3NVc3Vhcmlvc3tcblx0XHRcdFx0XHRcdFx0bGlzdGFyVG9kb3NVc3Vhcmlvc3tcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRub21icmVcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gXG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEubGlzdGFyVG9kb3NVc3Vhcmlvcy5sZW5ndGgpLnRvQmUoMik7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXG5cbn0pOyJdfQ==