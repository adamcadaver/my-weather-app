import React from 'react';
import './App.css';
import ZipCodeForm from './ZipCodeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // zipcode: '10010'
    };
  };
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <ZipCodeForm zipcode={this.state.zipcode}></ZipCodeForm>
          {this.state.zipcode}
        </header>
      </div>
    );
  }
};

export default App;
