const nodemailer = require('nodemailer');

exports.sendMail = async (email, lastName)=>{
    console.log(process.env.SMTP_HOST)
    console.log(process.env.SMTP_PORT)
    console.log(process.env.SMTP_AUTH_USER)
    console.log(process.env.SMTP_AUTH_PWS)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.SMTP_AUTH_USER,
                pass: process.env.SMTP_AUTH_PWS
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
             }
        });
        let codetest = Math.floor(Math.random() * 90000) + 100000;
        const infos = await transporter.sendMail({
            form: `"Amboudilaye" <amboudilaye@outlook.com>`,
            to: `${email}`,
            subject: 'Confirmer votre inscription',
            //text: 'M ou Mme ' + lastName + ',\nVotre code de confiration est :\n '+ codetest +'',
            html: `<b style="color:green">Votre code de confirmation est : ${codetest}</b>`
            
        });
        console.log(`Message envoyé avec succès. ID du message : ${infos.messageId}`);
        if (!infos){
            return 
        }
        console.log(codetest)
        

    } catch (error) {
        console.error(`Erreur lors de l'envoi du message : ${error}`);
    }
    
    
    
}