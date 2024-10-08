const { Router } = require('express');
const { registerValidation, loginValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { register, login, protected, logout, getUser} = require('../controllers/auth');
const { userAuth } = require('../middlewares/auth-middleware');
const router = Router();

router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
router.get('/get-user', getUser)

module.exports = router