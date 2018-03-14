import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ListShelves from './listShelves';
import SearchBooks from './searchBooks';
import * as BooksAPI from './BooksAPI';
import Shelf from './models/shelf';

class BooksApp extends React.Component {
  state = {
    shelves : []
  }

  componentDidMount() {
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

      })
      .catch((err) => {
        console.log(err);
      });
    }


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
            onSearch = {this.queryBooks}


            />
          )}/>

      </div>
    )
  }
}

export default BooksApp
