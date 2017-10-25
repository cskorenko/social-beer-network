const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the Social Network for Beer!');
});

router.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  

});


module.exports = router;
