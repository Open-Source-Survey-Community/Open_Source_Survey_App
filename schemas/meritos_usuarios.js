const meritosUsuario = `
        type Query{
            getCantidadPreguntasElaboradasByUsuario(idUsuario: String):Int
            getListaPreguntasElaboradasByUsuario(idUsuario: String):[Pregunta]
            getCantidadCorreccionesPreguntasElaboradasByUsuario(idUsuario: String):Int
            getListaCorreccionesPreguntasElaboradasByUsuario(idUsuario: String):[DiscusionPregunta]
            getCantidadComentariosElaboradosByUsuario(idUsuario: String): Int
        }
`;

export default meritosUsuario;