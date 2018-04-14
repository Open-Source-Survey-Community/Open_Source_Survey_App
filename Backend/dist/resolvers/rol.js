"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	Query: {
		verRolUsuario: function verRolUsuario(parent, args, _ref) {
			var models = _ref.models;

			return models.User.findById(args.id).then(function (usuario) {
				var rol = {
					_id: usuario._id,
					rol: usuario.roles[0].rol,
					Acciones: usuario.roles[0].Acciones
				};
				return rol;
			}).catch(function (error) {
				return error;
			});
		}

	},
	Mutation: {
		editarRolUsuario: function editarRolUsuario(parent, args, _ref2) {
			var models = _ref2.models;

			return models.User.findByIdAndUpdate(args.id, { $set: { "roles.0.rol": args.rol, "roles.0.Acciones": args.acciones } }, { upsert: true, new: true }).then(function (usuario) {
				return usuario.roles;
			}).catch(function (error) {
				if (error) {
					return error;
				}
			});
		}
	}
};
//# sourceMappingURL=rol.js.map