"use strict";

/* eslint-disable no-undef,quotes */
var tester = require("graphql-tester").tester;

describe("Escenario Crear pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	/**
  * Pregunta con casilla de verificacion, usuario 5ac248c98a3f74223f16895e
  */
	it("El usuario deberia crear una nueva pregunta con respuesta de casilla de verificacion", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "Pregunta con respuesta de casilla de verificacion 111",
					usuario_ID: "5ac248c98a3f74223f16895e",
					imagen: "imagen de casilla de verificacion",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
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
	it("El usuario deberia crear una nueva pregunta con respuesta de una sola opcion por escoger", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "Pregunta con opciones multiples",
					usuario_ID: "5ac248c98a3f74223f16895e",
					fecha_creacion: new Date(),
					tipoPregunta: "opciones multiples",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: ["una", "dos", "tres", "cuatro"]
				}
			}
		})).then(function (response) {
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
	it("El usuario deberia crear una nueva pregunta con respuesta de tipo si o no", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "Pregunta con opciones de si o no",
					usuario_ID: "5ac248c98a3f74223f16895e",
					fecha_creacion: new Date(),
					tipoPregunta: "Si_No",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"]
				}
			}
		})).then(function (response) {
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
	it("El usuario deberia crear una nueva pregunta con respuesta de tipo abierta", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "Pregunta de ejemplo de tipo abierta",
					usuario_ID: "5ac248c98a3f74223f16895e",
					fecha_creacion: new Date(),
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"]
				}
			}
		})).then(function (response) {
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
	it("El usuario deberia crear una nueva pregunta con respuesta de tipo rating", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "Pregunta de ejemplo de rating",
					usuario_ID: "5ac248c98a3f74223f16895e",
					fecha_creacion: new Date(),
					tipoPregunta: "escala",
					respuestas: [1, 2, 3, 4, 6, 7],
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearPregunta.descripcion).toMatch(/Pregunta de ejemplo de rating/);
			expect(response.data.crearPregunta.imagen).toMatch(/no/);
			done();
		});
	});
});

describe("Escenario editar Pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder editar una pregunta, enviando un identificador de usuario como parametro de busqueda", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarPregunta($idPregunta: String, $pregunta: PreguntaInput ){\n\t\t\t\t\t\t\teditarPregunta(idPregunta: $idPregunta,pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				pregunta: {
					descripcion: "Pregunta editada de ejemplo version 9",
					usuario_ID: "5ac248c98a3f74223f16895e",
					fecha_creacion: new Date(),
					imagen: "imagen de ejemplo numero 5",
					tipoPregunta: "lista_desplegable",
					respuestas: ["una lista", "dos lista", "tres lista"],
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarPregunta.descripcion).toMatch(/version 9/);
			expect(response.data.editarPregunta.imagen).toMatch(/numero 5/);
			done();
		});
	});
	it("Deberia no poder editar una pregunta, ya que no soy el autor de la pregunta", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarPregunta($idPregunta: String, $pregunta: PreguntaInput ){\n\t\t\t\t\t\t\teditarPregunta(idPregunta: $idPregunta,pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5ac8ef4f6b873951705728c3",
				pregunta: {
					descripcion: "Pregunta editada de ejemplo version 5",
					usuario_ID: "5ac248c98a3f74223f16111e",
					fecha_creacion: new Date(),
					imagen: "imagen de ejemplo numero 5",
					tipoPregunta: "lista_desplegable",
					respuestas: ["una lista", "dos lista", "tres lista"],
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});

	it("Deberia poder editar una pregunta si el estado de la pregunta es en revision o aceptada", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarPregunta($idPregunta: String, $pregunta: PreguntaInput ){\n\t\t\t\t\t\t\teditarPregunta(idPregunta: $idPregunta,pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				pregunta: {
					descripcion: "Pregunta anteriormente editada",
					usuario_ID: "5ac248c98a3f74223f16895e",
					fecha_creacion: new Date(),
					imagen: "imagen de ejemplo numero 5",
					tipoPregunta: "lista_desplegable",
					respuestas: ["una lista", "dos lista", "tres lista"],
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarPregunta.descripcion).toMatch(/anteriormente editada/);
			done();
		});
	});
});

describe("Validaciones en el modelo Pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("No deberia poder guardar una pregunta si la descripcion esta vacia o es nula, el" + "resultado que se espera es obtener un error, describiendo el valor faltante", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "",
					usuario_ID: "5ac248c98a3f74223f16895e",
					imagen: "imagen1",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.data.crearPregunta).toBe(null);
			expect(response.errors.length).toBe(1);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: null,
					usuario_ID: "5ac248c98a3f74223f16895e",
					imagen: "imagen1",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(400);
			expect(response.success).toBe(false);
			expect(response.data).toBe(undefined);
			expect(response.errors.length).toBe(1);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: undefined,
					usuario_ID: "5ac248c98a3f74223f16895e",
					imagen: "imagen1",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(400);
			expect(response.success).toBe(false);
			expect(response.data).toBe(undefined);
			expect(response.errors.length).toBe(1);
			done();
		});
	});

	it("No deberia poder crear una nueva pregunta si el usuario ID es vacio ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "pregunta de ejemplo",
					usuario_ID: "",
					imagen: "imagen1",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.data.crearPregunta).toBe(null);
			expect(response.errors.length).toBe(1);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "pregunta de ejemplo",
					usuario_ID: null,
					imagen: "imagen1",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(400);
			expect(response.success).toBe(false);
			expect(response.data).toBe(undefined);
			expect(response.errors.length).toBe(1);
			done();
		});
	});

	it("No deberia poder guardar una nueva pregunta si la fecha de creacion esta vacia", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "pregunta de ejemplo",
					usuario_ID: "5ac248c98a3f74223f16895e",
					imagen: "imagen1",
					fecha_creacion: null,
					tipoPregunta: "casilla verficacion",
					areaconocimiento: ["5ac8e07bd3fe0e46a4a06085"],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(400);
			expect(response.success).toBe(false);
			expect(response.data).toBe(undefined);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("No deberia poder guardar una nueva pregunta si el area de conocimiento esta vacia", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearPregunta($pregunta: PreguntaInput ){\n\t\t\t\t\t\t\tcrearPregunta(pregunta: $pregunta){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				pregunta: {
					descripcion: "pregunta de ejemplo",
					usuario_ID: "5ac248c98a3f74223f16895e",
					imagen: "imagen1",
					fecha_creacion: new Date(),
					tipoPregunta: "casilla verficacion",
					areaconocimiento: [],
					respuestas: [1, 2, 3, 4, 5, 6]
				}
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.data.crearPregunta).toBe(null);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
});

describe("Escenario eliminar Pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("Deberia eliminar una pregunta si el estado de la pregunta es revision o rechazada", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarPregunta($idPregunta: String!, $correoUsuario: String! ){\n\t\t\t\t\t\t\teliminarPregunta(idPregunta: $idPregunta, correoUsuario: $correoUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acc3cdb4f18012415badf23",
				correoUsuario: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
});

describe("Consultas al modelo Pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder ver una determinada pregunta ", function (done) {
		self.test(JSON.stringify({
			query: "query verMyPreguntaActual($idPregunta: String!){\n\t\t\t\t\t\t\t  verMyPreguntaActual(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acc3cdb4f18012415badf23"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia poder la lista de imagenes que he usado en una pregunta que se encuestra en estado de revision", function (done) {
		self.test(JSON.stringify({
			query: "query historialImagenesUsadasByUserinAPregunta($idPregunta: String, $idUsuario: String){\n\t\t\t\t\t\t\t  historialImagenesUsadasByUserinAPregunta(idPregunta: $idPregunta, idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\thistorial_cambios {\n\t\t\t\t\t\t\t \t\t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idUsuario: "5ac248c98a3f74223f16895e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.historialImagenesUsadasByUserinAPregunta.historial_cambios.length).toBe(2);
			done();
		});
	});
	it("Deberia poder cargar la lista de preguntas, segun el area de conocimiento", function (done) {
		self.test(JSON.stringify({
			query: "query cargarListadoPreguntasByAreasConocimiento($after: String, $limit: Int,$word: String,$idAreaConocimiento: String ){\n\t\t\t\t\t\t\t  cargarListadoPreguntasByAreasConocimiento(after: $after, limit: $limit, word: $word, idAreaConocimiento:$idAreaConocimiento){\n\t\t\t\t\t\t\t \t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				after: "",
				limit: 5,
				word: "",
				idAreaConocimiento: "5ac8e07bd3fe0e46a4a06085"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.cargarListadoPreguntasByAreasConocimiento.totalCount).toBe(4);
			done();
		});
	});
	it("Deberia poder ver la lista de las areas conocimientos que se han usado en una pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query listadoAreasConocimientosUsadasPreguntas{\n\t\t\t\t\t\t\t  listadoAreasConocimientosUsadasPreguntas{\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}"
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoAreasConocimientosUsadasPreguntas.length).toBe(2);
			done();
		});
	});
	it("Deberia no poder ver la informacion de un usuario, si no provee un identificador " + "de la pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query verMyPreguntaActual($idPregunta: String!){\n\t\t\t\t\t\t\t  verMyPreguntaActual(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});
	it("Deberia poder ver el usuario propietario de determinada Pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query verMyPreguntaActual($idPregunta: String!){\n\t\t\t\t\t\t\t  verMyPreguntaActual(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acc3cdb4f18012415badf23"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.verMyPreguntaActual.usuario_ID.nombre).toMatch(/Kevin/);
			expect(response.data.verMyPreguntaActual.usuario_ID.correo).toMatch(/kevinandresortizmerchan111@gmail.com/);
			done();
		});
	});
	it("Deberia no poder ver una pregunta, si no envio un identificador a dicha pregunta ", function (done) {
		self.test(JSON.stringify({
			query: "query verMyPreguntaActual($idPregunta: String!){\n\t\t\t\t\t\t\t  verMyPreguntaActual(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verMyPreguntaActual($idPregunta: String!){\n\t\t\t\t\t\t\t  verMyPreguntaActual(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: null
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verMyPreguntaActual($idPregunta: String!){\n\t\t\t\t\t\t\t  verMyPreguntaActual(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: undefined
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});
	it("Deberia poder ver el listado de las preguntas actuales de un usuarios", function (done) {
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActuales($idUsuario: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActuales(idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: "5ac248c98a3f74223f16895e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.verListadoMisPreguntasActuales.length).toBe(5);
			done();
		});
	});
	it("Deberia poder ver el listado de los usuarios distintos que han creado preguntas", function (done) {
		self.test(JSON.stringify({
			query: "query listadoUsuariosDistintosCreadoPreguntas{\n\t\t\t\t\t\t\t  listadoUsuariosDistintosCreadoPreguntas{\n\t\t\t\t\t\t\t \t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}"
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoUsuariosDistintosCreadoPreguntas.length).toBe(1);
			done();
		});
	});
	it("Deberia no poder ver el listado de las preguntas de un usuarios si, no envio un identificador del usuario ", function (done) {
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActuales($idUsuario: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActuales(idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActuales($idUsuario: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActuales(idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: null
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActuales($idUsuario: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActuales(idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: undefined
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});
	it("Deberia poder ver el listado de preguntas actuales by estado", function (done) {
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: "5ac248c98a3f74223f16895e",
				estado: "revision"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.verListadoMisPreguntasActualesByEstado.length).toBe(5);
			done();
		});
	});
	it("Deberia no poder ver el listado de preguntas actuales by estado ", function (done) {
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: "",
				estado: "revision"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: null,
				estado: "revision"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: undefined,
				estado: "revision"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
		self.test(JSON.stringify({
			query: "query verListadoMisPreguntasActualesByEstado($idUsuario: String, $estado: String){\n\t\t\t\t\t\t\t  verListadoMisPreguntasActualesByEstado(idUsuario: $idUsuario, estado: $estado){\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\testado\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_ID {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idUsuario: "5ac248c98a3f74223f16895e",
				estado: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.verListadoMisPreguntasActualesByEstado.length).toBe(5);
			done();
		});
	});
});

describe("Paginacion sobre el modelo Preguntas", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("deberia poder ver los primeros 3 preguntas", function (done) {
		self.test(JSON.stringify({
			query: "query listadoPreguntasActuales($after: String!, $limit: Int, $word: String){\n\t\t\t\t\t\t\t  listadoPreguntasActuales(after: $after, limit: $limit, word: $word){\n\t\t\t\t\t\t\t \t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t \t\t\t\t\tedges {\n\t\t\t\t\t\t\t \t\t\t\t\t\tcursor\n\t\t\t\t\t\t\t \t\t\t\t\t\tnode{\n\t\t\t\t\t\t\t \t\t\t\t\t\t descripcion\n\t\t\t\t\t\t\t \t\t\t\t\t\t imagen\n\t\t\t\t\t\t\t \t\t\t\t\t\t usuario_ID{\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\t }\t\n\t\t\t\t\t\t\t \t\t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tpageInfo {\n\t\t\t\t\t\t\t \t\t\t\t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\t\t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				after: "",
				limit: 3,
				word: ""
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoPreguntasActuales.totalCount).toBe(5);
			expect(response.data.listadoPreguntasActuales.edges.length).toBe(3);
			done();
		});
		self.test(JSON.stringify({
			query: "query listadoPreguntasActuales($after: String!, $limit: Int){\n\t\t\t\t\t\t\t  listadoPreguntasActuales(after: $after, limit: $limit){\n\t\t\t\t\t\t\t \t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t \t\t\t\t\tedges {\n\t\t\t\t\t\t\t \t\t\t\t\t\tcursor\n\t\t\t\t\t\t\t \t\t\t\t\t\tnode{\n\t\t\t\t\t\t\t \t\t\t\t\t\t descripcion\n\t\t\t\t\t\t\t \t\t\t\t\t\t imagen\n\t\t\t\t\t\t\t \t\t\t\t\t\t usuario_ID{\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\t }\t\n\t\t\t\t\t\t\t \t\t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tpageInfo {\n\t\t\t\t\t\t\t \t\t\t\t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\t\t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				after: null,
				limit: 3
			}
		})).then(function (response) {
			expect(response.status).toBe(400);
			done();
		});
		self.test(JSON.stringify({
			query: "query listadoPreguntasActuales($after: String!, $limit: Int){\n\t\t\t\t\t\t\t  listadoPreguntasActuales(after: $after, limit: $limit){\n\t\t\t\t\t\t\t \t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t \t\t\t\t\tedges {\n\t\t\t\t\t\t\t \t\t\t\t\t\tcursor\n\t\t\t\t\t\t\t \t\t\t\t\t\tnode{\n\t\t\t\t\t\t\t \t\t\t\t\t\t descripcion\n\t\t\t\t\t\t\t \t\t\t\t\t\t imagen\n\t\t\t\t\t\t\t \t\t\t\t\t\t usuario_ID{\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\t }\t\n\t\t\t\t\t\t\t \t\t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tpageInfo {\n\t\t\t\t\t\t\t \t\t\t\t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\t\t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				after: undefined,
				limit: 3
			}
		})).then(function (response) {
			expect(response.status).toBe(400);
			done();
		});
	});

	it("Deberia pode obtener todas los documentos", function (done) {
		self.test(JSON.stringify({
			query: "query listadoPreguntasActuales($after: String!, $limit: Int){\n\t\t\t\t\t\t\t  listadoPreguntasActuales(after: $after, limit: $limit){\n\t\t\t\t\t\t\t \t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t \t\t\t\t\tedges {\n\t\t\t\t\t\t\t \t\t\t\t\t\tcursor\n\t\t\t\t\t\t\t \t\t\t\t\t\tnode{\n\t\t\t\t\t\t\t \t\t\t\t\t\t descripcion\n\t\t\t\t\t\t\t \t\t\t\t\t\t imagen\n\t\t\t\t\t\t\t \t\t\t\t\t\t usuario_ID{\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\t \tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\t }\t\n\t\t\t\t\t\t\t \t\t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tpageInfo {\n\t\t\t\t\t\t\t \t\t\t\t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\t\t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				after: "",
				limit: 5
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoPreguntasActuales.totalCount).toBe(5);
			expect(response.data.listadoPreguntasActuales.edges.length).toBe(5);
			expect(response.data.listadoPreguntasActuales.pageInfo.hasnextPage).toBe(false);
			done();
		});
	});
});

describe("Hacer rollback de las pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder retornar a una pregunta anterior si el estado" + "de mi pregunta es de revision y la pregunta que deseo hacer" + "rollback se encuentra en un estado estable " + "estable ", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.rollbackPreguntaAnterior.descripcion).toMatch(/Pregunta con respuesta de casilla de verificacion/);
			done();
		});
	});

	it("Deberia poder hacer rollback de una pregunta que su estado actual sea de" + "revision y la pregunta que deseo hacer rollback sea de revision", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e877dfe80644e79a9b1",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.rollbackPreguntaAnterior.descripcion).toMatch(/Pregunta editada de ejemplo version 9/);
			done();
		});
	});
	it("Deberia poder hacer rollback de una pregunta que su estado actual sea " + "estable y la pregunta que deseo hacer rollback sea de revision", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e877dfe80644e79a9b1",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.rollbackPreguntaAnterior.descripcion).toMatch(/Pregunta editada de ejemplo version 9/);
			done();
		});
	});
	it("No Deberia poder hacer rollback de una pregunta que su estado actual sea " + "revision y la pregunta que deseo hacer rollback sea rechazada", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("No Deberia poder hacer rollback de una pregunta que su estado actual sea " + "estable y la pregunta que deseo hacer rollback sea rechazada", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("No Deberia poder hacer rollback de una pregunta que su estado actual sea " + "rechazado y la pregunta que deseo hacer rollback sea estable", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("No Deberia poder hacer rollback de una pregunta si yo no soy propietario de dicha pregunta ", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackPreguntaAnterior($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackPreguntaAnterior(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan497@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("Deberia poder hacer rollback solamente de la descripcion de la pregunta si yo soy propietario de dicha pregunta" + "y ademas esa pregunta tiene un estado de revision, y la pregunta que deseo hacer" + "rollback presenta un estado de estable", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackDescripcionPregunta($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackDescripcionPregunta(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\testado\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.rollbackDescripcionPregunta.descripcion).toMatch(/Pregunta con respuesta de casilla de verificacion/);
			expect(response.data.rollbackDescripcionPregunta.estado).toMatch(/revision/);
			done();
		});
	});
	it("Deberia poder hacer rollback solamente de la respuestas de la pregunta si yo soy propietario de dicha pregunta" + "y ademas esa pregunta tiene un estado de revision, y la pregunta que deseo hacer" + "rollback presenta un estado de estable", function (done) {
		self.test(JSON.stringify({
			query: "mutation rollbackRespuestasPregunta($idPregunta: String, $idPreguntaAnterior: String, \n\t\t\t\t\t\t\t\t\t$ownerQuestion: String){\n\t\t\t\t\t\t\trollbackRespuestasPregunta(idPregunta: $idPregunta, idPreguntaAnterior: $idPreguntaAnterior,\n\t\t\t\t\t\t\t\t\townerQuestion: $ownerQuestion){\n\t\t\t\t\t\t\t \t\t\t\t\t_id\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\t\t\timagen\n\t\t\t\t\t\t\t \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t \t\t\t\t\trespuestas\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349713",
				idPreguntaAnterior: "5ace3e40f9e9cb643415b0f5",
				ownerQuestion: "kevinandresortizmerchan111@gmail.com"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.rollbackRespuestasPregunta.descripcion).toMatch(/Pregunta editada/);
			done();
		});
	});
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2ludGVncmF0aW9uL3ByZWd1bnRhLnRlc3QuanMiXSwibmFtZXMiOlsidGVzdGVyIiwicmVxdWlyZSIsImRlc2NyaWJlIiwic2VsZiIsInRlc3QiLCJ1cmwiLCJjb250ZW50VHlwZSIsIml0IiwiZG9uZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJxdWVyeSIsInZhcmlhYmxlcyIsInByZWd1bnRhIiwiZGVzY3JpcGNpb24iLCJ1c3VhcmlvX0lEIiwiaW1hZ2VuIiwiZmVjaGFfY3JlYWNpb24iLCJEYXRlIiwidGlwb1ByZWd1bnRhIiwiYXJlYWNvbm9jaW1pZW50byIsInJlc3B1ZXN0YXMiLCJ0aGVuIiwiZXhwZWN0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJ0b0JlIiwic3VjY2VzcyIsImRhdGEiLCJjcmVhclByZWd1bnRhIiwidG9NYXRjaCIsImlkUHJlZ3VudGEiLCJlZGl0YXJQcmVndW50YSIsImVycm9ycyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvcnJlb1VzdWFyaW8iLCJpZFVzdWFyaW8iLCJoaXN0b3JpYWxJbWFnZW5lc1VzYWRhc0J5VXNlcmluQVByZWd1bnRhIiwiaGlzdG9yaWFsX2NhbWJpb3MiLCJhZnRlciIsImxpbWl0Iiwid29yZCIsImlkQXJlYUNvbm9jaW1pZW50byIsImNhcmdhckxpc3RhZG9QcmVndW50YXNCeUFyZWFzQ29ub2NpbWllbnRvIiwidG90YWxDb3VudCIsImxpc3RhZG9BcmVhc0Nvbm9jaW1pZW50b3NVc2FkYXNQcmVndW50YXMiLCJ2ZXJNeVByZWd1bnRhQWN0dWFsIiwibm9tYnJlIiwiY29ycmVvIiwidmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzIiwibGlzdGFkb1VzdWFyaW9zRGlzdGludG9zQ3JlYWRvUHJlZ3VudGFzIiwiZXN0YWRvIiwidmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8iLCJsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXMiLCJlZGdlcyIsInBhZ2VJbmZvIiwiaGFzbmV4dFBhZ2UiLCJpZFByZWd1bnRhQW50ZXJpb3IiLCJvd25lclF1ZXN0aW9uIiwicm9sbGJhY2tQcmVndW50YUFudGVyaW9yIiwicm9sbGJhY2tEZXNjcmlwY2lvblByZWd1bnRhIiwicm9sbGJhY2tSZXNwdWVzdGFzUHJlZ3VudGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxTQUFTQyxRQUFRLGdCQUFSLEVBQTBCRCxNQUF6Qzs7QUFFQUUsU0FBUywwQkFBVCxFQUFxQyxZQUFhO0FBQ2pELEtBQU1DLE9BQU8sSUFBYjtBQUNBQSxNQUFLQyxJQUFMLEdBQVlKLE9BQU87QUFDbEJLLE9BQUssaUNBRGE7QUFFbEJDLGVBQWE7QUFGSyxFQUFQLENBQVo7QUFJQTs7O0FBR0FDLElBQUcsc0ZBQUgsRUFBMkYsVUFBQ0MsSUFBRCxFQUFVO0FBQ3BHTCxPQUNFQyxJQURGLENBQ09LLEtBQUtDLFNBQUwsQ0FBZTtBQUNwQkMsa1ZBRG9CO0FBVXBCQyxjQUFVO0FBQ1RDLGNBQVU7QUFDVEMsa0JBQWEsdURBREo7QUFFVEMsaUJBQVksMEJBRkg7QUFHVEMsYUFBUSxtQ0FIQztBQUlUQyxxQkFBZ0IsSUFBSUMsSUFBSixFQUpQO0FBS1RDLG1CQUFjLHFCQUxMO0FBTVRDLHVCQUFrQixDQUFDLDBCQUFELENBTlQ7QUFPVEMsaUJBQVksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVg7QUFQSDtBQUREO0FBVlUsR0FBZixDQURQLEVBdUJFQyxJQXZCRixDQXVCTyxvQkFBWTtBQUNqQkMsVUFBT0MsU0FBU0MsTUFBaEIsRUFBd0JDLElBQXhCLENBQTZCLEdBQTdCO0FBQ0FILFVBQU9DLFNBQVNHLE9BQWhCLEVBQXlCRCxJQUF6QixDQUE4QixJQUE5QjtBQUNBSCxVQUFPQyxTQUFTSSxJQUFULENBQWNDLGFBQWQsQ0FBNEJmLFdBQW5DLEVBQWdEZ0IsT0FBaEQsQ0FBd0QseUJBQXhEO0FBQ0FQLFVBQU9DLFNBQVNJLElBQVQsQ0FB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RCIsImZpbGUiOiJwcmVndW50YS50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYscXVvdGVzICovXG5jb25zdCB0ZXN0ZXIgPSByZXF1aXJlKFwiZ3JhcGhxbC10ZXN0ZXJcIikudGVzdGVyO1xuXG5kZXNjcmliZShcIkVzY2VuYXJpbyBDcmVhciBwcmVndW50YVwiLCBmdW5jdGlvbiAoICkge1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0LyoqXG5cdCAqIFByZWd1bnRhIGNvbiBjYXNpbGxhIGRlIHZlcmlmaWNhY2lvbiwgdXN1YXJpbyA1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcblx0ICovXG5cdGl0KFwiRWwgdXN1YXJpbyBkZWJlcmlhIGNyZWFyIHVuYSBudWV2YSBwcmVndW50YSBjb24gcmVzcHVlc3RhIGRlIGNhc2lsbGEgZGUgdmVyaWZpY2FjaW9uXCIsIChkb25lKSA9PiB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGNyZWFyUHJlZ3VudGEoJHByZWd1bnRhOiBQcmVndW50YUlucHV0ICl7XG5cdFx0XHRcdFx0XHRcdGNyZWFyUHJlZ3VudGEocHJlZ3VudGE6ICRwcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpZGVudGlmaWNhZG9yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRwcmVndW50YToge1xuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiUHJlZ3VudGEgY29uIHJlc3B1ZXN0YSBkZSBjYXNpbGxhIGRlIHZlcmlmaWNhY2lvbiAxMTFcIixcblx0XHRcdFx0XHRcdHVzdWFyaW9fSUQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0XHRpbWFnZW46IFwiaW1hZ2VuIGRlIGNhc2lsbGEgZGUgdmVyaWZpY2FjaW9uXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHRpcG9QcmVndW50YTogXCJjYXNpbGxhIHZlcmZpY2FjaW9uXCIsXG5cdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBbXCI1YWM4ZTA3YmQzZmUwZTQ2YTRhMDYwODVcIl0sXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbMSwyLDMsNCw1LDZdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJQcmVndW50YS5kZXNjcmlwY2lvbikudG9NYXRjaCgvY2FzaWxsYSBkZSB2ZXJpZmljYWNpb24vKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJQcmVndW50YS5pbWFnZW4pLnRvTWF0Y2goL2ltYWdlbi8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdC8qKlxuXHQgKiBQcmVndW50YSBjb24gY2FzaWxsYSBkZSB2ZXJpZmljYWNpb24sIHVzdWFyaW8gNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXG5cdCAqL1xuXHRpdChcIkVsIHVzdWFyaW8gZGViZXJpYSBjcmVhciB1bmEgbnVldmEgcHJlZ3VudGEgY29uIHJlc3B1ZXN0YSBkZSB1bmEgc29sYSBvcGNpb24gcG9yIGVzY29nZXJcIiwgKGRvbmUpID0+IHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJQcmVndW50YSgkcHJlZ3VudGE6IFByZWd1bnRhSW5wdXQgKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJQcmVndW50YShwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdHByZWd1bnRhOiB7XG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJQcmVndW50YSBjb24gb3BjaW9uZXMgbXVsdGlwbGVzXCIsXG5cdFx0XHRcdFx0XHR1c3VhcmlvX0lEOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0ZmVjaGFfY3JlYWNpb246IG5ldyBEYXRlKCksXG5cdFx0XHRcdFx0XHR0aXBvUHJlZ3VudGE6IFwib3BjaW9uZXMgbXVsdGlwbGVzXCIsXG5cdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBbXCI1YWM4ZTA3YmQzZmUwZTQ2YTRhMDYwODVcIl0sXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbXCJ1bmFcIixcImRvc1wiLCBcInRyZXNcIiwgXCJjdWF0cm9cIl1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclByZWd1bnRhLmRlc2NyaXBjaW9uKS50b01hdGNoKC9QcmVndW50YSBjb24gb3BjaW9uZXMgbXVsdGlwbGVzLyk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyUHJlZ3VudGEuaW1hZ2VuKS50b01hdGNoKC9uby8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdC8qKlxuXHQgKiBQcmVndW50YSBjb24gY2FzaWxsYSBkZSB2ZXJpZmljYWNpb24sIHVzdWFyaW8gNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXG5cdCAqL1xuXHRpdChcIkVsIHVzdWFyaW8gZGViZXJpYSBjcmVhciB1bmEgbnVldmEgcHJlZ3VudGEgY29uIHJlc3B1ZXN0YSBkZSB0aXBvIHNpIG8gbm9cIiwgKGRvbmUpID0+IHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJQcmVndW50YSgkcHJlZ3VudGE6IFByZWd1bnRhSW5wdXQgKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJQcmVndW50YShwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdHByZWd1bnRhOiB7XG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJQcmVndW50YSBjb24gb3BjaW9uZXMgZGUgc2kgbyBub1wiLFxuXHRcdFx0XHRcdFx0dXN1YXJpb19JRDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcIlNpX05vXCIsXG5cdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBbXCI1YWM4ZTA3YmQzZmUwZTQ2YTRhMDYwODVcIl0sXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJQcmVndW50YS5kZXNjcmlwY2lvbikudG9NYXRjaCgvUHJlZ3VudGEgY29uIG9wY2lvbmVzIGRlIHNpIG8gbm8vKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJQcmVndW50YS5pbWFnZW4pLnRvTWF0Y2goL25vLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHQvKipcblx0ICogUHJlZ3VudGEgY29uIGNhc2lsbGEgZGUgdmVyaWZpY2FjaW9uLCB1c3VhcmlvIDVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVxuXHQgKi9cblx0aXQoXCJFbCB1c3VhcmlvIGRlYmVyaWEgY3JlYXIgdW5hIG51ZXZhIHByZWd1bnRhIGNvbiByZXNwdWVzdGEgZGUgdGlwbyBhYmllcnRhXCIsIChkb25lKSA9PiB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGNyZWFyUHJlZ3VudGEoJHByZWd1bnRhOiBQcmVndW50YUlucHV0ICl7XG5cdFx0XHRcdFx0XHRcdGNyZWFyUHJlZ3VudGEocHJlZ3VudGE6ICRwcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpZGVudGlmaWNhZG9yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRwcmVndW50YToge1xuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiUHJlZ3VudGEgZGUgZWplbXBsbyBkZSB0aXBvIGFiaWVydGFcIixcblx0XHRcdFx0XHRcdHVzdWFyaW9fSUQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclByZWd1bnRhLmRlc2NyaXBjaW9uKS50b01hdGNoKC9QcmVndW50YSBkZSBlamVtcGxvIGRlIHRpcG8gYWJpZXJ0YS8pO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclByZWd1bnRhLmltYWdlbikudG9NYXRjaCgvbm8vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBQcmVndW50YSBjb24gY2FzaWxsYSBkZSB2ZXJpZmljYWNpb24sIHVzdWFyaW8gNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXG5cdCAqL1xuXHRpdChcIkVsIHVzdWFyaW8gZGViZXJpYSBjcmVhciB1bmEgbnVldmEgcHJlZ3VudGEgY29uIHJlc3B1ZXN0YSBkZSB0aXBvIHJhdGluZ1wiLCAoZG9uZSkgPT4ge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhclByZWd1bnRhKCRwcmVndW50YTogUHJlZ3VudGFJbnB1dCApe1xuXHRcdFx0XHRcdFx0XHRjcmVhclByZWd1bnRhKHByZWd1bnRhOiAkcHJlZ3VudGEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcIlByZWd1bnRhIGRlIGVqZW1wbG8gZGUgcmF0aW5nXCIsXG5cdFx0XHRcdFx0XHR1c3VhcmlvX0lEOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0ZmVjaGFfY3JlYWNpb246IG5ldyBEYXRlKCksXG5cdFx0XHRcdFx0XHR0aXBvUHJlZ3VudGE6IFwiZXNjYWxhXCIsXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbMSwyLDMsNCw2LDddLFxuXHRcdFx0XHRcdFx0YXJlYWNvbm9jaW1pZW50bzogW1wiNWFjOGUwN2JkM2ZlMGU0NmE0YTA2MDg1XCJdLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyUHJlZ3VudGEuZGVzY3JpcGNpb24pLnRvTWF0Y2goL1ByZWd1bnRhIGRlIGVqZW1wbG8gZGUgcmF0aW5nLyk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyUHJlZ3VudGEuaW1hZ2VuKS50b01hdGNoKC9uby8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cbn0pO1xuXG5kZXNjcmliZShcIkVzY2VuYXJpbyBlZGl0YXIgUHJlZ3VudGFcIiwgZnVuY3Rpb24gKCkge1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGVkaXRhciB1bmEgcHJlZ3VudGEsIGVudmlhbmRvIHVuIGlkZW50aWZpY2Fkb3IgZGUgdXN1YXJpbyBjb21vIHBhcmFtZXRybyBkZSBidXNxdWVkYVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJQcmVndW50YSgkaWRQcmVndW50YTogU3RyaW5nLCAkcHJlZ3VudGE6IFByZWd1bnRhSW5wdXQgKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyUHJlZ3VudGEoaWRQcmVndW50YTogJGlkUHJlZ3VudGEscHJlZ3VudGE6ICRwcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkUHJlZ3VudGE6IFwiNWFjZGUxYzU4Y2RmNWE1Mjg0MzQ5NzEzXCIsXG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcIlByZWd1bnRhIGVkaXRhZGEgZGUgZWplbXBsbyB2ZXJzaW9uIDlcIixcblx0XHRcdFx0XHRcdHVzdWFyaW9fSUQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdGltYWdlbjogXCJpbWFnZW4gZGUgZWplbXBsbyBudW1lcm8gNVwiLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcImxpc3RhX2Rlc3BsZWdhYmxlXCIsXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbXCJ1bmEgbGlzdGFcIixcImRvcyBsaXN0YVwiLFwidHJlcyBsaXN0YVwiXSxcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJQcmVndW50YS5kZXNjcmlwY2lvbikudG9NYXRjaCgvdmVyc2lvbiA5Lyk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhclByZWd1bnRhLmltYWdlbikudG9NYXRjaCgvbnVtZXJvIDUvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0fSk7XG5cdGl0KFwiRGViZXJpYSBubyBwb2RlciBlZGl0YXIgdW5hIHByZWd1bnRhLCB5YSBxdWUgbm8gc295IGVsIGF1dG9yIGRlIGxhIHByZWd1bnRhXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhclByZWd1bnRhKCRpZFByZWd1bnRhOiBTdHJpbmcsICRwcmVndW50YTogUHJlZ3VudGFJbnB1dCApe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJQcmVndW50YShpZFByZWd1bnRhOiAkaWRQcmVndW50YSxwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkUHJlZ3VudGE6IFwiNWFjOGVmNGY2Yjg3Mzk1MTcwNTcyOGMzXCIsXG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcIlByZWd1bnRhIGVkaXRhZGEgZGUgZWplbXBsbyB2ZXJzaW9uIDVcIixcblx0XHRcdFx0XHRcdHVzdWFyaW9fSUQ6IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTYxMTFlXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdGltYWdlbjogXCJpbWFnZW4gZGUgZWplbXBsbyBudW1lcm8gNVwiLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcImxpc3RhX2Rlc3BsZWdhYmxlXCIsXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbXCJ1bmEgbGlzdGFcIixcImRvcyBsaXN0YVwiLFwidHJlcyBsaXN0YVwiXSxcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXG5cdGl0KFwiRGViZXJpYSBwb2RlciBlZGl0YXIgdW5hIHByZWd1bnRhIHNpIGVsIGVzdGFkbyBkZSBsYSBwcmVndW50YSBlcyBlbiByZXZpc2lvbiBvIGFjZXB0YWRhXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhclByZWd1bnRhKCRpZFByZWd1bnRhOiBTdHJpbmcsICRwcmVndW50YTogUHJlZ3VudGFJbnB1dCApe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJQcmVndW50YShpZFByZWd1bnRhOiAkaWRQcmVndW50YSxwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkUHJlZ3VudGE6IFwiNWFjZGUxYzU4Y2RmNWE1Mjg0MzQ5NzEzXCIsXG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcIlByZWd1bnRhIGFudGVyaW9ybWVudGUgZWRpdGFkYVwiLFxuXHRcdFx0XHRcdFx0dXN1YXJpb19JRDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0aW1hZ2VuOiBcImltYWdlbiBkZSBlamVtcGxvIG51bWVybyA1XCIsXG5cdFx0XHRcdFx0XHR0aXBvUHJlZ3VudGE6IFwibGlzdGFfZGVzcGxlZ2FibGVcIixcblx0XHRcdFx0XHRcdHJlc3B1ZXN0YXM6IFtcInVuYSBsaXN0YVwiLFwiZG9zIGxpc3RhXCIsXCJ0cmVzIGxpc3RhXCJdLFxuXHRcdFx0XHRcdFx0YXJlYWNvbm9jaW1pZW50bzogW1wiNWFjOGUwN2JkM2ZlMGU0NmE0YTA2MDg1XCJdLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhclByZWd1bnRhLmRlc2NyaXBjaW9uKS50b01hdGNoKC9hbnRlcmlvcm1lbnRlIGVkaXRhZGEvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG59KTtcblxuZGVzY3JpYmUoXCJWYWxpZGFjaW9uZXMgZW4gZWwgbW9kZWxvIFByZWd1bnRhXCIsIGZ1bmN0aW9uICgpIHtcblx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdHNlbGYudGVzdCA9IHRlc3Rlcih7XG5cdFx0dXJsOiBcImh0dHA6Ly8xMjcuMC4wLjE6MzY2MC9ncmFwaHRlc3RcIixcblx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0fSk7XG5cblx0aXQoXCJObyBkZWJlcmlhIHBvZGVyIGd1YXJkYXIgdW5hIHByZWd1bnRhIHNpIGxhIGRlc2NyaXBjaW9uIGVzdGEgdmFjaWEgbyBlcyBudWxhLCBlbFwiICtcblx0XHRcInJlc3VsdGFkbyBxdWUgc2UgZXNwZXJhIGVzIG9idGVuZXIgdW4gZXJyb3IsIGRlc2NyaWJpZW5kbyBlbCB2YWxvciBmYWx0YW50ZVwiLCAoZG9uZSkgPT4ge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhclByZWd1bnRhKCRwcmVndW50YTogUHJlZ3VudGFJbnB1dCApe1xuXHRcdFx0XHRcdFx0XHRjcmVhclByZWd1bnRhKHByZWd1bnRhOiAkcHJlZ3VudGEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcIlwiLFxuXHRcdFx0XHRcdFx0dXN1YXJpb19JRDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRcdGltYWdlbjogXCJpbWFnZW4xXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHRpcG9QcmVndW50YTogXCJjYXNpbGxhIHZlcmZpY2FjaW9uXCIsXG5cdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBbXCI1YWM4ZTA3YmQzZmUwZTQ2YTRhMDYwODVcIl0sXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbMSwyLDMsNCw1LDZdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyUHJlZ3VudGEpLnRvQmUobnVsbCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnMubGVuZ3RoKS50b0JlKDEpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhclByZWd1bnRhKCRwcmVndW50YTogUHJlZ3VudGFJbnB1dCApe1xuXHRcdFx0XHRcdFx0XHRjcmVhclByZWd1bnRhKHByZWd1bnRhOiAkcHJlZ3VudGEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBudWxsLFxuXHRcdFx0XHRcdFx0dXN1YXJpb19JRDogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRcdGltYWdlbjogXCJpbWFnZW4xXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHRpcG9QcmVndW50YTogXCJjYXNpbGxhIHZlcmZpY2FjaW9uXCIsXG5cdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBbXCI1YWM4ZTA3YmQzZmUwZTQ2YTRhMDYwODVcIl0sXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbMSwyLDMsNCw1LDZdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSg0MDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhKS50b0JlKHVuZGVmaW5lZCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnMubGVuZ3RoKS50b0JlKDEpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhclByZWd1bnRhKCRwcmVndW50YTogUHJlZ3VudGFJbnB1dCApe1xuXHRcdFx0XHRcdFx0XHRjcmVhclByZWd1bnRhKHByZWd1bnRhOiAkcHJlZ3VudGEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0cHJlZ3VudGE6IHtcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHR1c3VhcmlvX0lEOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0aW1hZ2VuOiBcImltYWdlbjFcIixcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcImNhc2lsbGEgdmVyZmljYWNpb25cIixcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXSxcblx0XHRcdFx0XHRcdHJlc3B1ZXN0YXM6IFsxLDIsMyw0LDUsNl1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDQwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEpLnRvQmUodW5kZWZpbmVkKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXG5cdGl0KFwiTm8gZGViZXJpYSBwb2RlciBjcmVhciB1bmEgbnVldmEgcHJlZ3VudGEgc2kgZWwgdXN1YXJpbyBJRCBlcyB2YWNpbyBcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJQcmVndW50YSgkcHJlZ3VudGE6IFByZWd1bnRhSW5wdXQgKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJQcmVndW50YShwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdHByZWd1bnRhOiB7XG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJwcmVndW50YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0XHR1c3VhcmlvX0lEOiBcIlwiLFxuXHRcdFx0XHRcdFx0aW1hZ2VuOiBcImltYWdlbjFcIixcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcImNhc2lsbGEgdmVyZmljYWNpb25cIixcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXSxcblx0XHRcdFx0XHRcdHJlc3B1ZXN0YXM6IFsxLDIsMyw0LDUsNl1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJQcmVndW50YSkudG9CZShudWxsKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGNyZWFyUHJlZ3VudGEoJHByZWd1bnRhOiBQcmVndW50YUlucHV0ICl7XG5cdFx0XHRcdFx0XHRcdGNyZWFyUHJlZ3VudGEocHJlZ3VudGE6ICRwcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0X2lkXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpZGVudGlmaWNhZG9yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRwcmVndW50YToge1xuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwicHJlZ3VudGEgZGUgZWplbXBsb1wiLFxuXHRcdFx0XHRcdFx0dXN1YXJpb19JRDogbnVsbCxcblx0XHRcdFx0XHRcdGltYWdlbjogXCJpbWFnZW4xXCIsXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHRpcG9QcmVndW50YTogXCJjYXNpbGxhIHZlcmZpY2FjaW9uXCIsXG5cdFx0XHRcdFx0XHRhcmVhY29ub2NpbWllbnRvOiBbXCI1YWM4ZTA3YmQzZmUwZTQ2YTRhMDYwODVcIl0sXG5cdFx0XHRcdFx0XHRyZXNwdWVzdGFzOiBbMSwyLDMsNCw1LDZdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSg0MDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhKS50b0JlKHVuZGVmaW5lZCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnMubGVuZ3RoKS50b0JlKDEpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0aXQoXCJObyBkZWJlcmlhIHBvZGVyIGd1YXJkYXIgdW5hIG51ZXZhIHByZWd1bnRhIHNpIGxhIGZlY2hhIGRlIGNyZWFjaW9uIGVzdGEgdmFjaWFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJQcmVndW50YSgkcHJlZ3VudGE6IFByZWd1bnRhSW5wdXQgKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJQcmVndW50YShwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdHByZWd1bnRhOiB7XG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJwcmVndW50YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0XHR1c3VhcmlvX0lEOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0aW1hZ2VuOiBcImltYWdlbjFcIixcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBudWxsLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcImNhc2lsbGEgdmVyZmljYWNpb25cIixcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXSxcblx0XHRcdFx0XHRcdHJlc3B1ZXN0YXM6IFsxLDIsMyw0LDUsNl1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDQwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEpLnRvQmUodW5kZWZpbmVkKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFxuXHR9KTtcblx0aXQoXCJObyBkZWJlcmlhIHBvZGVyIGd1YXJkYXIgdW5hIG51ZXZhIHByZWd1bnRhIHNpIGVsIGFyZWEgZGUgY29ub2NpbWllbnRvIGVzdGEgdmFjaWFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJQcmVndW50YSgkcHJlZ3VudGE6IFByZWd1bnRhSW5wdXQgKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJQcmVndW50YShwcmVndW50YTogJHByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdHByZWd1bnRhOiB7XG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJwcmVndW50YSBkZSBlamVtcGxvXCIsXG5cdFx0XHRcdFx0XHR1c3VhcmlvX0lEOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdFx0aW1hZ2VuOiBcImltYWdlbjFcIixcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0dGlwb1ByZWd1bnRhOiBcImNhc2lsbGEgdmVyZmljYWNpb25cIixcblx0XHRcdFx0XHRcdGFyZWFjb25vY2ltaWVudG86IFtdLFxuXHRcdFx0XHRcdFx0cmVzcHVlc3RhczogWzEsMiwzLDQsNSw2XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jcmVhclByZWd1bnRhKS50b0JlKG51bGwpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzLmxlbmd0aCkudG9CZSgxKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0fSk7XG5cbn0pO1xuXG5kZXNjcmliZShcIkVzY2VuYXJpbyBlbGltaW5hciBQcmVndW50YVwiLCBmdW5jdGlvbiAoKXtcblx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdHNlbGYudGVzdCA9IHRlc3Rlcih7XG5cdFx0dXJsOiBcImh0dHA6Ly8xMjcuMC4wLjE6MzY2MC9ncmFwaHRlc3RcIixcblx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0fSk7XG5cblx0aXQoXCJEZWJlcmlhIGVsaW1pbmFyIHVuYSBwcmVndW50YSBzaSBlbCBlc3RhZG8gZGUgbGEgcHJlZ3VudGEgZXMgcmV2aXNpb24gbyByZWNoYXphZGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWxpbWluYXJQcmVndW50YSgkaWRQcmVndW50YTogU3RyaW5nISwgJGNvcnJlb1VzdWFyaW86IFN0cmluZyEgKXtcblx0XHRcdFx0XHRcdFx0ZWxpbWluYXJQcmVndW50YShpZFByZWd1bnRhOiAkaWRQcmVndW50YSwgY29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCI1YWNjM2NkYjRmMTgwMTI0MTViYWRmMjNcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG59KTtcblxuZGVzY3JpYmUoXCJDb25zdWx0YXMgYWwgbW9kZWxvIFByZWd1bnRhXCIsIGZ1bmN0aW9uICgpe1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciB1bmEgZGV0ZXJtaW5hZGEgcHJlZ3VudGEgXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IHZlck15UHJlZ3VudGFBY3R1YWwoJGlkUHJlZ3VudGE6IFN0cmluZyEpe1xuXHRcdFx0XHRcdFx0XHQgIHZlck15UHJlZ3VudGFBY3R1YWwoaWRQcmVndW50YTogJGlkUHJlZ3VudGEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCI1YWNjM2NkYjRmMTgwMTI0MTViYWRmMjNcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgbGEgbGlzdGEgZGUgaW1hZ2VuZXMgcXVlIGhlIHVzYWRvIGVuIHVuYSBwcmVndW50YSBxdWUgc2UgZW5jdWVzdHJhIGVuIGVzdGFkbyBkZSByZXZpc2lvblwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBoaXN0b3JpYWxJbWFnZW5lc1VzYWRhc0J5VXNlcmluQVByZWd1bnRhKCRpZFByZWd1bnRhOiBTdHJpbmcsICRpZFVzdWFyaW86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgaGlzdG9yaWFsSW1hZ2VuZXNVc2FkYXNCeVVzZXJpbkFQcmVndW50YShpZFByZWd1bnRhOiAkaWRQcmVndW50YSwgaWRVc3VhcmlvOiAkaWRVc3VhcmlvKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRoaXN0b3JpYWxfY2FtYmlvcyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCI1YWNkZTFjNThjZGY1YTUyODQzNDk3MTNcIixcblx0XHRcdFx0XHRpZFVzdWFyaW86IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmhpc3RvcmlhbEltYWdlbmVzVXNhZGFzQnlVc2VyaW5BUHJlZ3VudGEuaGlzdG9yaWFsX2NhbWJpb3MubGVuZ3RoKS50b0JlKDIpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciBjYXJnYXIgbGEgbGlzdGEgZGUgcHJlZ3VudGFzLCBzZWd1biBlbCBhcmVhIGRlIGNvbm9jaW1pZW50b1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBjYXJnYXJMaXN0YWRvUHJlZ3VudGFzQnlBcmVhc0Nvbm9jaW1pZW50bygkYWZ0ZXI6IFN0cmluZywgJGxpbWl0OiBJbnQsJHdvcmQ6IFN0cmluZywkaWRBcmVhQ29ub2NpbWllbnRvOiBTdHJpbmcgKXtcblx0XHRcdFx0XHRcdFx0ICBjYXJnYXJMaXN0YWRvUHJlZ3VudGFzQnlBcmVhc0Nvbm9jaW1pZW50byhhZnRlcjogJGFmdGVyLCBsaW1pdDogJGxpbWl0LCB3b3JkOiAkd29yZCwgaWRBcmVhQ29ub2NpbWllbnRvOiRpZEFyZWFDb25vY2ltaWVudG8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHRvdGFsQ291bnRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRhZnRlcjpcIlwiLFxuXHRcdFx0XHRcdGxpbWl0OjUsXG5cdFx0XHRcdFx0d29yZDpcIlwiLFxuXHRcdFx0XHRcdGlkQXJlYUNvbm9jaW1pZW50bzpcIjVhYzhlMDdiZDNmZTBlNDZhNGEwNjA4NVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5jYXJnYXJMaXN0YWRvUHJlZ3VudGFzQnlBcmVhc0Nvbm9jaW1pZW50by50b3RhbENvdW50KS50b0JlKDQpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciB2ZXIgbGEgbGlzdGEgZGUgbGFzIGFyZWFzIGNvbm9jaW1pZW50b3MgcXVlIHNlIGhhbiB1c2FkbyBlbiB1bmEgcHJlZ3VudGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgbGlzdGFkb0FyZWFzQ29ub2NpbWllbnRvc1VzYWRhc1ByZWd1bnRhc3tcblx0XHRcdFx0XHRcdFx0ICBsaXN0YWRvQXJlYXNDb25vY2ltaWVudG9zVXNhZGFzUHJlZ3VudGFze1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHRpdHVsb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gXG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEubGlzdGFkb0FyZWFzQ29ub2NpbWllbnRvc1VzYWRhc1ByZWd1bnRhcy5sZW5ndGgpLnRvQmUoMik7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJEZWJlcmlhIG5vIHBvZGVyIHZlciBsYSBpbmZvcm1hY2lvbiBkZSB1biB1c3VhcmlvLCBzaSBubyBwcm92ZWUgdW4gaWRlbnRpZmljYWRvciBcIiArXG5cdFx0XCJkZSBsYSBwcmVndW50YVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJNeVByZWd1bnRhQWN0dWFsKCRpZFByZWd1bnRhOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0ICB2ZXJNeVByZWd1bnRhQWN0dWFsKGlkUHJlZ3VudGE6ICRpZFByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgdmVyIGVsIHVzdWFyaW8gcHJvcGlldGFyaW8gZGUgZGV0ZXJtaW5hZGEgUHJlZ3VudGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgdmVyTXlQcmVndW50YUFjdHVhbCgkaWRQcmVndW50YTogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTXlQcmVndW50YUFjdHVhbChpZFByZWd1bnRhOiAkaWRQcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvX0lEIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCI1YWNjM2NkYjRmMTgwMTI0MTViYWRmMjNcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEudmVyTXlQcmVndW50YUFjdHVhbC51c3VhcmlvX0lELm5vbWJyZSkudG9NYXRjaCgvS2V2aW4vKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEudmVyTXlQcmVndW50YUFjdHVhbC51c3VhcmlvX0lELmNvcnJlbykudG9NYXRjaCgva2V2aW5hbmRyZXNvcnRpem1lcmNoYW4xMTFAZ21haWwuY29tLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIG5vIHBvZGVyIHZlciB1bmEgcHJlZ3VudGEsIHNpIG5vIGVudmlvIHVuIGlkZW50aWZpY2Fkb3IgYSBkaWNoYSBwcmVndW50YSBcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgdmVyTXlQcmVndW50YUFjdHVhbCgkaWRQcmVndW50YTogU3RyaW5nISl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTXlQcmVndW50YUFjdHVhbChpZFByZWd1bnRhOiAkaWRQcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvX0lEIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJNeVByZWd1bnRhQWN0dWFsKCRpZFByZWd1bnRhOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0ICB2ZXJNeVByZWd1bnRhQWN0dWFsKGlkUHJlZ3VudGE6ICRpZFByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVzdWFyaW9fSUQge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBudWxsXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IHZlck15UHJlZ3VudGFBY3R1YWwoJGlkUHJlZ3VudGE6IFN0cmluZyEpe1xuXHRcdFx0XHRcdFx0XHQgIHZlck15UHJlZ3VudGFBY3R1YWwoaWRQcmVndW50YTogJGlkUHJlZ3VudGEpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkUHJlZ3VudGE6IHVuZGVmaW5lZFxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciBlbCBsaXN0YWRvIGRlIGxhcyBwcmVndW50YXMgYWN0dWFsZXMgZGUgdW4gdXN1YXJpb3NcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzKCRpZFVzdWFyaW86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzKGlkVXN1YXJpbzogJGlkVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvX0lEIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRVc3VhcmlvOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS52ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXMubGVuZ3RoKS50b0JlKDUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciB2ZXIgZWwgbGlzdGFkbyBkZSBsb3MgdXN1YXJpb3MgZGlzdGludG9zIHF1ZSBoYW4gY3JlYWRvIHByZWd1bnRhc1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBsaXN0YWRvVXN1YXJpb3NEaXN0aW50b3NDcmVhZG9QcmVndW50YXN7XG5cdFx0XHRcdFx0XHRcdCAgbGlzdGFkb1VzdWFyaW9zRGlzdGludG9zQ3JlYWRvUHJlZ3VudGFze1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhZG9Vc3Vhcmlvc0Rpc3RpbnRvc0NyZWFkb1ByZWd1bnRhcy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgbm8gcG9kZXIgdmVyIGVsIGxpc3RhZG8gZGUgbGFzIHByZWd1bnRhcyBkZSB1biB1c3VhcmlvcyBzaSwgbm8gZW52aW8gdW4gaWRlbnRpZmljYWRvciBkZWwgdXN1YXJpbyBcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzKCRpZFVzdWFyaW86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzKGlkVXN1YXJpbzogJGlkVXN1YXJpbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvX0lEIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRVc3VhcmlvOiBcIlwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IHZlckxpc3RhZG9NaXNQcmVndW50YXNBY3R1YWxlcygkaWRVc3VhcmlvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHQgIHZlckxpc3RhZG9NaXNQcmVndW50YXNBY3R1YWxlcyhpZFVzdWFyaW86ICRpZFVzdWFyaW8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkVXN1YXJpbzogbnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXMoJGlkVXN1YXJpbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ICB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXMoaWRVc3VhcmlvOiAkaWRVc3VhcmlvKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVzdWFyaW9fSUQge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRpZFVzdWFyaW86IHVuZGVmaW5lZFxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgdmVyIGVsIGxpc3RhZG8gZGUgcHJlZ3VudGFzIGFjdHVhbGVzIGJ5IGVzdGFkb1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbygkaWRVc3VhcmlvOiBTdHJpbmcsICRlc3RhZG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8oaWRVc3VhcmlvOiAkaWRVc3VhcmlvLCBlc3RhZG86ICRlc3RhZG8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkVXN1YXJpbzogXCI1YWMyNDhjOThhM2Y3NDIyM2YxNjg5NWVcIixcblx0XHRcdFx0XHRlc3RhZG86IFwicmV2aXNpb25cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEudmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8ubGVuZ3RoKS50b0JlKDUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBubyBwb2RlciB2ZXIgZWwgbGlzdGFkbyBkZSBwcmVndW50YXMgYWN0dWFsZXMgYnkgZXN0YWRvIFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbygkaWRVc3VhcmlvOiBTdHJpbmcsICRlc3RhZG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8oaWRVc3VhcmlvOiAkaWRVc3VhcmlvLCBlc3RhZG86ICRlc3RhZG8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkVXN1YXJpbzogXCJcIixcblx0XHRcdFx0XHRlc3RhZG86IFwicmV2aXNpb25cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbygkaWRVc3VhcmlvOiBTdHJpbmcsICRlc3RhZG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8oaWRVc3VhcmlvOiAkaWRVc3VhcmlvLCBlc3RhZG86ICRlc3RhZG8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkVXN1YXJpbzogbnVsbCxcblx0XHRcdFx0XHRlc3RhZG86IFwicmV2aXNpb25cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbygkaWRVc3VhcmlvOiBTdHJpbmcsICRlc3RhZG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdCAgdmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8oaWRVc3VhcmlvOiAkaWRVc3VhcmlvLCBlc3RhZG86ICRlc3RhZG8pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZXN0YWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6e1xuXHRcdFx0XHRcdGlkVXN1YXJpbzogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdGVzdGFkbzogXCJyZXZpc2lvblwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IHZlckxpc3RhZG9NaXNQcmVndW50YXNBY3R1YWxlc0J5RXN0YWRvKCRpZFVzdWFyaW86IFN0cmluZywgJGVzdGFkbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ICB2ZXJMaXN0YWRvTWlzUHJlZ3VudGFzQWN0dWFsZXNCeUVzdGFkbyhpZFVzdWFyaW86ICRpZFVzdWFyaW8sIGVzdGFkbzogJGVzdGFkbyl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR1c3VhcmlvX0lEIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRVc3VhcmlvOiBcIjVhYzI0OGM5OGEzZjc0MjIzZjE2ODk1ZVwiLFxuXHRcdFx0XHRcdGVzdGFkbzogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEudmVyTGlzdGFkb01pc1ByZWd1bnRhc0FjdHVhbGVzQnlFc3RhZG8ubGVuZ3RoKS50b0JlKDUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG59KTtcblxuZGVzY3JpYmUoXCJQYWdpbmFjaW9uIHNvYnJlIGVsIG1vZGVsbyBQcmVndW50YXNcIiwgZnVuY3Rpb24gKCl7XG5cdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRzZWxmLnRlc3QgPSB0ZXN0ZXIoe1xuXHRcdHVybDogXCJodHRwOi8vMTI3LjAuMC4xOjM2NjAvZ3JhcGh0ZXN0XCIsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdH0pO1xuXG5cdGl0KFwiZGViZXJpYSBwb2RlciB2ZXIgbG9zIHByaW1lcm9zIDMgcHJlZ3VudGFzXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhZG9QcmVndW50YXNBY3R1YWxlcygkYWZ0ZXI6IFN0cmluZyEsICRsaW1pdDogSW50LCAkd29yZDogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ICBsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXMoYWZ0ZXI6ICRhZnRlciwgbGltaXQ6ICRsaW1pdCwgd29yZDogJHdvcmQpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHRvdGFsQ291bnRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlZGdlcyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjdXJzb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vZGV7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCBpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCB1c3VhcmlvX0lEe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgXHRhcGVsbGlkb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgfVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHBhZ2VJbmZvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGVuZEN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2Vcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0YWZ0ZXI6IFwiXCIsXG5cdFx0XHRcdFx0bGltaXQ6IDMsXG5cdFx0XHRcdFx0d29yZDogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEubGlzdGFkb1ByZWd1bnRhc0FjdHVhbGVzLnRvdGFsQ291bnQpLnRvQmUoNSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhZG9QcmVndW50YXNBY3R1YWxlcy5lZGdlcy5sZW5ndGgpLnRvQmUoMyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXMoJGFmdGVyOiBTdHJpbmchLCAkbGltaXQ6IEludCl7XG5cdFx0XHRcdFx0XHRcdCAgbGlzdGFkb1ByZWd1bnRhc0FjdHVhbGVzKGFmdGVyOiAkYWZ0ZXIsIGxpbWl0OiAkbGltaXQpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHRvdGFsQ291bnRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlZGdlcyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjdXJzb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vZGV7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCBpbWFnZW5cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCB1c3VhcmlvX0lEe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgXHRhcGVsbGlkb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgfVx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHBhZ2VJbmZvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGVuZEN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2Vcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0YWZ0ZXI6IG51bGwsXG5cdFx0XHRcdFx0bGltaXQ6IDNcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoNDAwKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhZG9QcmVndW50YXNBY3R1YWxlcygkYWZ0ZXI6IFN0cmluZyEsICRsaW1pdDogSW50KXtcblx0XHRcdFx0XHRcdFx0ICBsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXMoYWZ0ZXI6ICRhZnRlciwgbGltaXQ6ICRsaW1pdCl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dG90YWxDb3VudFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVkZ2VzIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0bm9kZXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCBkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IHVzdWFyaW9fSUR7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgXHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCBcdGFwZWxsaWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgXHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCB9XHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0cGFnZUluZm8ge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0ZW5kQ3Vyc29yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRoYXNuZXh0UGFnZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRhZnRlcjogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdGxpbWl0OiAzXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDQwMCk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdChcIkRlYmVyaWEgcG9kZSBvYnRlbmVyIHRvZGFzIGxvcyBkb2N1bWVudG9zXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhZG9QcmVndW50YXNBY3R1YWxlcygkYWZ0ZXI6IFN0cmluZyEsICRsaW1pdDogSW50KXtcblx0XHRcdFx0XHRcdFx0ICBsaXN0YWRvUHJlZ3VudGFzQWN0dWFsZXMoYWZ0ZXI6ICRhZnRlciwgbGltaXQ6ICRsaW1pdCl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dG90YWxDb3VudFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVkZ2VzIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0bm9kZXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCBkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0IHVzdWFyaW9fSUR7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgXHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCBcdGFwZWxsaWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHQgXHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdCB9XHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0cGFnZUluZm8ge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0ZW5kQ3Vyc29yXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRoYXNuZXh0UGFnZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOntcblx0XHRcdFx0XHRhZnRlcjogXCJcIixcblx0XHRcdFx0XHRsaW1pdDogNVxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEubGlzdGFkb1ByZWd1bnRhc0FjdHVhbGVzLnRvdGFsQ291bnQpLnRvQmUoNSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhZG9QcmVndW50YXNBY3R1YWxlcy5lZGdlcy5sZW5ndGgpLnRvQmUoNSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmxpc3RhZG9QcmVndW50YXNBY3R1YWxlcy5wYWdlSW5mby5oYXNuZXh0UGFnZSkudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxufSk7XG5cbmRlc2NyaWJlKFwiSGFjZXIgcm9sbGJhY2sgZGUgbGFzIHByZWd1bnRhXCIsIGZ1bmN0aW9uICgpe1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHJldG9ybmFyIGEgdW5hIHByZWd1bnRhIGFudGVyaW9yIHNpIGVsIGVzdGFkb1wiICtcblx0XHRcImRlIG1pIHByZWd1bnRhIGVzIGRlIHJldmlzaW9uIHkgbGEgcHJlZ3VudGEgcXVlIGRlc2VvIGhhY2VyXCIgK1xuXHRcdFwicm9sbGJhY2sgc2UgZW5jdWVudHJhIGVuIHVuIGVzdGFkbyBlc3RhYmxlIFwiICtcblx0XHRcImVzdGFibGUgXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIHJvbGxiYWNrUHJlZ3VudGFBbnRlcmlvcigkaWRQcmVndW50YTogU3RyaW5nLCAkaWRQcmVndW50YUFudGVyaW9yOiBTdHJpbmcsIFxuXHRcdFx0XHRcdFx0XHRcdFx0JG93bmVyUXVlc3Rpb246IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdHJvbGxiYWNrUHJlZ3VudGFBbnRlcmlvcihpZFByZWd1bnRhOiAkaWRQcmVndW50YSwgaWRQcmVndW50YUFudGVyaW9yOiAkaWRQcmVndW50YUFudGVyaW9yLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3duZXJRdWVzdGlvbjogJG93bmVyUXVlc3Rpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczp7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCI1YWNkZTFjNThjZGY1YTUyODQzNDk3MTNcIixcblx0XHRcdFx0XHRpZFByZWd1bnRhQW50ZXJpb3I6IFwiNWFjZTNlNDBmOWU5Y2I2NDM0MTViMGY1XCIsXG5cdFx0XHRcdFx0b3duZXJRdWVzdGlvbjogXCJrZXZpbmFuZHJlc29ydGl6bWVyY2hhbjExMUBnbWFpbC5jb21cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEucm9sbGJhY2tQcmVndW50YUFudGVyaW9yLmRlc2NyaXBjaW9uKS50b01hdGNoKC9QcmVndW50YSBjb24gcmVzcHVlc3RhIGRlIGNhc2lsbGEgZGUgdmVyaWZpY2FjaW9uLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXG5cdGl0KFwiRGViZXJpYSBwb2RlciBoYWNlciByb2xsYmFjayBkZSB1bmEgcHJlZ3VudGEgcXVlIHN1IGVzdGFkbyBhY3R1YWwgc2VhIGRlXCIgK1xuXHRcdFwicmV2aXNpb24geSBsYSBwcmVndW50YSBxdWUgZGVzZW8gaGFjZXIgcm9sbGJhY2sgc2VhIGRlIHJldmlzaW9uXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIHJvbGxiYWNrUHJlZ3VudGFBbnRlcmlvcigkaWRQcmVndW50YTogU3RyaW5nLCAkaWRQcmVndW50YUFudGVyaW9yOiBTdHJpbmcsIFxuXHRcdFx0XHRcdFx0XHRcdFx0JG93bmVyUXVlc3Rpb246IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdHJvbGxiYWNrUHJlZ3VudGFBbnRlcmlvcihpZFByZWd1bnRhOiAkaWRQcmVndW50YSwgaWRQcmVndW50YUFudGVyaW9yOiAkaWRQcmVndW50YUFudGVyaW9yLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3duZXJRdWVzdGlvbjogJG93bmVyUXVlc3Rpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGVzdGFkb1x0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkUHJlZ3VudGE6IFwiNWFjZGUxYzU4Y2RmNWE1Mjg0MzQ5NzEzXCIsXG5cdFx0XHRcdFx0aWRQcmVndW50YUFudGVyaW9yOiBcIjVhY2UzZTg3N2RmZTgwNjQ0ZTc5YTliMVwiLFxuXHRcdFx0XHRcdG93bmVyUXVlc3Rpb246IFwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW4xMTFAZ21haWwuY29tXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLnJvbGxiYWNrUHJlZ3VudGFBbnRlcmlvci5kZXNjcmlwY2lvbikudG9NYXRjaCgvUHJlZ3VudGEgZWRpdGFkYSBkZSBlamVtcGxvIHZlcnNpb24gOS8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgaGFjZXIgcm9sbGJhY2sgZGUgdW5hIHByZWd1bnRhIHF1ZSBzdSBlc3RhZG8gYWN0dWFsIHNlYSBcIiArXG5cdFx0XCJlc3RhYmxlIHkgbGEgcHJlZ3VudGEgcXVlIGRlc2VvIGhhY2VyIHJvbGxiYWNrIHNlYSBkZSByZXZpc2lvblwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiByb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGlkUHJlZ3VudGFBbnRlcmlvcjogJGlkUHJlZ3VudGFBbnRlcmlvcixcblx0XHRcdFx0XHRcdFx0XHRcdG93bmVyUXVlc3Rpb246ICRvd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U4NzdkZmU4MDY0NGU3OWE5YjFcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5yb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IuZGVzY3JpcGNpb24pLnRvTWF0Y2goL1ByZWd1bnRhIGVkaXRhZGEgZGUgZWplbXBsbyB2ZXJzaW9uIDkvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblxuXHR9KTtcblx0aXQoXCJObyBEZWJlcmlhIHBvZGVyIGhhY2VyIHJvbGxiYWNrIGRlIHVuYSBwcmVndW50YSBxdWUgc3UgZXN0YWRvIGFjdHVhbCBzZWEgXCIgK1xuXHRcdFwicmV2aXNpb24geSBsYSBwcmVndW50YSBxdWUgZGVzZW8gaGFjZXIgcm9sbGJhY2sgc2VhIHJlY2hhemFkYVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiByb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGlkUHJlZ3VudGFBbnRlcmlvcjogJGlkUHJlZ3VudGFBbnRlcmlvcixcblx0XHRcdFx0XHRcdFx0XHRcdG93bmVyUXVlc3Rpb246ICRvd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U0MGY5ZTljYjY0MzQxNWIwZjVcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblx0fSk7XG5cdGl0KFwiTm8gRGViZXJpYSBwb2RlciBoYWNlciByb2xsYmFjayBkZSB1bmEgcHJlZ3VudGEgcXVlIHN1IGVzdGFkbyBhY3R1YWwgc2VhIFwiICtcblx0XHRcImVzdGFibGUgeSBsYSBwcmVndW50YSBxdWUgZGVzZW8gaGFjZXIgcm9sbGJhY2sgc2VhIHJlY2hhemFkYVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiByb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGlkUHJlZ3VudGFBbnRlcmlvcjogJGlkUHJlZ3VudGFBbnRlcmlvcixcblx0XHRcdFx0XHRcdFx0XHRcdG93bmVyUXVlc3Rpb246ICRvd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U0MGY5ZTljYjY0MzQxNWIwZjVcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblx0fSk7XG5cdGl0KFwiTm8gRGViZXJpYSBwb2RlciBoYWNlciByb2xsYmFjayBkZSB1bmEgcHJlZ3VudGEgcXVlIHN1IGVzdGFkbyBhY3R1YWwgc2VhIFwiICtcblx0XHRcInJlY2hhemFkbyB5IGxhIHByZWd1bnRhIHF1ZSBkZXNlbyBoYWNlciByb2xsYmFjayBzZWEgZXN0YWJsZVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiByb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGlkUHJlZ3VudGFBbnRlcmlvcjogJGlkUHJlZ3VudGFBbnRlcmlvcixcblx0XHRcdFx0XHRcdFx0XHRcdG93bmVyUXVlc3Rpb246ICRvd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U0MGY5ZTljYjY0MzQxNWIwZjVcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblx0fSk7XG5cdGl0KFwiTm8gRGViZXJpYSBwb2RlciBoYWNlciByb2xsYmFjayBkZSB1bmEgcHJlZ3VudGEgc2kgeW8gbm8gc295IHByb3BpZXRhcmlvIGRlIGRpY2hhIHByZWd1bnRhIFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiByb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja1ByZWd1bnRhQW50ZXJpb3IoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGlkUHJlZ3VudGFBbnRlcmlvcjogJGlkUHJlZ3VudGFBbnRlcmlvcixcblx0XHRcdFx0XHRcdFx0XHRcdG93bmVyUXVlc3Rpb246ICRvd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U0MGY5ZTljYjY0MzQxNWIwZjVcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuNDk3QGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9ycy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciBoYWNlciByb2xsYmFjayBzb2xhbWVudGUgZGUgbGEgZGVzY3JpcGNpb24gZGUgbGEgcHJlZ3VudGEgc2kgeW8gc295IHByb3BpZXRhcmlvIGRlIGRpY2hhIHByZWd1bnRhXCIgK1xuXHRcdFwieSBhZGVtYXMgZXNhIHByZWd1bnRhIHRpZW5lIHVuIGVzdGFkbyBkZSByZXZpc2lvbiwgeSBsYSBwcmVndW50YSBxdWUgZGVzZW8gaGFjZXJcIiArXG5cdFx0XCJyb2xsYmFjayBwcmVzZW50YSB1biBlc3RhZG8gZGUgZXN0YWJsZVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiByb2xsYmFja0Rlc2NyaXBjaW9uUHJlZ3VudGEoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja0Rlc2NyaXBjaW9uUHJlZ3VudGEoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGlkUHJlZ3VudGFBbnRlcmlvcjogJGlkUHJlZ3VudGFBbnRlcmlvcixcblx0XHRcdFx0XHRcdFx0XHRcdG93bmVyUXVlc3Rpb246ICRvd25lclF1ZXN0aW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGltYWdlblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGlkZW50aWZpY2Fkb3Jcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRlc3RhZG9cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U0MGY5ZTljYjY0MzQxNWIwZjVcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5yb2xsYmFja0Rlc2NyaXBjaW9uUHJlZ3VudGEuZGVzY3JpcGNpb24pLnRvTWF0Y2goL1ByZWd1bnRhIGNvbiByZXNwdWVzdGEgZGUgY2FzaWxsYSBkZSB2ZXJpZmljYWNpb24vKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEucm9sbGJhY2tEZXNjcmlwY2lvblByZWd1bnRhLmVzdGFkbykudG9NYXRjaCgvcmV2aXNpb24vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGhhY2VyIHJvbGxiYWNrIHNvbGFtZW50ZSBkZSBsYSByZXNwdWVzdGFzIGRlIGxhIHByZWd1bnRhIHNpIHlvIHNveSBwcm9waWV0YXJpbyBkZSBkaWNoYSBwcmVndW50YVwiICtcblx0XHRcInkgYWRlbWFzIGVzYSBwcmVndW50YSB0aWVuZSB1biBlc3RhZG8gZGUgcmV2aXNpb24sIHkgbGEgcHJlZ3VudGEgcXVlIGRlc2VvIGhhY2VyXCIgK1xuXHRcdFwicm9sbGJhY2sgcHJlc2VudGEgdW4gZXN0YWRvIGRlIGVzdGFibGVcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gcm9sbGJhY2tSZXNwdWVzdGFzUHJlZ3VudGEoJGlkUHJlZ3VudGE6IFN0cmluZywgJGlkUHJlZ3VudGFBbnRlcmlvcjogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHRcdCRvd25lclF1ZXN0aW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRyb2xsYmFja1Jlc3B1ZXN0YXNQcmVndW50YShpZFByZWd1bnRhOiAkaWRQcmVndW50YSwgaWRQcmVndW50YUFudGVyaW9yOiAkaWRQcmVndW50YUFudGVyaW9yLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3duZXJRdWVzdGlvbjogJG93bmVyUXVlc3Rpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdF9pZFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aW1hZ2VuXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0aWRlbnRpZmljYWRvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHJlc3B1ZXN0YXNcdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiLFxuXHRcdFx0XHRcdGlkUHJlZ3VudGFBbnRlcmlvcjogXCI1YWNlM2U0MGY5ZTljYjY0MzQxNWIwZjVcIixcblx0XHRcdFx0XHRvd25lclF1ZXN0aW9uOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5yb2xsYmFja1Jlc3B1ZXN0YXNQcmVndW50YS5kZXNjcmlwY2lvbikudG9NYXRjaCgvUHJlZ3VudGEgZWRpdGFkYS8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXG5cdH0pO1xufSk7XG4iXX0=