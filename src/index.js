import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { BrowserRouter } from "react-router-dom"
import store from './store'
import { Provider } from 'react-redux'


const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, rootElement);

serviceWorker.unregister();
