"use strict";

/* eslint-disable no-undef,quotes */

var tester = require("graphql-tester").tester;
describe("Escenario del modelo de comentarios", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("El usuario deberia poder crear un comentario asociado a una pregunta", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearComentarioAnexadaAPregunta($comentario: ComentarioInput, $idPregunta: String!){\n\t\t\t\t\t\t\tcrearComentarioAnexadaAPregunta(comentario: $comentario, idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tcreador_comentario{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcontenido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				comentario: {
					contenido: "es mi primer comentario de esta pregunta",
					creador_comentario: "5ade907216edf832bf53692b",
					fecha_creacion: new Date()
				},
				idPregunta: "5addfc4dff628f04be5dcc97"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearComentarioAnexadaAPregunta.contenido).toMatch(/es mi primer comentario de esta pregunta/);
			done();
		});
	});
	it("El usuario deberia poder crear un comentario asociado a una correccion de pregunta", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearComentarioAnexadaADiscusionPregunta($comentario: ComentarioInput, $idDiscusionPregunta: String!){\n\t\t\t\t\t\t\tcrearComentarioAnexadaADiscusionPregunta(comentario: $comentario, idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \t\t\t\t\tcreador_comentario{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcontenido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				comentario: {
					contenido: "es mi primer comentario de esta correccion de pregunta",
					creador_comentario: "5ade907216edf832bf53692b",
					fecha_creacion: new Date()
				},
				idDiscusionPregunta: "5ad6188ebd916635f7ac9f86"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearComentarioAnexadaADiscusionPregunta.contenido).toMatch(/es mi primer comentario de esta correccion de pregunta/);
			done();
		});
	});
	it("El usuario deberia poder crear un comentario asociado a otro comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearSubComentarioAnexadaAComentario($comentario: ComentarioInput, $idComentario: String!){\n\t\t\t\t\t\t\tcrearSubComentarioAnexadaAComentario(comentario: $comentario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tcreador_comentario{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcontenido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				comentario: {
					contenido: "es mi primer comentario de un comentario",
					creador_comentario: "5ade907216edf832bf53692b",
					fecha_creacion: new Date()
				},
				idComentario: "5adff4bc4c721f08e52bae1d"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearSubComentarioAnexadaAComentario.contenido).toMatch(/es mi primer comentario de un comentario/);
			done();
		});
	});
	it("Deberia poder editar el contenido de un comentario, si soy propietario de ese comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarComentario($contenido: String, $idComentario: String, $idUsuario: String!){\n\t\t\t\t\t\t\teditarComentario(contenido: $contenido, idComentario: $idComentario, idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\tcreador_comentario{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcontenido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				contenido: "comentario actualizado correctamente",
				idComentario: "5adf543587d8de49e1d9aaee",
				idUsuario: "5ade907216edf832bf53692b"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarComentario.contenido).toMatch(/comentario actualizado correctamente/);
			done();
		});
	});
	it("No Deberia poder editar el contenido de un comentario, si no soy propietario de ese comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarComentario($contenido: String, $idComentario: String, $idUsuario: String!){\n\t\t\t\t\t\t\teditarComentario(contenido: $contenido, idComentario: $idComentario, idUsuario: $idUsuario){\n\t\t\t\t\t\t\t \t\t\t\t\tcreador_comentario{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\tcontenido\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				contenido: "comentario actualizado correctamente",
				idComentario: "5adf543587d8de49e1d9aaee",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/this users is not the owner this question/);
			done();
		});
	});
	it("Deberia dar mi voto positivo, a un comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarLikesComentario.like).toBe(1);
			expect(response.data.colocarLikesComentario.dislike).toBe(0);
			done();
		});
	});
	it("Deberia dar mi voto negativo, a un comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarDisLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarDisLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarDisLikesComentario.like).toBe(0);
			expect(response.data.colocarDisLikesComentario.dislike).toBe(1);
			done();
		});
	});
	it("Deberia dar favorito a un comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarFavoritosComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarFavoritosComentario(idUsuario: $idUsuario, idComentario: $idComentario)\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarFavoritosComentario).toBe(1);
			done();
		});
	});
	it("Deberia quitar mi voto negativo, a un comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarDisLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarDisLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarDisLikesComentario.like).toBe(0);
			expect(response.data.colocarDisLikesComentario.dislike).toBe(-1);
			done();
		});
	});
	it("Deberia Obtener un voto nulo a mi comentario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarLikesComentario.like).toBe(-1);
			expect(response.data.colocarLikesComentario.dislike).toBe(0);
			done();
		});
	});
	it("Deberia Obtener un voto positivo a un comentario si anteriormente mi voto " + "fue negativo", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarLikesComentario.like).toBe(1);
			expect(response.data.colocarLikesComentario.dislike).toBe(-1);
			done();
		});
	});
	it("Deberia Obtener un voto positivo a un comentario si no " + "poseo ningun voto", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ade907216edf832bf536900"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarLikesComentario.like).toBe(1);
			expect(response.data.colocarLikesComentario.dislike).toBe(0);
			done();
		});
	});
	it("Deberia dar mi voto positivo, a un comentario de un nuevo usuario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ac24c758e4a6a23d4869ac7"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarLikesComentario.like).toBe(1);
			expect(response.data.colocarLikesComentario.dislike).toBe(0);
			done();
		});
	});
	it("Deberia Obtener un voto nulo a mi comentario de un nuevo usuario", function (done) {
		self.test(JSON.stringify({
			query: "mutation colocarLikesComentario($idUsuario: String, $idComentario: String){\n\t\t\t\t\t\t\tcolocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){\n\t\t\t\t\t\t\t \t\t\t\t\tlike\n\t\t\t\t\t\t\t \t\t\t\t\tdislike\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d",
				idUsuario: "5ac24c758e4a6a23d4869ac7"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.colocarLikesComentario.like).toBe(-1);
			expect(response.data.colocarLikesComentario.dislike).toBe(0);
			done();
		});
	});
});

describe("Acciones de consulta para el modelo comentario", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia ver informacion de un comentario", function (done) {
		self.test(JSON.stringify({
			query: "query verComentario($idComentario: String){\n\t\t\t\t\t\t\t  verComentario(idComentario: $idComentario){\n\t\t\t\t\t\t\t  \t\t\t\tcreador_comentario{\n\t\t\t\t\t\t\t  \t\t\t\t\tcorreo\n\t\t\t\t\t\t\t  \t\t\t\t\tnombre\n\t\t\t\t\t\t\t  \t\t\t\t}\n\t\t\t\t\t\t\t  \t\t\t\tidentificador\n\t\t\t\t\t\t\t  \t\t\t\tcontenido\n\t\t\t\t\t\t\t  \t\t\t\tlistaSubComentarios{\n\t\t\t\t\t\t\t  \t\t\t\t\tidentificador\n\t\t\t\t\t\t\t  \t\t\t\t}\n\t\t\t\t\t\t\t  \t\t\t\tfecha_creacion\n\t\t\t\t\t\t\t  \t\t\t\tfecha_actualizacion\n\t\t\t\t\t\t\t  \t\t\t\tvotacion{\n\t\t\t\t\t\t\t  \t\t\t\t\tusuario_creador{\n\t\t\t\t\t\t\t  \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t  \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t  \t\t\t\t\t}\n\t\t\t\t\t\t\t  \t\t\t\t\tlike\n\t\t\t\t\t\t\t  \t\t\t\t\tdislike\n\t\t\t\t\t\t\t  \t\t\t\t\tfavoritos\n\t\t\t\t\t\t\t  \t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d"
			}
		})).then(function (response) {
			console.log(response);
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia ver informacion de la lista de subcomentarios anexados a un comentario", function (done) {
		self.test(JSON.stringify({
			query: "query verListaSubComentarios($idComentario: String){\n\t\t\t\t\t\t\t  verListaSubComentarios(idComentario: $idComentario){\n\t\t\t\t\t\t\t  \t\t\tlistaSubComentarios{\n\t\t\t\t\t\t\t  \t\t\t\tidentificador\n\t\t\t\t\t\t\t  \t\t\t\tcontenido\n\t\t\t\t\t\t\t  \t\t\t}\n\t\t\t\t\t\t\t  \t\t\t\t\n\t\t\t\t\t\t\t \t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idComentario: "5adff4bc4c721f08e52bae1d"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia ver la lista de comentarios asociado a una pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query verComentariosAsociadosPregunta($idPregunta: String, $limit: Int, $index: Int){\n\t\t\t\t\t\t\t  verComentariosAsociadosPregunta(idPregunta: $idPregunta, limit: $limit, index: $index){\n\t\t\t\t\t\t\t  \t\t\tedges{\n\t\t\t\t\t\t\t  \t\t\t\tidentificador\n\t\t\t\t\t\t\t  \t\t\t\tcontenido\n\t\t\t\t\t\t\t  \t\t\t}\n\t\t\t\t\t\t\t  \t\t\thasnextElement\n\t\t\t\t\t\t\t  \t\t\t\t\n\t\t\t\t\t\t\t \t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5addfc4dff628f04be5dcc97",
				limit: 5,
				index: 0
			}
		})).then(function (response) {
			console.log(response);
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.verComentariosAsociadosPregunta.hasnextElement).toBe(false);
			done();
		});
	});
	it("Deberia ver la lista de comentarios asociado a una discusion de pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query verComentariosAsociadosDiscusionPregunta($idDiscusionPregunta: String, $limit: Int, $index: Int){\n\t\t\t\t\t\t\t  verComentariosAsociadosDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta, limit: $limit, index: $index){\n\t\t\t\t\t\t\t  \t\t\tedges{\n\t\t\t\t\t\t\t  \t\t\t\tidentificador\n\t\t\t\t\t\t\t  \t\t\t\tcontenido\n\t\t\t\t\t\t\t  \t\t\t}\n\t\t\t\t\t\t\t  \t\t\thasnextElement\n\t\t\t\t\t\t\t  \t\t\t\t\n\t\t\t\t\t\t\t \t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad6188ebd916635f7ac9f86",
				limit: 5,
				index: 0
			}
		})).then(function (response) {
			console.log(response);
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.verComentariosAsociadosDiscusionPregunta.hasnextElement).toBe(false);
			done();
		});
	});
});
//# sourceMappingURL=comentarios.test.js.map