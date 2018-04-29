"use strict";

var tester = require("graphql-tester").tester;

describe("Pruebas de cobertura acerca del schema meritos_usuarios", function () {
    var self = this;
    self.test = tester({
        url: "http://127.0.0.1:3660/graphtest",
        contentType: "application/json"
    });
    it("Deberia poder ver la cantidad de preguntas elaboradas por un usuario", function (done) {
        self.test(JSON.stringify({
            query: "query getCantidadPreguntasElaboradasByUsuario($idUsuario: String){\n\t\t\t\t\t\t\tgetCantidadPreguntasElaboradasByUsuario(idUsuario:$idUsuario)\n\t\t\t\t\t\t\t\t\n\t\t\t\t}",
            variables: {
                idUsuario: "5ac248c98a3f74223f16895e"
            }
        })).then(function (response) {
            expect(response.status).toBe(200);
            expect(response.success).toBe(true);
            expect(response.data.getCantidadPreguntasElaboradasByUsuario).toBe(5);
            done();
        });
    });
    it("Deberia poder ver la lista de las preguntas elaboradas por un usuario", function (done) {
        self.test(JSON.stringify({
            query: "query getListaPreguntasElaboradasByUsuario($idUsuario: String){\n\t\t\t\t\t\t\tgetListaPreguntasElaboradasByUsuario(idUsuario:$idUsuario){\n\t\t\t\t\t\t\t        descripcion\n\t\t\t\t\t\t\t        respuestas\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\n\t\t\t\t}",
            variables: {
                idUsuario: "5ac248c98a3f74223f16895e"
            }
        })).then(function (response) {
            console.log(response);
            expect(response.status).toBe(200);
            expect(response.success).toBe(true);
            expect(response.data.getListaPreguntasElaboradasByUsuario.length).toBe(5);
            done();
        });
    });
    it("Deberia poder ver la cantidad de correcciones de preguntas elaboradas por un usuario", function (done) {
        self.test(JSON.stringify({
            query: "query getCantidadCorreccionesPreguntasElaboradasByUsuario($idUsuario: String){\n\t\t\t\t\t\t\tgetCantidadCorreccionesPreguntasElaboradasByUsuario(idUsuario:$idUsuario)\n\t\t\t\t\t\t\t      \n\t\t\t\t\t\t\t\t\n\t\t\t\t}",
            variables: {
                idUsuario: "5ac24c758e4a6a23d4869ac7"
            }
        })).then(function (response) {
            console.log(response);
            expect(response.status).toBe(200);
            expect(response.success).toBe(true);
            done();
        });
    });
    it("Deberia poder ver la lista de correcciones de preguntas elaboradas por un usuario", function (done) {
        self.test(JSON.stringify({
            query: "query getListaCorreccionesPreguntasElaboradasByUsuario($idUsuario: String){\n\t\t\t\t\t\t\tgetListaCorreccionesPreguntasElaboradasByUsuario(idUsuario:$idUsuario){\n\t\t\t\t\t\t\t    titulo\n\t\t\t\t\t\t\t    descripcion\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t      \n\t\t\t\t\t\t\t\t\n\t\t\t\t}",
            variables: {
                idUsuario: "5ac24c758e4a6a23d4869ac7"
            }
        })).then(function (response) {
            console.log(response);
            expect(response.status).toBe(200);
            expect(response.success).toBe(true);
            done();
        });
    });
    it("Deberia poder ver la cantidad de comentarios elaboradas por un usuario", function (done) {
        self.test(JSON.stringify({
            query: "query getCantidadComentariosElaboradosByUsuario($idUsuario: String){\n\t\t\t\t\t\t\tgetCantidadComentariosElaboradosByUsuario(idUsuario:$idUsuario)\n\t\t\t\t\t\t\t      \n\t\t\t\t\t\t\t\t\n\t\t\t\t}",
            variables: {
                idUsuario: "5ade907216edf832bf53692b"
            }
        })).then(function (response) {
            console.log(response);
            expect(response.status).toBe(200);
            expect(response.success).toBe(true);
            done();
        });
    });
});
//# sourceMappingURL=meritos_usuarios.test.js.map