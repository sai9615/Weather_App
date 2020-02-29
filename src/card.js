import React from 'react';
import './card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherIcon from 'react-icons-weather';
import './vivify.min.css'



var moment = require('moment');


class Card extends React.Component {
render() {

    var imgURL = this.props.imgURL
    console.log(this.props.imgURL)
    let newDate = new Date();
    const weekday = this.props.dt * 1000
    newDate.setTime(weekday)

    return (
        <div className="col-auto special-card mb-3 vivify popInLeft"> 
          <div className="card bg-transparent border-dark">
            <h3 className="card-title"> {moment(newDate).format('dddd')}</h3>
            <p className=" days">{moment(newDate).format('MMMM Do, h:mm a')}</p>
            <WeatherIcon name="owm" size={18} iconId={imgURL} flip="horizontal" rotate="90" size={24} />
            <h2>{this.props.temp} °C</h2>
            <div className="card-body">
              <p className="card-text">{this.props.description}</p>
            </div>
          </div>
     </div> 
    )
  }
}
  export default Card