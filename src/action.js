import xhr from "xhr";

export function getData(url) {
  return function thunk(dispatch) {
    xhr(
      {
        url: url
      },
      function(err, data) {
        var body = JSON.parse(data.body);
        var list = body.list;
        var dailyData = list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );
        console.log(dailyData);
        var dates = [];
        var temps = [];
        for (var i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }
        dispatch(setdailyData(dailyData));
        dispatch(setData(body));
        dispatch(setDates(dates));
        dispatch(setTemps(temps));
        dispatch(setSelectedDate(""));
        dispatch(setSelectedTemp(null));
      }
    );
  };
}

export function changeLocation(location) {
  return {
    type: "CHANGE_LOCATION",
    location: location
  };
}

export function setdailyData(dailyData) {
  return {
    type: "DAILY_DATA",
    dailyData: dailyData
  };
}

export function setSelectedTemp(temp) {
  return {
    type: "CHANGE_SELECTED_TEMPERATURE",
    temp: temp
  };
}

export function setSelectedDate(date) {
  return {
    type: "CHANGE_SELECTED_DATE",
    date: date
  };
}

export function setData(data) {
  return {
    type: "SET_DATA",
    data: data
  };
}

export function setDates(dates) {
  return {
    type: "SET_DATES",
    dates: dates
  };
}
export function setTemps(temps) {
  return {
    type: "SET_TEMPS",
    temps: temps
  };
}
