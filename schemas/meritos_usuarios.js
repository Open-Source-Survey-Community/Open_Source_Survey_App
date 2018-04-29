const meritosUsuario = `
        type Query{
            getCantidadPreguntasElaboradasByUsuario(idUsuario: String):Int
            getListaPreguntasElaboradasByUsuario(idUsuario: String):[Pregunta]
            getCantidadCorreccionesPreguntasElaboradasByUsuario(idUsuario: String):Int
        }
`;

export default meritosUsuario;