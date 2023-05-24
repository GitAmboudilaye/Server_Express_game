const User = require('../models/user');

// @ Desc add win
// @ Route POST/game/win
// @ Access Private
exports.addWin = async (req, res) => {
    try {
      //user who is connect, don't use here: only this can acess all users
      const user_id =req.usersId
      filter ={
        _id: user_id  
      }
      const users = await User.updateOne(filter, { $inc: { "wins": 1 } });
      res.send({ "success": true });
    } catch (err) {         
      console.error(err);
      res.send({ "success": false, "error": 'Server error' });
    }
  };
// @ Desc get all users 
// @ Route POST/game/lost
// @ Access Private
exports.addLost = async (req, res) => {
    try {
      //
      const user_id =req.usersId
      filter ={
        '_id': user_id  
      }
      const users = await User.updateOne(filter, { $inc: { "losts": 1 } });
      res.send({ "success": true });
    } catch (err) {
      console.error(err);
      res.send({ "success": false, "error": err });
    }
  };