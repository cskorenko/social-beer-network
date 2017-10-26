const router = require('express').Router();
const helpers = require('./helpers');
const mongodb = require('./mongodb.utilis');
const User = require('./user.model');

mongodb.createEventListeners();
mongodb.connect();

router.get('/', (req, res) => {
  res.status(200).send('Please login to the Social Network for Beer!');
});


router.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  if(!helpers.validateUserInfo(user)) {
    res.status(402).send('Invalid Username or Password');
  }

  if(helpers.validateUserInfo(user)) {
    res.status(200).send('Welcome to the Social Network for Beer!')
  }

});


module.exports = router;
