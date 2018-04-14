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
});