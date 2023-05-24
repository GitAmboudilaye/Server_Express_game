const {Router} = require('express'); //Extract to express package
const {protected} = require('../middlewares/auth')
const {getUsers, getMe, updateMe, deleteMe, resetStats,saveImageProfil} = require('../controllers/users')//get the functions form /controllers/users  
const routerUser = Router({mergeParams:true});

const multer = require('multer');

// Créer une instance de middleware multer pour gérer les fichiers entrants
const upload = multer();
//const upload = multer({ dest: 'uploads/' }); //personnaliser l'emplacement temporaire

    
routerUser.route('/').get(protected, getUsers)
routerUser.route('/me').get(protected, getMe)
routerUser.route('/me').put(protected, updateMe)
routerUser.route('/me').delete(protected, deleteMe)
routerUser.route('/me/rest_stats').put(protected, resetStats)
routerUser.route('/me').post(upload.single("file"), saveImageProfil)
//routerUser.route('/me').post(protected,upload.single("file"), saveImageProfil)

module.exports = routerUser;