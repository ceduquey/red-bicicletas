var Bicicleta = require("../../models/bicicleta");

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