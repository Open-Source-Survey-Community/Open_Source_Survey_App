/* eslint-disable no-undef,quotes */

const tester = require("graphql-tester").tester;
describe("Escenario del modelo de comentarios", function (){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("El usuario deberia poder crear un comentario asociado a una pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearComentarioAnexadaAPregunta($comentario: ComentarioInput, $idPregunta: String!){
							crearComentarioAnexadaAPregunta(comentario: $comentario, idPregunta: $idPregunta){
							 					creador_comentario{
							 						correo
							 						nombre
							 					}
							 					contenido	
							 				}				
						}`,
				variables:{
					comentario: {
						contenido: "es mi primer comentario de esta pregunta",
						creador_comentario:"5ade907216edf832bf53692b",
						fecha_creacion: new Date
					},
					idPregunta: "5addfc4dff628f04be5dcc97"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearComentarioAnexadaAPregunta.contenido).toMatch(/es mi primer comentario de esta pregunta/);
				done();
			});
	});
	it("El usuario deberia poder crear un comentario asociado a una correccion de pregunta", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearComentarioAnexadaADiscusionPregunta($comentario: ComentarioInput, $idDiscusionPregunta: String!){
							crearComentarioAnexadaADiscusionPregunta(comentario: $comentario, idDiscusionPregunta: $idDiscusionPregunta){
							 					creador_comentario{
							 						correo
							 						nombre
							 					}
							 					contenido	
							 				}				
						}`,
				variables:{
					comentario: {
						contenido: "es mi primer comentario de esta correccion de pregunta",
						creador_comentario:"5ade907216edf832bf53692b",
						fecha_creacion: new Date
					},
					idDiscusionPregunta: "5ad6188ebd916635f7ac9f86"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearComentarioAnexadaADiscusionPregunta.contenido).toMatch(/es mi primer comentario de esta correccion de pregunta/);
				done();
			});
	});
	it("El usuario deberia poder crear un comentario asociado a otro comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation crearSubComentarioAnexadaAComentario($comentario: ComentarioInput, $idComentario: String!){
							crearSubComentarioAnexadaAComentario(comentario: $comentario, idComentario: $idComentario){
							 					creador_comentario{
							 						correo
							 						nombre
							 					}
							 					contenido	
							 				}				
						}`,
				variables:{
					comentario: {
						contenido: "es mi primer comentario de un comentario",
						creador_comentario:"5ade907216edf832bf53692b",
						fecha_creacion: new Date
					},
					idComentario: "5adf543587d8de49e1d9aaee"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.crearSubComentarioAnexadaAComentario.contenido).toMatch(/es mi primer comentario de un comentario/);
				done();
			});
	});
	it("Deberia poder editar el contenido de un comentario, si soy propietario de ese comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarComentario($contenido: String, $idComentario: String, $idUsuario: String!){
							editarComentario(contenido: $contenido, idComentario: $idComentario, idUsuario: $idUsuario){
							 					creador_comentario{
							 						correo
							 						nombre
							 					}
							 					contenido	
							 				}				
						}`,
				variables:{
					contenido: "comentario actualizado correctamente",
					idComentario: "5adf543587d8de49e1d9aaee",
					idUsuario:"5ade907216edf832bf53692b"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.editarComentario.contenido).toMatch(/comentario actualizado correctamente/);
				done();
			});
	});
	it("No Deberia poder editar el contenido de un comentario, si no soy propietario de ese comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation editarComentario($contenido: String, $idComentario: String, $idUsuario: String!){
							editarComentario(contenido: $contenido, idComentario: $idComentario, idUsuario: $idUsuario){
							 					creador_comentario{
							 						correo
							 						nombre
							 					}
							 					contenido	
							 				}				
						}`,
				variables:{
					contenido: "comentario actualizado correctamente",
					idComentario: "5adf543587d8de49e1d9aaee",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(false);
				expect(response.errors[0].message).toMatch(/this users is not the owner this question/);
				done();
			});
	});
});