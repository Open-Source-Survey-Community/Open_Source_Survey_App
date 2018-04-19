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


});