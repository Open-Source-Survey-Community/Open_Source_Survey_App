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
});