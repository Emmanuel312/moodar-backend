const express = require('express')
const router = express.Router()
const requireDir = require('require-dir')
const controllers = requireDir('./controllers')
const authMiddleware = require('./middlewares/auth')

// authenticacao
router.post('/signup', controllers.authController.signup)
router.post('/signin', controllers.authController.signin)

// authMiddleware
router.use(authMiddleware)

// rotas autenticadas
router.post('/stress/create', controllers.stressController.create)
router.put('/stress/update/:id', controllers.stressController.update)
router.get('/stress/list', controllers.stressController.list)

module.exports = router