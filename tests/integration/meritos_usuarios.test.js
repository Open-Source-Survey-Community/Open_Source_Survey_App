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
});