var mongoose = require('mongoose');
var Bicicleta = require("../../models/bicicleta");
var request = require("request");
var server = require("../../bin/www");

var base_url = "http://localhost:5000/api/bicicletas";

describe('Bicicleta API', () =>{
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.disconnect();
        mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });

    describe(' GET BICILECTAS /', () => {
        it('Status 200', (done) => {
            Bicicleta.allBicis(( err, bicis ) => {
                expect(bicis.length).toBe(0);
            });

            var aBici = new Bicicleta({code:1, color:"verde", modelo:"urbana"});
            Bicicleta.add(aBici, ( err, newBici) => {
                if (err) console.log(err);
            });
            
            request.get(base_url, (error, response, body) => {                
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe(' POST BICICLETAS /create', () => {
        it('Status 200', (done) => {
            
            var headers = {'content-type' : 'application/json'};
            
            var aBici = '{"code":1, "color":"azul", "modelo":"Urbano", "lat":"11.9432", "lng":"-73.81223"}';

            request.post({
                headers : headers,
                url : base_url + '/create',
                body : aBici
            },
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                Bicicleta.findByCode(1, ( err, bicicleta) => {
                    if ( err) console.log(err);
                    expect(bicicleta.code).toBe(1);
                    done();
                });
                
            });
        
        });
    });

    describe(' UPDATE BICILECTAS /update', () => {
        it('actualizar una bicicleta', (done) => {
            
            var aBici = new Bicicleta({code:1, color:"verde", modelo:"urbana"});
            
            aBici.save(( err, bici ) => {
                if (err) console.log(err);
                
                Bicicleta.findOne({_id:bici._id}, 'code color modelo').exec(( err, bicicleta) => {
                    if ( err ) console.log( err );
                    
                    console.log(bicicleta);
                    
                    var headers = {'content-type' : 'application/json'};
                    var abiciUpdate = '{ "code":1,"color":"Red","modelo":"Urbano","lat": -34, "lng": -54}';

                    console.log(bicicleta);

                    request.post({
                        headers : headers,
                        url : base_url +'/update',
                        body : abiciUpdate
                        
                    },
                    function(error, response, body) {
                        expect(response.statusCode).toBe(200);
                        Bicicleta.findByCode(1, ( err, bicicleta) => {
                            if ( err) console.log(err);
                            expect(bicicleta.code).toBe(1);
                            done();
                        });
                    });

                });
            });        
        });
    });

    describe('Post Bicycle /delete', ()=> {
        it('Status 204', (done)=> {
            var headers = {'content-type' : 'application/json'};
            var bic = new Bicycle({ code: 10, color: "red", model: "urban", location: [18.477770, -69.915592] });
            bic.save();

            request.delete({
                headers: headers,
                url: base_url+'/delete',
                body: '{"code": 10}'
            }, function(error, response, body){
                expect(response.statusCode).toBe(204);
                if (error) console.log(error);
                Bicycle.allBicycles(function(err, bicycles){    
                    if (err) console.log(err);      
                    expect(bicycles.length).toBe(0);

                    done();
                });
            });
        });
    });
});


/*describe('Bicicleta API', () =>{
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
});*/