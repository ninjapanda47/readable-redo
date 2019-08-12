import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Card from './components/Card'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <div>
            <Card />
          </div>
        </div>
      </Provider>
    );
  }

}

export default App