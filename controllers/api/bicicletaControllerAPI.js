var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    Bicicleta.find({}, function(err, bicicletas){
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
}

exports.bicicleta_create = function(req, res){
    var bici = new Bicicleta({
        code:req.body.code, 
        color: req.body.color, 
        modelo: req.body.modelo});

    bici.ubicacion = [req.body.lat, req.body.lng];

    bici.save(function(err){
        res.status(200).json(bici);
    });
}

exports.bicicleta_delete = function(req, res){
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}

exports.bicicleta_update = function(req, res){
    var bici = Bicicleta.findByCode(req.body.code, (err, abici) =>{
        if (err) console.log(err);
        if (abici === null){
            res.status(500).json({message: "Id not found"});
        } else {
            var biciUpdate = {
                code: abici.code,
                color: req.body.color,
                modelo: req.body.modelo
            };
            biciUpdate.ubicacion = [req.body.lat, req.body.lng];

            Bicicleta.updateOne(biciUpdate, (err, result)=>{
                if (err) console.log(err);
                res.status(200).json(result);
            })
        };
    });
}