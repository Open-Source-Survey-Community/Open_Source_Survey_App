"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _nodeAsyncLoop = require("node-async-loop");

var _nodeAsyncLoop2 = _interopRequireDefault(_nodeAsyncLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	Query: {
		getNumeroNotificacionUsuario: function getNumeroNotificacionUsuario(parent, args, _ref) {
			var models = _ref.models;

			models.User.findOne({ _id: args.id }, "notificaciones").populate({
				path: "notificaciones",
				match: {
					leido: false, tipo: args.tipo
				}
			}).then(function (listaNotificaciones) {
				return listaNotificaciones.length;
			}).catch(function (error) {
				if (error) {
					return 0;
				}
			});
		},
		loadListaNotificacionesUsuario: function loadListaNotificacionesUsuario(parent, args, _ref2) {
			var models = _ref2.models;

			models.User.findOne({ _id: args.id }, "notificaciones").populate({ path: "notificaciones",
				match: { tipo: args.tipo },
				populate: {
					path: "usuario_emisor",
					model: "usuario"
				} }).then(function (listaNotificaciones) {
				return listaNotificaciones;
			}).catch(function (error) {
				if (error) {
					return null;
				}
			});
		},
		loadListaNotificacionesMasRecientesNoLeidas: function loadListaNotificacionesMasRecientesNoLeidas(parent, args, _ref3) {
			var models = _ref3.models;

			models.User.find({ _id: args.id }, "notificaciones").populate({ path: "notificaciones",
				match: { leido: false, tipo: args.tipo },
				options: {
					sort: {
						fecha_creacion: "asc"
					},
					limit: 10 },
				populate: {
					path: "usuario_emisor",
					model: "usuario"
				} }).then(function (ArrayNotificaciones) {
				return ArrayNotificaciones;
			}).catch(function (Error) {
				if (Error) {
					return null;
				}
			});
		}
	},
	Mutation: {
		crearNotificacionUsuario: function crearNotificacionUsuario(parent, args, _ref4) {
			var models = _ref4.models;

			models.User.findById(args.idEmisor).then(function (usuario) {
				var notificacionSchema = {
					usuario_emisor: usuario._id,
					tipo: usuario.tipo,
					descripcion: usuario.descripcion
				};
				var notificacion = new models.Notificacion(notificacionSchema);
				notificacion.save().then(function (document) {
					models.User.findByIdAndUpdate(args.idReceptor, {
						$push: {
							"notificaciones": document
						}
					}, {
						upsert: true
					}).then(function () {
						return document;
					}).catch(function (errorActualizacion) {
						return errorActualizacion;
					});
				}).catch(function () {
					return null;
				});
			}).catch(function () {
				return null;
			});
		},
		setAllNotificacionesLikeLeida: function setAllNotificacionesLikeLeida(parent, args, _ref5) {
			var models = _ref5.models;

			models.User.findById(args.id, "notificaciones").populate({
				path: "notificaciones",
				match: {
					tipo: args.tipo,
					leido: false
				}
			}).then(function (arrayNotificaciones) {
				(0, _nodeAsyncLoop2.default)(arrayNotificaciones, function (item, next) {
					models.Notificacion.findByIdAndUpdate(item._id, {
						$set: { leido: true }
					});
					next();
				}, function (error) {
					if (error) {
						return false;
					}
				});
			}).catch(function (Error) {
				if (Error) {
					return false;
				}
			});
		},
		setNotificacionLeida: function setNotificacionLeida(parent, args, _ref6) {
			var models = _ref6.models;

			models.Notificacion.update({ _id: args.idNotificacion, tipo: args.tipo }, { $set: { leido: true } }, { upsert: true, new: true }).then(function (documento) {
				return documento;
			}).catch(function (error) {
				return error;
			});
		}
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Jlc29sdmVycy9ub3RpZmljYWNpb24uanMiXSwibmFtZXMiOlsiUXVlcnkiLCJnZXROdW1lcm9Ob3RpZmljYWNpb25Vc3VhcmlvIiwicGFyZW50IiwiYXJncyIsIm1vZGVscyIsIlVzZXIiLCJmaW5kT25lIiwiX2lkIiwiaWQiLCJwb3B1bGF0ZSIsInBhdGgiLCJtYXRjaCIsImxlaWRvIiwidGlwbyIsInRoZW4iLCJsaXN0YU5vdGlmaWNhY2lvbmVzIiwibGVuZ3RoIiwiY2F0Y2giLCJlcnJvciIsImxvYWRMaXN0YU5vdGlmaWNhY2lvbmVzVXN1YXJpbyIsIm1vZGVsIiwibG9hZExpc3RhTm90aWZpY2FjaW9uZXNNYXNSZWNpZW50ZXNOb0xlaWRhcyIsImZpbmQiLCJvcHRpb25zIiwic29ydCIsImZlY2hhX2NyZWFjaW9uIiwibGltaXQiLCJBcnJheU5vdGlmaWNhY2lvbmVzIiwiRXJyb3IiLCJNdXRhdGlvbiIsImNyZWFyTm90aWZpY2FjaW9uVXN1YXJpbyIsImZpbmRCeUlkIiwiaWRFbWlzb3IiLCJub3RpZmljYWNpb25TY2hlbWEiLCJ1c3VhcmlvX2VtaXNvciIsInVzdWFyaW8iLCJkZXNjcmlwY2lvbiIsIm5vdGlmaWNhY2lvbiIsIk5vdGlmaWNhY2lvbiIsInNhdmUiLCJmaW5kQnlJZEFuZFVwZGF0ZSIsImlkUmVjZXB0b3IiLCIkcHVzaCIsImRvY3VtZW50IiwidXBzZXJ0IiwiZXJyb3JBY3R1YWxpemFjaW9uIiwic2V0QWxsTm90aWZpY2FjaW9uZXNMaWtlTGVpZGEiLCJhcnJheU5vdGlmaWNhY2lvbmVzIiwiaXRlbSIsIm5leHQiLCIkc2V0Iiwic2V0Tm90aWZpY2FjaW9uTGVpZGEiLCJ1cGRhdGUiLCJpZE5vdGlmaWNhY2lvbiIsIm5ldyIsImRvY3VtZW50byJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztrQkFFZTtBQUNkQSxRQUFNO0FBQ0xDLGdDQUE4QixzQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULFFBQTBCO0FBQUEsT0FB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LEVBQTJCeEMsTUFBTVYsS0FBS1UsSUFBdEMsRUFBM0IsRUFBdUUsRUFBQ3FDLE1BQU0sRUFBQ3RDLE9BQU8sSUFBUixFQUFQLEVBQXZFLEVBQTZGLEVBQUNnQyxRQUFRLElBQVQsRUFBZVUsS0FBSyxJQUFwQixFQUE3RixFQUNFeEMsSUFERixDQUNPO0FBQUEsV0FBYXlDLFNBQWI7QUFBQSxJQURQLEVBRUV0QyxLQUZGLENBRVE7QUFBQSxXQUFTQyxLQUFUO0FBQUEsSUFGUjtBQUdBO0FBaEVPO0FBakVLLEMiLCJmaWxlIjoibm90aWZpY2FjaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzeW5jbG9vcCBmcm9tIFwibm9kZS1hc3luYy1sb29wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0UXVlcnk6e1xuXHRcdGdldE51bWVyb05vdGlmaWNhY2lvblVzdWFyaW86IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KT0+e1xuXHRcdFx0bW9kZWxzLlVzZXIuZmluZE9uZSh7X2lkOmFyZ3MuaWR9LCBcIm5vdGlmaWNhY2lvbmVzXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZSh7XG5cdFx0XHRcdFx0cGF0aDpcIm5vdGlmaWNhY2lvbmVzXCIsXG5cdFx0XHRcdFx0bWF0Y2g6e1xuXHRcdFx0XHRcdFx0bGVpZG86IGZhbHNlLCB0aXBvOiBhcmdzLnRpcG9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKGxpc3RhTm90aWZpY2FjaW9uZXM9Pntcblx0XHRcdFx0XHRyZXR1cm4gbGlzdGFOb3RpZmljYWNpb25lcy5sZW5ndGg7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGxvYWRMaXN0YU5vdGlmaWNhY2lvbmVzVXN1YXJpbzogKHBhcmVudCwgYXJncywge21vZGVsc30pPT57XG5cdFx0XHRtb2RlbHMuVXNlci5maW5kT25lKHtfaWQ6IGFyZ3MuaWR9LCBcIm5vdGlmaWNhY2lvbmVzXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZSh7cGF0aDpcIm5vdGlmaWNhY2lvbmVzXCIsXG5cdFx0XHRcdFx0bWF0Y2g6e3RpcG86IGFyZ3MudGlwb30sXG5cdFx0XHRcdFx0cG9wdWxhdGU6IHtcblx0XHRcdFx0XHRcdHBhdGg6IFwidXN1YXJpb19lbWlzb3JcIixcblx0XHRcdFx0XHRcdG1vZGVsOlwidXN1YXJpb1wiXG5cdFx0XHRcdFx0fX0pXG5cdFx0XHRcdC50aGVuKGxpc3RhTm90aWZpY2FjaW9uZXM9Pntcblx0XHRcdFx0XHRyZXR1cm4gbGlzdGFOb3RpZmljYWNpb25lcztcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGVycm9yPT57XG5cdFx0XHRcdFx0aWYgKGVycm9yKXtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblx0XHR9LFxuXHRcdGxvYWRMaXN0YU5vdGlmaWNhY2lvbmVzTWFzUmVjaWVudGVzTm9MZWlkYXM6IChwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KT0+e1xuXHRcdFx0bW9kZWxzLlVzZXIuZmluZCh7X2lkOiBhcmdzLmlkfSxcIm5vdGlmaWNhY2lvbmVzXCIpXG5cdFx0XHRcdC5wb3B1bGF0ZSh7cGF0aDpcIm5vdGlmaWNhY2lvbmVzXCIsXG5cdFx0XHRcdFx0bWF0Y2g6e2xlaWRvOiBmYWxzZSwgdGlwbzogYXJncy50aXBvfSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHNvcnQ6e1xuXHRcdFx0XHRcdFx0XHRmZWNoYV9jcmVhY2lvbjogXCJhc2NcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGxpbWl0OjEwfSxcblx0XHRcdFx0XHRwb3B1bGF0ZToge1xuXHRcdFx0XHRcdFx0cGF0aDogXCJ1c3VhcmlvX2VtaXNvclwiLFxuXHRcdFx0XHRcdFx0bW9kZWw6XCJ1c3VhcmlvXCJcblx0XHRcdFx0XHR9fSlcblx0XHRcdFx0LnRoZW4oQXJyYXlOb3RpZmljYWNpb25lcz0+e1xuXHRcdFx0XHRcdHJldHVybiBBcnJheU5vdGlmaWNhY2lvbmVzO1xuXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChFcnJvciA9PiB7XG5cdFx0XHRcdFx0aWYgKEVycm9yKXtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblxuXG5cdFx0fVxuXHR9LFxuXHRNdXRhdGlvbjp7XG5cdFx0Y3JlYXJOb3RpZmljYWNpb25Vc3VhcmlvOihwYXJlbnQsIGFyZ3MsIHttb2RlbHN9KT0+e1xuXHRcdFx0bW9kZWxzLlVzZXIuZmluZEJ5SWQoYXJncy5pZEVtaXNvcilcblx0XHRcdFx0LnRoZW4odXN1YXJpbz0+e1xuXHRcdFx0XHRcdGxldCBub3RpZmljYWNpb25TY2hlbWEgPSB7XG5cdFx0XHRcdFx0XHR1c3VhcmlvX2VtaXNvciA6IHVzdWFyaW8uX2lkLFxuXHRcdFx0XHRcdFx0dGlwbzogdXN1YXJpby50aXBvLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246IHVzdWFyaW8uZGVzY3JpcGNpb25cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGxldCBub3RpZmljYWNpb24gPSBuZXcgbW9kZWxzLk5vdGlmaWNhY2lvbihub3RpZmljYWNpb25TY2hlbWEpO1xuXHRcdFx0XHRcdG5vdGlmaWNhY2lvbi5zYXZlKClcblx0XHRcdFx0XHRcdC50aGVuKGRvY3VtZW50ID0+IHtcblx0XHRcdFx0XHRcdFx0bW9kZWxzLlVzZXIuZmluZEJ5SWRBbmRVcGRhdGUoYXJncy5pZFJlY2VwdG9yLHtcblx0XHRcdFx0XHRcdFx0XHQkcHVzaDp7XG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5vdGlmaWNhY2lvbmVzXCI6ZG9jdW1lbnRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0se1xuXHRcdFx0XHRcdFx0XHRcdHVwc2VydDogdHJ1ZVxuXHRcdFx0XHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQ7XG5cdFx0XHRcdFx0XHRcdH0pLmNhdGNoKGVycm9yQWN0dWFsaXphY2lvbiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVycm9yQWN0dWFsaXphY2lvbjtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKCgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fSk7XG5cblx0XHR9LFxuXHRcdHNldEFsbE5vdGlmaWNhY2lvbmVzTGlrZUxlaWRhOiAocGFyZW50LCBhcmdzLCB7bW9kZWxzfSk9Pntcblx0XHRcdG1vZGVscy5Vc2VyLmZpbmRCeUlkKGFyZ3MuaWQsXCJub3RpZmljYWNpb25lc1wiKVxuXHRcdFx0XHQucG9wdWxhdGUoe1xuXHRcdFx0XHRcdHBhdGg6IFwibm90aWZpY2FjaW9uZXNcIixcblx0XHRcdFx0XHRtYXRjaDoge1xuXHRcdFx0XHRcdFx0dGlwbzogYXJncy50aXBvLFxuXHRcdFx0XHRcdFx0bGVpZG86IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihhcnJheU5vdGlmaWNhY2lvbmVzPT57XG5cdFx0XHRcdFx0YXN5bmNsb29wKGFycmF5Tm90aWZpY2FjaW9uZXMsIChpdGVtLCBuZXh0KSA9Pntcblx0XHRcdFx0XHRcdG1vZGVscy5Ob3RpZmljYWNpb24uZmluZEJ5SWRBbmRVcGRhdGUoaXRlbS5faWQsIHtcblx0XHRcdFx0XHRcdFx0JHNldDp7bGVpZG86IHRydWV9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdG5leHQoKTtcblx0XHRcdFx0XHR9LChlcnJvcik9Pntcblx0XHRcdFx0XHRcdGlmIChlcnJvcil7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKEVycm9yID0+IHtcblx0XHRcdFx0XHRpZiAoRXJyb3Ipe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0XHRzZXROb3RpZmljYWNpb25MZWlkYTogKHBhcmVudCwgYXJncywge21vZGVsc30pPT57XG5cdFx0XHRtb2RlbHMuTm90aWZpY2FjaW9uLnVwZGF0ZSh7X2lkOiBhcmdzLmlkTm90aWZpY2FjaW9uLCB0aXBvOiBhcmdzLnRpcG99LHskc2V0OiB7bGVpZG86IHRydWV9fSx7dXBzZXJ0OiB0cnVlLCBuZXc6IHRydWV9KVxuXHRcdFx0XHQudGhlbihkb2N1bWVudG8gPT4gZG9jdW1lbnRvKVxuXHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xuXHRcdH1cblx0fVxufTsiXX0=