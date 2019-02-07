var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books) {
    res.render("index", { books: books });
  });
});

/* POST create books. */
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect('/books');
  }).catch(function(error){
      res.send(500, error);
  });
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("new-book", {book: Book.build()});
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

/* Edit a existing book */
router.get('/:id/edit', function(req, res, next) {
  Book.findById(req.params.id).then(function(book) {
    if (book) {
      res.redirect("book-detail", {book: book});
    } else {
      res.send(400);
    }
  }).catch(function(error) {
    res.send(500, error);
  });
});

/* Delete article form. */
router.get("/:id/delete", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      res.render("delete");
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/* PUT update book. */
router.put("/:id", function(req, res, next){
  Book.findById(req.params.id).then(function(article){
    if(book) {
      return book.update(req.body);
    } else {
      res.send(404);
    }
  }).then(function(article){
    res.redirect(`/books/${book.id}`);
  }).catch(function(error){
      res.send(500, error);
   });
});

/* DELETE individual article. */
router.delete("/:id/delete", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      return book.destroy();
    } else {
      res.send(404);
    }
  }).then(function(){
    res.redirect("/books");
  }).catch(function(error){
      res.send(500, error);
   });
});


module.exports = router;
