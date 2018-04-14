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
//# sourceMappingURL=notificacion.js.map