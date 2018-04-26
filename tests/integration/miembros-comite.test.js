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
	it("Deberia poder ver la lista de preguntas que he sido designado", function (done) {
		self
			.test(JSON.stringify({
				query: `query cargarListaPreguntasAsignadasRevisor($idUsuario: String){
							cargarListaPreguntasAsignadasRevisor(idUsuario: $idUsuario){
							 					descripcion	
							 				}				
						}`,
				variables: {
					idUsuario:"5ade907216edf832bf53692b"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.cargarListaPreguntasAsignadasRevisor.length).toBe(3);
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
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.asignarPreguntasAMiembroComite).toBe(true);
				done();
			});
	});

	it("Deberia poder asignar un estado a una pregunta, siendo" +
		"miembro del comite", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoPregunta($idPregunta: String!, 
														$idUsuario: String!,$estado: String!, $observacion:String){
							asignarEstadoPregunta(idPregunta: $idPregunta,idUsuario: $idUsuario,
												  estado: $estado, observacion: $observacion){
												  
									estado
									estados_asignados{
										estado_asignado
									}					  
							}
								
				}`,
				variables: {
					idPregunta: "5addfc4dff628f04be5dcc97",
					idUsuario:"5ac24c758e4a6a23d4869ac7",
					estado: "aceptado",
					observacion: "ha sido aceptado"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.asignarEstadoPregunta.estado).toMatch(/aceptado/);
				expect(response.data.asignarEstadoPregunta.estados_asignados[0].estado_asignado).toMatch(/aceptado/);
				done();
			});
	});
	it("Deberia no poder asignar un estado a una pregunta, siendo" +
		"el creador de la pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoPregunta($idPregunta: String!, 
														$idUsuario: String!,$estado: String!, $observacion:String){
							asignarEstadoPregunta(idPregunta: $idPregunta,idUsuario: $idUsuario,
												  estado: $estado, observacion: $observacion){
												  
									estado
									estados_asignados{
										estado_asignado
									}					  
							}
								
				}`,
				variables: {
					idPregunta: "5addfc4dff628f04be5dcc97",
					idUsuario:"5ac248c98a3f74223f16895e",
					estado: "aceptado",
					observacion: "ha sido aceptado"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/are the owner the question/);
				done();
			});
	});
	it("Deberia no poder asignar un estado a una pregunta,no siendo" +
		"designado como asignar estado de una pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation asignarEstadoPregunta($idPregunta: String!, 
														$idUsuario: String!,$estado: String!, $observacion:String){
							asignarEstadoPregunta(idPregunta: $idPregunta,idUsuario: $idUsuario,
												  estado: $estado, observacion: $observacion){
												  
									estado
									estados_asignados{
										estado_asignado
									}					  
							}
								
				}`,
				variables: {
					idPregunta: "5addfc4dff628f04be5dcc97",
					idUsuario:"5ac248c98a3f74223f00895e",
					estado: "aceptado",
					observacion: "ha sido aceptado"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/because was not assigned/);
				done();
			});
	});
	it("Deberia poder asignar la lista de preguntas" +
		"a otro usuario que tambien es miembro de comite", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation transferirListaPreguntasDesignadasAUsuario($idUsuarioDesignado: String!, $idUsuarioActivo:String){
							transferirListaPreguntasDesignadasAUsuario(idUsuarioDesignado:$idUsuarioDesignado,idUsuarioActivo:$idUsuarioActivo)
								
				}`,
				variables: {
					idUsuarioDesignado: "5ade907216edf832bf53692b",
					idUsuarioActivo:"5ac24c758e4a6a23d4869ac7"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.transferirListaPreguntasDesignadasAUsuario).toBe(true);
				done();
			});
	});

});