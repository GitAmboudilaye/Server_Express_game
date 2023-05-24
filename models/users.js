const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UtilisateursSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  wins:{
    type: Number,
    default: 0},
  losts:{
    type: Number,
    default: 0
  },
  codeSend:{
    type: Number,
    
  }
});

UtilisateursSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UtilisateursSchema.methods.isMatchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

UtilisateursSchema.methods.getUserJwt = function(){
    return jwt.sign({ email: this.email },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: process.env.JWT_EXPIRE_DATE }
        );

}
const Utilisateurs = mongoose.model('Utilisateurs', UtilisateursSchema);

module.exports = Utilisateurs;
