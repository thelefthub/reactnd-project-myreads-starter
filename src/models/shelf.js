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
      let b = new Book(book.id, book.title, book.authors ? book.authors : '', book.imageLinks ? book.imageLinks.thumbnail : null, book.shelf);
      this.books.push(b);
    }

  }

  removeBook(book) {
    this.books = this.books.filter(shelfBook => shelfBook.id !== book.id);
  }
}

export default Shelf;
