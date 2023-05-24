const User = require('../models/user');
const {saveImage} = require("../utils/saveImage")

// @ Desc get all users 
// @ Route GET/users
// @ Access Private
exports.getUsers = async (req, res) => {
    try {
      //user who is connect, don't use here: only this can acess all users
      const user_id =req.usersId
      const etudiant = await User.find();
      res.send({etudiant});
    } catch (err) {
      console.error(err);
      res.send({ "success": false, "error": 'Server error' });
    }
  };

  // @ Desc get informations of user connect 
  // @ Route GET/users/me
  // @ Access Private
exports.getMe = async (req, res) => {
    try {
      //user who is connect
      const user_id =req.usersId
      const etudiant = await User.findOne({_id : user_id});
      res.send({etudiant });
    } catch (err) {
      console.error(err);
      res.send({ "success": false, "error": err });
    }
  };

  // @ Desc update information of user connect
  // @ Route PUT/users/me
  // @ Access Private     
exports.updateMe = async (req, res) => {
    const { firstName, lastName, password } = req.body;
  
    try {
      //user who is connect
      const user_id =req.usersId
      
      const user = await User.findOne({_id :user_id});

      if (!user) {
        return res.send({ "success": false, "error": 'User not found' });
      }
  
      // Check if password matches
      const isMatch = await user.isMatchPassword(password);
     
      if (!isMatch) {
        return res.send({ 'success': false, 'message': 'Information is not find ///pwd' });
      }
      // using updateOne (second method)
      const filterId ={
        '_id': user_id  
      }
      const filter ={
         firstName,
        lastName,
      }
      const userUpdate = await User.updateOne(filterId, {  $set: filter });


      res.send({ "success": true });
    } catch (err) {
      console.error(err);
      res.send({ "success": false, "error": 'Server error' });
    }
  };

  // @ Desc delete user connect 
  // @ Route DELETE /users/me
  // @ Access Private
exports.deleteMe = async (req, res) => {
    try {
      //user who is connect
      const user_id =req.usersId
      // Check if user exists
      const user = await User.findOne({_id : user_id});
      if (!user) {
        return res.send({ "success": false, "error": 'User not found' });
      }
      // Delete user
      await User.deleteOne({_id : user_id});
  
      res.send({ "success": true });
    } catch (err) {
      console.error(err);
      res.send({ "success": false, "error": err });
    }
  };

  // @ Desc delete user connect 
  // @ Route PUT /users/me/reset-stats
  // @ Access Private
exports.resetStats = async (req, res) => {
    try {
      // Update user stats(using updateOne)
      const user_id =req.usersId
      filter ={
        '_id': user_id  
      }
      const users = await User.updateOne(filter, {  $set: { "wins": 0, "losts" :0 } });
      
      res.send({ "success": true });
    } catch (err) {
      console.error(err);
      res.send({ "success": false, "error": err });
    }
  };
  
  
exports.saveImageProfil = async (req, res) =>{
    const fileName = req.file.originalname;
    const imageBytes = req.file.buffer;
    const filePath = "./ImagePaths/"+fileName;
    saveImage(imageBytes, filePath);
    
    //res.sendFile(filePath)
    res.status(200).send("Image saved successfully");
};

exports.getImageProfil = () =>{

};
