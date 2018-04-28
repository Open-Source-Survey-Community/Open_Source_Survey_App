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
        }
    }
};