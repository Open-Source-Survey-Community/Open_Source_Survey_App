export default {
    Query:{
        getCantidadPreguntasElaboradasByUsuario:(parent, args, {models})=>{
            return models.Pregunta.count({"usuario_ID": args.idUsuario})
                .then(cantidadPreguntasElaboradas =>{
                    return cantidadPreguntasElaboradas;
                })
                .catch(error =>{
                   throw new Error(error);
                });
        },
        getListaPreguntasElaboradasByUsuario: (parent, args, {models})=>{
                return models.Pregunta.find({"usuario_ID": args.idUsuario,"registroActual":true})
                    .populate("areaconocimiento")
                    .sort({"fecha_creacion":-1})
                    .limit(5)
                    .then(listaPreguntas =>{
                        return listaPreguntas;
                    }).catch(error =>{
                        throw new Error(error);

                    });

        }
    }
};