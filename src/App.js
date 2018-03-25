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
    this.setShelves();
  }

  //set the initial shelf state
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

  //move a book to the supplied shelf
  moveBook = (e, book) => {
    let target = e.target.value;
            // e.persist();
    BooksAPI.update(book, target).then((response) => {
      console.log('response ', response);
      this.updateShelves(book, target);
    })
    .catch((err) => {
      console.log(err);
    });



  }
  //update shelves based on user preferences
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
        }),
        results : prevState.results.map(resultBook => {
          if (resultBook.id === book.id) {
            book.shelf = newShelf;
            return book;
          } else {
            return resultBook;
          }
        })
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
      }),
      results : prevState.results.map(resultBook => {
        if (resultBook.id === book.id) {
          book.shelf = newShelf;
          return book;
        } else {
          return resultBook;
        }
      })
    }));

  }

  //use user input to search books via the BooksAPI
  queryBooks = (e) => {

    // console.log('validate' + e.target.value);
    BooksAPI.search(e.target.value).then((response) => {
      // console.log('queryResponse ', response);
      if (response == null) {
        console.log('Book not found!');
        this.setBookQueryState();
      } else if (response.error) {
        console.log('queryResponse ', response);
        this.setBookQueryState();
      } else {
        this.setBookQueryState(response);
      }

    })
    .catch((err) => {
      console.log('error: ', err);
    });

  }

  //set the correct state after a query
  setBookQueryState = (result) => {
    let results = [];

    if (result != null) {
      results = result.map((book) => {

        let b = new Book(book.id, book.title, book.authors ? book.authors : '', book.imageLinks ? book.imageLinks.thumbnail : null, 'none');

        this.state.shelves.forEach((shelf) => {
          shelf.books.forEach((shelfBook) => {
            if (shelfBook.id === book.id) {
              b.shelf = shelfBook.shelf;
            }
          });
        });
        return b;
      });
    }

    this.setState({results});

  }

  //clear search results on return
  clearResults = () => {
    this.setState({results : []});
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
