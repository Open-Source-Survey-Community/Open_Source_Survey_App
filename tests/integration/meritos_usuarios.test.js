const tester = require("graphql-tester").tester;

describe("Pruebas de cobertura acerca del schema meritos_usuarios", function (){
    const self = this;
    self.test = tester({
        url: "http://127.0.0.1:3660/graphtest",
        contentType: "application/json"
    });
    it("Deberia poder ver la cantidad de preguntas elaboradas por un usuario" , function (done) {
        self
            .test(JSON.stringify({
                query: `query getCantidadPreguntasElaboradasByUsuario($idUsuario: String){
							getCantidadPreguntasElaboradasByUsuario(idUsuario:$idUsuario)
								
				}`,
                variables: {
                    idUsuario: "5ac248c98a3f74223f16895e",
                }
            }))
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.success).toBe(true);
                expect(response.data.getCantidadPreguntasElaboradasByUsuario).toBe(5);
                done();
            });
    });
    it("Deberia poder ver la lista de las preguntas elaboradas por un usuario" , function (done) {
        self
            .test(JSON.stringify({
                query: `query getListaPreguntasElaboradasByUsuario($idUsuario: String){
							getListaPreguntasElaboradasByUsuario(idUsuario:$idUsuario){
							        descripcion
							        respuestas
							}
								
				}`,
                variables: {
                    idUsuario: "5ac248c98a3f74223f16895e",
                }
            }))
            .then(response => {
                console.log(response);
                expect(response.status).toBe(200);
                expect(response.success).toBe(true);
                expect(response.data.getListaPreguntasElaboradasByUsuario.length).toBe(5);
                done();
            });
    });
    it("Deberia poder ver la cantidad de correcciones de preguntas elaboradas por un usuario" , function (done) {
        self
            .test(JSON.stringify({
                query: `query getCantidadCorreccionesPreguntasElaboradasByUsuario($idUsuario: String){
							getCantidadCorreccionesPreguntasElaboradasByUsuario(idUsuario:$idUsuario)
							      
								
				}`,
                variables: {
                    idUsuario: "5ac24c758e4a6a23d4869ac7",
                }
            }))
            .then(response => {
                console.log(response);
                expect(response.status).toBe(200);
                expect(response.success).toBe(true);
                done();
            });
    });
    it("Deberia poder ver la lista de correcciones de preguntas elaboradas por un usuario" , function (done) {
        self
            .test(JSON.stringify({
                query: `query getListaCorreccionesPreguntasElaboradasByUsuario($idUsuario: String){
							getListaCorreccionesPreguntasElaboradasByUsuario(idUsuario:$idUsuario){
							    titulo
							    descripcion
							}
							      
								
				}`,
                variables: {
                    idUsuario: "5ac24c758e4a6a23d4869ac7",
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