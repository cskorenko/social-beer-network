const mongodb = require('./mongodb.utilis');
const User = require('./user.model');
const helpers = require('./helpers');

module.exports = {
  validateUser,
  createNewUser
}

function validateUser(currentUser) {
  passwordMatch = false;

  User.find({ username: currentUser.username, password: currentUser.password}).exec()
  .then((userInfo) => {
    if(filterUserArray.length > 0 && (currentUser.password === userRecord.password)) {
      return passwordMatch = true;
    } else {
      return passwordMatch;
    }
  }).catch((e) => {
    throw new Error(`There was an error while trying to validate your user info: ${e}`);
  });
}

function createNewUser(userInfo) {
  User.find({ username: userInfo.username }).exec()
  .then((userResult) => {
    if(userResult && userResult.length > 0) {
      throw new Error ('Username Already Exsists');
    }

    let newUser = new User ({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password
    });

    return newUser.save();
  }).then((savedUser) => {
    return savedUser;
  });

}
