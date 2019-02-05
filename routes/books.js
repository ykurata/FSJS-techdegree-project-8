var express = require('express');
var router = express.Router();
var Book = require("../modules").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll().then(function() {
    res.render("index", {books: books})
  });
});

module.exports = router;
