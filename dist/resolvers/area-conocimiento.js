"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	Query: {
		listadoAreaConocimiento: function listadoAreaConocimiento(parent, args, _ref) {
			var models = _ref.models;

			return models.areasConocimiento.find({ idioma: args.idioma }).populate("usuariopropietario").then(function (listaArasConocimientos) {
				return listaArasConocimientos;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		filtrarAreasConocimiento: function filtrarAreasConocimiento(parent, args, _ref2) {
			var models = _ref2.models;

			return models.areasConocimiento.find({ titulo: new RegExp(args.caracter, "i"), idioma: args.idioma }).populate("usuariopropietario").then(function (listaAreasConocimiento) {
				return listaAreasConocimiento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		}

	},
	Mutation: {
		crearNuevaAreaConocimiento: function crearNuevaAreaConocimiento(parent, args, _ref3) {
			var models = _ref3.models;

			var area = new models.areasConocimiento(args.etiqueta);
			return area.save().then(function (documento) {
				return documento;
			}).catch(function (error) {
				if (error) {
					throw new Error(error);
				}
			});
		},
		editarAreaConocimientoPregunta: function editarAreaConocimientoPregunta(parent, args, _ref4) {
			var models = _ref4.models;

			return models.areasConocimiento.findOne({ _id: args.id }).populate("usuariopropietario").then(function (documento) {
				if (documento.usuariopropietario.correo !== args.correo) {
					if (args.idioma === "es") {
						throw new Error("no puede editar esta etiqueta porque usted no es el propietario");
					} else if (args.idioma === "en") {
						throw new Error("you can not edit this tag because you are not the own! ");
					}
				} else {
					return models.Pregunta.count({ areaconocimiento: args.id }).then(function (numeroEtiquetasConocimiento) {
						if (numeroEtiquetasConocimiento > 0) {
							if (args.idioma === "en") {
								throw new Error(numeroEtiquetasConocimiento + "questions have these tag!");
							} else if (args.idioma === "es") {
								throw new Error(numeroEtiquetasConocimiento + "preguntas estan usando determinada etiqueta");
							}
						} else {
							return models.areasConocimiento.findByIdAndUpdate(args.id, { $set: { titulo: args.titulo, descripcion: args.descripcion, idioma: args.idioma } }, { new: true }).populate("usuariopropietario").then(function (documento) {
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
			});
		},
		eliminarAreaConocimientoPregunta: function eliminarAreaConocimientoPregunta(parent, args, _ref5) {
			var models = _ref5.models;

			return models.areasConocimiento.findOne({ _id: args.id }).populate("usuariopropietario").then(function (documento) {
				if (documento.usuariopropietario.correo !== args.correo) {
					if (args.idioma === "es") {
						throw new Error("no puede eliminar esta etiqueta porque usted no es el propietario");
					} else if (args.idioma === "en") {
						throw new Error("you can not delete this tag because you are not the own! ");
					}
				} else {
					return models.Pregunta.count({ areaconocimiento: args.id }).then(function (numeroEtiquetasConocimiento) {
						if (numeroEtiquetasConocimiento > 0) {
							if (args.idioma === "en") {
								throw new Error(numeroEtiquetasConocimiento + "questions having these tag!");
							} else if (args.idioma === "es") {
								throw new Error(numeroEtiquetasConocimiento + "preguntas estan usando determinada etiqueta");
							}
						} else {
							return models.areasConocimiento.findByIdAndRemove(args.id).populate("usuariopropietario").then(function (documento) {
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
			});
		}
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Jlc29sdmVycy9hcmVhLWNvbm9jaW1pZW50by5qcyJdLCJuYW1lcyI6WyJRdWVyeSIsImxpc3RhZG9BcmVhQ29ub2NpbWllbnRvIiwicGFyZW50IiwiYXJncyIsIm1vZGVscyIsImFyZWFzQ29ub2NpbWllbnRvIiwiZmluZCIsImlkaW9tYSIsInBvcHVsYXRlIiwidGhlbiIsImxpc3RhQXJhc0Nvbm9jaW1pZW50b3MiLCJjYXRjaCIsImVycm9yIiwiRXJyb3IiLCJmaWx0cmFyQXJlYXNDb25vY2ltaWVudG8iLCJ0aXR1bG8iLCJSZWdFeHAiLCJjYXJhY3RlciIsImxpc3RhQXJlYXNDb25vY2ltaWVudG8iLCJNdXRhdGlvbiIsImNyZWFyTnVldmFBcmVhQ29ub2NpbWllbnRvIiwiYXJlYSIsImV0aXF1ZXRhIiwic2F2ZSIsImRvY3VtZW50byIsImVkaXRhckFyZWFDb25vY2ltaWVudG9QcmVndW50YSIsImZpbmRPbmUiLCJfaWQiLCJpZCIsInVzdWFyaW9wcm9waWV0YXJpbyIsImNvcnJlbyIsIlByZWd1bnRhIiwiY291bnQiLCJhcmVhY29ub2NpbWllbnRvIiwibnVtZXJvRXRpcXVldGFzQ29ub2NpbWllbnRvIiwiZmluZEJ5SWRBbmRVcGRhdGUiLCIkc2V0IiwiZGVzY3JpcGNpb24iLCJuZXciLCJlbGltaW5hckFyZWFDb25vY2ltaWVudG9QcmVndW50YSIsImZpbmRCeUlkQW5kUmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNkQSxRQUFPO0FBQ05DLDJCQUF5QixpQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULFFBQTRCO0FBQUEsT0FBWkMsTUFBWSxRQUFaQSxNQUFZOztBQUNwRCxVQUFPQSxPQUFPQyxpQkFBUCxDQUF5QkMsSUFBekIsQ0FBOEIsRUFBQ0MsUUFBUUosS0FBS0ksTUFBZCxFQUE5QixFQUNMQyxRQURLLENBQ0ksb0JBREosRUFFTEMsSUFGSyxDQUVBLGtDQUEwQjtBQUMvQixXQUFPQyxzQkFBUDtBQUNBLElBSkssRUFL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LENBQWxDLEVBQXFDO0FBQ3BDLFdBQUkvQixLQUFLSSxNQUFMLEtBQWdCLElBQXBCLEVBQTBCO0FBQ3pCLGNBQU0sSUFBSU0sS0FBSixDQUFVcUIsOEJBQThCLDZCQUF4QyxDQUFOO0FBQ0EsUUFGRCxNQUdLLElBQUkvQixLQUFLSSxNQUFMLEtBQWdCLElBQXBCLEVBQXlCO0FBQzdCLGNBQU0sSUFBSU0sS0FBSixDQUFVcUIsOEJBQThCLDZDQUF4QyxDQUFOO0FBRUE7QUFDRCxPQVJELE1BUU87QUFDTixjQUFPOUIsT0FBT0MsaUJBQVAsQ0FBeUJtQyxpQkFBekIsQ0FBMkNyQyxLQUFLeUIsRUFBaEQsRUFBb0RwQixRQUFwRCxDQUE2RCxvQkFBN0QsRUFDTEMsSUFESyxDQUNBLHFCQUFhO0FBQ2xCLGVBQU9lLFNBQVA7QUFDQSxRQUhLLEVBR0hiLEtBSEcsQ0FHRyxpQkFBUztBQUNqQixZQUFJQyxLQUFKLEVBQVc7QUFDVixlQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0E7QUFDRCxRQVBLLENBQVA7QUFRQTtBQUNELE1BcEJLLEVBb0JIRCxLQXBCRyxDQW9CRyxpQkFBUztBQUNqQixVQUFJQyxLQUFKLEVBQVc7QUFDVixhQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0E7QUFDRCxNQXhCSyxDQUFQO0FBeUJBO0FBQ0QsSUFyQ0ssQ0FBUDtBQXVDQTtBQWpHUTtBQTlCSSxDIiwiZmlsZSI6ImFyZWEtY29ub2NpbWllbnRvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuXHRRdWVyeToge1xuXHRcdGxpc3RhZG9BcmVhQ29ub2NpbWllbnRvOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vZGVscy5hcmVhc0Nvbm9jaW1pZW50by5maW5kKHtpZGlvbWE6IGFyZ3MuaWRpb21hfSlcblx0XHRcdFx0LnBvcHVsYXRlKFwidXN1YXJpb3Byb3BpZXRhcmlvXCIpXG5cdFx0XHRcdC50aGVuKGxpc3RhQXJhc0Nvbm9jaW1pZW50b3MgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBsaXN0YUFyYXNDb25vY2ltaWVudG9zO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRmaWx0cmFyQXJlYXNDb25vY2ltaWVudG86IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KSA9PiB7XG5cdFx0XHRyZXR1cm4gbW9kZWxzLmFyZWFzQ29ub2NpbWllbnRvLmZpbmQoe3RpdHVsbzogbmV3IFJlZ0V4cChhcmdzLmNhcmFjdGVyLFwiaVwiKSwgaWRpb21hOiBhcmdzLmlkaW9tYX0pXG5cdFx0XHRcdC5wb3B1bGF0ZShcInVzdWFyaW9wcm9waWV0YXJpb1wiKVxuXHRcdFx0XHQudGhlbihsaXN0YUFyZWFzQ29ub2NpbWllbnRvID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbGlzdGFBcmVhc0Nvbm9jaW1pZW50bztcblx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSk7XG5cblx0XHR9XG5cblx0fSxcblx0TXV0YXRpb246IHtcblx0XHRjcmVhck51ZXZhQXJlYUNvbm9jaW1pZW50bzogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdGNvbnN0IGFyZWEgPSBuZXcgbW9kZWxzLmFyZWFzQ29ub2NpbWllbnRvKGFyZ3MuZXRpcXVldGEpO1xuXHRcdFx0cmV0dXJuIGFyZWEuc2F2ZSgpXG5cdFx0XHRcdC50aGVuKGRvY3VtZW50byA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50bztcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGVkaXRhckFyZWFDb25vY2ltaWVudG9QcmVndW50YTogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuYXJlYXNDb25vY2ltaWVudG8uZmluZE9uZSh7X2lkOiBhcmdzLmlkfSkucG9wdWxhdGUoXCJ1c3VhcmlvcHJvcGlldGFyaW9cIilcblx0XHRcdFx0LnRoZW4oZG9jdW1lbnRvID0+IHtcblx0XHRcdFx0XHRpZiAoZG9jdW1lbnRvLnVzdWFyaW9wcm9waWV0YXJpby5jb3JyZW8gIT09IGFyZ3MuY29ycmVvKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXJncy5pZGlvbWEgPT09IFwiZXNcIikge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBwdWVkZSBlZGl0YXIgZXN0YSBldGlxdWV0YSBwb3JxdWUgdXN0ZWQgbm8gZXMgZWwgcHJvcGlldGFyaW9cIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGFyZ3MuaWRpb21hID09PSBcImVuXCIpIHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IGNhbiBub3QgZWRpdCB0aGlzIHRhZyBiZWNhdXNlIHlvdSBhcmUgbm90IHRoZSBvd24hIFwiKTtcblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLlByZWd1bnRhLmNvdW50KHthcmVhY29ub2NpbWllbnRvOiBhcmdzLmlkIH0pXG5cdFx0XHRcdFx0XHRcdC50aGVuKG51bWVyb0V0aXF1ZXRhc0Nvbm9jaW1pZW50byA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG51bWVyb0V0aXF1ZXRhc0Nvbm9jaW1pZW50byA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChhcmdzLmlkaW9tYSA9PT0gXCJlblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihudW1lcm9FdGlxdWV0YXNDb25vY2ltaWVudG8gKyBcInF1ZXN0aW9ucyBoYXZlIHRoZXNlIHRhZyFcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChhcmdzLmlkaW9tYSA9PT0gXCJlc1wiKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKG51bWVyb0V0aXF1ZXRhc0Nvbm9jaW1pZW50byArIFwicHJlZ3VudGFzIGVzdGFuIHVzYW5kbyBkZXRlcm1pbmFkYSBldGlxdWV0YVwiKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmFyZWFzQ29ub2NpbWllbnRvLmZpbmRCeUlkQW5kVXBkYXRlKGFyZ3MuaWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHskc2V0OiB7dGl0dWxvOiBhcmdzLnRpdHVsbywgZGVzY3JpcGNpb246IGFyZ3MuZGVzY3JpcGNpb24sIGlkaW9tYTogYXJncy5pZGlvbWF9fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0e25ldzogdHJ1ZX0pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5wb3B1bGF0ZShcInVzdWFyaW9wcm9waWV0YXJpb1wiKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihkb2N1bWVudG8gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb2N1bWVudG87XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0fSxcblx0XHRlbGltaW5hckFyZWFDb25vY2ltaWVudG9QcmVndW50YTogKHBhcmVudCwgYXJncywge21vZGVsc30pID0+IHtcblx0XHRcdHJldHVybiBtb2RlbHMuYXJlYXNDb25vY2ltaWVudG8uZmluZE9uZSh7X2lkOiBhcmdzLmlkfSkucG9wdWxhdGUoXCJ1c3VhcmlvcHJvcGlldGFyaW9cIilcblx0XHRcdFx0LnRoZW4oZG9jdW1lbnRvID0+IHtcblx0XHRcdFx0XHRpZiAoZG9jdW1lbnRvLnVzdWFyaW9wcm9waWV0YXJpby5jb3JyZW8gIT09IGFyZ3MuY29ycmVvKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXJncy5pZGlvbWEgPT09IFwiZXNcIikge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBwdWVkZSBlbGltaW5hciBlc3RhIGV0aXF1ZXRhIHBvcnF1ZSB1c3RlZCBubyBlcyBlbCBwcm9waWV0YXJpb1wiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYoYXJncy5pZGlvbWEgPT09IFwiZW5cIikge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3UgY2FuIG5vdCBkZWxldGUgdGhpcyB0YWcgYmVjYXVzZSB5b3UgYXJlIG5vdCB0aGUgb3duISBcIik7XG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZGVscy5QcmVndW50YS5jb3VudCh7YXJlYWNvbm9jaW1pZW50bzogYXJncy5pZCB9KVxuXHRcdFx0XHRcdFx0XHQudGhlbihudW1lcm9FdGlxdWV0YXNDb25vY2ltaWVudG8gPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChudW1lcm9FdGlxdWV0YXNDb25vY2ltaWVudG8gPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoYXJncy5pZGlvbWEgPT09IFwiZW5cIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IobnVtZXJvRXRpcXVldGFzQ29ub2NpbWllbnRvICsgXCJxdWVzdGlvbnMgaGF2aW5nIHRoZXNlIHRhZyFcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChhcmdzLmlkaW9tYSA9PT0gXCJlc1wiKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKG51bWVyb0V0aXF1ZXRhc0Nvbm9jaW1pZW50byArIFwicHJlZ3VudGFzIGVzdGFuIHVzYW5kbyBkZXRlcm1pbmFkYSBldGlxdWV0YVwiKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9kZWxzLmFyZWFzQ29ub2NpbWllbnRvLmZpbmRCeUlkQW5kUmVtb3ZlKGFyZ3MuaWQpLnBvcHVsYXRlKFwidXN1YXJpb3Byb3BpZXRhcmlvXCIpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGRvY3VtZW50byA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50bztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHR9XG5cdH1cbn07Il19