import React, { Component } from 'react';
import ShelfChanger from "./ShelfChanger";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
      book: PropTypes.object.isRequired,
      moveBooksToNewShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, moveBooksToNewShelf } = this.props

    // set black image for books with no cover
    const cover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/180px-Black_colour.jpg"

    return (
      <div>
        <div id={book.id} className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}></div>
            <ShelfChanger
              book={book}
              moveBooksToNewShelf={moveBooksToNewShelf}
          />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </div>
    )
  }
}

export default Book
