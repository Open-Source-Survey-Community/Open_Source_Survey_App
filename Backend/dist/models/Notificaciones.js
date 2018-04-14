"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificacionSchema = new Schema({
	usuario_emisor: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	fecha_creacion: {
		type: Date,
		default: Date.now
	},
	tipo: {
		type: String
	},
	descripcion: String,
	leido: { type: Boolean, default: false }

});

var notificaciones = mongoose.model("notificacion", notificacionSchema);

module.exports = notificaciones;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9Ob3RpZmljYWNpb25lcy5qcyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJTY2hlbWEiLCJub3RpZmljYWNpb25TY2hlbWEiLCJ1c3VhcmlvX2VtaXNvciIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwiZmVjaGFfY3JlYWNpb24iLCJEYXRlIiwiZGVmYXVsdCIsIm5vdyIsInRpcG8iLCJTdHJpbmciLCJkZXNjcmlwY2lvbiIsImxlaWRvIiwiQm9vbGVhbiIsIm5vdGlmaWNhY2lvbmVzIiwibW9kZWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjtBQUNBLElBQU1DLFNBQVNGLFNBQVNFLE1BQXhCOztBQUVBLElBQU1DLHFCQUFxQixJQUFJRCxNQUFKLENBQVc7QUFDckNFLGlCQUFlO0FBQ2RDLFFBQUtILE9BQU9JLEtBQVAsQ0FBYUMsUUFESjtBQUVkQyxPQUFJO0FBRlUsRUFEc0I7QUFLckNDLGlCQUFlO0FBQ2RKLFFBQUtLLElBRFM7QUFFZEMsV0FBU0QsS0FBS0U7QUFGQSxFQUxzQjtBQVNyQ0MsT0FBSztBQUNKUixRQUFLUztBQURELEVBVGdDO0FBWXJDQyxjQUFhRCxNQVp3QjtBQWFyQ0UsUUFBTyxFQUFDWCxNQUFNWSxPQUFQLEVBQWdCTixTQUFTLEtBQXpCOztBQWI4QixDQUFYLENBQTNCOztBQWtCQSxJQUFNTyxpQkFBaUJsQixTQUFTbUIsS0FBVCxDQUFlLGNBQWYsRUFBOEJoQixrQkFBOUIsQ0FBdkI7O0FBRUFpQixPQUFPQyxPQUFQLEdBQWlCSCxjQUFqQiIsImZpbGUiOiJOb3RpZmljYWNpb25lcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3QgU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hO1xuXG5jb25zdCBub3RpZmljYWNpb25TY2hlbWEgPSBuZXcgU2NoZW1hKHtcblx0dXN1YXJpb19lbWlzb3I6e1xuXHRcdHR5cGU6U2NoZW1hLlR5cGVzLk9iamVjdElkLFxuXHRcdHJlZjpcInVzdWFyaW9cIlxuXHR9LFxuXHRmZWNoYV9jcmVhY2lvbjp7XG5cdFx0dHlwZTpEYXRlLFxuXHRcdGRlZmF1bHQ6IERhdGUubm93XG5cdH0sXG5cdHRpcG86e1xuXHRcdHR5cGU6U3RyaW5nXG5cdH0sXG5cdGRlc2NyaXBjaW9uOiBTdHJpbmcsXG5cdGxlaWRvOiB7dHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2V9XG5cbn0pO1xuXG5cbmNvbnN0IG5vdGlmaWNhY2lvbmVzID0gbW9uZ29vc2UubW9kZWwoXCJub3RpZmljYWNpb25cIixub3RpZmljYWNpb25TY2hlbWEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmaWNhY2lvbmVzO1xuIl19