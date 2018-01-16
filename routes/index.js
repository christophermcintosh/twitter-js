
module.exports = function(io) {

const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');



router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true });
});

router.get('/users/:name', function (req, res) {
    let name = req.params.name;
    let list = tweetBank.find( { name: name });
    res.render( 'index', { tweets: list });
  });

  router.get('/tweets/:id', function (req, res) {
    let id = Number(req.params.id);
    let list = tweetBank.find( { id: id });
    res.render( 'index', { tweets: list });
  }); 
  
  router.post('/tweets', function(req, res) {
      console.log(req.body);
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
  });
  return router;
}