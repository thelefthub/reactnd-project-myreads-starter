import Book from './book';

class Shelf {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.books = [];
  }

  addBook(book) {
    if (book instanceof Book) {
      this.books.push(book);
    } else {
      let b = new Book(book.id, book.title, book.authors, book.imageLinks.thumbnail, book.shelf);
      this.books.push(b);
    }

  }

  removeBook(book) {
    let index = this.books.indexOf(book);
    if (index > -1) {
    this.books.splice(index, 1);
}
  }
}

export default Shelf;
