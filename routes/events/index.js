const router = require('express').Router();
const mongodb = require('./mongodb.utilis');
const Event = require('../../models/event.model');
const eventService = require('../../utils/event.service');


mongodb.createEventListeners();
mongodb.connect();


router.get('/events', (req,res) => {
  res.status(200).json()
})


module.exports = router;
