var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis((err, usuarios) => {
        //console.log(usuarios);
        res.render('bicicletas/index', {bicis :usuarios});
    });
    
}

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
    
    
    //console.log(req.body);

    // var bici = new Bicicleta(req.body.id,req.body.color,req.body.modelo);
    // bici.ubicacion = [req.body.lat, req.body.lng];
    
    var aBici = {
        "code": req.body.id,
        "color": req.body.color,
        "modelo": req.body.modelo,
        "ubicacion": [req.body.lat,req.body.lng]
    };

    Bicicleta.add(aBici,(err) => {
        if (err) return console.log(err);
        console.log('bicicleta created')
        res.redirect('/bicicletas');
    });

}

exports.bicicleta_update_get = function(req, res) {
    var bici = Bicicleta.findByCode(req.params.id);
    res.render('bicicletas/update',{bici});
}

exports.bicicleta_update_post = function(req, res) {
    
    var bici = Bicicleta.findByCode(req.params.id);

    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas');
}


exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeByCode(req.body.id);
    res.redirect('/bicicletas');

}
