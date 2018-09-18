import React, { Component } from 'react';
import PropTypes from "prop-types";

class ShelfChanger extends Component {
  static propTypes = {
     book: PropTypes.object.isRequired,
     moveBooksToNewShelf: PropTypes.func.isRequired
  }

  state = {
    currentShelf: this.props.book.shelf
  }

  moveBooksToNewShelf = (event) => {
    this.props.moveBooksToNewShelf(this.props.book, event.target.value);
    this.setState({ currentShelf: event.target.value });
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select
          value={this.state.currentShelf}
          onChange={this.moveBooksToNewShelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger
