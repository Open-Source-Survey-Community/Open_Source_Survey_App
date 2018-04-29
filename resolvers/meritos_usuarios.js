export default {
    Query:{
        getCantidadPreguntasElaboradasByUsuario:(parent, args, {models})=>{
            return models.Pregunta.count({"usuario_ID": args.idUsuario,"registroActual":true})
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

        },
        getCantidadCorreccionesPreguntasElaboradasByUsuario:(parent, args, {models})=>{
            return models.discusionPregunta.count({"creador_correccion": args.idUsuario,"habilitada":true})
                .then(cantidadDiscusionPreguntasElaboradas =>{
                    return cantidadDiscusionPreguntasElaboradas;
                })
                .catch(error =>{
                    throw new Error(error);
                });
        },
        getListaCorreccionesPreguntasElaboradasByUsuario: (parent, args, {models})=>{
            return models.discusionPregunta.find({"creador_correccion": args.idUsuario,"habilitada":true})
                .populate("etiquetas_correcciones")
                .sort({"fecha_creacion":-1})
                .limit(5)
                .then(listadiscusionPreguntas =>{
                    return listadiscusionPreguntas;
                }).catch(error =>{
                    throw new Error(error);

                });
        },
        getCantidadComentariosElaboradosByUsuario: (parent, args, {models})=>{
            return models.Comentario.count({"creador_comentario": args.idUsuario,"habilitada":true})
                .then(cantidadComentarios=>{
                    return cantidadComentarios;
                }).catch(error =>{
                    throw new Error(error);
                });


        }
    }
};