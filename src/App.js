import React from "react";
import "./App.css";
import FavoritesList from "./FavoritesList";
import Axios from "axios";

var sydney = new window.google.maps.LatLng(-33.867, 151.195);
const map = new window.google.maps.Map(document.getElementById('map'), {center: sydney, zoom: 15});
const service = new window.google.maps.places.PlacesService(map)

const getLatLng = (zipcode) => {
  return new Promise((resolve, reject) => {
    service.findPlaceFromQuery({
      query: zipcode,
      fields: ['geometry']
    },
    ([response]) => {
      try {
        const result = {
          lat: response.geometry.location.lat(),
          lng: response.geometry.location.lng()
        };
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const getLocalFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  if (favorites === null || favorites === '') {
    return new Set();
  }
  return new Set(favorites.trim().split(","));
};

const currentDayOnly = (v) => {
  return v.slice(0, 24);
}


const getForecast = (zipcode) => {
  return getLatLng(zipcode)
    .then(({lat, lng}) => {
      return Axios.get(`https://api.weather.gov/points/${lat},${lng}`)
    })
    .then((response) => {
      return Promise.all([
        Axios.get(response.data.properties.forecast),
        Axios.get(response.data.properties.forecastHourly)
      ]);
    })
    .then(([sevenDay, hourly]) => {
      return {
        sevenDay: sevenDay.data.properties.periods,
        hourly: currentDayOnly(hourly.data.properties.periods),
      };
    })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: getLocalFavorites(),
      selected: undefined,
      query: "",
      loading: false,
      value: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  handleSubmit(event) {
    const { query } = this.state;
    this.handleClick(query.padStart(5, '0'));
    event.preventDefault();
  }

  handleClick(zipcode) {
    this.setState({
      selected: zipcode,
      query: "",
      loading: true
    });
    return getForecast(zipcode)
      .then((resp) => {
        console.log(resp)
        this.setState({
          loading: false,
          value: JSON.stringify(resp)
        });
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

  removeFavorite(zipcode) {
    const favorites = new Set(this.state.favorites);
    favorites.delete(zipcode)
    this.setState({ favorites });
    localStorage.setItem("favorites", Array.from(favorites));
  }

  render() {
    const {selected, favorites, query, loading, value="" } = this.state;
    const subTitle = selected
      ? `Weather for ${selected}`
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
              {(subTitle && !favorites.has(selected))  ? (
                <button type="submit" onClick={this.addFavorite}>
                  Add as a favorite
                </button>
              ) : (
                ""
              )}
            </div>
            <div className ="row">
              {loading ? "Loading..." : value}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
