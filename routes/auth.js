const {Router} = require('express'); //Extract to express package

const {register, login, validate_email} = require('../controllers/auth')//get the functions form /controllers/students  
const routerAuth = Router({mergeParams:true});

routerAuth.route('/register').post(register)   
routerAuth.route('/login').post(login)
routerAuth.route('/register/validate_email').post(validate_email)


module.exports = routerAuth;