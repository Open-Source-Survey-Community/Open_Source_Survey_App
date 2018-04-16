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
				expect(response.success).toBe(true);
				expect(response.data.nuevaDiscusionPregunta.titulo).toMatch(/mi primera discusion de pregunta/);
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
						titulo: "mi segunda discusion de pregunta",
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
				expect(response.data.nuevaDiscusionPregunta.titulo).toMatch(/mi segunda discusion de pregunta/);
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
						creador_correccion:"5ac24c758e4a6a23d4969ac7",
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


});