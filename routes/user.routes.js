const {Router} = require('express')

const {renderSingUpForm, singup,rendersingInForm, singIn, logout} = require('../controllers/users.controllers')

const router = Router()



//render del formulario del registro
router.get('/users/singup', renderSingUpForm)
router.post('/users/singup', singup) // registrarse

//Inicio de sesion
router.get('/users/singin', rendersingInForm )
router.post('/users/singin',singIn)

//Logout
router.get('/users/logout', logout)


module.exports = router