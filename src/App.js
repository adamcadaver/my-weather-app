import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     favorites: []
    };
  };
  render () {
    return (
      <div className="App">
        <header className="App-header">My Weather App</header>
      </div>
    );
  }
};

export default App;
