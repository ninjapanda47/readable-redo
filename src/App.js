import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Card from './components/Card'
import Add from './components/Add'
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
          <Route path='/addPost' component={Add} />
          <Route
            exact
            path="/"
            render={() => (<Card />)} />
          <Route
            path="/category"
            render={() => (<Card />)} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  posts: state.posts.items
})

export default (connect(mapStateToProps, { fetchPosts })(App))