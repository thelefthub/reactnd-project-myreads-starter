import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ListShelves from './listShelves';
import * as BooksAPI from './BooksAPI';
import Shelf from './models/shelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
    shelves : []
  }

  componentDidMount() {
    this.setShelves();
  }

  setShelves() {
    let currentlyReading = new Shelf(1, 'Currently Reading');
    let wantToRead = new Shelf(2, 'Want To Read');
    let read = new Shelf(3, 'Read');
    let shelves = [];

    BooksAPI.getAll().then((books) => {
      books.map((book) => {
        console.log(book.shelf);
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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListShelves
            shelves = {this.state.shelves}

            />
          )}/>

      </div>
    )
  }
}

export default BooksApp
