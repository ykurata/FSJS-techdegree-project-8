var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books) {
    res.render("index", {books: books});
  });
});

/* POST create books. */
router.post('/new', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect("/books/" + book.id);
  });
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("new-book", {book: {}, title: "New Article"});
});

router.get('/edit', function(req, res, next) {
  res.render("edit");
});

module.exports = router;
