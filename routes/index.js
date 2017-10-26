const router = require('express').Router();
const helpers = require('./helpers');
const userService = require('./user.service');
const mongodb = require('./mongodb.utilis');
const User = require('./user.model');

mongodb.createEventListeners();
mongodb.connect();

router.get('/', (req, res) => {
  res.status(200).send('Please login to the Social Network for Beer!');
});

router.get('/users', (req, res) => {
  userService.fetchAllUsers()
    .then((usersFetched) => {
      res.status(200).json(usersFetched);
    })
    .catch((e) => {
      res.status(500).send(e);
    })
});


router.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  if(!helpers.validateInput(user)) {
    res.status(500).send('Login requires a Username and Password');
  }

  if(!userService.validateUser(user)) {
    res.status(500).send('Invalid Username or Password');
  }

  if(userService.validateUser(user)) {
    res.status(200).send('Welcome to the Social Network for Beer!')
  }

});

router.post('/createUser', (req, res) => {
  const userData = req.body.user;

  if(!helpers.validateCreateUserInput(userData)) {
    res.status(500).send('Creating a new user requires: Firstname, Lastname, Email, Username & Password');
  }

  userService.createNewUser(userData)
    .then((userSaved) => {
      res.status(200).json(userSaved);
    }).catch((e) => {
      res.status(500).send(e);
    })
});


module.exports = router;
