import Book from './book';

class Shelf {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.books = [];
  }

  addBook(book) {
    let b = new Book(book.industryIdentifiers[0].identifier, book.title, book.authors, book.imageLinks.thumbnail);
    this.books.push(b);
  }
}

export default Shelf;
