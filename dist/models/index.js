"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Usuarios = require("./Usuarios");

var _Usuarios2 = _interopRequireDefault(_Usuarios);

var _Notificaciones = require("./Notificaciones");

var _Notificaciones2 = _interopRequireDefault(_Notificaciones);

var _Colaboradores = require("./Colaboradores");

var _Colaboradores2 = _interopRequireDefault(_Colaboradores);

var _discusionesEncuestas = require("./discusionesEncuestas");

var _discusionesEncuestas2 = _interopRequireDefault(_discusionesEncuestas);

var _discusionesPregutas = require("./discusionesPregutas");

var _discusionesPregutas2 = _interopRequireDefault(_discusionesPregutas);

var _Encuestas = require("./Encuestas");

var _Encuestas2 = _interopRequireDefault(_Encuestas);

var _Preguntas = require("./Preguntas");

var _Preguntas2 = _interopRequireDefault(_Preguntas);

var _Comentarios = require("./Comentarios");

var _Comentarios2 = _interopRequireDefault(_Comentarios);

var _preguntasValidadas = require("./preguntasValidadas");

var _preguntasValidadas2 = _interopRequireDefault(_preguntasValidadas);

var _AreaConocimiento = require("./AreaConocimiento");

var _AreaConocimiento2 = _interopRequireDefault(_AreaConocimiento);

var _EtiquetasCorrecciones = require("./EtiquetasCorrecciones");

var _EtiquetasCorrecciones2 = _interopRequireDefault(_EtiquetasCorrecciones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	User: _Usuarios2.default,
	Notificacion: _Notificaciones2.default,
	Colaborador: _Colaboradores2.default,
	areasConocimiento: _AreaConocimiento2.default,
	discusionEncuesta: _discusionesEncuestas2.default,
	discusionPregunta: _discusionesPregutas2.default,
	Encuesta: _Encuestas2.default,
	Pregunta: _Preguntas2.default,
	Comentario: _Comentarios2.default,
	preguntasValidas: _preguntasValidadas2.default,
	etiquetaCorrecciones: _EtiquetasCorrecciones2.default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJVc2VyIiwiTm90aWZpY2FjaW9uIiwiQ29sYWJvcmFkb3IiLCJhcmVhc0Nvbm9jaW1pZW50byIsImRpc2N1c2lvbkVuY3Vlc3RhIiwiZGlzY3VzaW9uUHJlZ3VudGEiLCJFbmN1ZXN0YSIsIlByZWd1bnRhIiwiQ29tZW50YXJpbyIsInByZWd1bnRhc1ZhbGlkYXMiLCJldGlxdWV0YUNvcnJlY2Npb25lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ2RBLHlCQURjO0FBRWRDLHVDQUZjO0FBR2RDLHFDQUhjO0FBSWRDLDhDQUpjO0FBS2RDLGtEQUxjO0FBTWRDLGlEQU5jO0FBT2RDLDhCQVBjO0FBUWRDLDhCQVJjO0FBU2RDLGtDQVRjO0FBVWRDLCtDQVZjO0FBV2RDO0FBWGMsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyIGZyb20gXCIuL1VzdWFyaW9zXCI7XG5pbXBvcnQgTm90aWZpY2FjaW9uIGZyb20gXCIuL05vdGlmaWNhY2lvbmVzXCI7XG5pbXBvcnQgQ29sYWJvcmFkb3IgZnJvbSBcIi4vQ29sYWJvcmFkb3Jlc1wiO1xuaW1wb3J0IGRpc2N1c2lvbkVuY3Vlc3RhIGZyb20gXCIuL2Rpc2N1c2lvbmVzRW5jdWVzdGFzXCI7XG5pbXBvcnQgZGlzY3VzaW9uUHJlZ3VudGEgZnJvbSBcIi4vZGlzY3VzaW9uZXNQcmVndXRhc1wiO1xuaW1wb3J0IEVuY3Vlc3RhIGZyb20gXCIuL0VuY3Vlc3Rhc1wiO1xuaW1wb3J0IFByZWd1bnRhIGZyb20gXCIuL1ByZWd1bnRhc1wiO1xuaW1wb3J0IENvbWVudGFyaW8gZnJvbSBcIi4vQ29tZW50YXJpb3NcIjtcbmltcG9ydCBwcmVndW50YXNWYWxpZGFzIGZyb20gXCIuL3ByZWd1bnRhc1ZhbGlkYWRhc1wiO1xuaW1wb3J0IGFyZWFzQ29ub2NpbWllbnRvIGZyb20gXCIuL0FyZWFDb25vY2ltaWVudG9cIjtcbmltcG9ydCBldGlxdWV0YUNvcnJlY2Npb25lcyBmcm9tIFwiLi9FdGlxdWV0YXNDb3JyZWNjaW9uZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRVc2VyLFxuXHROb3RpZmljYWNpb24sXG5cdENvbGFib3JhZG9yLFxuXHRhcmVhc0Nvbm9jaW1pZW50byxcblx0ZGlzY3VzaW9uRW5jdWVzdGEsXG5cdGRpc2N1c2lvblByZWd1bnRhLFxuXHRFbmN1ZXN0YSxcblx0UHJlZ3VudGEsXG5cdENvbWVudGFyaW8sXG5cdHByZWd1bnRhc1ZhbGlkYXMsXG5cdGV0aXF1ZXRhQ29ycmVjY2lvbmVzXG59OyJdfQ==