var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books) {
    res.render("index", { books: books });
  }).catch(function(error) {
    res.send(500, error);
  });
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("new-book", {book: Book.build()});
})


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
      res.render('page-not-found');
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* Update book. */
router.post("/:id", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      return book.update(req.body);
    } else {
      res.render('page-not-found');
    }
  }).then(function(){
    res.redirect('/books');
  }).catch(function(error){
      res.send(500, error);
  });
});

/* DELETE individual article. */
router.post("/:id/delete", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      return book.destroy();
    } else {
      res.render('page-not-found');
    }
  }).then(function(){
    res.redirect("/books");
  }).catch(function(error){
      res.send(500, error);
  });
});


module.exports = router;
