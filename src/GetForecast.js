import Axios from "axios";
import mock from "./mock";

var sydney = new window.google.maps.LatLng(-33.867, 151.195);
const map = new window.google.maps.Map(document.getElementById("map"), {
  center: sydney,
  zoom: 15
});
const service = new window.google.maps.places.PlacesService(map);

const getLatLng = zipcode => {
  return new Promise((resolve, reject) => {
    service.findPlaceFromQuery(
      {
        query: zipcode,
        fields: ["geometry"]
      },
      ([response]) => {
        try {
          const result = {
            lat: response.geometry.location.lat(),
            lng: response.geometry.location.lng()
          };
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};

const currentDayOnly = (todaysDate, periods) => {
  const tYear = todaysDate.getFullYear();
  const tMonth = todaysDate.getMonth() + 1;
  const tDate = todaysDate.getDate();
  return periods.filter(({ startTime }) => {
    const [year, month, date] = startTime
      .slice(0, 10)
      .split("-")
      .map(v => parseInt(v, 10));
    return tYear === year && tMonth === month && tDate === date;
  });
};

const getForecast = zipcode => {
  return getLatLng(zipcode)
    .then(({ lat, lng }) =>
      Axios.get(`https://api.weather.gov/points/${lat},${lng}`)
    )
    .then(response =>
      Promise.all([
        Axios.get(response.data.properties.forecast),
        Axios.get(response.data.properties.forecastHourly)
      ])
    )
    .then(([sevenDay, hourly]) => ({
      sevenDay: sevenDay.data.properties.periods,
      hourly: currentDayOnly(new Date(), hourly.data.properties.periods)
    }))
    .catch(() => ({
      // error: 'No Forecast',
      hourly: currentDayOnly(new Date(), mock.hourly.properties.periods),
      sevenDay: mock.sevenDay.properties.periods
    }));
};

export default getForecast;
