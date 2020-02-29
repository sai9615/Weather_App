import { fromJS } from "immutable";
var initialState = fromJS({
  location: "",
  data: {},
  dates: [],
  temps: [],
  dailyData: {},
  selected: {
    date: "",
    temp: null
  }
});

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return state.set("location", action.location);

    case "SET_DATA":
      return state.set("data", fromJS(action.data));

    case "DAILY_DATA":
      return state.set("dailyData", fromJS(action.dailyData));

    case "SET_DATES":
      return state.set("dates", fromJS(action.dates));

    case "SET_TEMPS":
      return state.set("temps", fromJS(action.temps));

    case "CHANGE_SELECTED_TEMPERATURE":
      return state.setIn(["selected", "temp"], action.temp);

    case "CHANGE_SELECTED_DATE":
      return state.setIn(["selected", "date"], action.date);

    default:
      return state;
  }
}
