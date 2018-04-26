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
					idComentario: "5adff4bc4c721f08e52bae1d"
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
	it("Deberia dar mi voto positivo, a un comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarLikesComentario($idUsuario: String, $idComentario: String){
							colocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarLikesComentario.like).toBe(1);
				expect(response.data.colocarLikesComentario.dislike).toBe(0);
				done();
			});
	});
	it("Deberia dar mi voto negativo, a un comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarDisLikesComentario($idUsuario: String, $idComentario: String){
							colocarDisLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarDisLikesComentario.like).toBe(0);
				expect(response.data.colocarDisLikesComentario.dislike).toBe(1);
				done();
			});
	});
	it("Deberia dar favorito a un comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarFavoritosComentario($idUsuario: String, $idComentario: String){
							colocarFavoritosComentario(idUsuario: $idUsuario, idComentario: $idComentario)				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarFavoritosComentario).toBe(1);
				done();
			});
	});
	it("Deberia quitar mi voto negativo, a un comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarDisLikesComentario($idUsuario: String, $idComentario: String){
							colocarDisLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarDisLikesComentario.like).toBe(0);
				expect(response.data.colocarDisLikesComentario.dislike).toBe(-1);
				done();
			});
	});
	it("Deberia Obtener un voto nulo a mi comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarLikesComentario($idUsuario: String, $idComentario: String){
							colocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarLikesComentario.like).toBe(-1);
				expect(response.data.colocarLikesComentario.dislike).toBe(0);
				done();
			});
	});
	it("Deberia Obtener un voto positivo a un comentario si anteriormente mi voto " +
		"fue negativo", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarLikesComentario($idUsuario: String, $idComentario: String){
							colocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarLikesComentario.like).toBe(1);
				expect(response.data.colocarLikesComentario.dislike).toBe(-1);
				done();
			});
	});
	it("Deberia Obtener un voto positivo a un comentario si no " +
		"poseo ningun voto", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarLikesComentario($idUsuario: String, $idComentario: String){
							colocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ade907216edf832bf536900"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarLikesComentario.like).toBe(1);
				expect(response.data.colocarLikesComentario.dislike).toBe(0);
				done();
			});
	});
	it("Deberia dar mi voto positivo, a un comentario de un nuevo usuario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarLikesComentario($idUsuario: String, $idComentario: String){
							colocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ac24c758e4a6a23d4869ac7"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarLikesComentario.like).toBe(1);
				expect(response.data.colocarLikesComentario.dislike).toBe(0);
				done();
			});
	});
	it("Deberia Obtener un voto nulo a mi comentario de un nuevo usuario", function (done) {
		self
			.test(JSON.stringify({
				query: `mutation colocarLikesComentario($idUsuario: String, $idComentario: String){
							colocarLikesComentario(idUsuario: $idUsuario, idComentario: $idComentario){
							 					like
							 					dislike	
							 				}				
						}`,
				variables:{
					idComentario: "5adff4bc4c721f08e52bae1d",
					idUsuario:"5ac24c758e4a6a23d4869ac7"
				}
			}))
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				expect(response.data.colocarLikesComentario.like).toBe(-1);
				expect(response.data.colocarLikesComentario.dislike).toBe(0);
				done();
			});
	});
});

describe("Acciones de consulta para el modelo comentario", function(){
	const self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("Deberia ver informacion de un comentario", function (done) {
		self
			.test(JSON.stringify({
				query: `query verComentario($idComentario: String){
							  verComentario(idComentario: $idComentario){
							  				creador_comentario{
							  					correo
							  					nombre
							  				}
							  				contenido
							  				fecha_creacion
							  				fecha_actualizacion
							  				votacion{
							  					usuario_creador{
							  						nombre
							  						correo
							  					}
							  					like
							  					dislike
							  					favoritos
							  				}
							 					
							 				}				
						}`,
				variables:{
					idComentario:"5adff4bc4c721f08e52bae1d"
				}
			}))
			.then(response => {
				console.log(response);
				expect(response.status).toBe(200);
				expect(response.success).toBe(true);
				done();
			});
	});
});