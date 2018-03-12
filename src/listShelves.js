import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import BookComponent from './bookComponent';

class ListShelves extends Component {
  static propTypes = {
    shelves : PropTypes.array.isRequired
    // onDeleteContact : PropTypes.func.isRequired
  };

  state = {
    // currentlyReading: [],
    // wantToRead: [],
    // read: []
  }

  // componentDidMount() {
  //
  // }



  render() {
    console.log('my shelves: ', this.props.shelves);

    const {shelves} = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelve) => (
            <div key={shelve.id} className="bookshelf">
              <h2 className="bookshelf-title">{shelve.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelve.books.map((book) => (
                    <li key={book.id}>
                      <BookComponent
                      book = {book}

                      />
                  </li>
                  ))}

                </ol>
              </div>
            </div>
          ))}

        </div>
        <div className="open-search">

        </div>
      </div>


    );
  }
}

export default ListShelves;
