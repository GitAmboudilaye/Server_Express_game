const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const {sendMail} = require('../utils/senderTest');
const { use } = require('../routes/auth');

let token =""
// @ Desc login
// @ Route 
// @ Access Public
exports.login =  async (req,res)=>{
    const { email, password } = req.body;
    try {
        
        // checking if user exist
        const User = await Users.findOne({"email": email});
        if (!User) {
            return res.send({ success: true, message: "Information is not correct" });
        }

        // Vérifie si le mot de passe est correct
        const isMatch = await User.isMatchPassword(password);

        if (!isMatch) {
            return res.send({ 'success': false, 'message': 'Information is not find ///pwd' });
        }
        //keep user information in token
        const token = User.getUserJwt()
        //"success": true, "token":token
        return res.send({User});
        
    } catch (error) {
        return res.send({ success: false, message: error });
    }
}

// @ Desc register 
// @ Route auth/register
// @ Access Public
exports.register = async (req,res)=>{
    const { email, password, lastName, firstName } = req.body;
    try {
        // Vérifie si l'utilisateur existe
        const user = await Users.findOne({"email": email});
        if ( user) {
            return res.send({ 'success': false, 'message': 'this user already exist' });
        }
        // send user password by email
        const codeSend0 = sendMail(email, lastName)// on a eu un probleme dans l'envoi de email, e vous avais ecrit pour cela.  nous avons donc le ramdon ici pour continuer le tp. 
        console.log("/*****//*****/",codeSend0)
        let codeSend = Math.floor(Math.random() * 90000) + 100000;
        // consert user in token
        //const salt = await bcrypt.genSalt(10);
        //const npassword = await bcrypt.hash(password, salt);
        const filter ={
            "email":email,
            "lastName": lastName,
            "firstName": firstName,
            "codeSend":codeSend,
            "password": password
        }
        const token = jwt.sign({ "user": filter },
            process.env.JWT_SECRET_KEY, 
            { expiresIn: process.env.JWT_EXPIRE_DATE }
            );
            //console.log('**********',email)
        //await User.create(filter);
        res.send({'success': true,"codeSend" : codeSend, 'userSave':token});
    } catch (error) {
        return res.send({ 'success': false, 'message': error });
    }
}


// @ Desc register 
// @ Route auth/register/validate-email
// @ Access Public
exports.validate_email = async (req,res)=>{
    const { email, tokend, codeSend } = req.body;
    try {
        
        // decode user save in tokenFirstR
        //const user = await User.findOne({"email": email});
        // compare if code send by user is same that code save in tokenFirst
        const decodeToken = jwt.verify(tokend, process.env.JWT_SECRET_KEY)
        if(decodeToken.user.codeSend  != codeSend || decodeToken.user.email !=email){
            return res.send({ "success": false, "message": 'Informations are not correct' });
        }
        /*const filterId ={
            '_id': user.id  
        }*/
        const filter ={
            "email": decodeToken.user.email,
            "firstName": decodeToken.user.firstName,
            "lastName": decodeToken.user.lastName,
            "password": decodeToken.user.password
        }
        // Vérifie si l'utilisateur existe
        const user = await Users.findOne({"email": email});
        if(!user){
            await Users.create(filter);
        }
        
        //keep user information in token
        const token = jwt.sign({ "user": filter },
            process.env.JWT_SECRET_KEY, 
            { expiresIn: process.env.JWT_EXPIRE_DATE }
            );
        //const newtoken = user.getUserJwt()
        return res.send({"success": true, "token": token});
        
    } catch (error) {
        return res.send({ 'success': false, 'message': error });
    }
}