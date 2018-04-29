"use strict";

/* eslint-disable quotes,no-undef */

var tester = require('graphql-tester').tester;

describe("Modelo de discusion de Pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("deberia poder crear una nueva discusion de Pregunta", function (done) {
		self.test(JSON.stringify({
			query: "mutation nuevaDiscusionPregunta($discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\tnuevaDiscusionPregunta(discusionPregunta: $discusionPregunta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\thabilitada\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				discusionPregunta: {
					titulo: "mi septima discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta pregunta tiene varios errores",
					tipo_correccion: ["descripcion", "contenido_multimedia"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "creado",
						observacion: "discusion de pregunta creada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349714"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.nuevaDiscusionPregunta.titulo).toMatch(/mi septima discusion de pregunta/);
			done();
		});
	});

	it("No deberia guardar una discusion de Pregunta que ya sido previamente creada", function (done) {
		self.test(JSON.stringify({
			query: "mutation nuevaDiscusionPregunta($discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\tnuevaDiscusionPregunta(discusionPregunta: $discusionPregunta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\thabilitada\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				discusionPregunta: {
					titulo: "mi primera discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta pregunta tiene varios errores",
					tipo_correccion: ["descripcion", "contenido_multimedia"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "creado",
						observacion: "discusion de pregunta creada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			expect(response.errors[0].message).toMatch(/you already create this question, you can create the same correction two times/);
			done();
		});
	});

	it("deberia poder crear una nueva discusion", function (done) {
		self.test(JSON.stringify({
			query: "mutation nuevaDiscusionPregunta($discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\tnuevaDiscusionPregunta(discusionPregunta: $discusionPregunta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\thabilitada\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				discusionPregunta: {
					titulo: "mi tercera discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta pregunta algunos  errores",
					tipo_correccion: ["descripcion", "contenido_multimedia"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "creado",
						observacion: "discusion de pregunta creada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.nuevaDiscusionPregunta.titulo).toMatch(/mi tercera discusion de pregunta/);
			done();
		});
	});

	it("deberia poder editar una discusion de pregunta, en el cual soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\teditarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				discusionPregunta: {
					titulo: "mi segunda editada de discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta es una discusion editada ",
					tipo_correccion: ["descripcion", "contenido_multimedia", "respuestas"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "editado",
						observacion: "discusion editada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarDiscusionPregunta).toBe(true);
			done();
		});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual soy el creador" + "debido que el estado asignado es pendiente", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\teditarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				discusionPregunta: {
					titulo: "mi segunda editada de discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta es una discusion editada ",
					tipo_correccion: ["descripcion", "contenido_multimedia", "respuestas"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "editado",
						observacion: "discusion editada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not make change to a issues, in state pending/);
			done();
		});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual soy el creador" + "debido que el estado asignado es cerrado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\teditarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				discusionPregunta: {
					titulo: "mi segunda editada de discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta es una discusion editada ",
					tipo_correccion: ["descripcion", "contenido_multimedia", "respuestas"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "editado",
						observacion: "discusion editada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the issues was reject by a committee member, so you must create a new one issues/);
			done();
		});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual soy el creador" + "debido que el estado asignado es resuelto", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\teditarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				discusionPregunta: {
					titulo: "mi segunda editada de discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta es una discusion editada ",
					tipo_correccion: ["descripcion", "contenido_multimedia", "respuestas"],
					creador_correccion: "5ac24c758e4a6a23d4869ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "editado",
						observacion: "discusion editada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you already accept the change of the question creator, so you decided marked this issues like solved!, you should create other issues/);
			done();
		});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual no soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){\n\t\t\t\t\t\t\teditarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				discusionPregunta: {
					titulo: "mi segunda editada de discusion de pregunta",
					etiquetas_correcciones: ["5ad224fcd47c4b51302491ce", "5ad224fcd47c4b51302491cf"],
					descripcion: "esta es una discusion editada ",
					tipo_correccion: ["descripcion", "contenido_multimedia", "respuestas"],
					creador_correccion: "5ac24c758e4a6a23d4889ac7",
					estado_correccion: {
						usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
						rol: "usuario",
						asignacion: "editado",
						observacion: "discusion editada"
					},
					fecha_creacion: new Date(),
					pregunta_ID: "5acde1c58cdf5a5284349713"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/This user can't edit this question, because he is not the owner/);
			done();
		});
	});

	it("deberia poder eliminar una discusion de pregunta, en el cual soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarDiscusionPregunta($idDiscusionPregunta: String!,$creador_correccion: String){\n\t\t\t\t\t\t\teliminarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,creador_correccion: $creador_correccion)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				creador_correccion: "5ac24c758e4a6a23d4869ac7"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.eliminarDiscusionPregunta).toBe(true);
			done();
		});
	});

	it("deberia no poder eliminar una discusion de pregunta, en el cual no soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarDiscusionPregunta($idDiscusionPregunta: String!,$creador_correccion: String){\n\t\t\t\t\t\t\teliminarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,creador_correccion: $creador_correccion)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				creador_correccion: "5ac24c758e4a6a23d4779ac7"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/This user can't edit this question, because he is not the owner/);
			done();
		});
	});

	it("deberia no poder eliminar una discusion de pregunta, en el cual soy el creador," + "pero se encuentra en un estado pendiente", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarDiscusionPregunta($idDiscusionPregunta: String!,$creador_correccion: String){\n\t\t\t\t\t\t\teliminarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,creador_correccion: $creador_correccion)\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				creador_correccion: "5ac24c758e4a6a23d4779ac7"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not delete this issues, in state pending/);
			done();
		});
	});

	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual soy el creador," + "debido que el estado de la discusion se encuentra en estado" + "pendiente", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				titulo: "esta es una discusion editada por kevin Ortiz"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not make change to a issues, in state pending/);
			done();
		});
	});
	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual soy el creador," + "debido que el estado de la discusion se encuentra en estado" + "cerrado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				titulo: "esta es una discusion editada por kevin Ortiz"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the issues was reject by a committee member, so you must create a new one issues/);
			done();
		});
	});
	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual soy el creador," + "debido que el estado de la discusion se encuentra en estado" + "resuelto", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				titulo: "esta es una discusion editada por kevin Ortiz"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you already accept the change of the question creator, so you decided marked this issues like solved!, you should create other issues/);
			done();
		});
	});

	it("deberia poder editar el titulo de  una discusion de pregunta, en el cual soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				titulo: "esta es una discusion editada por kevin Ortiz"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarMyDiscusionPreguntaByTitulo.titulo).toMatch(/esta es una discusion editada por kevin Ortiz/);
			done();
		});
	});
	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual no soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan111@gmail.com",
				titulo: "esta es una discusion editada por kevin Ortiz"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/this question issue you can not edit, because you are not the owner/);
			done();
		});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador" + "debido que se encuentra en un estado de pendiente", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){\n\t\t\t\t\t\t\t \tdescripcion\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				descripcion: "descripcion utilizada por ejemplo"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not make change to a issues, in state pending/);
			done();
		});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador" + "debido que se encuentra en un estado de cerrado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){\n\t\t\t\t\t\t\t \tdescripcion\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				descripcion: "descripcion utilizada por ejemplo"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/the issues was reject by a committee member, so you must create a new one issues/);
			done();
		});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador" + "debido que se encuentra en un estado de resuelto", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){\n\t\t\t\t\t\t\t \tdescripcion\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				descripcion: "descripcion utilizada por ejemplo"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you already accept the change of the question creator, so you decided marked this issues like solved!, you should create other issues/);
			done();
		});
	});
	it("deberia poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){\n\t\t\t\t\t\t\t \tdescripcion\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan@gmail.com",
				descripcion: "descripcion utilizada por ejemplo"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.editarMyDiscusionPreguntaByDescripcion.descripcion).toMatch(/descripcion utilizada por ejemplo/);
			done();
		});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual no soy el creador", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){\n\t\t\t\t\t\t\teditarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){\n\t\t\t\t\t\t\t \tdescripcion\n\t\t\t\t\t\t\t}\n\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
				correoUsuario: "kevinandresortizmerchan111@gmail.com",
				descripcion: "descripcion utilizada por ejemplo"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/this question issue you can not edit, because you are not the owner/);
			done();
		});
	});
	it("Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," + "siendo el creador de la discusion de la pregunta", function (done) {
		self.test(JSON.stringify({
			query: "mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){\n\t\t\t\t\t\t\taprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \testado_correccion{\n\t\t\t\t\t\t\t \t\tobservacion\n\t\t\t\t\t\t\t \t\tasignacion\n\t\t\t\t\t\t\t \t}\n\t\t\t\t\t\t\t}\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.aprobarEstadoMyDiscusionPregunta.estado_correccion[0].asignacion).toMatch(/resuelto/);
			expect(response.data.aprobarEstadoMyDiscusionPregunta.estado_correccion[0].observacion).toMatch(/el usuario ha cerrado esta discusion,/);
			done();
		});
	});
	it("No Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," + "siendo el creador de la discusion de la pregunta, debido que se " + "encuentra deshabilitada", function (done) {
		self.test(JSON.stringify({
			query: "mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){\n\t\t\t\t\t\t\taprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \testado_correccion{\n\t\t\t\t\t\t\t \t\tobservacion\n\t\t\t\t\t\t\t \t\tasignacion\n\t\t\t\t\t\t\t \t}\n\t\t\t\t\t\t\t}\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't approved a question issues, that you had closed!/);
			done();
		});
	});
	it("No Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," + "siendo el creador de la discusion de la pregunta, y el estado de la discusion es " + "cerrado", function (done) {
		self.test(JSON.stringify({
			query: "mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){\n\t\t\t\t\t\t\taprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \testado_correccion{\n\t\t\t\t\t\t\t \t\tobservacion\n\t\t\t\t\t\t\t \t\tasignacion\n\t\t\t\t\t\t\t \t}\n\t\t\t\t\t\t\t}\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't approved a issues questions, that already is closed or solved!/);
			done();
		});
	});
	it("No Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," + "siendo el creador de la discusion de la pregunta, debido que la discusion" + "ya se encuentra resuelta", function (done) {
		self.test(JSON.stringify({
			query: "mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){\n\t\t\t\t\t\t\taprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \testado_correccion{\n\t\t\t\t\t\t\t \t\tobservacion\n\t\t\t\t\t\t\t \t\tasignacion\n\t\t\t\t\t\t\t \t}\n\t\t\t\t\t\t\t}\n\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors[0].message).toMatch(/you can't approved a issues questions, that already is closed or solved!/);
			done();
		});
	});
});

describe("Acciones de consulta del modelo de discusiones de Pregunta", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder ver los dos primeros elementos de discusiones" + "basada en una pregunta, podiendo tener la opcion de ver " + "que todavia existe un proximo elemento en consultar", function (done) {
		self.test(JSON.stringify({
			query: "query getListaIssuesByQuestions($limit: Int, $after: String, $idPregunta: String!){\n\t\t\t\t\t\t\tgetListaIssuesByQuestions(limit: $limit, after: $after, idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\ttotalCount\n\t\t\t\t\t\t\t \t\tedges {\n\t\t\t\t\t\t\t \t\t\tcursor\n\t\t\t\t\t\t\t \t\t\tnode {\n\t\t\t\t\t\t\t \t\t\t\tcreador_correccion {\n\t\t\t\t\t\t\t \t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\testado_correccion{\n\t\t\t\t\t\t\t \t\t\t\t\trol\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_creador_estado{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\tpageInfo{\n\t\t\t\t\t\t\t \t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t}\t\t\t\t\n\t\t\t\t\t\t\t \t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				limit: 2,
				after: "Mg==",
				idPregunta: "5acde1c58cdf5a5284349713"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.getListaIssuesByQuestions.totalCount).toBe(3);
			expect(response.data.getListaIssuesByQuestions.pageInfo.hasnextPage).toBe(false);
			expect(response.data.getListaIssuesByQuestions.edges[0].node.creador_correccion.correo).toMatch(/kevinandresortizmerchan/);
			done();
		});
	});
	it("Deberia poder ve todos los elementos de discusiones" + "basada en una pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query getListaIssuesByQuestions($limit: Int, $after: String, $idPregunta: String!){\n\t\t\t\t\t\t\tgetListaIssuesByQuestions(limit: $limit, after: $after, idPregunta: $idPregunta){\n\t\t\t\t\t\t\t \t\ttotalCount\n\t\t\t\t\t\t\t \t\tedges {\n\t\t\t\t\t\t\t \t\t\tcursor\n\t\t\t\t\t\t\t \t\t\tnode {\n\t\t\t\t\t\t\t \t\t\t\tcreador_correccion {\n\t\t\t\t\t\t\t \t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\testado_correccion{\n\t\t\t\t\t\t\t \t\t\t\t\trol\n\t\t\t\t\t\t\t \t\t\t\t\tusuario_creador_estado{\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\tpageInfo{\n\t\t\t\t\t\t\t \t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t}\t\t\t\t\n\t\t\t\t\t\t\t \t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				limit: 0,
				after: "",
				idPregunta: "5acde1c58cdf5a5284349713"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.getListaIssuesByQuestions.totalCount).toBe(3);
			expect(response.data.getListaIssuesByQuestions.pageInfo.hasnextPage).toBe(false);
			expect(response.data.getListaIssuesByQuestions.edges[0].node.creador_correccion.correo).toMatch(/kevinandresortizmerchan/);
			done();
		});
	});
	it("Deberia poder ver la lista de todos los usuarios que han asignado un estado" + "a mi correccion de pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query getListaUsuariosAsignadoEstadoCorreccionPregunta($idDiscusionPregunta: String!){\n\t\t\t\t\t\t\tgetListaUsuariosAsignadoEstadoCorreccionPregunta(idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \t\testado_correccion{\n\t\t\t\t\t\t\t \t\t\trol\n\t\t\t\t\t\t\t \t\t\tasignacion\n\t\t\t\t\t\t\t \t\t\tobservacion\n\t\t\t\t\t\t\t \t\t\tusuario_creador_estado{\n\t\t\t\t\t\t\t \t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\t\t\t\n\t\t\t\t\t\t\t \t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad6188ebd916635f7ac9f86"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.getListaUsuariosAsignadoEstadoCorreccionPregunta.estado_correccion[0].rol).toMatch(/usuario/);
			expect(response.data.getListaUsuariosAsignadoEstadoCorreccionPregunta.estado_correccion[0].asignacion).toMatch(/creado/);
			expect(response.data.getListaUsuariosAsignadoEstadoCorreccionPregunta.estado_correccion[0].usuario_creador_estado.nombre).toMatch(/kevin/);
			done();
		});
	});
	it("Deberia poder ver el contenido de una discusion de una pregunta dado un identificador", function (done) {
		self.test(JSON.stringify({
			query: "query loadDiscusionPregunta($idDiscusionPregunta: String!){\n\t\t\t\t\t\t\tloadDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){\n\t\t\t\t\t\t\t \t\testado_correccion{\n\t\t\t\t\t\t\t \t\t\trol\n\t\t\t\t\t\t\t \t\t\tasignacion\n\t\t\t\t\t\t\t \t\t\tobservacion\n\t\t\t\t\t\t\t \t\t\tusuario_creador_estado{\n\t\t\t\t\t\t\t \t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\tetiquetas_correcciones{\n\t\t\t\t\t\t\t \t\t\t\tetiqueta\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\tpregunta_ID {\n\t\t\t\t\t\t\t \t\t\tdescripcion\n\t\t\t\t\t\t\t \t\t\trespuestas\n\t\t\t\t\t\t\t \t\t\ttipoPregunta\n\t\t\t\t\t\t\t \t\t\tareaconocimiento {\n\t\t\t\t\t\t\t \t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t\tusuario_ID{\n\t\t\t\t\t\t\t \t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\t\t\t\n\t\t\t\t\t\t\t \t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idDiscusionPregunta: "5ad2528cc89887677f3f5c6e"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia poder ver el listado de discusiones anexadas a una pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query loadListaDiscusionesGeneradasByPregunta($idPregunta: String, $limit: Int){\n\t\t\t\t\t\t\tloadListaDiscusionesGeneradasByPregunta(idPregunta: $idPregunta, limit: $limit){\n\t\t\t\t\t\t\t \t\tcreador_correccion{\n\t\t\t\t\t\t\t \t\t\tnombre\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\tetiquetas_correcciones{\n\t\t\t\t\t\t\t \t\t\tetiqueta\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\testado_correccion{\n\t\t\t\t\t\t\t \t\t\tusuario_creador_estado {\n\t\t\t\t\t\t\t \t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\t\t\t\n\t\t\t\t\t\t\t \t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349714",
				limit: 10
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia poder ver las 10 primeras discusiones mas recientes", function (done) {
		self.test(JSON.stringify({
			query: "query loadFirstDiscusionesPreguntasRecienCreadas{\n\t\t\t\t\t\t\tloadFirstDiscusionesPreguntasRecienCreadas{\n\t\t\t\t\t\t\t \t\tcreador_correccion{\n\t\t\t\t\t\t\t \t\t\tnombre\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\testado_correccion{\n\t\t\t\t\t\t\t \t\t\tusuario_creador_estado {\n\t\t\t\t\t\t\t \t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t}\n\t\t\t\t\t\t\t \t\t}\t\n\t\t\t\t\t\t\t \t\ttitulo\n\t\t\t\t\t\t\t \t\tdescripcion\n\t\t\t\t\t\t\t \t\ttipo_correccion\n\t\t\t\t\t\t\t \t\tetiquetas_correcciones{\n\t\t\t\t\t\t\t \t\t\tetiqueta\n\t\t\t\t\t\t\t \t\t}\n\t\t\t\t\t\t\t \t\tpregunta_ID{\n\t\t\t\t\t\t\t \t\t\ttipoPregunta\n\t\t\t\t\t\t\t \t\t}\t\t\n\t\t\t\t\t\t\t \t}\t\t\t\t\n\t\t\t\t\t\t}"
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia poder ver el listado de las discusiones de preguntas por estado", function (done) {
		self.test(JSON.stringify({
			query: "query loadListaCorreccionesPreguntasByEstado($idPregunta: String, $estado: String, $limit: Int, $after: String){\n\t\t\t\t\t\t\tloadListaCorreccionesPreguntasByEstado(idPregunta: $idPregunta, estado: $estado, limit: $limit, after: $after){\n\t\t\t\t\t\t\t \t\t\t\t\ttotalCount\n\t\t\t\t\t\t\t \t\t\t\t\tpageInfo{\n\t\t\t\t\t\t\t \t\t\t\t\t\tendCursor\n\t\t\t\t\t\t\t \t\t\t\t\t\thasnextPage\n\t\t\t\t\t\t\t \t\t\t\t\t}\t\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349714",
				estado: "editado",
				after: "",
				limit: 10
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.loadListaCorreccionesPreguntasByEstado.totalCount).toBe(0);
			done();
		});
	});
	it("Deberia poder ver el listado de los usuarios que han creado correcciones de pregunta", function (done) {
		self.test(JSON.stringify({
			query: "query loadlistaUsuariosCreadoCorreccionesPreguntas($idPregunta: String){\n\t\t\t\t\t\t\tloadlistaUsuariosCreadoCorreccionesPreguntas(idPregunta: $idPregunta){\n\t\t\t\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idPregunta: "5acde1c58cdf5a5284349714"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.loadlistaUsuariosCreadoCorreccionesPreguntas.length).toBe(1);
			done();
		});
	});
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2ludGVncmF0aW9uL2Rpc2N1c2lvblByZWd1bnRhLnRlc3QuanMiXSwibmFtZXMiOlsidGVzdGVyIiwicmVxdWlyZSIsImRlc2NyaWJlIiwic2VsZiIsInRlc3QiLCJ1cmwiLCJjb250ZW50VHlwZSIsIml0IiwiZG9uZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJxdWVyeSIsInZhcmlhYmxlcyIsImRpc2N1c2lvblByZWd1bnRhIiwidGl0dWxvIiwiZXRpcXVldGFzX2NvcnJlY2Npb25lcyIsImRlc2NyaXBjaW9uIiwidGlwb19jb3JyZWNjaW9uIiwiY3JlYWRvcl9jb3JyZWNjaW9uIiwiZXN0YWRvX2NvcnJlY2Npb24iLCJ1c3VhcmlvX2NyZWFkb3JfZXN0YWRvIiwicm9sIiwiYXNpZ25hY2lvbiIsIm9ic2VydmFjaW9uIiwiZmVjaGFfY3JlYWNpb24iLCJEYXRlIiwicHJlZ3VudGFfSUQiLCJ0aGVuIiwiZXhwZWN0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJ0b0JlIiwic3VjY2VzcyIsImRhdGEiLCJudWV2YURpc2N1c2lvblByZWd1bnRhIiwidG9NYXRjaCIsImVycm9ycyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJpZERpc2N1c2lvblByZWd1bnRhIiwiZWRpdGFyRGlzY3VzaW9uUHJlZ3VudGEiLCJlbGltaW5hckRpc2N1c2lvblByZWd1bnRhIiwiY29ycmVvVXN1YXJpbyIsImVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeVRpdHVsbyIsImVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeURlc2NyaXBjaW9uIiwiYXByb2JhckVzdGFkb015RGlzY3VzaW9uUHJlZ3VudGEiLCJsaW1pdCIsImFmdGVyIiwiaWRQcmVndW50YSIsImdldExpc3RhSXNzdWVzQnlRdWVzdGlvbnMiLCJ0b3RhbENvdW50IiwicGFnZUluZm8iLCJoYXNuZXh0UGFnZSIsImVkZ2VzIiwibm9kZSIsImNvcnJlbyIsImdldExpc3RhVXN1YXJpb3NBc2lnbmFkb0VzdGFkb0NvcnJlY2Npb25QcmVndW50YSIsIm5vbWJyZSIsImVzdGFkbyIsImxvYWRMaXN0YUNvcnJlY2Npb25lc1ByZWd1bnRhc0J5RXN0YWRvIiwibG9hZGxpc3RhVXN1YXJpb3NDcmVhZG9Db3JyZWNjaW9uZXNQcmVndW50YXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxnQkFBUixFQUEwQkQsTUFBekM7O0FBRUFFLFNBQVMsaUNBQVQsRUFBNEMsWUFBVTtBQUNyRCxLQUFNQyxPQUFPLElBQWI7QUFDQUEsTUFBS0MsSUFBTCxHQUFZSixPQUFPO0FBQ2xCSyxPQUFLLGlDQURhO0FBRWxCQyxlQUFhO0FBRkssRUFBUCxDQUFaOztBQUtBQyxJQUFHLHFEQUFILEVBQTBELFVBQVVDLElBQVYsRUFBZ0I7QUFDekVMLE9BQ0VDLElBREYsQ0FDT0ssS0FBS0MsU0FBTCxDQUFlO0FBQ3BCQywrUkFEb0I7QUFVcEJDLGNBQVc7QUFDVkMsdUJBQWtCO0FBQ2pCQyxhQUFRLGtDQURTO0FBRWpCQyw2QkFBd0IsQ0FBQywwQkFBRCxFQUE0QiwwQkFBNUIsQ0FGUDtBQUdqQkMsa0JBQWEsb0NBSEk7QUFJakJDLHNCQUFpQixDQUFDLGFBQUQsRUFBZSxzQkFBZixDQUpBO0FBS2pCQyx5QkFBbUIsMEJBTEY7QUFNakJDLHdCQUFrQjtBQUNqQkMsOEJBQXdCLDBCQURQO0FBRWpCQyxXQUFLLFNBRlk7QUFHakJDLGtCQUFZLFFBSEs7QUFJakJDLG1CQUFZO0FBSkssTUFORDtBQVlqQkMscUJBQWdCLElBQUlDLElBQUosRUFaQztBQWFqQkMsa0JBQWE7QUFiSTtBQURSOztBQVZTLEdBQWYsQ0FEUCxFQThCRUMsSUE5QkYsQ0E4Qk8sb0JBQVk7QUFDakJDLFVBQU9DLFNBQVNDLE1BQWhCLEVBQXdCQyxJQUF4QixDQUE2QixHQUE3QjtBQUNBSCxVQUFPQyxTQUFTRyxPQUFoQixFQUF5QkQsSUFBekIsQ0FBOEIsSUFBOUI7QUFDQUgsVUFBT0MsU0FBU0ksSUFBVCxDQUFjQyxzQkFBZCxDQUFx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QUF5QkQsSUFBekIsQ0FBOEIsSUFBOUI7QUFDQUgsVUFBT0MsU0FBU0ksSUFBVCxDQUFjMkIsNENBQWQsQ0FBMkR2QixNQUFsRSxFQUEwRU4sSUFBMUUsQ0FBK0UsQ0FBL0U7QUFDQXZCO0FBQ0EsR0FqQkY7QUFrQkEsRUFuQkQ7QUFzQkEsQ0FsUkQiLCJmaWxlIjoiZGlzY3VzaW9uUHJlZ3VudGEudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHF1b3Rlcyxuby11bmRlZiAqL1xuXG5jb25zdCB0ZXN0ZXIgPSByZXF1aXJlKCdncmFwaHFsLXRlc3RlcicpLnRlc3RlcjtcblxuZGVzY3JpYmUoXCJNb2RlbG8gZGUgZGlzY3VzaW9uIGRlIFByZWd1bnRhXCIsIGZ1bmN0aW9uKCl7XG5cdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRzZWxmLnRlc3QgPSB0ZXN0ZXIoe1xuXHRcdHVybDogXCJodHRwOi8vMTI3LjAuMC4xOjM2NjAvZ3JhcGh0ZXN0XCIsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdH0pO1xuXG5cdGl0KFwiZGViZXJpYSBwb2RlciBjcmVhciB1bmEgbnVldmEgZGlzY3VzaW9uIGRlIFByZWd1bnRhXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIG51ZXZhRGlzY3VzaW9uUHJlZ3VudGEoJGRpc2N1c2lvblByZWd1bnRhOiBkaXNjdXNpb25QcmVndW50YUlucHV0KXtcblx0XHRcdFx0XHRcdFx0bnVldmFEaXNjdXNpb25QcmVndW50YShkaXNjdXNpb25QcmVndW50YTogJGRpc2N1c2lvblByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHRcdGhhYmlsaXRhZGFcblxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0ZGlzY3VzaW9uUHJlZ3VudGE6e1xuXHRcdFx0XHRcdFx0dGl0dWxvOiBcIm1pIHNlcHRpbWEgZGlzY3VzaW9uIGRlIHByZWd1bnRhXCIsXG5cdFx0XHRcdFx0XHRldGlxdWV0YXNfY29ycmVjY2lvbmVzOiBbXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2VcIixcIjVhZDIyNGZjZDQ3YzRiNTEzMDI0OTFjZlwiXSxcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImVzdGEgcHJlZ3VudGEgdGllbmUgdmFyaW9zIGVycm9yZXNcIixcblx0XHRcdFx0XHRcdHRpcG9fY29ycmVjY2lvbjogW1wiZGVzY3JpcGNpb25cIixcImNvbnRlbmlkb19tdWx0aW1lZGlhXCJdLFxuXHRcdFx0XHRcdFx0Y3JlYWRvcl9jb3JyZWNjaW9uOlwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRlc3RhZG9fY29ycmVjY2lvbjp7XG5cdFx0XHRcdFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG86IFwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRcdHJvbDogXCJ1c3VhcmlvXCIsXG5cdFx0XHRcdFx0XHRcdGFzaWduYWNpb246IFwiY3JlYWRvXCIsXG5cdFx0XHRcdFx0XHRcdG9ic2VydmFjaW9uOlwiZGlzY3VzaW9uIGRlIHByZWd1bnRhIGNyZWFkYVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZmVjaGFfY3JlYWNpb246IG5ldyBEYXRlKCksXG5cdFx0XHRcdFx0XHRwcmVndW50YV9JRDogXCI1YWNkZTFjNThjZGY1YTUyODQzNDk3MTRcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEubnVldmFEaXNjdXNpb25QcmVndW50YS50aXR1bG8pLnRvTWF0Y2goL21pIHNlcHRpbWEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdChcIk5vIGRlYmVyaWEgZ3VhcmRhciB1bmEgZGlzY3VzaW9uIGRlIFByZWd1bnRhIHF1ZSB5YSBzaWRvIHByZXZpYW1lbnRlIGNyZWFkYVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBudWV2YURpc2N1c2lvblByZWd1bnRhKCRkaXNjdXNpb25QcmVndW50YTogZGlzY3VzaW9uUHJlZ3VudGFJbnB1dCl7XG5cdFx0XHRcdFx0XHRcdG51ZXZhRGlzY3VzaW9uUHJlZ3VudGEoZGlzY3VzaW9uUHJlZ3VudGE6ICRkaXNjdXNpb25QcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdFx0dGl0dWxvXG5cdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0XHRoYWJpbGl0YWRhXG5cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGRpc2N1c2lvblByZWd1bnRhOntcblx0XHRcdFx0XHRcdHRpdHVsbzogXCJtaSBwcmltZXJhIGRpc2N1c2lvbiBkZSBwcmVndW50YVwiLFxuXHRcdFx0XHRcdFx0ZXRpcXVldGFzX2NvcnJlY2Npb25lczogW1wiNWFkMjI0ZmNkNDdjNGI1MTMwMjQ5MWNlXCIsXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2ZcIl0sXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlc3RhIHByZWd1bnRhIHRpZW5lIHZhcmlvcyBlcnJvcmVzXCIsXG5cdFx0XHRcdFx0XHR0aXBvX2NvcnJlY2Npb246IFtcImRlc2NyaXBjaW9uXCIsXCJjb250ZW5pZG9fbXVsdGltZWRpYVwiXSxcblx0XHRcdFx0XHRcdGNyZWFkb3JfY29ycmVjY2lvbjpcIjVhYzI0Yzc1OGU0YTZhMjNkNDg2OWFjN1wiLFxuXHRcdFx0XHRcdFx0ZXN0YWRvX2NvcnJlY2Npb246e1xuXHRcdFx0XHRcdFx0XHR1c3VhcmlvX2NyZWFkb3JfZXN0YWRvOiBcIjVhYzI0Yzc1OGU0YTZhMjNkNDg2OWFjN1wiLFxuXHRcdFx0XHRcdFx0XHRyb2w6IFwidXN1YXJpb1wiLFxuXHRcdFx0XHRcdFx0XHRhc2lnbmFjaW9uOiBcImNyZWFkb1wiLFxuXHRcdFx0XHRcdFx0XHRvYnNlcnZhY2lvbjpcImRpc2N1c2lvbiBkZSBwcmVndW50YSBjcmVhZGFcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0cHJlZ3VudGFfSUQ6IFwiNWFjZGUxYzU4Y2RmNWE1Mjg0MzQ5NzEzXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzLmxlbmd0aCkudG9CZSgxKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC95b3UgYWxyZWFkeSBjcmVhdGUgdGhpcyBxdWVzdGlvbiwgeW91IGNhbiBjcmVhdGUgdGhlIHNhbWUgY29ycmVjdGlvbiB0d28gdGltZXMvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XG5cdH0pO1xuXG5cdGl0KFwiZGViZXJpYSBwb2RlciBjcmVhciB1bmEgbnVldmEgZGlzY3VzaW9uXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIG51ZXZhRGlzY3VzaW9uUHJlZ3VudGEoJGRpc2N1c2lvblByZWd1bnRhOiBkaXNjdXNpb25QcmVndW50YUlucHV0KXtcblx0XHRcdFx0XHRcdFx0bnVldmFEaXNjdXNpb25QcmVndW50YShkaXNjdXNpb25QcmVndW50YTogJGRpc2N1c2lvblByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHRcdGhhYmlsaXRhZGFcblxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0ZGlzY3VzaW9uUHJlZ3VudGE6e1xuXHRcdFx0XHRcdFx0dGl0dWxvOiBcIm1pIHRlcmNlcmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhXCIsXG5cdFx0XHRcdFx0XHRldGlxdWV0YXNfY29ycmVjY2lvbmVzOiBbXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2VcIixcIjVhZDIyNGZjZDQ3YzRiNTEzMDI0OTFjZlwiXSxcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImVzdGEgcHJlZ3VudGEgYWxndW5vcyAgZXJyb3Jlc1wiLFxuXHRcdFx0XHRcdFx0dGlwb19jb3JyZWNjaW9uOiBbXCJkZXNjcmlwY2lvblwiLFwiY29udGVuaWRvX211bHRpbWVkaWFcIl0sXG5cdFx0XHRcdFx0XHRjcmVhZG9yX2NvcnJlY2Npb246XCI1YWMyNGM3NThlNGE2YTIzZDQ4NjlhYzdcIixcblx0XHRcdFx0XHRcdGVzdGFkb19jb3JyZWNjaW9uOntcblx0XHRcdFx0XHRcdFx0dXN1YXJpb19jcmVhZG9yX2VzdGFkbzogXCI1YWMyNGM3NThlNGE2YTIzZDQ4NjlhYzdcIixcblx0XHRcdFx0XHRcdFx0cm9sOiBcInVzdWFyaW9cIixcblx0XHRcdFx0XHRcdFx0YXNpZ25hY2lvbjogXCJjcmVhZG9cIixcblx0XHRcdFx0XHRcdFx0b2JzZXJ2YWNpb246XCJkaXNjdXNpb24gZGUgcHJlZ3VudGEgY3JlYWRhXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHByZWd1bnRhX0lEOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5udWV2YURpc2N1c2lvblByZWd1bnRhLnRpdHVsbykudG9NYXRjaCgvbWkgdGVyY2VyYSBkaXNjdXNpb24gZGUgcHJlZ3VudGEvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdGl0KFwiZGViZXJpYSBwb2RlciBlZGl0YXIgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBzb3kgZWwgY3JlYWRvclwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJEaXNjdXNpb25QcmVndW50YSgkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkZGlzY3VzaW9uUHJlZ3VudGE6IGRpc2N1c2lvblByZWd1bnRhSW5wdXQpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJEaXNjdXNpb25QcmVndW50YShpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxkaXNjdXNpb25QcmVndW50YTogJGRpc2N1c2lvblByZWd1bnRhKVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRkaXNjdXNpb25QcmVndW50YTp7XG5cdFx0XHRcdFx0XHR0aXR1bG86IFwibWkgc2VndW5kYSBlZGl0YWRhIGRlIGRpc2N1c2lvbiBkZSBwcmVndW50YVwiLFxuXHRcdFx0XHRcdFx0ZXRpcXVldGFzX2NvcnJlY2Npb25lczogW1wiNWFkMjI0ZmNkNDdjNGI1MTMwMjQ5MWNlXCIsXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2ZcIl0sXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlc3RhIGVzIHVuYSBkaXNjdXNpb24gZWRpdGFkYSBcIixcblx0XHRcdFx0XHRcdHRpcG9fY29ycmVjY2lvbjogW1wiZGVzY3JpcGNpb25cIixcImNvbnRlbmlkb19tdWx0aW1lZGlhXCIsXCJyZXNwdWVzdGFzXCJdLFxuXHRcdFx0XHRcdFx0Y3JlYWRvcl9jb3JyZWNjaW9uOlwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRlc3RhZG9fY29ycmVjY2lvbjp7XG5cdFx0XHRcdFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG86IFwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRcdHJvbDogXCJ1c3VhcmlvXCIsXG5cdFx0XHRcdFx0XHRcdGFzaWduYWNpb246IFwiZWRpdGFkb1wiLFxuXHRcdFx0XHRcdFx0XHRvYnNlcnZhY2lvbjpcImRpc2N1c2lvbiBlZGl0YWRhXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHByZWd1bnRhX0lEOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5lZGl0YXJEaXNjdXNpb25QcmVndW50YSkudG9CZSh0cnVlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdGl0KFwiZGViZXJpYSBubyBwb2RlciBlZGl0YXIgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBzb3kgZWwgY3JlYWRvclwiICtcblx0XHRcImRlYmlkbyBxdWUgZWwgZXN0YWRvIGFzaWduYWRvIGVzIHBlbmRpZW50ZVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJEaXNjdXNpb25QcmVndW50YSgkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkZGlzY3VzaW9uUHJlZ3VudGE6IGRpc2N1c2lvblByZWd1bnRhSW5wdXQpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJEaXNjdXNpb25QcmVndW50YShpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxkaXNjdXNpb25QcmVndW50YTogJGRpc2N1c2lvblByZWd1bnRhKVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRkaXNjdXNpb25QcmVndW50YTp7XG5cdFx0XHRcdFx0XHR0aXR1bG86IFwibWkgc2VndW5kYSBlZGl0YWRhIGRlIGRpc2N1c2lvbiBkZSBwcmVndW50YVwiLFxuXHRcdFx0XHRcdFx0ZXRpcXVldGFzX2NvcnJlY2Npb25lczogW1wiNWFkMjI0ZmNkNDdjNGI1MTMwMjQ5MWNlXCIsXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2ZcIl0sXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlc3RhIGVzIHVuYSBkaXNjdXNpb24gZWRpdGFkYSBcIixcblx0XHRcdFx0XHRcdHRpcG9fY29ycmVjY2lvbjogW1wiZGVzY3JpcGNpb25cIixcImNvbnRlbmlkb19tdWx0aW1lZGlhXCIsXCJyZXNwdWVzdGFzXCJdLFxuXHRcdFx0XHRcdFx0Y3JlYWRvcl9jb3JyZWNjaW9uOlwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRlc3RhZG9fY29ycmVjY2lvbjp7XG5cdFx0XHRcdFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG86IFwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRcdHJvbDogXCJ1c3VhcmlvXCIsXG5cdFx0XHRcdFx0XHRcdGFzaWduYWNpb246IFwiZWRpdGFkb1wiLFxuXHRcdFx0XHRcdFx0XHRvYnNlcnZhY2lvbjpcImRpc2N1c2lvbiBlZGl0YWRhXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHByZWd1bnRhX0lEOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC90aGUgcXVlc3Rpb24gY3JlYXRvcidzIGlzIGVkaXRpbmcgdGhlIGNvbnRlbnQsIHRoYW5rcyB0byB5b3VyIGlzc3Vlcyx5b3UgY2FuIG5vdCBtYWtlIGNoYW5nZSB0byBhIGlzc3VlcywgaW4gc3RhdGUgcGVuZGluZy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0aXQoXCJkZWJlcmlhIG5vIHBvZGVyIGVkaXRhciB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIHNveSBlbCBjcmVhZG9yXCIgK1xuXHRcdFwiZGViaWRvIHF1ZSBlbCBlc3RhZG8gYXNpZ25hZG8gZXMgY2VycmFkb1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJEaXNjdXNpb25QcmVndW50YSgkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkZGlzY3VzaW9uUHJlZ3VudGE6IGRpc2N1c2lvblByZWd1bnRhSW5wdXQpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJEaXNjdXNpb25QcmVndW50YShpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxkaXNjdXNpb25QcmVndW50YTogJGRpc2N1c2lvblByZWd1bnRhKVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRkaXNjdXNpb25QcmVndW50YTp7XG5cdFx0XHRcdFx0XHR0aXR1bG86IFwibWkgc2VndW5kYSBlZGl0YWRhIGRlIGRpc2N1c2lvbiBkZSBwcmVndW50YVwiLFxuXHRcdFx0XHRcdFx0ZXRpcXVldGFzX2NvcnJlY2Npb25lczogW1wiNWFkMjI0ZmNkNDdjNGI1MTMwMjQ5MWNlXCIsXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2ZcIl0sXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlc3RhIGVzIHVuYSBkaXNjdXNpb24gZWRpdGFkYSBcIixcblx0XHRcdFx0XHRcdHRpcG9fY29ycmVjY2lvbjogW1wiZGVzY3JpcGNpb25cIixcImNvbnRlbmlkb19tdWx0aW1lZGlhXCIsXCJyZXNwdWVzdGFzXCJdLFxuXHRcdFx0XHRcdFx0Y3JlYWRvcl9jb3JyZWNjaW9uOlwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRlc3RhZG9fY29ycmVjY2lvbjp7XG5cdFx0XHRcdFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG86IFwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCIsXG5cdFx0XHRcdFx0XHRcdHJvbDogXCJ1c3VhcmlvXCIsXG5cdFx0XHRcdFx0XHRcdGFzaWduYWNpb246IFwiZWRpdGFkb1wiLFxuXHRcdFx0XHRcdFx0XHRvYnNlcnZhY2lvbjpcImRpc2N1c2lvbiBlZGl0YWRhXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdHByZWd1bnRhX0lEOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC90aGUgaXNzdWVzIHdhcyByZWplY3QgYnkgYSBjb21taXR0ZWUgbWVtYmVyLCBzbyB5b3UgbXVzdCBjcmVhdGUgYSBuZXcgb25lIGlzc3Vlcy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0aXQoXCJkZWJlcmlhIG5vIHBvZGVyIGVkaXRhciB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIHNveSBlbCBjcmVhZG9yXCIgK1xuXHRcdFwiZGViaWRvIHF1ZSBlbCBlc3RhZG8gYXNpZ25hZG8gZXMgcmVzdWVsdG9cIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyRGlzY3VzaW9uUHJlZ3VudGEoJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyEsJGRpc2N1c2lvblByZWd1bnRhOiBkaXNjdXNpb25QcmVndW50YUlucHV0KXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyRGlzY3VzaW9uUHJlZ3VudGEoaWREaXNjdXNpb25QcmVndW50YTogJGlkRGlzY3VzaW9uUHJlZ3VudGEsZGlzY3VzaW9uUHJlZ3VudGE6ICRkaXNjdXNpb25QcmVndW50YSlcblx0XHRcdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZERpc2N1c2lvblByZWd1bnRhOlwiNWFkMjUyOGNjODk4ODc2NzdmM2Y1YzZlXCIsXG5cdFx0XHRcdFx0ZGlzY3VzaW9uUHJlZ3VudGE6e1xuXHRcdFx0XHRcdFx0dGl0dWxvOiBcIm1pIHNlZ3VuZGEgZWRpdGFkYSBkZSBkaXNjdXNpb24gZGUgcHJlZ3VudGFcIixcblx0XHRcdFx0XHRcdGV0aXF1ZXRhc19jb3JyZWNjaW9uZXM6IFtcIjVhZDIyNGZjZDQ3YzRiNTEzMDI0OTFjZVwiLFwiNWFkMjI0ZmNkNDdjNGI1MTMwMjQ5MWNmXCJdLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiZXN0YSBlcyB1bmEgZGlzY3VzaW9uIGVkaXRhZGEgXCIsXG5cdFx0XHRcdFx0XHR0aXBvX2NvcnJlY2Npb246IFtcImRlc2NyaXBjaW9uXCIsXCJjb250ZW5pZG9fbXVsdGltZWRpYVwiLFwicmVzcHVlc3Rhc1wiXSxcblx0XHRcdFx0XHRcdGNyZWFkb3JfY29ycmVjY2lvbjpcIjVhYzI0Yzc1OGU0YTZhMjNkNDg2OWFjN1wiLFxuXHRcdFx0XHRcdFx0ZXN0YWRvX2NvcnJlY2Npb246e1xuXHRcdFx0XHRcdFx0XHR1c3VhcmlvX2NyZWFkb3JfZXN0YWRvOiBcIjVhYzI0Yzc1OGU0YTZhMjNkNDg2OWFjN1wiLFxuXHRcdFx0XHRcdFx0XHRyb2w6IFwidXN1YXJpb1wiLFxuXHRcdFx0XHRcdFx0XHRhc2lnbmFjaW9uOiBcImVkaXRhZG9cIixcblx0XHRcdFx0XHRcdFx0b2JzZXJ2YWNpb246XCJkaXNjdXNpb24gZWRpdGFkYVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZmVjaGFfY3JlYWNpb246IG5ldyBEYXRlKCksXG5cdFx0XHRcdFx0XHRwcmVndW50YV9JRDogXCI1YWNkZTFjNThjZGY1YTUyODQzNDk3MTNcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgveW91IGFscmVhZHkgYWNjZXB0IHRoZSBjaGFuZ2Ugb2YgdGhlIHF1ZXN0aW9uIGNyZWF0b3IsIHNvIHlvdSBkZWNpZGVkIG1hcmtlZCB0aGlzIGlzc3VlcyBsaWtlIHNvbHZlZCEsIHlvdSBzaG91bGQgY3JlYXRlIG90aGVyIGlzc3Vlcy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0aXQoXCJkZWJlcmlhIG5vIHBvZGVyIGVkaXRhciB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIG5vIHNveSBlbCBjcmVhZG9yXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckRpc2N1c2lvblByZWd1bnRhKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmchLCRkaXNjdXNpb25QcmVndW50YTogZGlzY3VzaW9uUHJlZ3VudGFJbnB1dCl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckRpc2N1c2lvblByZWd1bnRhKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhLGRpc2N1c2lvblByZWd1bnRhOiAkZGlzY3VzaW9uUHJlZ3VudGEpXG5cdFx0XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiLFxuXHRcdFx0XHRcdGRpc2N1c2lvblByZWd1bnRhOntcblx0XHRcdFx0XHRcdHRpdHVsbzogXCJtaSBzZWd1bmRhIGVkaXRhZGEgZGUgZGlzY3VzaW9uIGRlIHByZWd1bnRhXCIsXG5cdFx0XHRcdFx0XHRldGlxdWV0YXNfY29ycmVjY2lvbmVzOiBbXCI1YWQyMjRmY2Q0N2M0YjUxMzAyNDkxY2VcIixcIjVhZDIyNGZjZDQ3YzRiNTEzMDI0OTFjZlwiXSxcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImVzdGEgZXMgdW5hIGRpc2N1c2lvbiBlZGl0YWRhIFwiLFxuXHRcdFx0XHRcdFx0dGlwb19jb3JyZWNjaW9uOiBbXCJkZXNjcmlwY2lvblwiLFwiY29udGVuaWRvX211bHRpbWVkaWFcIixcInJlc3B1ZXN0YXNcIl0sXG5cdFx0XHRcdFx0XHRjcmVhZG9yX2NvcnJlY2Npb246XCI1YWMyNGM3NThlNGE2YTIzZDQ4ODlhYzdcIixcblx0XHRcdFx0XHRcdGVzdGFkb19jb3JyZWNjaW9uOntcblx0XHRcdFx0XHRcdFx0dXN1YXJpb19jcmVhZG9yX2VzdGFkbzogXCI1YWMyNGM3NThlNGE2YTIzZDQ4NjlhYzdcIixcblx0XHRcdFx0XHRcdFx0cm9sOiBcInVzdWFyaW9cIixcblx0XHRcdFx0XHRcdFx0YXNpZ25hY2lvbjogXCJlZGl0YWRvXCIsXG5cdFx0XHRcdFx0XHRcdG9ic2VydmFjaW9uOlwiZGlzY3VzaW9uIGVkaXRhZGFcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGZlY2hhX2NyZWFjaW9uOiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0cHJlZ3VudGFfSUQ6IFwiNWFjZGUxYzU4Y2RmNWE1Mjg0MzQ5NzEzXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UpLnRvTWF0Y2goL1RoaXMgdXNlciBjYW4ndCBlZGl0IHRoaXMgcXVlc3Rpb24sIGJlY2F1c2UgaGUgaXMgbm90IHRoZSBvd25lci8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0aXQoXCJkZWJlcmlhIHBvZGVyIGVsaW1pbmFyIHVuYSBkaXNjdXNpb24gZGUgcHJlZ3VudGEsIGVuIGVsIGN1YWwgc295IGVsIGNyZWFkb3JcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWxpbWluYXJEaXNjdXNpb25QcmVndW50YSgkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkY3JlYWRvcl9jb3JyZWNjaW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlbGltaW5hckRpc2N1c2lvblByZWd1bnRhKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhLGNyZWFkb3JfY29ycmVjY2lvbjogJGNyZWFkb3JfY29ycmVjY2lvbilcblx0XHRcdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZERpc2N1c2lvblByZWd1bnRhOlwiNWFkMjUyOGNjODk4ODc2NzdmM2Y1YzZlXCIsXG5cdFx0XHRcdFx0Y3JlYWRvcl9jb3JyZWNjaW9uOlwiNWFjMjRjNzU4ZTRhNmEyM2Q0ODY5YWM3XCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVsaW1pbmFyRGlzY3VzaW9uUHJlZ3VudGEpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdChcImRlYmVyaWEgbm8gcG9kZXIgZWxpbWluYXIgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBubyBzb3kgZWwgY3JlYWRvclwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlbGltaW5hckRpc2N1c2lvblByZWd1bnRhKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmchLCRjcmVhZG9yX2NvcnJlY2Npb246IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVsaW1pbmFyRGlzY3VzaW9uUHJlZ3VudGEoaWREaXNjdXNpb25QcmVndW50YTogJGlkRGlzY3VzaW9uUHJlZ3VudGEsY3JlYWRvcl9jb3JyZWNjaW9uOiAkY3JlYWRvcl9jb3JyZWNjaW9uKVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRjcmVhZG9yX2NvcnJlY2Npb246XCI1YWMyNGM3NThlNGE2YTIzZDQ3NzlhYzdcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgvVGhpcyB1c2VyIGNhbid0IGVkaXQgdGhpcyBxdWVzdGlvbiwgYmVjYXVzZSBoZSBpcyBub3QgdGhlIG93bmVyLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdChcImRlYmVyaWEgbm8gcG9kZXIgZWxpbWluYXIgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBzb3kgZWwgY3JlYWRvcixcIiArXG5cdFx0XCJwZXJvIHNlIGVuY3VlbnRyYSBlbiB1biBlc3RhZG8gcGVuZGllbnRlXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVsaW1pbmFyRGlzY3VzaW9uUHJlZ3VudGEoJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyEsJGNyZWFkb3JfY29ycmVjY2lvbjogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWxpbWluYXJEaXNjdXNpb25QcmVndW50YShpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxjcmVhZG9yX2NvcnJlY2Npb246ICRjcmVhZG9yX2NvcnJlY2Npb24pXG5cdFx0XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiLFxuXHRcdFx0XHRcdGNyZWFkb3JfY29ycmVjY2lvbjpcIjVhYzI0Yzc1OGU0YTZhMjNkNDc3OWFjN1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC90aGUgcXVlc3Rpb24gY3JlYXRvcidzIGlzIGVkaXRpbmcgdGhlIGNvbnRlbnQsIHRoYW5rcyB0byB5b3VyIGlzc3Vlcyx5b3UgY2FuIG5vdCBkZWxldGUgdGhpcyBpc3N1ZXMsIGluIHN0YXRlIHBlbmRpbmcvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdGl0KFwiZGViZXJpYSBubyBwb2RlciBlZGl0YXIgZWwgdGl0dWxvIGRlICB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIHNveSBlbCBjcmVhZG9yLFwiICtcblx0XHRcImRlYmlkbyBxdWUgZWwgZXN0YWRvIGRlIGxhIGRpc2N1c2lvbiBzZSBlbmN1ZW50cmEgZW4gZXN0YWRvXCIgK1xuXHRcdFwicGVuZGllbnRlXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeVRpdHVsbygkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkY29ycmVvVXN1YXJpbzogU3RyaW5nISwgJHRpdHVsbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5VGl0dWxvKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhLGNvcnJlb1VzdWFyaW86ICRjb3JyZW9Vc3VhcmlvLCB0aXR1bG86ICR0aXR1bG8pe1xuXHRcdFx0XHRcdFx0XHRcdHRpdHVsb1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOlwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW5AZ21haWwuY29tXCIsXG5cdFx0XHRcdFx0dGl0dWxvOiBcImVzdGEgZXMgdW5hIGRpc2N1c2lvbiBlZGl0YWRhIHBvciBrZXZpbiBPcnRpelwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC90aGUgcXVlc3Rpb24gY3JlYXRvcidzIGlzIGVkaXRpbmcgdGhlIGNvbnRlbnQsIHRoYW5rcyB0byB5b3VyIGlzc3Vlcyx5b3UgY2FuIG5vdCBtYWtlIGNoYW5nZSB0byBhIGlzc3VlcywgaW4gc3RhdGUgcGVuZGluZy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiZGViZXJpYSBubyBwb2RlciBlZGl0YXIgZWwgdGl0dWxvIGRlICB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIHNveSBlbCBjcmVhZG9yLFwiICtcblx0XHRcImRlYmlkbyBxdWUgZWwgZXN0YWRvIGRlIGxhIGRpc2N1c2lvbiBzZSBlbmN1ZW50cmEgZW4gZXN0YWRvXCIgK1xuXHRcdFwiY2VycmFkb1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlUaXR1bG8oJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyEsJGNvcnJlb1VzdWFyaW86IFN0cmluZyEsICR0aXR1bG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeVRpdHVsbyhpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxjb3JyZW9Vc3VhcmlvOiAkY29ycmVvVXN1YXJpbywgdGl0dWxvOiAkdGl0dWxvKXtcblx0XHRcdFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZERpc2N1c2lvblByZWd1bnRhOlwiNWFkMjUyOGNjODk4ODc2NzdmM2Y1YzZlXCIsXG5cdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzpcImtldmluYW5kcmVzb3J0aXptZXJjaGFuQGdtYWlsLmNvbVwiLFxuXHRcdFx0XHRcdHRpdHVsbzogXCJlc3RhIGVzIHVuYSBkaXNjdXNpb24gZWRpdGFkYSBwb3Iga2V2aW4gT3J0aXpcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgvdGhlIGlzc3VlcyB3YXMgcmVqZWN0IGJ5IGEgY29tbWl0dGVlIG1lbWJlciwgc28geW91IG11c3QgY3JlYXRlIGEgbmV3IG9uZSBpc3N1ZXMvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdChcImRlYmVyaWEgbm8gcG9kZXIgZWRpdGFyIGVsIHRpdHVsbyBkZSAgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBzb3kgZWwgY3JlYWRvcixcIiArXG5cdFx0XCJkZWJpZG8gcXVlIGVsIGVzdGFkbyBkZSBsYSBkaXNjdXNpb24gc2UgZW5jdWVudHJhIGVuIGVzdGFkb1wiICtcblx0XHRcInJlc3VlbHRvXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeVRpdHVsbygkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkY29ycmVvVXN1YXJpbzogU3RyaW5nISwgJHRpdHVsbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5VGl0dWxvKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhLGNvcnJlb1VzdWFyaW86ICRjb3JyZW9Vc3VhcmlvLCB0aXR1bG86ICR0aXR1bG8pe1xuXHRcdFx0XHRcdFx0XHRcdHRpdHVsb1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOlwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW5AZ21haWwuY29tXCIsXG5cdFx0XHRcdFx0dGl0dWxvOiBcImVzdGEgZXMgdW5hIGRpc2N1c2lvbiBlZGl0YWRhIHBvciBrZXZpbiBPcnRpelwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC95b3UgYWxyZWFkeSBhY2NlcHQgdGhlIGNoYW5nZSBvZiB0aGUgcXVlc3Rpb24gY3JlYXRvciwgc28geW91IGRlY2lkZWQgbWFya2VkIHRoaXMgaXNzdWVzIGxpa2Ugc29sdmVkISwgeW91IHNob3VsZCBjcmVhdGUgb3RoZXIgaXNzdWVzLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdChcImRlYmVyaWEgcG9kZXIgZWRpdGFyIGVsIHRpdHVsbyBkZSAgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBzb3kgZWwgY3JlYWRvclwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlUaXR1bG8oJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyEsJGNvcnJlb1VzdWFyaW86IFN0cmluZyEsICR0aXR1bG86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeVRpdHVsbyhpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxjb3JyZW9Vc3VhcmlvOiAkY29ycmVvVXN1YXJpbywgdGl0dWxvOiAkdGl0dWxvKXtcblx0XHRcdFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZERpc2N1c2lvblByZWd1bnRhOlwiNWFkMjUyOGNjODk4ODc2NzdmM2Y1YzZlXCIsXG5cdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzpcImtldmluYW5kcmVzb3J0aXptZXJjaGFuQGdtYWlsLmNvbVwiLFxuXHRcdFx0XHRcdHRpdHVsbzogXCJlc3RhIGVzIHVuYSBkaXNjdXNpb24gZWRpdGFkYSBwb3Iga2V2aW4gT3J0aXpcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5VGl0dWxvLnRpdHVsbykudG9NYXRjaCgvZXN0YSBlcyB1bmEgZGlzY3VzaW9uIGVkaXRhZGEgcG9yIGtldmluIE9ydGl6Lyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJkZWJlcmlhIG5vIHBvZGVyIGVkaXRhciBlbCB0aXR1bG8gZGUgIHVuYSBkaXNjdXNpb24gZGUgcHJlZ3VudGEsIGVuIGVsIGN1YWwgbm8gc295IGVsIGNyZWFkb3JcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5VGl0dWxvKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmchLCRjb3JyZW9Vc3VhcmlvOiBTdHJpbmchLCAkdGl0dWxvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlUaXR1bG8oaWREaXNjdXNpb25QcmVndW50YTogJGlkRGlzY3VzaW9uUHJlZ3VudGEsY29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8sIHRpdHVsbzogJHRpdHVsbyl7XG5cdFx0XHRcdFx0XHRcdFx0dGl0dWxvXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiLFxuXHRcdFx0XHRcdGNvcnJlb1VzdWFyaW86XCJrZXZpbmFuZHJlc29ydGl6bWVyY2hhbjExMUBnbWFpbC5jb21cIixcblx0XHRcdFx0XHR0aXR1bG86IFwiZXN0YSBlcyB1bmEgZGlzY3VzaW9uIGVkaXRhZGEgcG9yIGtldmluIE9ydGl6XCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UpLnRvTWF0Y2goL3RoaXMgcXVlc3Rpb24gaXNzdWUgeW91IGNhbiBub3QgZWRpdCwgYmVjYXVzZSB5b3UgYXJlIG5vdCB0aGUgb3duZXIvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdChcImRlYmVyaWEgbm8gcG9kZXIgZWRpdGFyIGxhIGRlc2NyaXBjaW9uIGRlICB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIHNveSBlbCBjcmVhZG9yXCIgK1xuXHRcdFwiZGViaWRvIHF1ZSBzZSBlbmN1ZW50cmEgZW4gdW4gZXN0YWRvIGRlIHBlbmRpZW50ZVwiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlEZXNjcmlwY2lvbigkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkY29ycmVvVXN1YXJpbzogU3RyaW5nISwgJGRlc2NyaXBjaW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlEZXNjcmlwY2lvbihpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxjb3JyZW9Vc3VhcmlvOiAkY29ycmVvVXN1YXJpbywgZGVzY3JpcGNpb246ICRkZXNjcmlwY2lvbil7XG5cdFx0XHRcdFx0XHRcdCBcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiLFxuXHRcdFx0XHRcdGNvcnJlb1VzdWFyaW86XCJrZXZpbmFuZHJlc29ydGl6bWVyY2hhbkBnbWFpbC5jb21cIixcblx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJkZXNjcmlwY2lvbiB1dGlsaXphZGEgcG9yIGVqZW1wbG9cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgvdGhlIHF1ZXN0aW9uIGNyZWF0b3IncyBpcyBlZGl0aW5nIHRoZSBjb250ZW50LCB0aGFua3MgdG8geW91ciBpc3N1ZXMseW91IGNhbiBub3QgbWFrZSBjaGFuZ2UgdG8gYSBpc3N1ZXMsIGluIHN0YXRlIHBlbmRpbmcvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdChcImRlYmVyaWEgbm8gcG9kZXIgZWRpdGFyIGxhIGRlc2NyaXBjaW9uIGRlICB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIHNveSBlbCBjcmVhZG9yXCIgK1xuXHRcdFwiZGViaWRvIHF1ZSBzZSBlbmN1ZW50cmEgZW4gdW4gZXN0YWRvIGRlIGNlcnJhZG9cIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5RGVzY3JpcGNpb24oJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyEsJGNvcnJlb1VzdWFyaW86IFN0cmluZyEsICRkZXNjcmlwY2lvbjogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5RGVzY3JpcGNpb24oaWREaXNjdXNpb25QcmVndW50YTogJGlkRGlzY3VzaW9uUHJlZ3VudGEsY29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8sIGRlc2NyaXBjaW9uOiAkZGVzY3JpcGNpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOlwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW5AZ21haWwuY29tXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiZGVzY3JpcGNpb24gdXRpbGl6YWRhIHBvciBlamVtcGxvXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UpLnRvTWF0Y2goL3RoZSBpc3N1ZXMgd2FzIHJlamVjdCBieSBhIGNvbW1pdHRlZSBtZW1iZXIsIHNvIHlvdSBtdXN0IGNyZWF0ZSBhIG5ldyBvbmUgaXNzdWVzLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJkZWJlcmlhIG5vIHBvZGVyIGVkaXRhciBsYSBkZXNjcmlwY2lvbiBkZSAgdW5hIGRpc2N1c2lvbiBkZSBwcmVndW50YSwgZW4gZWwgY3VhbCBzb3kgZWwgY3JlYWRvclwiICtcblx0XHRcImRlYmlkbyBxdWUgc2UgZW5jdWVudHJhIGVuIHVuIGVzdGFkbyBkZSByZXN1ZWx0b1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlEZXNjcmlwY2lvbigkaWREaXNjdXNpb25QcmVndW50YTogU3RyaW5nISwkY29ycmVvVXN1YXJpbzogU3RyaW5nISwgJGRlc2NyaXBjaW9uOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlZGl0YXJNeURpc2N1c2lvblByZWd1bnRhQnlEZXNjcmlwY2lvbihpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSxjb3JyZW9Vc3VhcmlvOiAkY29ycmVvVXN1YXJpbywgZGVzY3JpcGNpb246ICRkZXNjcmlwY2lvbil7XG5cdFx0XHRcdFx0XHRcdCBcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiLFxuXHRcdFx0XHRcdGNvcnJlb1VzdWFyaW86XCJrZXZpbmFuZHJlc29ydGl6bWVyY2hhbkBnbWFpbC5jb21cIixcblx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJkZXNjcmlwY2lvbiB1dGlsaXphZGEgcG9yIGVqZW1wbG9cIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgveW91IGFscmVhZHkgYWNjZXB0IHRoZSBjaGFuZ2Ugb2YgdGhlIHF1ZXN0aW9uIGNyZWF0b3IsIHNvIHlvdSBkZWNpZGVkIG1hcmtlZCB0aGlzIGlzc3VlcyBsaWtlIHNvbHZlZCEsIHlvdSBzaG91bGQgY3JlYXRlIG90aGVyIGlzc3Vlcy8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiZGViZXJpYSBwb2RlciBlZGl0YXIgbGEgZGVzY3JpcGNpb24gZGUgIHVuYSBkaXNjdXNpb24gZGUgcHJlZ3VudGEsIGVuIGVsIGN1YWwgc295IGVsIGNyZWFkb3JcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5RGVzY3JpcGNpb24oJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyEsJGNvcnJlb1VzdWFyaW86IFN0cmluZyEsICRkZXNjcmlwY2lvbjogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyTXlEaXNjdXNpb25QcmVndW50YUJ5RGVzY3JpcGNpb24oaWREaXNjdXNpb25QcmVndW50YTogJGlkRGlzY3VzaW9uUHJlZ3VudGEsY29ycmVvVXN1YXJpbzogJGNvcnJlb1VzdWFyaW8sIGRlc2NyaXBjaW9uOiAkZGVzY3JpcGNpb24pe1xuXHRcdFx0XHRcdFx0XHQgXHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIixcblx0XHRcdFx0XHRjb3JyZW9Vc3VhcmlvOlwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW5AZ21haWwuY29tXCIsXG5cdFx0XHRcdFx0ZGVzY3JpcGNpb246IFwiZGVzY3JpcGNpb24gdXRpbGl6YWRhIHBvciBlamVtcGxvXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeURlc2NyaXBjaW9uLmRlc2NyaXBjaW9uKS50b01hdGNoKC9kZXNjcmlwY2lvbiB1dGlsaXphZGEgcG9yIGVqZW1wbG8vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXHRpdChcImRlYmVyaWEgbm8gcG9kZXIgZWRpdGFyIGxhIGRlc2NyaXBjaW9uIGRlICB1bmEgZGlzY3VzaW9uIGRlIHByZWd1bnRhLCBlbiBlbCBjdWFsIG5vIHNveSBlbCBjcmVhZG9yXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeURlc2NyaXBjaW9uKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmchLCRjb3JyZW9Vc3VhcmlvOiBTdHJpbmchLCAkZGVzY3JpcGNpb246IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhck15RGlzY3VzaW9uUHJlZ3VudGFCeURlc2NyaXBjaW9uKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhLGNvcnJlb1VzdWFyaW86ICRjb3JyZW9Vc3VhcmlvLCBkZXNjcmlwY2lvbjogJGRlc2NyaXBjaW9uKXtcblx0XHRcdFx0XHRcdFx0IFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZERpc2N1c2lvblByZWd1bnRhOlwiNWFkMjUyOGNjODk4ODc2NzdmM2Y1YzZlXCIsXG5cdFx0XHRcdFx0Y29ycmVvVXN1YXJpbzpcImtldmluYW5kcmVzb3J0aXptZXJjaGFuMTExQGdtYWlsLmNvbVwiLFxuXHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImRlc2NyaXBjaW9uIHV0aWxpemFkYSBwb3IgZWplbXBsb1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC90aGlzIHF1ZXN0aW9uIGlzc3VlIHlvdSBjYW4gbm90IGVkaXQsIGJlY2F1c2UgeW91IGFyZSBub3QgdGhlIG93bmVyLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGNhbWJpYXIgZWwgZXN0YWRvIGRlIGFwcm9iYWRvIGEgIG1pIGRpc2N1c2lvbiBkZSBQcmVndW50YSxcIiArXG5cdFx0XCJzaWVuZG8gZWwgY3JlYWRvciBkZSBsYSBkaXNjdXNpb24gZGUgbGEgcHJlZ3VudGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gYXByb2JhckVzdGFkb015RGlzY3VzaW9uUHJlZ3VudGEoJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGFwcm9iYXJFc3RhZG9NeURpc2N1c2lvblByZWd1bnRhKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0ZXN0YWRvX2NvcnJlY2Npb257XG5cdFx0XHRcdFx0XHRcdCBcdFx0b2JzZXJ2YWNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRhc2lnbmFjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5hcHJvYmFyRXN0YWRvTXlEaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5hc2lnbmFjaW9uKS50b01hdGNoKC9yZXN1ZWx0by8pO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5hcHJvYmFyRXN0YWRvTXlEaXNjdXNpb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS5vYnNlcnZhY2lvbikudG9NYXRjaCgvZWwgdXN1YXJpbyBoYSBjZXJyYWRvIGVzdGEgZGlzY3VzaW9uLC8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcblx0fSk7XG5cdGl0KFwiTm8gRGViZXJpYSBwb2RlciBjYW1iaWFyIGVsIGVzdGFkbyBkZSBhcHJvYmFkbyBhICBtaSBkaXNjdXNpb24gZGUgUHJlZ3VudGEsXCIgK1xuXHRcdFwic2llbmRvIGVsIGNyZWFkb3IgZGUgbGEgZGlzY3VzaW9uIGRlIGxhIHByZWd1bnRhLCBkZWJpZG8gcXVlIHNlIFwiICtcblx0XHRcImVuY3VlbnRyYSBkZXNoYWJpbGl0YWRhXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGFwcm9iYXJFc3RhZG9NeURpc2N1c2lvblByZWd1bnRhKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRhcHJvYmFyRXN0YWRvTXlEaXNjdXNpb25QcmVndW50YShpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdGVzdGFkb19jb3JyZWNjaW9ue1xuXHRcdFx0XHRcdFx0XHQgXHRcdG9ic2VydmFjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0YXNpZ25hY2lvblxuXHRcdFx0XHRcdFx0XHQgXHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgveW91IGNhbid0IGFwcHJvdmVkIGEgcXVlc3Rpb24gaXNzdWVzLCB0aGF0IHlvdSBoYWQgY2xvc2VkIS8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQoXCJObyBEZWJlcmlhIHBvZGVyIGNhbWJpYXIgZWwgZXN0YWRvIGRlIGFwcm9iYWRvIGEgIG1pIGRpc2N1c2lvbiBkZSBQcmVndW50YSxcIiArXG5cdFx0XCJzaWVuZG8gZWwgY3JlYWRvciBkZSBsYSBkaXNjdXNpb24gZGUgbGEgcHJlZ3VudGEsIHkgZWwgZXN0YWRvIGRlIGxhIGRpc2N1c2lvbiBlcyBcIiArXG5cdFx0XCJjZXJyYWRvXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGFwcm9iYXJFc3RhZG9NeURpc2N1c2lvblByZWd1bnRhKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRhcHJvYmFyRXN0YWRvTXlEaXNjdXNpb25QcmVndW50YShpZERpc2N1c2lvblByZWd1bnRhOiAkaWREaXNjdXNpb25QcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdGVzdGFkb19jb3JyZWNjaW9ue1xuXHRcdFx0XHRcdFx0XHQgXHRcdG9ic2VydmFjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdFx0YXNpZ25hY2lvblxuXHRcdFx0XHRcdFx0XHQgXHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkRGlzY3VzaW9uUHJlZ3VudGE6XCI1YWQyNTI4Y2M4OTg4NzY3N2YzZjVjNmVcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZSkudG9NYXRjaCgveW91IGNhbid0IGFwcHJvdmVkIGEgaXNzdWVzIHF1ZXN0aW9ucywgdGhhdCBhbHJlYWR5IGlzIGNsb3NlZCBvciBzb2x2ZWQhLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cdH0pO1xuXHRpdChcIk5vIERlYmVyaWEgcG9kZXIgY2FtYmlhciBlbCBlc3RhZG8gZGUgYXByb2JhZG8gYSAgbWkgZGlzY3VzaW9uIGRlIFByZWd1bnRhLFwiICtcblx0XHRcInNpZW5kbyBlbCBjcmVhZG9yIGRlIGxhIGRpc2N1c2lvbiBkZSBsYSBwcmVndW50YSwgZGViaWRvIHF1ZSBsYSBkaXNjdXNpb25cIiArXG5cdFx0XCJ5YSBzZSBlbmN1ZW50cmEgcmVzdWVsdGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gYXByb2JhckVzdGFkb015RGlzY3VzaW9uUHJlZ3VudGEoJGlkRGlzY3VzaW9uUHJlZ3VudGE6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGFwcm9iYXJFc3RhZG9NeURpc2N1c2lvblByZWd1bnRhKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0ZXN0YWRvX2NvcnJlY2Npb257XG5cdFx0XHRcdFx0XHRcdCBcdFx0b2JzZXJ2YWNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRhc2lnbmFjaW9uXG5cdFx0XHRcdFx0XHRcdCBcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTpcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKGZhbHNlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmVycm9yc1swXS5tZXNzYWdlKS50b01hdGNoKC95b3UgY2FuJ3QgYXBwcm92ZWQgYSBpc3N1ZXMgcXVlc3Rpb25zLCB0aGF0IGFscmVhZHkgaXMgY2xvc2VkIG9yIHNvbHZlZCEvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0fSk7XG5cbn0pO1xuXG5kZXNjcmliZShcIkFjY2lvbmVzIGRlIGNvbnN1bHRhIGRlbCBtb2RlbG8gZGUgZGlzY3VzaW9uZXMgZGUgUHJlZ3VudGFcIiwgZnVuY3Rpb24gKCl7XG5cdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRzZWxmLnRlc3QgPSB0ZXN0ZXIoe1xuXHRcdHVybDogXCJodHRwOi8vMTI3LjAuMC4xOjM2NjAvZ3JhcGh0ZXN0XCIsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgdmVyIGxvcyBkb3MgcHJpbWVyb3MgZWxlbWVudG9zIGRlIGRpc2N1c2lvbmVzXCIgK1xuXHRcdFwiYmFzYWRhIGVuIHVuYSBwcmVndW50YSwgcG9kaWVuZG8gdGVuZXIgbGEgb3BjaW9uIGRlIHZlciBcIiArXG5cdFx0XCJxdWUgdG9kYXZpYSBleGlzdGUgdW4gcHJveGltbyBlbGVtZW50byBlbiBjb25zdWx0YXJcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgZ2V0TGlzdGFJc3N1ZXNCeVF1ZXN0aW9ucygkbGltaXQ6IEludCwgJGFmdGVyOiBTdHJpbmcsICRpZFByZWd1bnRhOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0Z2V0TGlzdGFJc3N1ZXNCeVF1ZXN0aW9ucyhsaW1pdDogJGxpbWl0LCBhZnRlcjogJGFmdGVyLCBpZFByZWd1bnRhOiAkaWRQcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0dG90YWxDb3VudFxuXHRcdFx0XHRcdFx0XHQgXHRcdGVkZ2VzIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdGN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0bm9kZSB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdGNyZWFkb3JfY29ycmVjY2lvbiB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0ZXN0YWRvX2NvcnJlY2Npb257XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0cm9sXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19jcmVhZG9yX2VzdGFkb3tcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRwYWdlSW5mb3tcblx0XHRcdFx0XHRcdFx0IFx0XHRcdGVuZEN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0aGFzbmV4dFBhZ2Vcblx0XHRcdFx0XHRcdFx0IFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0IFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0bGltaXQ6IDIsXG5cdFx0XHRcdFx0YWZ0ZXI6XCJNZz09XCIsXG5cdFx0XHRcdFx0aWRQcmVndW50YTpcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxM1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5nZXRMaXN0YUlzc3Vlc0J5UXVlc3Rpb25zLnRvdGFsQ291bnQpLnRvQmUoMyk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmdldExpc3RhSXNzdWVzQnlRdWVzdGlvbnMucGFnZUluZm8uaGFzbmV4dFBhZ2UpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5nZXRMaXN0YUlzc3Vlc0J5UXVlc3Rpb25zLmVkZ2VzWzBdLm5vZGUuY3JlYWRvcl9jb3JyZWNjaW9uLmNvcnJlbykudG9NYXRjaCgva2V2aW5hbmRyZXNvcnRpem1lcmNoYW4vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XG5cdH0pO1xuXHRpdChcIkRlYmVyaWEgcG9kZXIgdmUgdG9kb3MgbG9zIGVsZW1lbnRvcyBkZSBkaXNjdXNpb25lc1wiICtcblx0XHRcImJhc2FkYSBlbiB1bmEgcHJlZ3VudGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgZ2V0TGlzdGFJc3N1ZXNCeVF1ZXN0aW9ucygkbGltaXQ6IEludCwgJGFmdGVyOiBTdHJpbmcsICRpZFByZWd1bnRhOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0Z2V0TGlzdGFJc3N1ZXNCeVF1ZXN0aW9ucyhsaW1pdDogJGxpbWl0LCBhZnRlcjogJGFmdGVyLCBpZFByZWd1bnRhOiAkaWRQcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0dG90YWxDb3VudFxuXHRcdFx0XHRcdFx0XHQgXHRcdGVkZ2VzIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdGN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0bm9kZSB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdGNyZWFkb3JfY29ycmVjY2lvbiB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0ZXN0YWRvX2NvcnJlY2Npb257XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0cm9sXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb19jcmVhZG9yX2VzdGFkb3tcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRwYWdlSW5mb3tcblx0XHRcdFx0XHRcdFx0IFx0XHRcdGVuZEN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0aGFzbmV4dFBhZ2Vcblx0XHRcdFx0XHRcdFx0IFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0IFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0bGltaXQ6IDAsXG5cdFx0XHRcdFx0YWZ0ZXI6XCJcIixcblx0XHRcdFx0XHRpZFByZWd1bnRhOlwiNWFjZGUxYzU4Y2RmNWE1Mjg0MzQ5NzEzXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmdldExpc3RhSXNzdWVzQnlRdWVzdGlvbnMudG90YWxDb3VudCkudG9CZSgzKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZ2V0TGlzdGFJc3N1ZXNCeVF1ZXN0aW9ucy5wYWdlSW5mby5oYXNuZXh0UGFnZSkudG9CZShmYWxzZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmdldExpc3RhSXNzdWVzQnlRdWVzdGlvbnMuZWRnZXNbMF0ubm9kZS5jcmVhZG9yX2NvcnJlY2Npb24uY29ycmVvKS50b01hdGNoKC9rZXZpbmFuZHJlc29ydGl6bWVyY2hhbi8pO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciBsYSBsaXN0YSBkZSB0b2RvcyBsb3MgdXN1YXJpb3MgcXVlIGhhbiBhc2lnbmFkbyB1biBlc3RhZG9cIiArXG5cdFx0XCJhIG1pIGNvcnJlY2Npb24gZGUgcHJlZ3VudGFcIiwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgZ2V0TGlzdGFVc3Vhcmlvc0FzaWduYWRvRXN0YWRvQ29ycmVjY2lvblByZWd1bnRhKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0Z2V0TGlzdGFVc3Vhcmlvc0FzaWduYWRvRXN0YWRvQ29ycmVjY2lvblByZWd1bnRhKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRlc3RhZG9fY29ycmVjY2lvbntcblx0XHRcdFx0XHRcdFx0IFx0XHRcdHJvbFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0YXNpZ25hY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0b2JzZXJ2YWNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG97XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cdFx0XHRcblx0XHRcdFx0XHRcdFx0IFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWREaXNjdXNpb25QcmVndW50YTogXCI1YWQ2MTg4ZWJkOTE2NjM1ZjdhYzlmODZcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuZ2V0TGlzdGFVc3Vhcmlvc0FzaWduYWRvRXN0YWRvQ29ycmVjY2lvblByZWd1bnRhLmVzdGFkb19jb3JyZWNjaW9uWzBdLnJvbCkudG9NYXRjaCgvdXN1YXJpby8pO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5nZXRMaXN0YVVzdWFyaW9zQXNpZ25hZG9Fc3RhZG9Db3JyZWNjaW9uUHJlZ3VudGEuZXN0YWRvX2NvcnJlY2Npb25bMF0uYXNpZ25hY2lvbikudG9NYXRjaCgvY3JlYWRvLyk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmdldExpc3RhVXN1YXJpb3NBc2lnbmFkb0VzdGFkb0NvcnJlY2Npb25QcmVndW50YS5lc3RhZG9fY29ycmVjY2lvblswXS51c3VhcmlvX2NyZWFkb3JfZXN0YWRvLm5vbWJyZSkudG9NYXRjaCgva2V2aW4vKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciB2ZXIgZWwgY29udGVuaWRvIGRlIHVuYSBkaXNjdXNpb24gZGUgdW5hIHByZWd1bnRhIGRhZG8gdW4gaWRlbnRpZmljYWRvclwiICwgZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgbG9hZERpc2N1c2lvblByZWd1bnRhKCRpZERpc2N1c2lvblByZWd1bnRhOiBTdHJpbmchKXtcblx0XHRcdFx0XHRcdFx0bG9hZERpc2N1c2lvblByZWd1bnRhKGlkRGlzY3VzaW9uUHJlZ3VudGE6ICRpZERpc2N1c2lvblByZWd1bnRhKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRlc3RhZG9fY29ycmVjY2lvbntcblx0XHRcdFx0XHRcdFx0IFx0XHRcdHJvbFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0YXNpZ25hY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0b2JzZXJ2YWNpb25cblx0XHRcdFx0XHRcdFx0IFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG97XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRldGlxdWV0YXNfY29ycmVjY2lvbmVze1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRldGlxdWV0YVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRwcmVndW50YV9JRCB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0cmVzcHVlc3Rhc1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0dGlwb1ByZWd1bnRhXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRhcmVhY29ub2NpbWllbnRvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0dGl0dWxvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHR1c3VhcmlvX0lEe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0Y29ycmVvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0fVx0XHRcdFxuXHRcdFx0XHRcdFx0XHQgXHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZERpc2N1c2lvblByZWd1bnRhOiBcIjVhZDI1MjhjYzg5ODg3Njc3ZjNmNWM2ZVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciBlbCBsaXN0YWRvIGRlIGRpc2N1c2lvbmVzIGFuZXhhZGFzIGEgdW5hIHByZWd1bnRhXCIgLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBsb2FkTGlzdGFEaXNjdXNpb25lc0dlbmVyYWRhc0J5UHJlZ3VudGEoJGlkUHJlZ3VudGE6IFN0cmluZywgJGxpbWl0OiBJbnQpe1xuXHRcdFx0XHRcdFx0XHRsb2FkTGlzdGFEaXNjdXNpb25lc0dlbmVyYWRhc0J5UHJlZ3VudGEoaWRQcmVndW50YTogJGlkUHJlZ3VudGEsIGxpbWl0OiAkbGltaXQpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdGNyZWFkb3JfY29ycmVjY2lvbntcblx0XHRcdFx0XHRcdFx0IFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRldGlxdWV0YXNfY29ycmVjY2lvbmVze1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0ZXRpcXVldGFcblx0XHRcdFx0XHRcdFx0IFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0ZXN0YWRvX2NvcnJlY2Npb257XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHR1c3VhcmlvX2NyZWFkb3JfZXN0YWRvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0fVx0XHRcdFxuXHRcdFx0XHRcdFx0XHQgXHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxNFwiLFxuXHRcdFx0XHRcdGxpbWl0OiAxMFxuXHRcdFx0XHR9XG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciB2ZXIgbGFzIDEwIHByaW1lcmFzIGRpc2N1c2lvbmVzIG1hcyByZWNpZW50ZXNcIiAsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxvYWRGaXJzdERpc2N1c2lvbmVzUHJlZ3VudGFzUmVjaWVuQ3JlYWRhc3tcblx0XHRcdFx0XHRcdFx0bG9hZEZpcnN0RGlzY3VzaW9uZXNQcmVndW50YXNSZWNpZW5DcmVhZGFze1xuXHRcdFx0XHRcdFx0XHQgXHRcdGNyZWFkb3JfY29ycmVjY2lvbntcblx0XHRcdFx0XHRcdFx0IFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRlc3RhZG9fY29ycmVjY2lvbntcblx0XHRcdFx0XHRcdFx0IFx0XHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG8ge1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHR9XHRcblx0XHRcdFx0XHRcdFx0IFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0IFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdHRpcG9fY29ycmVjY2lvblxuXHRcdFx0XHRcdFx0XHQgXHRcdGV0aXF1ZXRhc19jb3JyZWNjaW9uZXN7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRldGlxdWV0YVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRwcmVndW50YV9JRHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdHRpcG9QcmVndW50YVxuXHRcdFx0XHRcdFx0XHQgXHRcdH1cdFx0XG5cdFx0XHRcdFx0XHRcdCBcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWBcblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIHZlciBlbCBsaXN0YWRvIGRlIGxhcyBkaXNjdXNpb25lcyBkZSBwcmVndW50YXMgcG9yIGVzdGFkb1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBxdWVyeSBsb2FkTGlzdGFDb3JyZWNjaW9uZXNQcmVndW50YXNCeUVzdGFkbygkaWRQcmVndW50YTogU3RyaW5nLCAkZXN0YWRvOiBTdHJpbmcsICRsaW1pdDogSW50LCAkYWZ0ZXI6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGxvYWRMaXN0YUNvcnJlY2Npb25lc1ByZWd1bnRhc0J5RXN0YWRvKGlkUHJlZ3VudGE6ICRpZFByZWd1bnRhLCBlc3RhZG86ICRlc3RhZG8sIGxpbWl0OiAkbGltaXQsIGFmdGVyOiAkYWZ0ZXIpe1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHRvdGFsQ291bnRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRwYWdlSW5mb3tcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGVuZEN1cnNvclxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0aGFzbmV4dFBhZ2Vcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XHRcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWRQcmVndW50YTogXCI1YWNkZTFjNThjZGY1YTUyODQzNDk3MTRcIixcblx0XHRcdFx0XHRlc3RhZG86IFwiZWRpdGFkb1wiLFxuXHRcdFx0XHRcdGFmdGVyOlwiXCIsXG5cdFx0XHRcdFx0bGltaXQ6IDEwXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5sb2FkTGlzdGFDb3JyZWNjaW9uZXNQcmVndW50YXNCeUVzdGFkby50b3RhbENvdW50KS50b0JlKDApO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0fSk7XG5cdGl0KFwiRGViZXJpYSBwb2RlciB2ZXIgZWwgbGlzdGFkbyBkZSBsb3MgdXN1YXJpb3MgcXVlIGhhbiBjcmVhZG8gY29ycmVjY2lvbmVzIGRlIHByZWd1bnRhXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxvYWRsaXN0YVVzdWFyaW9zQ3JlYWRvQ29ycmVjY2lvbmVzUHJlZ3VudGFzKCRpZFByZWd1bnRhOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRsb2FkbGlzdGFVc3Vhcmlvc0NyZWFkb0NvcnJlY2Npb25lc1ByZWd1bnRhcyhpZFByZWd1bnRhOiAkaWRQcmVndW50YSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZFByZWd1bnRhOiBcIjVhY2RlMWM1OGNkZjVhNTI4NDM0OTcxNFwiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5sb2FkbGlzdGFVc3Vhcmlvc0NyZWFkb0NvcnJlY2Npb25lc1ByZWd1bnRhcy5sZW5ndGgpLnRvQmUoMSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXG59KTsiXX0=