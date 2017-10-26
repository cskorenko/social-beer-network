const mongodb = require('./mongodb.utilis');
const User = require('./user.model');
const helpers = require('./helpers');

module.exports = {
  fetchAllUsers,
  validateUser,
  createNewUser
}

function fetchAllUsers() {
  return User.find({}).exec();
}


function validateUser(currentUser) {
  passwordMatch = false;

  User.find({ username: currentUser.username, password: currentUser.password}).exec()
  .then((userInfo) => {
    if(userInfo.password === currentUser.password) {
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
      if(userResult.username === userInfo.username) {
        throw new Error ('Username Already Exisits')
      }
    })
    .catch((e) => {
      throw new Error(`There was an error while trying to validate your user info: ${e}`);
    });

  let newUser = new User ({
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
    email: userInfo.email,
    username: userInfo.username,
    password: userInfo.password
  });

  newUser.save();

  return User.find({ username: newUser.username }).exec();

}
