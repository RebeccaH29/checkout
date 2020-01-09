import React, { Component } from 'react';
import './App.css';
import Products from './pages/ProductsPage';
import Cart from './pages/CartPage';

import { Route, Switch } from 'react-router-dom';

import NavBar from './components/Navbar';

class App extends Component {
  
render() {
  return <>
  <NavBar></NavBar>
  <Switch>
    <Route path='/' exact component={Products}/>
    <Route path='/cart' component={Cart}/>
  </Switch>
    <div className="App">
    </div>
    </>
  }
}

export default App;
