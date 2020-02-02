import React from "react";
import "./App.css";
import FavoritesList from "./FavoritesList";
import getForecast from "./GetForecast";
import StoredFavorites from "./StoredFavorites";
import ForecastDisplay from "./ForecastDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: StoredFavorites.get(),
      selected: undefined,
      query: "",
      loading: false,
      hourly: undefined,
      sevenDay: undefined,
      error: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  handleSubmit(event) {
    const { query } = this.state;
    // zipcodes are a minimum of 5 digits
    // https://en.wikipedia.org/wiki/ZIP_Code
    this.handleClick(query.padStart(5, "0"));
    event.preventDefault();
  }

  async handleClick(zipcode) {
    this.setState({
      selected: zipcode,
      query: "",
      loading: true
    });
    const { hourly, sevenDay, error } = await getForecast(zipcode);
    this.setState({
      loading: false,
      hourly,
      sevenDay,
      error
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
    StoredFavorites.set(favorites);
    event.preventDefault();
  }

  removeFavorite(zipcode) {
    const favorites = new Set(this.state.favorites);
    favorites.delete(zipcode);
    this.setState({ favorites });
    StoredFavorites.set(favorites);
  }

  render() {
    const {
      selected,
      favorites,
      query,
      loading,
      hourly,
      sevenDay,
      error
    } = this.state;
    const subTitle = selected ? `Weather for ${selected}` : "";
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
                items={favorites}
                selected={selected}
                handleClick={this.handleClick}
                handleRemove={this.removeFavorite}
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="row">
              <form>
                <input
                  type="number"
                  name="zipcodeInput"
                  value={query}
                  onChange={this.handleChange}
                />
                <button type="submit" name="submit" onClick={this.handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
            <div className="row">
              <h3>{subTitle}</h3>
              {subTitle && !favorites.has(selected) ? (
                <button type="submit" onClick={this.addFavorite}>
                  Add as a favorite
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <ForecastDisplay
                hourly={hourly}
                sevenDay={sevenDay}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
