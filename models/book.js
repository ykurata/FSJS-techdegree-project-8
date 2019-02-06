'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      publishedAt: function() {
        return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
      },
    }    
  });
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
