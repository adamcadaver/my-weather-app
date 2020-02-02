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
     selected: undefined,
     query: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleSubmit(event) {
    this.handleClick(this.state.query)
    event.preventDefault();
  }

  handleClick(zipcode) {
    this.setState({
      selected: zipcode,
      query: ''
    })
}

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  render () {
    const subTitle = this.state.selected ? `Weather for ${this.state.selected}`: '';
    return (
      <div className="container">
        <div className="row">
          <h1 className="App-header">My Weather App</h1>
        </div>
      <div className="row">
          <div className="col-sm-3">
            <div className="row">
              <h2>Favorites</h2>
            </div>
            <div className="row">
              <FavoritesList
                items={this.state.favorites}
                selected={this.state.selected}
                handleClick={this.handleClick}
              />
            </div>
          </div>
          <div className="col-sm">
              <div className="row">
                <form>
                  <input type="number" name='zipcodeInput' value={this.state.query} onChange={this.handleChange}/>
                  <button type="submit" name="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
              </div>
              <div className="row">
                <h3>{subTitle}</h3>
              </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
