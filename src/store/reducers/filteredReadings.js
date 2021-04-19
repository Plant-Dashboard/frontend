import {GET_FILTERED_READINGS, NO_RESULTS_FOUND} from "../actions/filteredReadings";
const initialState = {
  filteredReadings: [],
  pagination: {},
  noResults: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTERED_READINGS:
      return {
        ...state,
        filteredReadings: action.payload.data,
        pagination: action.payload.pagination,
        noResults: false,
      };
    case NO_RESULTS_FOUND:
      return {
        ...state,
        filteredReadings: [],
        pagination: {},
        noResults: action.payload,
      };
    default:
      return {...state};
  }
};
