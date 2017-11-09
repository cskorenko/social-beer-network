const mongodb = require('./mongodb.utilis');
const Author = require('./author.model');
const Book = require('./book.model');
const helpers = require('./helpers');

module.exports = {
  fetchAllAuthors,
  fetchAllBooks,
  fetchAuthorByFirstname,
  fetchAuthorByLastname,
  fetchBookByTitle,
  createNewAuthor,
  createNewBook,
  updateBook
}

function fetchAllAuthors () {
  return Author.find({}).populate('books').exec();
}

function fetchAllBooks() {
  return Book.find({}).populate('author').exec();
}

function fetchAuthorByFirstname(firstname) {
  return Author.find({ firstname: firstname }).populate('books').exec();
}

function fetchAuthorByLastname(lastname) {
  return Author.find({ lastname: lastname }).populate('books').exec();
}

function fetchBookByTitle(title) {
  return Book.find({ title: title }).populate('author').exec();
}

function createNewAuthor(authorToSave) {
  if(helpers.varifyAuthor(authorToSave) === false) {
    throw new Error('invalid author submission');
  }

  let bookInfo;
  let authorInfo;
  return Book.find({ title: authorToSave.books.title }).exec()
    .then((bookResult) => {
      if(bookResult && bookResult.length > 0) {
        return bookResult[0];
      } else {
        let book = new Book ({
          title: authorToSave.books.title,
        });
        return book.save();
      }
    })
    .then((foundBook) => {
      bookInfo = foundBook;
      let author = new Author ({
        firstname: authorToSave.firstname,
        lastname: authorToSave.lastname,
        books: bookInfo._id
      });
      return author.save();
    })
    .then((authorSaved) => {
      authorInfo = authorSaved;
      bookInfo.author = authorSaved._id;
      console.log(bookInfo);
      return bookInfo.save();
    })
    .then((updatedBookInfo) => {
      const infoToReturn = {
        author: authorInfo,
        books: updatedBookInfo
      }
      return infoToReturn;
    });
}

function createNewBook(bookToSave) {

  // if(helpers.varifyBook(title) === false) {
  //   throw new Error('invalid book submission');
  // }
  let authorInfo;
  let bookInfo;
  return Author.find({ firstname: bookToSave.author.firstname, lastname: bookToSave.author.lastname }).exec()
    .then((authorResult) => {
      if(authorResult && authorResult.length > 0) {
        return authorResult[0];
      } else {
        let author = new Author ({
          firstname: bookToSave.author.firstname,
          lastname: bookToSave.author.lastname,
        });
        return author.save();
      }
    })
    .then((foundAuthor) => {
      authorInfo = foundAuthor;
      let book = new Book ({
        title: bookToSave.title,
        author: authorInfo._id
      });
      return book.save();
    })
    .then((bookSaved) => {
      bookInfo = bookSaved;
      authorInfo.books.push(bookSaved._id);
      return authorInfo.save();
    })
    .then((updatedAuthorInfo) => {
      const infoToReturn = {
        author: updatedAuthorInfo,
        books: bookInfo
      }
      return infoToReturn;
    })
}

function updateBook(bookToUpdate) {

  Book.findById(bookToUpdate.id).populate('author').exec()
    .then((bookResult) => {
      bookResult.title = bookToUpdate.title;
      return bookResult.save();
    })
    .then((updatedBookInfo) => {
      const infoToReturn = {
        book: updatedBookInfo
      }
      return infoToReturn;
    });
}
