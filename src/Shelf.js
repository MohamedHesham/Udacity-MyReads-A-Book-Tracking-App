import React from 'react';
import Book from './Book.js';
import PropTypes from "prop-types";

const Shelf = (props) => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  moveBooksToNewShelf={props.moveBooksToNewShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
}

Shelf.propTypes = {
  moveBooksToNewShelf: PropTypes.func.isRequired
}

export default Shelf
