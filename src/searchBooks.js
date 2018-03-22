import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import BookComponent from './bookComponent';

class SearchBooks extends Component {
  static propTypes = {
    results : PropTypes.array.isRequired,
    onSearch : PropTypes.func.isRequired
  };

  state = {
    // results: []
    // wantToRead: [],
    // read: []
  }

  // componentDidMount() {
  //
  // }



  render() {
    const {results, onSearch, onBookMove, onClear} = this.props;


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={onSearch} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((book) => (
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


    );
  }
}

export default SearchBooks;
