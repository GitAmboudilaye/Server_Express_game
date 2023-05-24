const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods.isMatchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
    
}

userSchema.methods.getUserJwt = function(){
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: process.env.JWT_EXPIRE_DATE }
        );

}
const User = mongoose.model('Utilisateurs', userSchema);

module.exports = User;
