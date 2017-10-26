module.exports = {
  validateInput,
  validateCreateUserInput
}

function validateInput(object) {
  propertyArray = ["username", "password"];
  if (object.id) {
    return false;
  } else {
    for (property in propertyArray) {
      if (object[propertyArray[property]] === "" || object.hasOwnProperty(propertyArray[property]) === false) {
        return false;
      };
    };
  };
  return true;
}

function validateCreateUserInput(object) {
  propertyArray = ["firstname", "lastname", "email", "username", "password"];
  if (object.id) {
    return false;
  } else {
    for (property in propertyArray) {
      if (object[propertyArray[property]] === "" || object.hasOwnProperty(propertyArray[property]) === false) {
        return false;
      };
    };
  };
  return true;
}
