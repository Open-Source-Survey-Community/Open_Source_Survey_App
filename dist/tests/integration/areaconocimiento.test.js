"use strict";

/* eslint-disable quotes,no-undef */

var tester = require('graphql-tester').tester;

describe("Modelo area-conocimiento", function () {
	var self = this;
	self.test = tester({
		url: "http://127.0.0.1:3660/graphtest",
		contentType: "application/json"
	});
	it("deberia poder crear un nuevo area de conocimiento ", function (done) {
		self.test(JSON.stringify({
			query: "mutation crearNuevaAreaConocimiento($etiqueta: conocimiento!){\n\t\t\t\t\t\t\tcrearNuevaAreaConocimiento(etiqueta: $etiqueta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				etiqueta: {
					usuariopropietario: "5ac248c98a3f74223f16895e",
					titulo: "calculo1",
					descripcion: "ejemplo de descripcion de calculo",
					idioma: "es"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaAreaConocimiento.titulo).toMatch(/calculo1/);
			done();
		});

		self.test(JSON.stringify({
			query: "mutation crearNuevaAreaConocimiento($etiqueta: conocimiento!){\n\t\t\t\t\t\t\tcrearNuevaAreaConocimiento(etiqueta: $etiqueta){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				etiqueta: {
					usuariopropietario: "5ac24c758e4a6a23d4869ac7",
					titulo: "geometria2",
					descripcion: "ejemplo de descripcion de  geometria2",
					idioma: "es"
				}
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.crearNuevaAreaConocimiento.titulo).toMatch(/geometria/);
			done();
		});
	});
	it("Deberia no poder editar un area de conocimiento que no he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarAreaConocimientoPregunta($id: String, $titulo: String, \n\t\t\t\t\t\t\t\t$descripcion: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teditarAreaConocimientoPregunta(id: $id, titulo: $titulo, \n\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55975",
				titulo: "ejemplo1",
				descripcion: "ejemplo de descripcion",
				idioma: "en",
				correo: "kevinandresortizmerchan@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			expect(response.errors.length).toBe(1);
			done();
		});
	});
	it("Deberia poder editar un area de conocimiento que he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation editarAreaConocimientoPregunta($id: String, $titulo: String, \n\t\t\t\t\t\t\t\t$descripcion: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teditarAreaConocimientoPregunta(id: $id, titulo: $titulo, \n\t\t\t\t\t\t\t\t\t\t\t\tdescripcion: $descripcion, idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55975",
				titulo: "ejemplo editada",
				descripcion: "ejemplo de descripcioneditada",
				idioma: "en",
				correo: "kevinandresortizmerchan111@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			done();
		});
	});
	it("Deberia no poder eliminar un area de conocimiento que no he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarAreaConocimientoPregunta($id: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teliminarAreaConocimientoPregunta(id: $id,  idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55975",
				idioma: "en",
				correo: "kevinandresortizmerchan@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(false);
			done();
		});
	});

	it("Deberia poder eliminar un area de conocimiento que he creado", function (done) {
		self.test(JSON.stringify({
			query: "mutation eliminarAreaConocimientoPregunta($id: String, $idioma: String!, $correo: String){\n\t\t\t\t\t\t\teliminarAreaConocimientoPregunta(id: $id,  idioma: $idioma, correo: $correo){\n\t\t\t\t\t\t\t\ttitulo\n\t\t\t\t\t\t\t\tdescripcion\n\t\t\t\t\t\t\t\tidioma\n\t\t\t\t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t\t\tcorreo\t\t\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\n\t\t\t\t}",
			variables: {
				id: "5ac79b6e371cfe28edf55976",
				idioma: "en",
				correo: "kevinandresortizmerchan@gmail.com"
			}

		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.eliminarAreaConocimientoPregunta.usuariopropietario.nombre).toMatch(/kevin/);
			done();
		});
	});

	it("Listar todas las areas de conocimiento basadas en un idioma ", function (done) {
		self.test(JSON.stringify({
			query: "query listadoAreaConocimiento($idioma: String){\n\t\t\t\t\t\t\tlistadoAreaConocimiento(idioma: $idioma){\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\t\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				idioma: "es"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.listadoAreaConocimiento.length).toBe(2);
			done();
		});
	});

	it("filtrar todas las areas de conocimiento basadas en un idioma y por un caracter ", function (done) {
		self.test(JSON.stringify({
			query: "query filtrarAreasConocimiento($idioma: String, $caracter: String){\n\t\t\t\t\t\t\tfiltrarAreasConocimiento(idioma: $idioma, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\t\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				caracter: "g",
				idioma: "es"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarAreasConocimiento.length).toBe(1);
			done();
		});
		self.test(JSON.stringify({
			query: "query filtrarAreasConocimiento($idioma: String, $caracter: String){\n\t\t\t\t\t\t\tfiltrarAreasConocimiento(idioma: $idioma, caracter: $caracter){\n\t\t\t\t\t\t\t \t\t\t\t\ttitulo\n\t\t\t\t\t\t\t \t\t\t\t\tdescripcion\t\n\t\t\t\t\t\t\t \t\t\t\t\tusuariopropietario {\n\t\t\t\t\t\t\t \t\t\t\t\t\tnombre\n\t\t\t\t\t\t\t \t\t\t\t\t\tapellido\n\t\t\t\t\t\t\t \t\t\t\t\t\tcorreo\n\t\t\t\t\t\t\t \t\t\t\t\t}\n\t\t\t\t\t\t\t \t\t\t\t}\t\t\t\t\n\t\t\t\t\t\t}",
			variables: {
				caracter: "",
				idioma: "es"
			}
		})).then(function (response) {
			expect(response.status).toBe(200);
			expect(response.success).toBe(true);
			expect(response.data.filtrarAreasConocimiento.length).toBe(2);
			done();
		});
	});
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2ludGVncmF0aW9uL2FyZWFjb25vY2ltaWVudG8udGVzdC5qcyJdLCJuYW1lcyI6WyJ0ZXN0ZXIiLCJyZXF1aXJlIiwiZGVzY3JpYmUiLCJzZWxmIiwidGVzdCIsInVybCIsImNvbnRlbnRUeXBlIiwiaXQiLCJkb25lIiwiSlNPTiIsInN0cmluZ2lmeSIsInF1ZXJ5IiwidmFyaWFibGVzIiwiZXRpcXVldGEiLCJ1c3VhcmlvcHJvcGlldGFyaW8iLCJ0aXR1bG8iLCJkZXNjcmlwY2lvbiIsImlkaW9tYSIsInRoZW4iLCJleHBlY3QiLCJyZXNwb25zZSIsInN0YXR1cyIsInRvQmUiLCJzdWNjZXNzIiwiZGF0YSIsImNyZWFyTnVldmFBcmVhQ29ub2NpbWllbnRvIiwidG9NYXRjaCIsImlkIiwiY29ycmVvIiwiZXJyb3JzIiwibGVuZ3RoIiwiZWxpbWluYXJBcmVhQ29ub2NpbWllbnRvUHJlZ3VudGEiLCJub21icmUiLCJsaXN0YWRvQXJlYUNvbm9jaW1pZW50byIsImNhcmFjdGVyIiwiZmlsdHJhckFyZWFzQ29ub2NpbWllbnRvIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQU1BLFNBQVNDLFFBQVEsZ0JBQVIsRUFBMEJELE1BQXpDOztBQUVBRSxTQUFTLDBCQUFULEVBQXFDLFlBQVc7QUFDL0MsS0FBTUMsT0FBTyxJQUFiO0FBQ0FBLE1BQUtDLElBQUwsR0FBWUosT0FBTztBQUNsQkssT0FBSyxpQ0FEYTtBQUVsQkMsZUFBYTtBQUZLLEVBQVAsQ0FBWjtBQUlBQyxJQUFHLG9EQUFILEVBQXlELFVBQUNDLElBQUQsRUFBVTtBQUNsRUwsT0FDRUMsSUFERixDQUNPSyxLQUFLQyxTQUFMLENBQWU7QUFDcEJDLHVPQURvQjtBQVNwQkMsY0FBVztBQUNWQyxjQUFTO0FBQ1JDLHlCQUFvQiwwQkFEWjtBQUVSQyxhQUFRLFVBRkE7QUFHUkMsa0JBQWEsbUNBSEw7QUFJUkMsYUFBUTtBQUpBO0FBREM7O0FBVFMsR0FBZixDQURQLEVB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LEVBQXdCQyxJQUF4QixDQUE2QixHQUE3QjtBQUNBSCxVQUFPQyxTQUFTRyxPQUFoQixFQUF5QkQsSUFBekIsQ0FBOEIsSUFBOUI7QUFDQUgsVUFBT0MsU0FBU0ksSUFBVCxDQUFjVyx3QkFBZCxDQUF1Q0wsTUFBOUMsRUFBc0RSLElBQXRELENBQTJELENBQTNEO0FBQ0FkO0FBQ0EsR0F2QkY7QUF3QkFMLE9BQ0VDLElBREYsQ0FDT0ssS0FBS0MsU0FBTCxDQUFlO0FBQ3BCQyw4Y0FEb0I7QUFZcEJDLGNBQVc7QUFDVnNCLGNBQVUsRUFEQTtBQUVWakIsWUFBUTtBQUZFO0FBWlMsR0FBZixDQURQLEVBa0JFQyxJQWxCRixDQWtCTyxvQkFBWTtBQUNqQkMsVUFBT0MsU0FBU0MsTUFBaEIsRUFBd0JDLElBQXhCLENBQTZCLEdBQTdCO0FBQ0FILFVBQU9DLFNBQVNHLE9BQWhCLEVBQXlCRCxJQUF6QixDQUE4QixJQUE5QjtBQUNBSCxVQUFPQyxTQUFTSSxJQUFULENBQWNXLHdCQUFkLENBQXVDTCxNQUE5QyxFQUFzRFIsSUFBdEQsQ0FBMkQsQ0FBM0Q7QUFDQWQ7QUFDQSxHQXZCRjtBQXdCQSxFQWpERDtBQW1EQSxDQTVSRCIsImZpbGUiOiJhcmVhY29ub2NpbWllbnRvLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBxdW90ZXMsbm8tdW5kZWYgKi9cblxuY29uc3QgdGVzdGVyID0gcmVxdWlyZSgnZ3JhcGhxbC10ZXN0ZXInKS50ZXN0ZXI7XG5cbmRlc2NyaWJlKFwiTW9kZWxvIGFyZWEtY29ub2NpbWllbnRvXCIsIGZ1bmN0aW9uICgpe1xuXHRjb25zdCBzZWxmID0gdGhpcztcblx0c2VsZi50ZXN0ID0gdGVzdGVyKHtcblx0XHR1cmw6IFwiaHR0cDovLzEyNy4wLjAuMTozNjYwL2dyYXBodGVzdFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHR9KTtcblx0aXQoXCJkZWJlcmlhIHBvZGVyIGNyZWFyIHVuIG51ZXZvIGFyZWEgZGUgY29ub2NpbWllbnRvIFwiLCAoZG9uZSkgPT4ge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBjcmVhck51ZXZhQXJlYUNvbm9jaW1pZW50bygkZXRpcXVldGE6IGNvbm9jaW1pZW50byEpe1xuXHRcdFx0XHRcdFx0XHRjcmVhck51ZXZhQXJlYUNvbm9jaW1pZW50byhldGlxdWV0YTogJGV0aXF1ZXRhKXtcblx0XHRcdFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRldGlxdWV0YTp7XG5cdFx0XHRcdFx0XHR1c3VhcmlvcHJvcGlldGFyaW86IFwiNWFjMjQ4Yzk4YTNmNzQyMjNmMTY4OTVlXCIsXG5cdFx0XHRcdFx0XHR0aXR1bG86IFwiY2FsY3VsbzFcIixcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBcImVqZW1wbG8gZGUgZGVzY3JpcGNpb24gZGUgY2FsY3Vsb1wiLFxuXHRcdFx0XHRcdFx0aWRpb21hOiBcImVzXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmNyZWFyTnVldmFBcmVhQ29ub2NpbWllbnRvLnRpdHVsbykudG9NYXRjaCgvY2FsY3VsbzEvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgbXV0YXRpb24gY3JlYXJOdWV2YUFyZWFDb25vY2ltaWVudG8oJGV0aXF1ZXRhOiBjb25vY2ltaWVudG8hKXtcblx0XHRcdFx0XHRcdFx0Y3JlYXJOdWV2YUFyZWFDb25vY2ltaWVudG8oZXRpcXVldGE6ICRldGlxdWV0YSl7XG5cdFx0XHRcdFx0XHRcdFx0dGl0dWxvXG5cdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGV0aXF1ZXRhOntcblx0XHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbzogXCI1YWMyNGM3NThlNGE2YTIzZDQ4NjlhYzdcIixcblx0XHRcdFx0XHRcdHRpdHVsbzogXCJnZW9tZXRyaWEyXCIsXG5cdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlamVtcGxvIGRlIGRlc2NyaXBjaW9uIGRlICBnZW9tZXRyaWEyXCIsXG5cdFx0XHRcdFx0XHRpZGlvbWE6IFwiZXNcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZSh0cnVlKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLmRhdGEuY3JlYXJOdWV2YUFyZWFDb25vY2ltaWVudG8udGl0dWxvKS50b01hdGNoKC9nZW9tZXRyaWEvKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblx0fSk7XG5cdGl0KFwiRGViZXJpYSBubyBwb2RlciBlZGl0YXIgdW4gYXJlYSBkZSBjb25vY2ltaWVudG8gcXVlIG5vIGhlIGNyZWFkb1wiLCAoZG9uZSkgPT4ge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlZGl0YXJBcmVhQ29ub2NpbWllbnRvUHJlZ3VudGEoJGlkOiBTdHJpbmcsICR0aXR1bG86IFN0cmluZywgXG5cdFx0XHRcdFx0XHRcdFx0JGRlc2NyaXBjaW9uOiBTdHJpbmcsICRpZGlvbWE6IFN0cmluZyEsICRjb3JyZW86IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGVkaXRhckFyZWFDb25vY2ltaWVudG9QcmVndW50YShpZDogJGlkLCB0aXR1bG86ICR0aXR1bG8sIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcGNpb246ICRkZXNjcmlwY2lvbiwgaWRpb21hOiAkaWRpb21hLCBjb3JyZW86ICRjb3JyZW8pe1xuXHRcdFx0XHRcdFx0XHRcdHRpdHVsb1xuXHRcdFx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdFx0aWRpb21hXG5cdFx0XHRcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHRcdFx0YXBlbGxpZG9cblx0XHRcdFx0XHRcdFx0XHRcdGNvcnJlb1x0XHRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZDogXCI1YWM3OWI2ZTM3MWNmZTI4ZWRmNTU5NzVcIixcblx0XHRcdFx0XHR0aXR1bG86IFwiZWplbXBsbzFcIixcblx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlamVtcGxvIGRlIGRlc2NyaXBjaW9uXCIsXG5cdFx0XHRcdFx0aWRpb21hOiBcImVuXCIsXG5cdFx0XHRcdFx0Y29ycmVvOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUoZmFsc2UpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZXJyb3JzLmxlbmd0aCkudG9CZSgxKTtcblx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0fSk7XG5cblxuXHR9KTtcblx0aXQoXCJEZWJlcmlhIHBvZGVyIGVkaXRhciB1biBhcmVhIGRlIGNvbm9jaW1pZW50byBxdWUgaGUgY3JlYWRvXCIsIChkb25lKSA9PiB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVkaXRhckFyZWFDb25vY2ltaWVudG9QcmVndW50YSgkaWQ6IFN0cmluZywgJHRpdHVsbzogU3RyaW5nLCBcblx0XHRcdFx0XHRcdFx0XHQkZGVzY3JpcGNpb246IFN0cmluZywgJGlkaW9tYTogU3RyaW5nISwgJGNvcnJlbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWRpdGFyQXJlYUNvbm9jaW1pZW50b1ByZWd1bnRhKGlkOiAkaWQsIHRpdHVsbzogJHRpdHVsbywgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvbjogJGRlc2NyaXBjaW9uLCBpZGlvbWE6ICRpZGlvbWEsIGNvcnJlbzogJGNvcnJlbyl7XG5cdFx0XHRcdFx0XHRcdFx0dGl0dWxvXG5cdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcGNpb25cblx0XHRcdFx0XHRcdFx0XHRpZGlvbWFcblx0XHRcdFx0XHRcdFx0XHR1c3VhcmlvcHJvcGlldGFyaW8ge1xuXHRcdFx0XHRcdFx0XHRcdFx0bm9tYnJlXG5cdFx0XHRcdFx0XHRcdFx0XHRhcGVsbGlkb1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29ycmVvXHRcdFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkOiBcIjVhYzc5YjZlMzcxY2ZlMjhlZGY1NTk3NVwiLFxuXHRcdFx0XHRcdHRpdHVsbzogXCJlamVtcGxvIGVkaXRhZGFcIixcblx0XHRcdFx0XHRkZXNjcmlwY2lvbjogXCJlamVtcGxvIGRlIGRlc2NyaXBjaW9uZWRpdGFkYVwiLFxuXHRcdFx0XHRcdGlkaW9tYTogXCJlblwiLFxuXHRcdFx0XHRcdGNvcnJlbzogXCJrZXZpbmFuZHJlc29ydGl6bWVyY2hhbjExMUBnbWFpbC5jb21cIlxuXHRcdFx0XHR9XG5cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblxuXG5cblx0fSk7XG5cdGl0KFwiRGViZXJpYSBubyBwb2RlciBlbGltaW5hciB1biBhcmVhIGRlIGNvbm9jaW1pZW50byBxdWUgbm8gaGUgY3JlYWRvXCIsIChkb25lKSA9PiB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYG11dGF0aW9uIGVsaW1pbmFyQXJlYUNvbm9jaW1pZW50b1ByZWd1bnRhKCRpZDogU3RyaW5nLCAkaWRpb21hOiBTdHJpbmchLCAkY29ycmVvOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRlbGltaW5hckFyZWFDb25vY2ltaWVudG9QcmVndW50YShpZDogJGlkLCAgaWRpb21hOiAkaWRpb21hLCBjb3JyZW86ICRjb3JyZW8pe1xuXHRcdFx0XHRcdFx0XHRcdHRpdHVsb1xuXHRcdFx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uXG5cdFx0XHRcdFx0XHRcdFx0aWRpb21hXG5cdFx0XHRcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHRcdFx0YXBlbGxpZG9cblx0XHRcdFx0XHRcdFx0XHRcdGNvcnJlb1x0XHRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdH1gLFxuXHRcdFx0XHR2YXJpYWJsZXM6IHtcblx0XHRcdFx0XHRpZDogXCI1YWM3OWI2ZTM3MWNmZTI4ZWRmNTU5NzVcIixcblx0XHRcdFx0XHRpZGlvbWE6IFwiZW5cIixcblx0XHRcdFx0XHRjb3JyZW86IFwia2V2aW5hbmRyZXNvcnRpem1lcmNoYW5AZ21haWwuY29tXCJcblx0XHRcdFx0fVxuXG5cdFx0XHR9KSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3VjY2VzcykudG9CZShmYWxzZSk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblxuXHR9KTtcblxuXHRpdChcIkRlYmVyaWEgcG9kZXIgZWxpbWluYXIgdW4gYXJlYSBkZSBjb25vY2ltaWVudG8gcXVlIGhlIGNyZWFkb1wiLCAoZG9uZSkgPT4ge1xuXHRcdHNlbGZcblx0XHRcdC50ZXN0KEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0cXVlcnk6IGBtdXRhdGlvbiBlbGltaW5hckFyZWFDb25vY2ltaWVudG9QcmVndW50YSgkaWQ6IFN0cmluZywgJGlkaW9tYTogU3RyaW5nISwgJGNvcnJlbzogU3RyaW5nKXtcblx0XHRcdFx0XHRcdFx0ZWxpbWluYXJBcmVhQ29ub2NpbWllbnRvUHJlZ3VudGEoaWQ6ICRpZCwgIGlkaW9tYTogJGlkaW9tYSwgY29ycmVvOiAkY29ycmVvKXtcblx0XHRcdFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwY2lvblxuXHRcdFx0XHRcdFx0XHRcdGlkaW9tYVxuXHRcdFx0XHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbyB7XG5cdFx0XHRcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0XHRcdGFwZWxsaWRvXG5cdFx0XHRcdFx0XHRcdFx0XHRjb3JyZW9cdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0aWQ6IFwiNWFjNzliNmUzNzFjZmUyOGVkZjU1OTc2XCIsXG5cdFx0XHRcdFx0aWRpb21hOiBcImVuXCIsXG5cdFx0XHRcdFx0Y29ycmVvOiBcImtldmluYW5kcmVzb3J0aXptZXJjaGFuQGdtYWlsLmNvbVwiXG5cdFx0XHRcdH1cblxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmVsaW1pbmFyQXJlYUNvbm9jaW1pZW50b1ByZWd1bnRhLnVzdWFyaW9wcm9waWV0YXJpby5ub21icmUpLnRvTWF0Y2goL2tldmluLyk7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXG5cblxuXHR9KTtcblxuXG5cblxuXG5cblxuXG5cdGl0KFwiTGlzdGFyIHRvZGFzIGxhcyBhcmVhcyBkZSBjb25vY2ltaWVudG8gYmFzYWRhcyBlbiB1biBpZGlvbWEgXCIsIChkb25lKSA9PiB7XG5cdFx0c2VsZlxuXHRcdFx0LnRlc3QoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRxdWVyeTogYHF1ZXJ5IGxpc3RhZG9BcmVhQ29ub2NpbWllbnRvKCRpZGlvbWE6IFN0cmluZyl7XG5cdFx0XHRcdFx0XHRcdGxpc3RhZG9BcmVhQ29ub2NpbWllbnRvKGlkaW9tYTogJGlkaW9tYSl7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dGl0dWxvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0ZGVzY3JpcGNpb25cdFxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdHVzdWFyaW9wcm9waWV0YXJpbyB7XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRub21icmVcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGFwZWxsaWRvXG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0XHRjb3JyZW9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRcdFx0fWAsXG5cdFx0XHRcdHZhcmlhYmxlczoge1xuXHRcdFx0XHRcdGlkaW9tYTogXCJlc1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5saXN0YWRvQXJlYUNvbm9jaW1pZW50by5sZW5ndGgpLnRvQmUoMik7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxuXHRpdChcImZpbHRyYXIgdG9kYXMgbGFzIGFyZWFzIGRlIGNvbm9jaW1pZW50byBiYXNhZGFzIGVuIHVuIGlkaW9tYSB5IHBvciB1biBjYXJhY3RlciBcIiwgKGRvbmUpID0+IHtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgZmlsdHJhckFyZWFzQ29ub2NpbWllbnRvKCRpZGlvbWE6IFN0cmluZywgJGNhcmFjdGVyOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRmaWx0cmFyQXJlYXNDb25vY2ltaWVudG8oaWRpb21hOiAkaWRpb21hLCBjYXJhY3RlcjogJGNhcmFjdGVyKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0YXBlbGxpZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0Y2FyYWN0ZXI6IFwiZ1wiLFxuXHRcdFx0XHRcdGlkaW9tYTogXCJlc1wiXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdWNjZXNzKS50b0JlKHRydWUpO1xuXHRcdFx0XHRleHBlY3QocmVzcG9uc2UuZGF0YS5maWx0cmFyQXJlYXNDb25vY2ltaWVudG8ubGVuZ3RoKS50b0JlKDEpO1xuXHRcdFx0XHRkb25lKCk7XG5cdFx0XHR9KTtcblx0XHRzZWxmXG5cdFx0XHQudGVzdChKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHF1ZXJ5OiBgcXVlcnkgZmlsdHJhckFyZWFzQ29ub2NpbWllbnRvKCRpZGlvbWE6IFN0cmluZywgJGNhcmFjdGVyOiBTdHJpbmcpe1xuXHRcdFx0XHRcdFx0XHRmaWx0cmFyQXJlYXNDb25vY2ltaWVudG8oaWRpb21hOiAkaWRpb21hLCBjYXJhY3RlcjogJGNhcmFjdGVyKXtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHR0aXR1bG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRkZXNjcmlwY2lvblx0XG5cdFx0XHRcdFx0XHRcdCBcdFx0XHRcdFx0dXN1YXJpb3Byb3BpZXRhcmlvIHtcblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdG5vbWJyZVxuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdFx0YXBlbGxpZG9cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0XHRcdGNvcnJlb1xuXHRcdFx0XHRcdFx0XHQgXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0IFx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9YCxcblx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0Y2FyYWN0ZXI6IFwiXCIsXG5cdFx0XHRcdFx0aWRpb21hOiBcImVzXCJcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvQmUoMjAwKTtcblx0XHRcdFx0ZXhwZWN0KHJlc3BvbnNlLnN1Y2Nlc3MpLnRvQmUodHJ1ZSk7XG5cdFx0XHRcdGV4cGVjdChyZXNwb25zZS5kYXRhLmZpbHRyYXJBcmVhc0Nvbm9jaW1pZW50by5sZW5ndGgpLnRvQmUoMik7XG5cdFx0XHRcdGRvbmUoKTtcblx0XHRcdH0pO1xuXHR9KTtcblxufSk7XG4iXX0=