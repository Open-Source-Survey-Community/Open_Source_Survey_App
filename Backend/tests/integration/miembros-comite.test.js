/* eslint-disable no-undef,quotes */

const tester = require("graphql-tester").tester;

describe("Acciones del modereador(miembros del comite) hacia la correccion de una pregunta", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia poder ver la lista de las discusiones que se han creado o editado referente a una pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `query loadListaCorreccionesByPreguntasCreadasEditadas($idPregunta: String, $usuario: String, $limit: Int){
							loadListaCorreccionesByPreguntasCreadasEditadas(idPregunta: $idPregunta, usuario: $usuario, limit: $limit){
							 					titulo
							 					descripcion	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349714",
					usuario: "5ac248c98a3f74223f16895e",
					limit: 10
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.loadListaCorreccionesByPreguntasCreadasEditadas.length).toBe(5);
				done();
			});
	});
	it("No deberia poder ver el listado de las discusiones que se han creado o editado si no soy moderador", function (done) {
		self
			.test(JSON.stringify({
				query: `query loadListaCorreccionesByPreguntasCreadasEditadas($idPregunta: String, $usuario: String, $limit: Int){
							loadListaCorreccionesByPreguntasCreadasEditadas(idPregunta: $idPregunta, usuario: $usuario, limit: $limit){
							 					titulo
							 					descripcion	
							 				}				
						}`,
				variables: {
					idPregunta: "5acde1c58cdf5a5284349714",
					usuario: "5ac24c758e4a6a23d4869ac7",
					limit: 10
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/this users is not member committe, so you can't get this information/);
				done();
			});
	});
	it("No deberia poder asignar un estado a la Correccion de una pregunta" +
		"ya que soy el creador de la correccion de la pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoACorrecciondePregunta($idDiscusionPregunta: String, 
																	$idUsuario: String,
																	$estado: String,
																	$observacion: String){
							asignarEstadoACorrecciondePregunta(idDiscusionPregunta: $idDiscusionPregunta,
																idUsuario: $idUsuario,
																estado: $estado,
																observacion: $observacion){
								titulo
								descripcion
								estado_correccion{
									usuario_creador_estado {
										nombre
										correo
									}
								}

							}
				
				}`,
				variables: {
					idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
					idUsuario:"5ac24c758e4a6a23d4869ac7",
					estado: "rechazado",
					observacion: "una observacion que no presenta ninguna relevancia "
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/the owner of this issues, can't approved or reject this!!/);
				done();
			});
	});
	it("No deberia poder asignar un estado a la Correccion de una pregunta" +
		"ya que la discusion se encuentra en estado pendiente", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoACorrecciondePregunta($idDiscusionPregunta: String, 
																	$idUsuario: String,
																	$estado: String,
																	$observacion: String){
							asignarEstadoACorrecciondePregunta(idDiscusionPregunta: $idDiscusionPregunta,
																idUsuario: $idUsuario,
																estado: $estado,
																observacion: $observacion){
								titulo
								descripcion
								estado_correccion{
									usuario_creador_estado {
										nombre
										correo
									}
								}

							}
				
				}`,
				variables: {
					idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
					idUsuario:"5ac248c98a3f74223f16895e",
					estado: "rechazado",
					observacion: "una observacion que no presenta ninguna relevancia "
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/this issues was already assigned by a committe member, you can't change this!/);
				done();
			});
	});

	it("No deberia poder asignar un estado a la Correccion de una pregunta" +
		"ya que la discusion se encuentra en estado resuelto", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoACorrecciondePregunta($idDiscusionPregunta: String, 
																	$idUsuario: String,
																	$estado: String,
																	$observacion: String){
							asignarEstadoACorrecciondePregunta(idDiscusionPregunta: $idDiscusionPregunta,
																idUsuario: $idUsuario,
																estado: $estado,
																observacion: $observacion){
								titulo
								descripcion
								estado_correccion{
									usuario_creador_estado {
										nombre
										correo
									}
								}

							}
				
				}`,
				variables: {
					idDiscusionPregunta: "5ad2528cc89887677f3f5c6e",
					idUsuario:"5ac248c98a3f74223f16895e",
					estado: "rechazado",
					observacion: "una observacion que no presenta ninguna relevancia "
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/this issues was already marked like solved, by the owner this content/);
				done();
			});
	});
	it("Deberia poder asignar un estado a la Correccion de una pregunta" +
		"ya que la discusion se encuentra en estado creado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoACorrecciondePregunta($idDiscusionPregunta: String, 
																	$idUsuario: String,
																	$estado: String,
																	$observacion: String){
							asignarEstadoACorrecciondePregunta(idDiscusionPregunta: $idDiscusionPregunta,
																idUsuario: $idUsuario,
																estado: $estado,
																observacion: $observacion){
								titulo
								descripcion
								estado_correccion{
									usuario_creador_estado {
										nombre
										correo
									}
								}
							}
				}`,
				variables: {
					idDiscusionPregunta: "5ad6188ebd916635f7ac9f86",
					idUsuario:"5ac248c98a3f74223f16895e",
					estado: "rechazado",
					observacion: "una observacion que no presenta ninguna relevancia "
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.asignarEstadoACorrecciondePregunta.estado_correccion[1].usuario_creador_estado.correo).toMatch(/kevinandresortizmerchan111@gmail.com/);
				done();
			});
	});
	it("Deberia poder asignar un estado de aceptado a la Correccion de una pregunta" +
		"ya que la discusion se encuentra en estado creado", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoACorrecciondePregunta($idDiscusionPregunta: String, 
																	$idUsuario: String,
																	$estado: String,
																	$observacion: String){
							asignarEstadoACorrecciondePregunta(idDiscusionPregunta: $idDiscusionPregunta,
																idUsuario: $idUsuario,
																estado: $estado,
																observacion: $observacion){
								titulo
								descripcion
								estado_correccion{
									usuario_creador_estado {
										nombre
										correo
									}
								}
							}
				}`,
				variables: {
					idDiscusionPregunta: "5ad6ab93544c435a36550952",
					idUsuario:"5ac248c98a3f74223f16895e",
					estado: "aceptado",
					observacion: "muy buena correccion"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.asignarEstadoACorrecciondePregunta.estado_correccion[1].usuario_creador_estado.correo).toMatch(/kevinandresortizmerchan111@gmail.com/);
				done();
			});
	});
	it("Deberia poder asignar un delegado a un conjunto de pregunta, siendo" +
		"un usuario miembro del comite", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarPreguntasAMiembroComite($idUsuario: String, 
																	$arrayPreguntas: [ID!]){
							asignarPreguntasAMiembroComite(idUsuario: $idUsuario,
															arrayPreguntas: $arrayPreguntas)
								
				}`,
				variables: {
					idUsuario:"5ac24c758e4a6a23d4869ac7",
					arrayPreguntas: ["5addfc4dff628f04be5dcc97","5addfc54ff628f04be5dcc98","5addfc5aff628f04be5dcc99"]
				}
			}))
			.then(response => {
				console.log(response);
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.asignarPreguntasAMiembroComite).toBe(true);
				done();
			});
	});

});