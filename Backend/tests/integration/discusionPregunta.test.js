/* eslint-disable quotes,no-undef */

const tester = require('graphql-tester').tester;

describe("Modelo de discusion de Pregunta", function(){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});

	it("deberia poder crear una nueva discusion de Pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation nuevaDiscusionPregunta($discusionPregunta: discusionPreguntaInput){
							nuevaDiscusionPregunta(discusionPregunta: $discusionPregunta){
								titulo
								descripcion
								habilitada

							}
				
				}`,
				variables: {
					discusionPregunta:{
						titulo: "mi septima discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta pregunta tiene varios errores",
						tipo_correccion: ["descripcion","contenido_multimedia"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "creado",
							observacion:"discusion de pregunta creada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349714"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.nuevaDiscusionPregunta.titulo).toMatch(/mi septima discusion de pregunta/);
				done();
			});
	});

	it("No deberia guardar una discusion de Pregunta que ya sido previamente creada", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation nuevaDiscusionPregunta($discusionPregunta: discusionPreguntaInput){
							nuevaDiscusionPregunta(discusionPregunta: $discusionPregunta){
								titulo
								descripcion
								habilitada

							}
				
				}`,
				variables: {
					discusionPregunta:{
						titulo: "mi primera discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta pregunta tiene varios errores",
						tipo_correccion: ["descripcion","contenido_multimedia"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "creado",
							observacion:"discusion de pregunta creada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors.length).toBe(1);
				expect(response.errors[0].message).toMatch(/you already create this question, you can create the same correction two times/);
				done();
			});
		
	});

	it("deberia poder crear una nueva discusion", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation nuevaDiscusionPregunta($discusionPregunta: discusionPreguntaInput){
							nuevaDiscusionPregunta(discusionPregunta: $discusionPregunta){
								titulo
								descripcion
								habilitada

							}
				
				}`,
				variables: {
					discusionPregunta:{
						titulo: "mi tercera discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta pregunta algunos  errores",
						tipo_correccion: ["descripcion","contenido_multimedia"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "creado",
							observacion:"discusion de pregunta creada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.nuevaDiscusionPregunta.titulo).toMatch(/mi tercera discusion de pregunta/);
				done();
			});
	});

	it("deberia poder editar una discusion de pregunta, en el cual soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){
							editarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					discusionPregunta:{
						titulo: "mi segunda editada de discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta es una discusion editada ",
						tipo_correccion: ["descripcion","contenido_multimedia","respuestas"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "editado",
							observacion:"discusion editada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarDiscusionPregunta).toBe(true);
				done();
			});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual soy el creador" +
		"debido que el estado asignado es pendiente", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){
							editarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					discusionPregunta:{
						titulo: "mi segunda editada de discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta es una discusion editada ",
						tipo_correccion: ["descripcion","contenido_multimedia","respuestas"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "editado",
							observacion:"discusion editada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not make change to a issues, in state pending/);
				done();
			});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual soy el creador" +
		"debido que el estado asignado es cerrado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){
							editarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					discusionPregunta:{
						titulo: "mi segunda editada de discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta es una discusion editada ",
						tipo_correccion: ["descripcion","contenido_multimedia","respuestas"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "editado",
							observacion:"discusion editada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the issues was reject by a committee member, so you must create a new one issues/);
				done();
			});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual soy el creador" +
		"debido que el estado asignado es resuelto", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){
							editarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					discusionPregunta:{
						titulo: "mi segunda editada de discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta es una discusion editada ",
						tipo_correccion: ["descripcion","contenido_multimedia","respuestas"],
						creador_correccion:"5ac24c758e4a6a23d4869ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "editado",
							observacion:"discusion editada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you already accept the change of the question creator, so you decided marked this issues like solved!, you should create other issues/);
				done();
			});
	});

	it("deberia no poder editar una discusion de pregunta, en el cual no soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarDiscusionPregunta($idDiscusionPregunta: String!,$discusionPregunta: discusionPreguntaInput){
							editarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,discusionPregunta: $discusionPregunta)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					discusionPregunta:{
						titulo: "mi segunda editada de discusion de pregunta",
						etiquetas_correcciones: ["5ad224fcd47c4b51302491ce","5ad224fcd47c4b51302491cf"],
						descripcion: "esta es una discusion editada ",
						tipo_correccion: ["descripcion","contenido_multimedia","respuestas"],
						creador_correccion:"5ac24c758e4a6a23d4889ac7",
						estado_correccion:{
							usuario_creador_estado: "5ac24c758e4a6a23d4869ac7",
							rol: "usuario",
							asignacion: "editado",
							observacion:"discusion editada"
						},
						fecha_creacion: new Date(),
						pregunta_ID: "5acde1c58cdf5a5284349713"
					}
				}

			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/This user can't edit this question, because he is not the owner/);
				done();
			});
	});

	it("deberia poder eliminar una discusion de pregunta, en el cual soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarDiscusionPregunta($idDiscusionPregunta: String!,$creador_correccion: String){
							eliminarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,creador_correccion: $creador_correccion)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					creador_correccion:"5ac24c758e4a6a23d4869ac7"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.eliminarDiscusionPregunta).toBe(true);
				done();
			});
	});

	it("deberia no poder eliminar una discusion de pregunta, en el cual no soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarDiscusionPregunta($idDiscusionPregunta: String!,$creador_correccion: String){
							eliminarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,creador_correccion: $creador_correccion)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					creador_correccion:"5ac24c758e4a6a23d4779ac7"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/This user can't edit this question, because he is not the owner/);
				done();
			});
	});

	it("deberia no poder eliminar una discusion de pregunta, en el cual soy el creador," +
		"pero se encuentra en un estado pendiente", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation eliminarDiscusionPregunta($idDiscusionPregunta: String!,$creador_correccion: String){
							eliminarDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta,creador_correccion: $creador_correccion)
				
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					creador_correccion:"5ac24c758e4a6a23d4779ac7"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not delete this issues, in state pending/);
				done();
			});
	});

	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual soy el creador," +
		"debido que el estado de la discusion se encuentra en estado" +
		"pendiente", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){
							editarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){
								titulo
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					titulo: "esta es una discusion editada por kevin Ortiz"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not make change to a issues, in state pending/);
				done();
			});
	});
	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual soy el creador," +
		"debido que el estado de la discusion se encuentra en estado" +
		"cerrado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){
							editarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){
								titulo
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					titulo: "esta es una discusion editada por kevin Ortiz"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the issues was reject by a committee member, so you must create a new one issues/);
				done();
			});
	});
	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual soy el creador," +
		"debido que el estado de la discusion se encuentra en estado" +
		"resuelto", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){
							editarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){
								titulo
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					titulo: "esta es una discusion editada por kevin Ortiz"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you already accept the change of the question creator, so you decided marked this issues like solved!, you should create other issues/);
				done();
			});
	});

	it("deberia poder editar el titulo de  una discusion de pregunta, en el cual soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){
							editarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){
								titulo
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					titulo: "esta es una discusion editada por kevin Ortiz"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarMyDiscusionPreguntaByTitulo.titulo).toMatch(/esta es una discusion editada por kevin Ortiz/);
				done();
			});
	});
	it("deberia no poder editar el titulo de  una discusion de pregunta, en el cual no soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByTitulo($idDiscusionPregunta: String!,$correoUsuario: String!, $titulo: String){
							editarMyDiscusionPreguntaByTitulo(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, titulo: $titulo){
								titulo
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan111@gmail.com",
					titulo: "esta es una discusion editada por kevin Ortiz"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/this question issue you can not edit, because you are not the owner/);
				done();
			});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador" +
		"debido que se encuentra en un estado de pendiente", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){
							editarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){
							 	descripcion
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					descripcion: "descripcion utilizada por ejemplo"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the question creator's is editing the content, thanks to your issues,you can not make change to a issues, in state pending/);
				done();
			});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador" +
		"debido que se encuentra en un estado de cerrado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){
							editarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){
							 	descripcion
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					descripcion: "descripcion utilizada por ejemplo"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the issues was reject by a committee member, so you must create a new one issues/);
				done();
			});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador" +
		"debido que se encuentra en un estado de resuelto", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){
							editarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){
							 	descripcion
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					descripcion: "descripcion utilizada por ejemplo"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you already accept the change of the question creator, so you decided marked this issues like solved!, you should create other issues/);
				done();
			});
	});
	it("deberia poder editar la descripcion de  una discusion de pregunta, en el cual soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){
							editarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){
							 	descripcion
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan@gmail.com",
					descripcion: "descripcion utilizada por ejemplo"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarMyDiscusionPreguntaByDescripcion.descripcion).toMatch(/descripcion utilizada por ejemplo/);
				done();
			});
	});
	it("deberia no poder editar la descripcion de  una discusion de pregunta, en el cual no soy el creador", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarMyDiscusionPreguntaByDescripcion($idDiscusionPregunta: String!,$correoUsuario: String!, $descripcion: String){
							editarMyDiscusionPreguntaByDescripcion(idDiscusionPregunta: $idDiscusionPregunta,correoUsuario: $correoUsuario, descripcion: $descripcion){
							 	descripcion
							}

				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e",
					correoUsuario:"kevinandresortizmerchan111@gmail.com",
					descripcion: "descripcion utilizada por ejemplo"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/this question issue you can not edit, because you are not the owner/);
				done();
			});
	});
	it("Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," +
		"siendo el creador de la discusion de la pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){
							aprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){
							 	estado_correccion{
							 		observacion
							 		asignacion
							 	}
							}
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.aprobarEstadoMyDiscusionPregunta.estado_correccion[0].asignacion).toMatch(/resuelto/);
				expect(response.data.aprobarEstadoMyDiscusionPregunta.estado_correccion[0].observacion).toMatch(/el usuario ha cerrado esta discusion,/);
				done();
			});
		
	});
	it("No Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," +
		"siendo el creador de la discusion de la pregunta, debido que se " +
		"encuentra deshabilitada", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){
							aprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){
							 	estado_correccion{
							 		observacion
							 		asignacion
							 	}
							}
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't approved a question issues, that you had closed!/);
				done();
			});

	});
	it("No Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," +
		"siendo el creador de la discusion de la pregunta, y el estado de la discusion es " +
		"cerrado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){
							aprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){
							 	estado_correccion{
							 		observacion
							 		asignacion
							 	}
							}
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't approved a issues questions, that already is closed or solved!/);
				done();
			});

	});
	it("No Deberia poder cambiar el estado de aprobado a  mi discusion de Pregunta," +
		"siendo el creador de la discusion de la pregunta, debido que la discusion" +
		"ya se encuentra resuelta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation aprobarEstadoMyDiscusionPregunta($idDiscusionPregunta: String){
							aprobarEstadoMyDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){
							 	estado_correccion{
							 		observacion
							 		asignacion
							 	}
							}
				}`,
				variables: {
					idDiscusionPregunta:"5ad2528cc89887677f3f5c6e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/you can't approved a issues questions, that already is closed or solved!/);
				done();
			});

	});

});

describe("Acciones de consulta del modelo de discusiones de Pregunta", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder ver los dos primeros elementos de discusiones" +
		"basada en una pregunta, podiendo tener la opcion de ver " +
		"que todavia existe un proximo elemento en consultar", function (done) {
		self
			.test(JSON.stringify({
				query: `query getListaIssuesByQuestions($limit: Int, $after: String, $idPregunta: String!){
							getListaIssuesByQuestions(limit: $limit, after: $after, idPregunta: $idPregunta){
							 		totalCount
							 		edges {
							 			cursor
							 			node {
							 				creador_correccion {
							 					correo
							 				}
							 				estado_correccion{
							 					rol
							 					usuario_creador_estado{
							 						correo
							 					}
							 				}
							 			}
							 		}
							 		pageInfo{
							 			endCursor
							 			hasnextPage
							 		}				
							 	}				
						}`,
				variables: {
					limit: 2,
					after:"Mg==",
					idPregunta:"5acde1c58cdf5a5284349713"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.getListaIssuesByQuestions.totalCount).toBe(3);
				expect(response.data.getListaIssuesByQuestions.pageInfo.hasnextPage).toBe(false);
				expect(response.data.getListaIssuesByQuestions.edges[0].node.creador_correccion.correo).toMatch(/kevinandresortizmerchan/);
				done();
			});
		
	});
	it("Deberia poder ve todos los elementos de discusiones" +
		"basada en una pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query getListaIssuesByQuestions($limit: Int, $after: String, $idPregunta: String!){
							getListaIssuesByQuestions(limit: $limit, after: $after, idPregunta: $idPregunta){
							 		totalCount
							 		edges {
							 			cursor
							 			node {
							 				creador_correccion {
							 					correo
							 				}
							 				estado_correccion{
							 					rol
							 					usuario_creador_estado{
							 						correo
							 					}
							 				}
							 			}
							 		}
							 		pageInfo{
							 			endCursor
							 			hasnextPage
							 		}				
							 	}				
						}`,
				variables: {
					limit: 0,
					after:"",
					idPregunta:"5acde1c58cdf5a5284349713"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.getListaIssuesByQuestions.totalCount).toBe(3);
				expect(response.data.getListaIssuesByQuestions.pageInfo.hasnextPage).toBe(false);
				expect(response.data.getListaIssuesByQuestions.edges[0].node.creador_correccion.correo).toMatch(/kevinandresortizmerchan/);
				done();
			});

	});
	it("Deberia poder ver la lista de todos los usuarios que han asignado un estado" +
		"a mi correccion de pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query getListaUsuariosAsignadoEstadoCorreccionPregunta($idDiscusionPregunta: String!){
							getListaUsuariosAsignadoEstadoCorreccionPregunta(idDiscusionPregunta: $idDiscusionPregunta){
							 		estado_correccion{
							 			rol
							 			asignacion
							 			observacion
							 			usuario_creador_estado{
							 				nombre
							 			}
							 		}			
							 	}				
						}`,
				variables: {
					idDiscusionPregunta: "5ad6188ebd916635f7ac9f86"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.getListaUsuariosAsignadoEstadoCorreccionPregunta.estado_correccion[0].rol).toMatch(/usuario/);
				expect(response.data.getListaUsuariosAsignadoEstadoCorreccionPregunta.estado_correccion[0].asignacion).toMatch(/creado/);
				expect(response.data.getListaUsuariosAsignadoEstadoCorreccionPregunta.estado_correccion[0].usuario_creador_estado.nombre).toMatch(/kevin/);
				done();
			});

	});
	it("Deberia poder ver el contenido de una discusion de una pregunta dado un identificador" , function (done) {
		self
			.test(JSON.stringify({
				query: `query loadDiscusionPregunta($idDiscusionPregunta: String!){
							loadDiscusionPregunta(idDiscusionPregunta: $idDiscusionPregunta){
							 		estado_correccion{
							 			rol
							 			asignacion
							 			observacion
							 			usuario_creador_estado{
							 				nombre
							 			}
							 		}
							 		etiquetas_correcciones{
							 				etiqueta
							 		}
							 		pregunta_ID {
							 			descripcion
							 			respuestas
							 			tipoPregunta
							 			areaconocimiento {
							 				titulo
							 			}
							 			usuario_ID{
							 				nombre
							 				correo
							 			}
							 		}			
							 	}				
						}`,
				variables: {
					idDiscusionPregunta: "5ad2528cc89887677f3f5c6e"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});

	});
	it("Deberia poder ver el listado de discusiones anexadas a una pregunta" , function (done) {
		self
			.test(JSON.stringify({
				query: `query loadListaDiscusionesGeneradasByPregunta($idPregunta: String, $limit: Int){
							loadListaDiscusionesGeneradasByPregunta(idPregunta: $idPregunta, limit: $limit){
							 		creador_correccion{
							 			nombre
							 		}
							 		etiquetas_correcciones{
							 			etiqueta
							 		}
							 		estado_correccion{
							 			usuario_creador_estado {
							 				nombre
							 			}
							 		}			
							 	}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349714",
					limit: 10
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});

	});
	it("Deberia poder ver las 10 primeras discusiones mas recientes" , function (done) {
		self
			.test(JSON.stringify({
				query: `query loadFirstDiscusionesPreguntasRecienCreadas{
							loadFirstDiscusionesPreguntasRecienCreadas{
							 		creador_correccion{
							 			nombre
							 		}
							 		estado_correccion{
							 			usuario_creador_estado {
							 				nombre
							 			}
							 		}	
							 		titulo
							 		descripcion
							 		tipo_correccion
							 		etiquetas_correcciones{
							 			etiqueta
							 		}
							 		pregunta_ID{
							 			tipoPregunta
							 		}		
							 	}				
						}`
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});

	});
	it("Deberia poder ver el listado de las discusiones de preguntas por estado", function (done) {
		self
			.test(JSON.stringify({
				query: `query loadListaCorreccionesPreguntasByEstado($idPregunta: String, $estado: String, $limit: Int, $after: String){
							loadListaCorreccionesPreguntasByEstado(idPregunta: $idPregunta, estado: $estado, limit: $limit, after: $after){
							 					totalCount
							 					pageInfo{
							 						endCursor
							 						hasnextPage
							 					}	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349714",
					estado: "editado",
					after:"",
					limit: 10
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.loadListaCorreccionesPreguntasByEstado.totalCount).toBe(0);
				done();
			});
	});
	it("Deberia poder ver el listado de los usuarios que han creado correcciones de pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query loadlistaUsuariosCreadoCorreccionesPreguntas($idPregunta: String){
							loadlistaUsuariosCreadoCorreccionesPreguntas(idPregunta: $idPregunta){
												nombre
												correo
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349714"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.loadlistaUsuariosCreadoCorreccionesPreguntas.length).toBe(1);
				done();
			});
	});


});