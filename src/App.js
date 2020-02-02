import React from "react";
import "./App.css";
const { localStorage } = window;

const getLocalFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  if (favorites === null) {
    return new Set();
  } else {
    return new Set(
      favorites
        .trim()
        .split(",")
        .map(v => parseInt(v, 10))
    );
  }
};

const FavoriteItem = ({ value, isSelected, handleClick }) => {
  let styles = "list-group-item list-group-item-action";
  if (isSelected) {
    styles += " active";
  }
  return (
    <li
      className={styles}
      key={value.toString()}
      onClick={() => handleClick(value)}
    >
      {value}
    </li>
  );
};

const FavoritesList = ({ items, selected, handleClick }) => {
  if (items === undefined || items.size === 0) {
    return "No Favorites";
  }
  return (
    <ul className="list-group">
      {Array.from(items).map(zipcode => (
        <FavoriteItem
          value={zipcode}
          isSelected={zipcode === selected}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: getLocalFavorites(),
      selected: undefined,
      query: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  handleSubmit(event) {
    this.handleClick(this.state.query);
    event.preventDefault();
  }

  handleClick(zipcode) {
    this.setState({
      selected: zipcode,
      query: ""
    });
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  addFavorite(event) {
    const favorites = new Set(this.state.favorites);
    favorites.add(this.state.selected);
    this.setState({ favorites });
    localStorage.setItem("favorites", Array.from(favorites));
    event.preventDefault();
  }

  render() {
    const subTitle = this.state.selected
      ? `Weather for ${this.state.selected}`
      : "";
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
                <input
                  type="number"
                  name="zipcodeInput"
                  value={this.state.query}
                  onChange={this.handleChange}
                />
                <button type="submit" name="submit" onClick={this.handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
            <div className="row">
              <h3>{subTitle}</h3>
              {subTitle ? (
                <button type="submit" onClick={this.addFavorite}>
                  Add as a favorite
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
