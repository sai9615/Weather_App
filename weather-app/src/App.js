import React from 'react';
import './App.css';
import Plot from './plot.js';
import {connect} from 'react-redux';
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  getData
} from './action'
import YouTube from 'react-youtube';


const API_KEY = "5080e48cc15e96756601b67c809b1a9e"

class App extends React.Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
     event.target.mute();
  }
  
  _onEnd(event) {
    event.target.playVideo();
  }

  getData = (envt) => {
    envt.preventDefault();
   // console.log('here', this.state.location)
    let location = encodeURIComponent(this.props.redux.get('location'));
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID=' + API_KEY + '&units=metric';
    let url = urlPrefix + location + urlSuffix;
    this.props.dispatch(getData(url));
  }

  onPlotClick = (data) => {
    if(data.points){
      var number = data.points[0].pointNumber;
      console.log(number)
      this.props.dispatch(setSelectedDate(this.props.redux.getIn(['dates', number])));
      this.props.dispatch(setSelectedTemp(this.props.redux.getIn(['temps', number])));
    }
  }

  changeLocation = (loc) => {
    this.props.dispatch(changeLocation(loc.target.value));
  };

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
    if (this.props.redux.getIn(['data','list'])){
      currentTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
    }
    return (
    <div>
    <h1>Know the Weather</h1>
     <form onSubmit={this.getData}>
       <label>Want to know the weather for 
       <input placeholder = {"City, Country"} type = "text" 
         value = {this.props.redux.get('location')}
         onChange = {this.changeLocation}
       />
       </label>
     </form>
     {(this.props.redux.getIn(['data', 'list'])) ? (
          <div className="wrapper">
    {this.props.redux.getIn(['selected', 'temp']) ? (
     <p className="temp-wrapper"> The temperature on <span className="temp-date">  { this.props.redux.getIn(['selected', 'date']) }  </span> will be  <span className="temp"> {this.props.redux.getIn(['selected', 'temp'])} </span> <span className="temp-symbol">°C</span>
        </p> ) : (
          <p className="temp-wrapper">The current temperature is  <span className="temp"> { currentTemp } </span> <span className="temp-symbol">°C</span></p>
            )}
        <h2>Forecast</h2>
        <Plot 
        xData={this.props.redux.get('dates')}
        yData={this.props.redux.get('temps')}
        onPlotClick = {this.onPlotClick}
        type="scatter"
        /> 
    </div>
    ) : null}
    <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId="C6oZw6T9h74"
            opts={videoOptions}
            className="video-iframe"
            onReady={this._onReady}
            onEnd={this._onEnd}
          />
        </div>
      </div>
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