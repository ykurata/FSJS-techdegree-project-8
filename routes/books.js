var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books) {
    res.render("index", { books: books });
  });
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("new-book", {book: Book.build()});
});


/* POST create books. */
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect('/books');
  }).catch(function(error){
      res.send(500, error);
  });
});


// /* Get individual book. */
router.get("/:id", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      res.render("book-detail", {book: book});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* PUT update book. */
router.post("/:id", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    return book.update(req.body);
  }).then(function(book){
    res.redirect('/books/' + book.id);
  }).catch(function(error){
      res.send(500, error);
  });
});

/* DELETE individual article. */
router.post("/:id/delete", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    return book.destroy();
  }).then(function(){
    res.redirect("/books");
  }).catch(function(error){
      res.send(500, error);
  });
});


module.exports = router;
