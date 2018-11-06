import React from 'react';

import CartContainer from './containers/CartContainer/CartContainer';
import AddItemContainer from './containers/AddItemContainer/AddItemContainer';
import NotificationContainer
  from './containers/NotificationContainer/NotificationContainer';

import './App.css';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <CartContainer/>
          <AddItemContainer/>
          <NotificationContainer/>
        </div>
    );
  }
}

export default App;
