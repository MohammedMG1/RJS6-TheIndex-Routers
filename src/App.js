import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";



const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  state = {
    authors: [],
    books: [],
    loading: true,
    error: null
  };

  fetchAllAuthors = async () => {
    const res = await instance.get("/api/authors/");
    return res.data;
  };


  async componentDidMount() {
    try {
      const authors = await this.fetchAllAuthors();
      const books = await this.fetchAllTheBooks()
      this.setState({
        authors: authors,
        books: books,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }

  }
  fetchAllTheBooks = async (books) => {
    try {
      const response = await instance.get("/api/books/");
      const newBooks = response.data;
      return newBooks
    } catch (error) {
      console.log("something went wrong ");
      console.log(error);
      this.setState({ erroe: error });
    }
  };


  getView = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route
            path="/authors/"
            render={props => (
              <AuthorsList {...props} authors={this.state.authors} />
            )}
          />
          <Route
            path="/books/:color?"
            render={props => (
              <BookList {...props} books={this.state.books} />
            )}
          />
          <Route
            path="/books/"
            render={props => (
              <BookList {...props} books={this.state.books} />
            )}
          />

        </Switch>
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar books={this.state.books} />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
