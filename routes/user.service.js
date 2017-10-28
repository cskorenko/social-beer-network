const mongodb = require('./mongodb.utilis');
const User = require('./user.model');
const helpers = require('./helpers');

module.exports = {
  fetchAllUsers,
  validateUser,
  createNewUser,
  deleteUserById
}

function fetchAllUsers() {
  return User.find({}).exec();
}


function validateUser(currentUser) {
  passwordMatch = false;

  return User.find({ username: currentUser.username }).exec()
  .then((userInfo) => {
    let userData = userInfo[0];

    if(currentUser.password === userData.password) {
      return passwordMatch = true;
    } else {
      return passwordMatch;
    }
  })
  .then((result) => {
    const infoToReturn = result;
    return infoToReturn;
  })

}

function createNewUser(userInfo) {
  return User.find({ username: userInfo.username }).exec()
    .then((userResult) => {
      let userVerify = userResult[0]

      if(userVerify === undefined) {
        let newUser = new User ({
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
          username: userInfo.username,
          password: userInfo.password
        });
        return newUser.save();
      } else if(userVerify.username === userInfo.username) {
        return 'Username Already Exists';
      }
    })
}

function deleteUserById (userIdToDelete) {
  return User.findByIdAndRemove(userIdToDelete);
}
