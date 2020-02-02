import React from "react";

const SevenDayForecastRow = ({ name, temperature, icon, shortForecast }) => {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <img src={icon} alt="" />
      </td>
      <td>{shortForecast}</td>
      <td>
        <span className="badge badge-primary badge-pill">{temperature}F</span>
      </td>
    </tr>
  );
};

const SevenDayForecastTable = ({ sevenDay }) => {
  return (
    <table className="table table-sm">
      <tbody>
        {sevenDay.map(forecast => {
          return (
            <SevenDayForecastRow
              key={forecast.number}
              name={forecast.name}
              temperature={forecast.temperature}
              icon={forecast.icon}
              shortForecast={forecast.shortForecast}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const HourlyForecastTable = ({ hourly }) => {
  return (
    <table className="table table-sm">
      <tbody>
        {hourly.map(forecast => {
          return (
            <HourlyForecastRow
              key={forecast.number}
              startTime={forecast.startTime}
              temperature={forecast.temperature}
              icon={forecast.icon}
              shortForecast={forecast.shortForecast}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const HourlyForecastRow = ({ startTime, temperature, icon, shortForecast }) => {
  const hour = startTime.slice(11, 13);
  const hourNum = parseInt(hour, 10);
  const isMorning = hourNum < 12;
  const timeSuffix = isMorning ? " AM" : " PM";
  return (
    <tr>
      <td>{(hourNum % 12) + timeSuffix}</td>
      <td>
        <img src={icon} alt="" />
      </td>
      <td>{shortForecast}</td>
      <td>
        <span className="badge badge-primary badge-pill">{temperature}F</span>
      </td>
    </tr>
  );
};

class ForecastDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHourly: true
    };
  }

  handleClick(isHourly) {
    this.setState({ isHourly });
  }

  render() {
    const { loading, error, hourly, sevenDay } = this.props;
    const { isHourly } = this.state;
    if (loading) {
      return <h5>Loading...</h5>;
    }
    if (error) {
      return <h5>{error}</h5>;
    }
    if (hourly && sevenDay) {
      return (
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={isHourly ? "nav-link active" : "nav-link"}
                onClick={() => {
                  this.handleClick(true);
                }}
              >
                Hourly
              </button>
            </li>
            <li className="nav-item ">
              <button
                className={!isHourly ? "nav-link active" : "nav-link"}
                onClick={() => {
                  this.handleClick(false);
                }}
              >
                Seven Day
              </button>
            </li>
          </ul>
          <div style={isHourly ? {} : { display: "none" }}>
            <HourlyForecastTable hourly={hourly} />
          </div>
          <div style={!isHourly ? {} : { display: "none" }}>
            <SevenDayForecastTable sevenDay={sevenDay} />
          </div>
        </div>
      );
    }
    return <h5>Select favorite or enter zipcode into input</h5>;
  }
}

export default ForecastDisplay;
