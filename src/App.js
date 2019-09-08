import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import AddComment from './components/AddComment'
import Comments from './components/Comments'
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchPosts } from './actions/postActions'

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div className="App">
        <Route component={NavBar} />
        <Switch>
          <Route path='/addPost' component={AddPost} />
          <Route path='/addComment' component={AddComment} />
          <Route path='/comments' component={Comments} />
          <Route
            exact
            path="/"
            component={Posts}
          />
          <Route
            path="/category"
            component={Posts} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  posts: state.posts.items
})

export default (connect(mapStateToProps, { fetchPosts })(App))