import React from 'react';
import './App.css';
import Plot from './plot.js';
import Card from './card';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  getData
} from './action'
import YouTube from 'react-youtube';
import './vivify.min.css'


const API_KEY = "5080e48cc15e96756601b67c809b1a9e"

class App extends React.Component {

  getData = (envt) => {
    envt.preventDefault();
    let location = encodeURIComponent(this.props.redux.get('location'));
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID=' + API_KEY + '&units=metric';
    let url = urlPrefix + location + urlSuffix;
    this.props.dispatch(getData(url));
  }

  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.redux.getIn(['dates', number])));
      this.props.dispatch(setSelectedTemp(this.props.redux.getIn(['temps', number])));
    }
  }

  changeLocation = (loc) => {
    this.props.dispatch(changeLocation(loc.target.value));
  };

  makeCards = () => {
    const val = []
    for (var i = 0; i < 5; i++) {
      const description = this.props.redux.getIn(['dailyData', i, 'weather', '0', 'description'])
      const imgURL = this.props.redux.getIn(['dailyData', i, 'weather', '0', 'id'])
      const temp = this.props.redux.getIn(['dailyData', i, 'main', 'temp'])
      const dt = this.props.redux.getIn(['dailyData', i, 'dt'])
      val.push(this.pushData(imgURL, description, temp, dt))
    }
    return val
  }

  pushData = (img, desc, tempe, dte) => {
    return <Card imgURL={img} description={desc} temp={tempe} dt={dte} />
  }

  _onReady(event) {
    event.target.mute();
    event.target.seekTo(80);
  }

  _onEnd(event) {
    event.target.playVideo();
    event.target.seekTo(80);
  }

  render() {

    let currentTemp = 'Specify a location';
    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0
      }
    };

    if (this.props.redux.getIn(['data', 'list'])) {
      currentTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
    }
    return (
      <div>
        <h1>Know the Weather  🌦</h1>
        <div className="search-box">
          <form onSubmit={this.getData}>
            <input
              type="text"
              className="search-bar"
              placeholder="City, country"
              spellCheck ="false"
              onChange={this.changeLocation}
              value={this.props.redux.get('location')}
            />
          </form>
        </div>
        {(this.props.redux.getIn(['data', 'list'])) ? (
          <div className="wrapper">
            <p className="temp-wrapper">The current temperature is  <span className="temp"> {currentTemp} </span> <span className="temp-symbol">°C</span></p>
            <h2>Forecast</h2>
            <div className="container">
              <div className="row justify-content-center">
                {this.makeCards()}
              </div>
            </div>
            <div className="container bkg">
              {this.props.redux.getIn(['selected', 'temp']) ? (
                <p className="temp-wrapper vivify popIn"> The temperature on <span className="temp-date">  {this.props.redux.getIn(['selected', 'date'])}  </span>  will be  <span className="temp"> {this.props.redux.getIn(['selected', 'temp'])} </span> <span className="temp-symbol">°C</span>
                </p>) : <p className="temp-wrapper"> Click on the graph to know more!</p>}
              <div className="plot">
                <Plot
                  xData={this.props.redux.get('dates')}
                  yData={this.props.redux.get('temps')}
                  onPlotClick={this.onPlotClick}
                  type="scatter"
                />
              </div>
            </div>
          </div>
        ) : null}
        <div className="video-background">
          <div className="video-foreground">
            <YouTube
              videoId="2-wnaQZs-og"
              opts={videoOptions}
              className="video-iframe"
              endSeconds="20"
              onReady={this._onReady}
              onEnd={this._onEnd}
            />
          </div>
        </div>
        <div className="footer"> Designed by Sai Milind</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    redux: state
  }
}

export default connect(mapStateToProps)(App);