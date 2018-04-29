const meritosUsuario = `
        type Query{
            getCantidadPreguntasElaboradasByUsuario(idUsuario: String):Int
            getListaPreguntasElaboradasByUsuario(idUsuario: String):[Pregunta]
        }
`;

export default meritosUsuario;