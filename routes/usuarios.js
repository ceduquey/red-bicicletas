var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usarios');

router.get('/', usuarioController.usuario_list);
router.get('/create', usuarioController.create_get);
router.post('/create', usuarioController.create);
router.get('/:id/update', usuarioController.update_get);
router.post('/:id/update', usuarioController.update);
router.post('/:id/delete', usuarioController.delete);

module.exports = router;
