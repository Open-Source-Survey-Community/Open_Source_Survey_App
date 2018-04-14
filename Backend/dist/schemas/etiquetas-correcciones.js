"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EtiquetasCorrecciones = "\n\ttype EtiquetaCorrecciones {\n\t\t_id: ID!\n\t\tusuariopropietario: Usuario\n\t\tidioma: String\n\t\tcolor: String\n\t\tdescripcion: String\n\t\tetiqueta: String\n\t\tcategoria: String\n\t}\n\t\n\t\n\ttype Query {\n\t   ## Muestra el listado de etiquetas de correcciones que se han elaborado\n\t   listadoEtiquetasCorrecciones(idioma: String): [EtiquetaCorrecciones]\n\t   ## filtra el listado de etiquetas de correcciones por un caracter o varios caracteres que se ingresa\n\t   filtrarEtiquetasCorrecciones(idioma: String, caracter: String): [EtiquetaCorrecciones]\n\t}\n\t\n\t\n\tinput etiquetaCorreccionesInput {\n\t\tusuariopropietario: ID!\n\t\tidioma: String\n\t\tcolor: String!\n\t\tdescripcion: String\n\t\tetiqueta: String!\n\t\tcategoria: String\n\t}\n\n\ttype Mutation {\n\t\t## Crea una nueva etiqueta de correccion.(este procedimiento es general ) \n\t\tcrearNuevaEtiquetaCorrecciones(etiqueta: etiquetaCorreccionesInput!): EtiquetaCorrecciones\n\t\t## edita una etiqueta de correccion, pero se debe verificar si soy propietario de dicha etiqueta\n\t\t## si algun otro usuario esta usando dicha etiqueta\n\t\t## las edicion se ha hace sobre el modelo de Discusion de Pregunta\t\t\t\t\t\t\t\t\t\n\t\teditarEtiquetaCorrecciontoPregunta(idEtiquetaCorreccion: String, color: String, descripcion: String,\n\t\t\t\t\t\t\t\t\t\t\tetiqueta: String, correoUsuario: String): EtiquetaCorrecciones\n\t\t## elimina una etiqueta de correccion, solamente si soy el creador de dicha etiqueta\n\t\t## solamente puedo eliminar si nadie mas esta usando esa etiqueta en una Pregunta\n\t\teliminarEtiquetaCorreccionPregunta(idEtiquetaCorreccion: String, correoUsuario: String): EtiquetaCorrecciones\n\t\n\t}\n\n\n";

exports.default = EtiquetasCorrecciones;
//# sourceMappingURL=etiquetas-correcciones.js.map