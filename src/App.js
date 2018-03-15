import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ListShelves from './listShelves';
import SearchBooks from './searchBooks';
import * as BooksAPI from './BooksAPI';
import Shelf from './models/shelf';
import Book from './models/book';

class BooksApp extends React.Component {
  state = {
    shelves : [],
    results : []
  }

  componentDidMount() {
    console.log('hallo')
    this.setShelves();
  }

  setShelves() {
    let currentlyReading = new Shelf('currentlyReading', 'Currently Reading');
    let wantToRead = new Shelf('wantToRead', 'Want To Read');
    let read = new Shelf('read', 'Read');
    let shelves = [];

    BooksAPI.getAll().then((books) => {
      books.map((book) => {
        // console.log(book);
        switch (book.shelf) {
          case 'currentlyReading':
            currentlyReading.addBook(book);
            break;
          case 'wantToRead':
            wantToRead.addBook(book);
            break;
          case 'read':
            read.addBook(book);
            break;
        }
      });
      shelves.push(currentlyReading, wantToRead, read);
      this.setState({shelves});
    });
  }

  moveBook = (e, book) => {
    let target = e.target.value;

    if (target === 'none') {
      alert('Please choose a valid shelf');
    } else {
      // e.persist();
      BooksAPI.update(book, e.target.value).then((response) => {
        console.log('response ', response);
        this.updateShelves(book, target);
      })
      .catch((err) => {
        console.log(err);
      });
    }


  }

  updateShelves = (book, newShelf) => {
    console.log('move ' + book.title + ' from ' + book.shelf + ' to ' + newShelf);
    // add new books
    if (book.shelf === 'none') {
      book.shelf = newShelf;
      this.setState((prevState) => ({
        shelves : prevState.shelves.map(shelf => {
          if (shelf.id === newShelf.id) {
            shelf.addBook(book);
          }
          return shelf;
        })//,
        // results : prevState.results.map(resultBook => {
        //   if (resultBook.id === book.id) {
        //     return book;
        //   } else {
        //     return resultBook;
        //   }
        //
        // })
      }));
    }
    // move existing books
    this.setState((prevState) => ({
      shelves : prevState.shelves.map(shelf => {
        if (shelf.id === book.shelf) {
          shelf.books.map(shelfBook => {
            if (shelfBook.id === book.id) {
              shelfBook.shelf = newShelf;
              shelf.removeBook(book);
            }
            return shelfBook;
          });
        }
        if (shelf.id === newShelf) {
          shelf.addBook(book);
        }
        return shelf;
      })
    }));

  }

  queryBooks = (e) => {
    if (e.key === 'Enter') {
      console.log('validate' + e.target.value);
      BooksAPI.search(e.target.value).then((response) => {
        console.log('queryResponse ', response);
        if (response.error) {
          alert('Book not found!');
        } else {
          this.setBookQueryState(response);
        }

      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  setBookQueryState = (result) => {
    // console.log(result);
    let results = result.map((book) => {
      let b = new Book(book.id, book.title, book.authors, book.imageLinks.thumbnail, 'none');
      this.state.shelves.forEach((shelf) => {
        shelf.books.forEach((shelfBook) => {
          if (shelfBook.id === book.id) {
            b.shelf = shelfBook.shelf;
          }
        });
      });
      return b;
    });
    // console.log('query state', results);
    this.setState({results});

  }

  // is this required???
  clearResults() {
    this.setState = {
    results: []
    };
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListShelves
            shelves = {this.state.shelves}
            onBookMove = {this.moveBook}

            />
          )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            results = {this.state.results}
            onSearch = {this.queryBooks}
            onBookMove = {this.moveBook}
            onClear = {this.clearResults}

            />
          )}/>

      </div>
    );
  }
}

export default BooksApp
