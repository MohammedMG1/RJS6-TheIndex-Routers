import React, { Component } from "react";

import BookTable from "./BookTable";
import SearchBar from "./SearchBar";

class BookList extends Component {
    state = {
        filteredBooks: this.props.books
    };

    filterBooks = query => {
        query = query.toLowerCase();
        let filteredBooks = this.props.books.filter(book =>
            `${book.title}  ${book.color} `.toLowerCase().includes(query)
        );
        this.setState({ filteredBooks: filteredBooks });
    };
    render() {
        const color = this.props.match.params.color;
        let books = this.state.filteredBooks;

        if (color) {
            books = books.filter(book => book.color === color);
        }

        return (
            <div>
                <h3>Books</h3>
                <SearchBar onChange={this.filterBooks} />
                <BookTable books={books} />
                {/* <div className="row">{bookRow}</div> */}
            </div>
        );
    }
}

export default BookList;