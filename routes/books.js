var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;


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
  res.render("new-book", {book: Book.build(req.body)});
})


/* POST create books. */
router.post('/', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect('/books');
  }).catch(function(error){
      if (error.name === "SequelizeValidationError"){
        res.render("new-book", {book: Book.build(req.body), errors: error.errors});
      } else {
        throw error;
      }
  }).catch(function(error){
    res.send(500, error);
  });
});


/* Search route */
router.get('/search', (req, res) => {
    var { term } = req.query;
    term = term.toLowerCase();

    Book.findAll({where: {[Op.or]: [
        {
            title: {[Op.like] : '%' + term + '%'}
        },
        {
            author: {[Op.like] : '%' + term + '%'}
        },
        {
            genre: {[Op.like] : '%' + term + '%'}
        },
        {
            year: {[Op.like] : '%' + term + '%'}
        }
    ]}})
        .then(function(books) {
            res.render('search-results', {books: books});
        })
        .catch(function(err) {
          res.send(500, err);
        });
});


/* Get individual book. */
router.get("/:id", function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    if(book) {
      res.render("book-detail", {book: book});
    } else {
      res.render('page-not-found');
    }
  }).catch(function(err){
    res.send(500, err);
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
      if (error.name === "SequelizeValidationError"){
        var book = Book.build(req.body);
        book.id = req.params.id;
        res.render("book-detail", {book: book, errors: error.errors});
      } else {
        throw err;
      }
  }).catch(function(err){
    res.send(500, err);
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
  }).catch(function(err){
    res.send(500, err);
  });
});


module.exports = router;
