var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");



describe('Bicicleta API', () =>{
    describe('GET BICICLETAS', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            
            var a = new Bicicleta(1, 'verde', 'rural', [4.701051, -74.042168]);
            Bicicleta.add(a);

            request.get('http://localhost:5000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
            

        });
    });

    describe('POST BICICLETAS/ create', () => {
        it('Status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var a = '{"id": 10, "color":"verde", "modelo" : "montaña", "lat": -34, "lng": -54}'
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: a
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("verde");
                done();
            });            
        });
    });

    describe('POST BICICLETAS/ update', () => {
        it('Status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var a = '{"id": 10, "color":"azul", "modelo" : "ciudad", "lat": -34, "lng": -54}'
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/update',
                body: a
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("azul");
                done();
            });            
        });
    });

    describe('Delete BICICLETAS/ delete', () => {
        it('Status 204', (done) => {
            var headers = {'content-type' : 'application/json'};
            var a = '{"id": 10, "color":"azul", "modelo" : "ciudad", "lat": -34, "lng": -54}'            
            request.delete({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/delete',
                body: a
            }, function(error, response, body){
                expect(response.statusCode).toBe(204);                
                done();
            });            
        });
    });
});