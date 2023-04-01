/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Login de un usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check(  'password',
            'El password es obligatorio y con longitud minima de 6 caracteres')
            .isLength({min:6}),
    validarCampos
 ], login);


 router.post('/google', [
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos
 ], googleSignIn);

 module.exports = router;