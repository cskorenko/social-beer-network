module.exports = {
  validateUserInfo
}

function validateUserInfo (userInfo) {
  let userValid = true;

  if(!userInfo.username && !userInfo.password) {
    userValid = false
  }

  if(!userInfo.username > 5 && !userInfo.username < 10) {
    userValid = false
  }

  if(!userInfo.password > 5 && !userInfo.password < 10) {
    userValid = false;
  }

  return userValid;
}
