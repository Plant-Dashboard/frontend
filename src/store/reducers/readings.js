import {GET_READINGS, LOADING_READINGS} from "../actions/readings";

const initialState = {
  readings: [],
  loading: false,
  pagination: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_READINGS:
      return {
        ...state,
        readings: action.payload,
      };
    case LOADING_READINGS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return {...state};
  }
};
