"use strict";

var mongoose = require("mongoose");
var Schame = mongoose.Schema;

var comentarioSchame = new Schame({
	creador: {
		nombre: {
			type: String
		},
		ID: {
			type: String
		}
	},
	contenido: String,
	fecha_creacion: { type: Date, default: Date.now },
	fecha_actualizacion: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	favoritos: { type: Number, default: 0 },
	listaSubComentarios: [{
		type: Schame.Types.ObjectId,
		ref: "comentario"
	}]
});

var Comentario = mongoose.model("comentario", comentarioSchame);

module.exports = Comentario;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9Db21lbnRhcmlvcy5qcyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJTY2hhbWUiLCJTY2hlbWEiLCJjb21lbnRhcmlvU2NoYW1lIiwiY3JlYWRvciIsIm5vbWJyZSIsInR5cGUiLCJTdHJpbmciLCJJRCIsImNvbnRlbmlkbyIsImZlY2hhX2NyZWFjaW9uIiwiRGF0ZSIsImRlZmF1bHQiLCJub3ciLCJmZWNoYV9hY3R1YWxpemFjaW9uIiwibGlrZXMiLCJOdW1iZXIiLCJkaXNsaWtlcyIsImZhdm9yaXRvcyIsImxpc3RhU3ViQ29tZW50YXJpb3MiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwiQ29tZW50YXJpbyIsIm1vZGVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakI7QUFDQSxJQUFNQyxTQUFTRixTQUFTRyxNQUF4Qjs7QUFFQSxJQUFNQyxtQkFBbUIsSUFBSUYsTUFBSixDQUFXO0FBQ25DRyxVQUFRO0FBQ1BDLFVBQU87QUFDTkMsU0FBS0M7QUFEQyxHQURBO0FBSVBDLE1BQUc7QUFDRkYsU0FBS0M7QUFESDtBQUpJLEVBRDJCO0FBU25DRSxZQUFVRixNQVR5QjtBQVVuQ0csaUJBQWUsRUFBRUosTUFBTUssSUFBUixFQUFjQyxTQUFTRCxLQUFLRSxHQUE1QixFQVZvQjtBQVduQ0Msc0JBQW9CLEVBQUVSLE1BQU1LLElBQVIsRUFBY0MsU0FBU0QsS0FBS0UsR0FBNUIsRUFYZTtBQVluQ0UsUUFBTSxFQUFDVCxNQUFNVSxNQUFQLEVBQWVKLFNBQVMsQ0FBeEIsRUFaNkI7QUFhbkNLLFdBQVMsRUFBQ1gsTUFBTVUsTUFBUCxFQUFlSixTQUFTLENBQXhCLEVBYjBCO0FBY25DTSxZQUFVLEVBQUNaLE1BQU1VLE1BQVAsRUFBZUosU0FBUyxDQUF4QixFQWR5QjtBQWVuQ08sc0JBQW9CLENBQUM7QUFDcEJiLFFBQUtMLE9BQU9tQixLQUFQLENBQWFDLFFBREU7QUFFcEJDLE9BQUk7QUFGZ0IsRUFBRDtBQWZlLENBQVgsQ0FBekI7O0FBd0JBLElBQU1DLGFBQWF4QixTQUFTeUIsS0FBVCxDQUFlLFlBQWYsRUFBNEJyQixnQkFBNUIsQ0FBbkI7O0FBRUFzQixPQUFPQyxPQUFQLEdBQWlCSCxVQUFqQiIsImZpbGUiOiJDb21lbnRhcmlvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3QgU2NoYW1lID0gbW9uZ29vc2UuU2NoZW1hO1xuXG5jb25zdCBjb21lbnRhcmlvU2NoYW1lID0gbmV3IFNjaGFtZSh7XG5cdGNyZWFkb3I6e1xuXHRcdG5vbWJyZTp7XG5cdFx0XHR0eXBlOlN0cmluZ1xuXHRcdH0sXG5cdFx0SUQ6e1xuXHRcdFx0dHlwZTpTdHJpbmdcblx0XHR9XG5cdH0sXG5cdGNvbnRlbmlkbzpTdHJpbmcsXG5cdGZlY2hhX2NyZWFjaW9uOnsgdHlwZTogRGF0ZSwgZGVmYXVsdDogRGF0ZS5ub3cgfSxcblx0ZmVjaGFfYWN0dWFsaXphY2lvbjp7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH0sXG5cdGxpa2VzOnt0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDB9LFxuXHRkaXNsaWtlczp7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwfSxcblx0ZmF2b3JpdG9zOnt0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDB9LFxuXHRsaXN0YVN1YkNvbWVudGFyaW9zOlt7XG5cdFx0dHlwZTpTY2hhbWUuVHlwZXMuT2JqZWN0SWQsXG5cdFx0cmVmOlwiY29tZW50YXJpb1wiXG5cdH1dXG59KTtcblxuXG5cblxuY29uc3QgQ29tZW50YXJpbyA9IG1vbmdvb3NlLm1vZGVsKFwiY29tZW50YXJpb1wiLGNvbWVudGFyaW9TY2hhbWUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbWVudGFyaW87Il19