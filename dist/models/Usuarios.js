"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
	nombre: {
		type: String,
		default: "WITHOUT NAME",
		index: true
	},
	apellido: {
		type: String,
		default: "WITHOUT LASTNAME"
	},
	correo: {
		type: String,
		default: "nullUsuario@gmail.com"
	},
	urlImage: String,
	wiki: {
		type: String,
		default: "WITHOUT WIKI"
	},
	roles: [{
		rol: {
			type: String,
			default: "usuario"
		},
		Acciones: [{
			type: String,
			default: "crear pregunta, crear cambios de preguntas"
		}]
	}],
	institucion: { type: String, default: "sin definir" },
	grado_academico: { type: String, default: "sin definir" },
	area_academica: { type: String, default: "sin definir" },
	colaboradores: [{
		type: Schema.Types.ObjectId,
		ref: "colaborador"
	}],
	notificaciones: [{
		type: Schema.Types.ObjectId,
		ref: "notificacion"
	}]
});

usuarioSchema.index({ "nombre": "text" });
var Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9Vc3Vhcmlvcy5qcyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJTY2hlbWEiLCJ1c3VhcmlvU2NoZW1hIiwibm9tYnJlIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJpbmRleCIsImFwZWxsaWRvIiwiY29ycmVvIiwidXJsSW1hZ2UiLCJ3aWtpIiwicm9sZXMiLCJyb2wiLCJBY2Npb25lcyIsImluc3RpdHVjaW9uIiwiZ3JhZG9fYWNhZGVtaWNvIiwiYXJlYV9hY2FkZW1pY2EiLCJjb2xhYm9yYWRvcmVzIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsIm5vdGlmaWNhY2lvbmVzIiwiVXN1YXJpbyIsIm1vZGVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakI7QUFDQSxJQUFNQyxTQUFTRixTQUFTRSxNQUF4QjtBQUNBLElBQU1DLGdCQUFnQixJQUFJRCxNQUFKLENBQVc7QUFDaENFLFNBQU87QUFDTkMsUUFBTUMsTUFEQTtBQUVOQyxXQUFTLGNBRkg7QUFHTkMsU0FBTztBQUhELEVBRHlCO0FBTWhDQyxXQUFTO0FBQ1JKLFFBQU1DLE1BREU7QUFFUkMsV0FBUztBQUZELEVBTnVCO0FBVWhDRyxTQUFPO0FBQ05MLFFBQU1DLE1BREE7QUFFTkMsV0FBUztBQUZILEVBVnlCO0FBY2hDSSxXQUFTTCxNQWR1QjtBQWVoQ00sT0FBTTtBQUNMUCxRQUFNQyxNQUREO0FBRUxDLFdBQVM7QUFGSixFQWYwQjtBQW1CaENNLFFBQU0sQ0FBQztBQUNOQyxPQUFJO0FBQ0hULFNBQU1DLE1BREg7QUFFSEMsWUFBUztBQUZOLEdBREU7QUFLTlEsWUFBUyxDQUNSO0FBQ0NWLFNBQUtDLE1BRE47QUFFQ0MsWUFBUztBQUZWLEdBRFE7QUFMSCxFQUFELENBbkIwQjtBQStCaENTLGNBQWEsRUFBQ1gsTUFBTUMsTUFBUCxFQUFlQyxTQUFRLGFBQXZCLEVBL0JtQjtBQWdDaENVLGtCQUFpQixFQUFDWixNQUFNQyxNQUFQLEVBQWVDLFNBQVEsYUFBdkIsRUFoQ2U7QUFpQ2hDVyxpQkFBZ0IsRUFBQ2IsTUFBTUMsTUFBUCxFQUFlQyxTQUFTLGFBQXhCLEVBakNnQjtBQWtDaENZLGdCQUFlLENBQUM7QUFDZmQsUUFBS0gsT0FBT2tCLEtBQVAsQ0FBYUMsUUFESDtBQUVmQyxPQUFJO0FBRlcsRUFBRCxDQWxDaUI7QUFzQ2hDQyxpQkFBZ0IsQ0FBQztBQUNoQmxCLFFBQUtILE9BQU9rQixLQUFQLENBQWFDLFFBREY7QUFFaEJDLE9BQUk7QUFGWSxFQUFEO0FBdENnQixDQUFYLENBQXRCOztBQTRDQW5CLGNBQWNLLEtBQWQsQ0FBb0IsRUFBQyxVQUFVLE1BQVgsRUFBcEI7QUFDQSxJQUFNZ0IsVUFBVXhCLFNBQVN5QixLQUFULENBQWUsU0FBZixFQUF5QnRCLGFBQXpCLENBQWhCOztBQUVBdUIsT0FBT0MsT0FBUCxHQUFpQkgsT0FBakIiLCJmaWxlIjoiVXN1YXJpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcbmNvbnN0IHVzdWFyaW9TY2hlbWEgPSBuZXcgU2NoZW1hKHtcblx0bm9tYnJlOntcblx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0ZGVmYXVsdDogXCJXSVRIT1VUIE5BTUVcIixcblx0XHRpbmRleDogdHJ1ZVxuXHR9LFxuXHRhcGVsbGlkbzp7XG5cdFx0dHlwZTogU3RyaW5nLFxuXHRcdGRlZmF1bHQ6IFwiV0lUSE9VVCBMQVNUTkFNRVwiXG5cdH0sXG5cdGNvcnJlbzp7XG5cdFx0dHlwZTogU3RyaW5nLFxuXHRcdGRlZmF1bHQ6IFwibnVsbFVzdWFyaW9AZ21haWwuY29tXCJcblx0fSxcblx0dXJsSW1hZ2U6U3RyaW5nLFxuXHR3aWtpOiB7XG5cdFx0dHlwZTogU3RyaW5nLFxuXHRcdGRlZmF1bHQ6IFwiV0lUSE9VVCBXSUtJXCJcblx0fSxcblx0cm9sZXM6W3tcblx0XHRyb2w6e1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0ZGVmYXVsdDogXCJ1c3VhcmlvXCJcblx0XHR9LFxuXHRcdEFjY2lvbmVzOltcblx0XHRcdHtcblx0XHRcdFx0dHlwZTpTdHJpbmcsXG5cdFx0XHRcdGRlZmF1bHQ6IFwiY3JlYXIgcHJlZ3VudGEsIGNyZWFyIGNhbWJpb3MgZGUgcHJlZ3VudGFzXCJcblx0XHRcdH1cblx0XHRdXG5cdH1dLFxuXHRpbnN0aXR1Y2lvbjoge3R5cGU6IFN0cmluZywgZGVmYXVsdDpcInNpbiBkZWZpbmlyXCJ9LFxuXHRncmFkb19hY2FkZW1pY286IHt0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6XCJzaW4gZGVmaW5pclwifSxcblx0YXJlYV9hY2FkZW1pY2E6IHt0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IFwic2luIGRlZmluaXJcIn0sXG5cdGNvbGFib3JhZG9yZXM6IFt7XG5cdFx0dHlwZTpTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG5cdFx0cmVmOlwiY29sYWJvcmFkb3JcIlxuXHR9XSxcblx0bm90aWZpY2FjaW9uZXM6IFt7XG5cdFx0dHlwZTpTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG5cdFx0cmVmOlwibm90aWZpY2FjaW9uXCJcblx0fV1cbn0pO1xuXG51c3VhcmlvU2NoZW1hLmluZGV4KHtcIm5vbWJyZVwiOiBcInRleHRcIn0pO1xuY29uc3QgVXN1YXJpbyA9IG1vbmdvb3NlLm1vZGVsKFwidXN1YXJpb1wiLHVzdWFyaW9TY2hlbWEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzdWFyaW87XG4iXX0=