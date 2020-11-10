var mongoose = require('mongoose');
var Bicicleta = require("../../models/bicicleta");


describe('Testing bicicletas', function(){
    beforeEach(function(done){        
        var mongoDB = 'mongodb://localhost/testdb';
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

    describe('Bicicleta.createInstance', ()=> {
        it('crea una instancia de Bicicleta', ()=>{
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Bicicleta.allBicis', ()=> {
        it('comienza vacia', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', ()=> {
        it('agrega solo una bici', (done)=>{
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici, function(err, newBici){
                if(err) console.log(err);
                Bicicleta.allBicis(function(err,bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toBe(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', ()=> {
        it('debo devolver una bici con code 1', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici, function(err, newBici){
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "rural"});
                    Bicicleta.add(aBici2, function(err, newBici){
                        if(err) console.log(err);
                        Bicicleta.findByCode(1, function(error, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
                
            });   
        });
    });

    describe('Bicicleta.removeById', ()=>{
        it('debe quedar vacia la lista', (done) =>{
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici, function(err, newBici){
                    if(err) console.log(err);
                    Bicicleta.removeByCode(1, function(error, bicis2){
                        if(err) console.log(err);
                        Bicicleta.allBicis(function(err,bicis){
                            expect(bicis.length).toEqual(0);                            
                            done();
                        });
                    });

                });
            });
        });
    });


});


/*
beforeEach(()=> { 
    Bicicleta.allBicis = []; 
});

describe('Bicicleta.allBicis',() => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [4.701051, -74.042168]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findByid', ()=>{
    it('debe devolver una bici con id 1', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'verde', 'montaña', [4.701051, -74.042168]);
        var b = new Bicicleta(2, 'blanca', 'urbana', [4.694069, -74.033445]);

        Bicicleta.add(a);
        Bicicleta.add(b);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);
    });
});

describe('Bicicleta.removeById', ()=>{
    it('debe quedar vacia la lista', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'verde', 'montaña', [4.701051, -74.042168]);

        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);

        Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});
*/