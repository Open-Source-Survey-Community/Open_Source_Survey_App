"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var areasConocimientoSchema = new Schema({
	usuariopropietario: {
		type: Schema.Types.ObjectId,
		ref: "usuario"
	},
	titulo: { type: String, index: true },
	descripcion: { type: String, default: "inexistente" },
	idioma: String
});
areasConocimientoSchema.index({ "titulo": "text" });
var areasConocimiento = mongoose.model("areas-conocimiento", areasConocimientoSchema);
module.exports = areasConocimiento;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9BcmVhQ29ub2NpbWllbnRvLmpzIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsIlNjaGVtYSIsImFyZWFzQ29ub2NpbWllbnRvU2NoZW1hIiwidXN1YXJpb3Byb3BpZXRhcmlvIiwidHlwZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJ0aXR1bG8iLCJTdHJpbmciLCJpbmRleCIsImRlc2NyaXBjaW9uIiwiZGVmYXVsdCIsImlkaW9tYSIsImFyZWFzQ29ub2NpbWllbnRvIiwibW9kZWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjtBQUNBLElBQU1DLFNBQVNGLFNBQVNFLE1BQXhCOztBQUVBLElBQU1DLDBCQUEwQixJQUFJRCxNQUFKLENBQVc7QUFDMUNFLHFCQUFvQjtBQUNuQkMsUUFBTUgsT0FBT0ksS0FBUCxDQUFhQyxRQURBO0FBRW5CQyxPQUFLO0FBRmMsRUFEc0I7QUFLMUNDLFNBQVEsRUFBQ0osTUFBS0ssTUFBTixFQUFjQyxPQUFPLElBQXJCLEVBTGtDO0FBTTFDQyxjQUFhLEVBQUNQLE1BQUtLLE1BQU4sRUFBY0csU0FBUyxhQUF2QixFQU42QjtBQU8xQ0MsU0FBUUo7QUFQa0MsQ0FBWCxDQUFoQztBQVNBUCx3QkFBd0JRLEtBQXhCLENBQThCLEVBQUMsVUFBVSxNQUFYLEVBQTlCO0FBQ0EsSUFBTUksb0JBQW9CZixTQUFTZ0IsS0FBVCxDQUFlLG9CQUFmLEVBQW9DYix1QkFBcEMsQ0FBMUI7QUFDQWMsT0FBT0MsT0FBUCxHQUFpQkgsaUJBQWpCIiwiZmlsZSI6IkFyZWFDb25vY2ltaWVudG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcblxuY29uc3QgYXJlYXNDb25vY2ltaWVudG9TY2hlbWEgPSBuZXcgU2NoZW1hKHtcblx0dXN1YXJpb3Byb3BpZXRhcmlvOiB7XG5cdFx0dHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuXHRcdHJlZjogXCJ1c3VhcmlvXCJcblx0fSxcblx0dGl0dWxvOiB7dHlwZTpTdHJpbmcsIGluZGV4OiB0cnVlfSxcblx0ZGVzY3JpcGNpb246IHt0eXBlOlN0cmluZywgZGVmYXVsdDogXCJpbmV4aXN0ZW50ZVwifSxcblx0aWRpb21hOiBTdHJpbmdcbn0pO1xuYXJlYXNDb25vY2ltaWVudG9TY2hlbWEuaW5kZXgoe1widGl0dWxvXCI6IFwidGV4dFwifSk7XG5jb25zdCBhcmVhc0Nvbm9jaW1pZW50byA9IG1vbmdvb3NlLm1vZGVsKFwiYXJlYXMtY29ub2NpbWllbnRvXCIsYXJlYXNDb25vY2ltaWVudG9TY2hlbWEpO1xubW9kdWxlLmV4cG9ydHMgPSBhcmVhc0Nvbm9jaW1pZW50bztcbiJdfQ==