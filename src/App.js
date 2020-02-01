import React from 'react';
import './App.css';

const getLocalFavorites = () => {
  const s = window.localStorage;
  s.clear();
  const favorites = s.getItem('favorites');
  if (favorites === null) {
    s.setItem('favorites', [])
    return [];
  }
};

const FavoriteItem = ({value, isSelected, handleClick}) => {
  let styles = "list-group-item list-group-item-action"
  if (isSelected) {
    styles += " active"
  }
  return (
    <li className={styles} onClick={() => handleClick(value)}>{value}</li>
  );
}

const  FavoritesList = ({items, selected, handleClick}) => {
  if (items === undefined || items.size === 0) {
    return ("No Favorites")
  }
  return (
    <ul className="list-group">
      {Array.from(items).map((zipcode) =>
        <FavoriteItem
          value={zipcode}
          isSelected={zipcode === selected}
          handleClick={handleClick}/>
      )}
    </ul>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // const favorites = getLocalFavorites()
    this.state = {
     favorites: new Set([10010, 12345, 54353]),
     selected: undefined
    };
  };

  handleClick(zipcode) {
    this.setState({
      selected: zipcode
    })
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <h1 className="App-header">My Weather App</h1>
        </div>
        <div className="row">
          <div className="col-sm">
            <div className="row">
              <h2>Favorites</h2>
            </div>
            <div className="row">
              <FavoritesList
                items={this.state.favorites}
                selected={this.state.selected}
                handleClick={(f) => this.handleClick(f)}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="row">
              <input/>
            </div>
            <div className="row">
              Weather for 10010
            </div>
            <div className="row">
              Sunny
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
