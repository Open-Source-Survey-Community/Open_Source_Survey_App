"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var discusionPreguntaSchema = new Schema({
	titulo: String,
	identificador: {
		type: Number,
		default: 1
	},
	etiquetas_correcciones: [{
		type: Schema.Types.ObjectId,
		ref: "etiqueta-correcciones"
	}],
	descripcion: String,
	tipo_correccion: [String],
	creador_correccion: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	estado_correccion: [{
		usuario_creador_estado: {
			type: Schema.Types.ObjectId,
			ref: "usuario"
		},
		rol: String,
		asignacion: String,
		observacion: { type: String, default: "any observation was registered" }
	}],
	fecha_creacion: { type: Date, index: true },
	fecha_cierre: { type: Date, index: true },
	comentarios: [{
		type: Schema.Types.ObjectId,
		ref: "comentario"
	}],
	pregunta_ID: {
		type: Schema.Types.ObjectId,
		ref: "pregunta"
	},
	habilitada: {
		type: Boolean, default: true
	}
});

discusionPreguntaSchema.index({ "titulo": "text" });
var discusionPregunta = mongoose.model("discusionPregunta", discusionPreguntaSchema);

module.exports = discusionPregunta;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9kaXNjdXNpb25lc1ByZWd1dGFzLmpzIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsIlNjaGVtYSIsImRpc2N1c2lvblByZWd1bnRhU2NoZW1hIiwidGl0dWxvIiwiU3RyaW5nIiwiaWRlbnRpZmljYWRvciIsInR5cGUiLCJOdW1iZXIiLCJkZWZhdWx0IiwiZXRpcXVldGFzX2NvcnJlY2Npb25lcyIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJkZXNjcmlwY2lvbiIsInRpcG9fY29ycmVjY2lvbiIsImNyZWFkb3JfY29ycmVjY2lvbiIsImVzdGFkb19jb3JyZWNjaW9uIiwidXN1YXJpb19jcmVhZG9yX2VzdGFkbyIsInJvbCIsImFzaWduYWNpb24iLCJvYnNlcnZhY2lvbiIsImZlY2hhX2NyZWFjaW9uIiwiRGF0ZSIsImluZGV4IiwiZmVjaGFfY2llcnJlIiwiY29tZW50YXJpb3MiLCJwcmVndW50YV9JRCIsImhhYmlsaXRhZGEiLCJCb29sZWFuIiwiZGlzY3VzaW9uUHJlZ3VudGEiLCJtb2RlbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCO0FBQ0EsSUFBTUMsU0FBU0YsU0FBU0UsTUFBeEI7O0FBR0EsSUFBTUMsMEJBQTBCLElBQUlELE1BQUosQ0FBVztBQUMxQ0UsU0FBT0MsTUFEbUM7QUFFMUNDLGdCQUFlO0FBQ2RDLFFBQU1DLE1BRFE7QUFFZEMsV0FBUztBQUZLLEVBRjJCO0FBTTFDQyx5QkFBd0IsQ0FBQztBQUN4QkgsUUFBS0wsT0FBT1MsS0FBUCxDQUFhQyxRQURNO0FBRXhCQyxPQUFJO0FBRm9CLEVBQUQsQ0FOa0I7QUFVMUNDLGNBQVlULE1BVjhCO0FBVzFDVSxrQkFBaUIsQ0FBQ1YsTUFBRCxDQVh5QjtBQVkxQ1cscUJBQW1CO0FBQ2xCVCxRQUFLTCxPQUFPUyxLQUFQLENBQWFDLFFBREE7QUFFbEJDLE9BQUk7QUFGYyxFQVp1QjtBQWdCMUNJLG9CQUFrQixDQUFDO0FBQ2xCQywwQkFBdUI7QUFDdEJYLFNBQUtMLE9BQU9TLEtBQVAsQ0FBYUMsUUFESTtBQUV0QkMsUUFBSTtBQUZrQixHQURMO0FBS2xCTSxPQUFJZCxNQUxjO0FBTWxCZSxjQUFZZixNQU5NO0FBT2xCZ0IsZUFBYSxFQUFDZCxNQUFNRixNQUFQLEVBQWVJLFNBQVMsZ0NBQXhCO0FBUEssRUFBRCxDQWhCd0I7QUF5QjFDYSxpQkFBZSxFQUFDZixNQUFNZ0IsSUFBUCxFQUFhQyxPQUFPLElBQXBCLEVBekIyQjtBQTBCMUNDLGVBQWEsRUFBQ2xCLE1BQU1nQixJQUFQLEVBQWFDLE9BQU8sSUFBcEIsRUExQjZCO0FBMkIxQ0UsY0FBWSxDQUFDO0FBQ1puQixRQUFLTCxPQUFPUyxLQUFQLENBQWFDLFFBRE47QUFFWkMsT0FBSTtBQUZRLEVBQUQsQ0EzQjhCO0FBK0IxQ2MsY0FBWTtBQUNYcEIsUUFBS0wsT0FBT1MsS0FBUCxDQUFhQyxRQURQO0FBRVhDLE9BQUk7QUFGTyxFQS9COEI7QUFtQzFDZSxhQUFZO0FBQ1hyQixRQUFNc0IsT0FESyxFQUNJcEIsU0FBUztBQURiO0FBbkM4QixDQUFYLENBQWhDOztBQXlDQU4sd0JBQXdCcUIsS0FBeEIsQ0FBOEIsRUFBQyxVQUFVLE1BQVgsRUFBOUI7QUFDQSxJQUFNTSxvQkFBb0I5QixTQUFTK0IsS0FBVCxDQUFlLG1CQUFmLEVBQW1DNUIsdUJBQW5DLENBQTFCOztBQUVBNkIsT0FBT0MsT0FBUCxHQUFpQkgsaUJBQWpCIiwiZmlsZSI6ImRpc2N1c2lvbmVzUHJlZ3V0YXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcblxuXG5jb25zdCBkaXNjdXNpb25QcmVndW50YVNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuXHR0aXR1bG86U3RyaW5nLFxuXHRpZGVudGlmaWNhZG9yOiB7XG5cdFx0dHlwZTogTnVtYmVyLFxuXHRcdGRlZmF1bHQ6IDFcblx0fSxcblx0ZXRpcXVldGFzX2NvcnJlY2Npb25lczogW3tcblx0XHR0eXBlOlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcblx0XHRyZWY6XCJldGlxdWV0YS1jb3JyZWNjaW9uZXNcIlxuXHR9XSxcblx0ZGVzY3JpcGNpb246U3RyaW5nLFxuXHR0aXBvX2NvcnJlY2Npb246IFtTdHJpbmddLFxuXHRjcmVhZG9yX2NvcnJlY2Npb246e1xuXHRcdHR5cGU6U2NoZW1hLlR5cGVzLk9iamVjdElkLFxuXHRcdHJlZjpcInVzdWFyaW9cIlxuXHR9LFxuXHRlc3RhZG9fY29ycmVjY2lvbjpbe1xuXHRcdHVzdWFyaW9fY3JlYWRvcl9lc3RhZG86e1xuXHRcdFx0dHlwZTpTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG5cdFx0XHRyZWY6XCJ1c3VhcmlvXCJcblx0XHR9LFxuXHRcdHJvbDpTdHJpbmcsXG5cdFx0YXNpZ25hY2lvbjogU3RyaW5nLFxuXHRcdG9ic2VydmFjaW9uOiB7dHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImFueSBvYnNlcnZhdGlvbiB3YXMgcmVnaXN0ZXJlZFwifVxuXHR9XSxcblx0ZmVjaGFfY3JlYWNpb246e3R5cGU6IERhdGUsIGluZGV4OiB0cnVlfSxcblx0ZmVjaGFfY2llcnJlOnt0eXBlOiBEYXRlLCBpbmRleDogdHJ1ZX0sXG5cdGNvbWVudGFyaW9zOlt7XG5cdFx0dHlwZTpTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG5cdFx0cmVmOlwiY29tZW50YXJpb1wiXG5cdH1dLFxuXHRwcmVndW50YV9JRDp7XG5cdFx0dHlwZTpTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG5cdFx0cmVmOlwicHJlZ3VudGFcIlxuXHR9LFxuXHRoYWJpbGl0YWRhOiB7XG5cdFx0dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdHJ1ZVxuXHR9XG59KTtcblxuXG5kaXNjdXNpb25QcmVndW50YVNjaGVtYS5pbmRleCh7XCJ0aXR1bG9cIjogXCJ0ZXh0XCJ9KTtcbmNvbnN0IGRpc2N1c2lvblByZWd1bnRhID0gbW9uZ29vc2UubW9kZWwoXCJkaXNjdXNpb25QcmVndW50YVwiLGRpc2N1c2lvblByZWd1bnRhU2NoZW1hKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkaXNjdXNpb25QcmVndW50YTtcbiJdfQ==