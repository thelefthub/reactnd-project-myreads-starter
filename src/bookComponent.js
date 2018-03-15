import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

class BookComponent extends Component {
  static propTypes = {
    book : PropTypes.object.isRequired,
    onBookMove : PropTypes.func.isRequired
  };


  state = {
    // currentlyReading: [],
    // wantToRead: [],
    // read: []
  }

  render() {
    const {book, onBookMove} = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.image})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => onBookMove(e, book)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }


}

export default BookComponent;
