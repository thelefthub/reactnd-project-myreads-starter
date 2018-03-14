import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import BookComponent from './bookComponent';

class ListShelves extends Component {
  static propTypes = {
    shelves : PropTypes.array.isRequired,
    onBookMove : PropTypes.func.isRequired
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
    // console.log('my shelves: ', this.props.shelves);

    const {shelves, onBookMove} = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            <div key={shelf.id} className="bookshelf">
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelf.books.map((book) => (
                    <li key={book.id}>
                      <BookComponent
                      book = {book}
                      onBookMove = {onBookMove}
                      />
                  </li>
                  ))}

                </ol>
              </div>
            </div>
          ))}

        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>


    );
  }
}

export default ListShelves;
