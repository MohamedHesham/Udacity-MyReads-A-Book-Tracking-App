import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book.js';
import PropTypes from "prop-types";

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBooksToNewShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    booksFromSearch: [],
    searchResult: false
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    if (query.trim()) {
      // search for books that match your query
      BooksAPI.search(query, 20).then((books) => {
        if (books.length > 0) {
          // check if searched books are also on the main page: if yes - assign them the appropriate shelves, if no - assign them "none" shelf
          books.forEach((book, index) => {
            let currentBook = this.props.books.find((b) => b.id === book.id);
            book.shelf = currentBook ? currentBook.shelf : 'none';
            books[index] = book;
          })

          this.setState({ booksFromSearch: books })
        } else {
          // if there are no matching results, set searchResult as true to show info "No search results!"
          this.setState({ booksFromSearch: [], searchResult: true })
        }
      })
    // if there is no query, do not show anything
    } else this.setState({ booksFromSearch: [], searchResult: false })
  }

  render() {
    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link
              to='/'
              className="close-search">
                Close
            </Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            { this.state.booksFromSearch.length > 0 &&
              <ol className="books-grid">
                {this.state.booksFromSearch.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      moveBooksToNewShelf={this.props.moveBooksToNewShelf}
                    />
                  </li>
                ))}
              </ol>
            }
            { this.state.searchResult === true &&
              <p>No search results!</p>
            }
          </div>
        </div>
    )
  }
}

export default Search
