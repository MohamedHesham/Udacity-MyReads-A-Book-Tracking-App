import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import Search from './SearchBooks';
import { Link, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // get books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  getBooksWithTheSameShelf(shelfName) {
    return this.state.books.filter((b) => b.shelf === shelfName)
  }

  moveBooksToNewShelf = (book, newShelf) => {
    // send updated data to API
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;

      // compare the id of old and new books, update state
      this.setState(state => ({
        books: this.state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf
                books={this.getBooksWithTheSameShelf("currentlyReading")}
                shelfTitle="Currently Reading"
                moveBooksToNewShelf={this.moveBooksToNewShelf}
              />
              <Shelf
                books={this.getBooksWithTheSameShelf("wantToRead")}
                shelfTitle="Want To Read"
                moveBooksToNewShelf={this.moveBooksToNewShelf}
              />
              <Shelf
                books={this.getBooksWithTheSameShelf("read")}
                shelfTitle="Read"
                moveBooksToNewShelf={this.moveBooksToNewShelf}
              />
            </div>
            <Link
              to='/search'
              className="open-search">
                Add a book
            </Link>
          </div>
        )}/>

        <Route path='/search' render={({history}) => (
          <Search
            books={this.state.books}
            book={this.props.book}
            moveBooksToNewShelf={this.moveBooksToNewShelf}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
