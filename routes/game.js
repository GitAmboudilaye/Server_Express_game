const {Router} = require('express'); //Extract to express package
const {protected} = require('../middlewares/auth')
const {addWin, addLost} = require('../controllers/games')//get the functions form /controllers/users  
const routerGame = Router({mergeParams:true});


    
routerGame.route('/wins').post(protected, addWin)
routerGame.route('/losts').post(protected, addLost)

module.exports = routerGame;