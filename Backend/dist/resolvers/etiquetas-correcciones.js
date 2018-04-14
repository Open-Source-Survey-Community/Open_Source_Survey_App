"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	Query: {},
	Mutation: {
		crearNuevaEtiquetaCorrecciones: function crearNuevaEtiquetaCorrecciones(parent, args, _ref) {
			var models = _ref.models;

			return models.etiquetaCorrecciones.findOne({ etiqueta: { $regex: new RegExp(args.etiqueta.etiqueta, "i") } }).then(function (etiqueta) {
				if (etiqueta) {
					throw new Error("this tag already exist in the collection");
				} else {
					var etiquetaCorrecciones = new models.etiquetaCorrecciones(args.etiqueta);
					return etiquetaCorrecciones.save().then(function (documento) {
						return documento;
					}).catch(function (error) {
						if (error) {
							throw new Error(error);
						}
					});
				}
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}

	}

};
//# sourceMappingURL=etiquetas-correcciones.js.map