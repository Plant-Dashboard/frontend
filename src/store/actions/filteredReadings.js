import axios from "axios";
import {errorResponse} from "../../util/errorResponse";
import moment from "moment";
export const GET_FILTERED_READINGS = "GET_FILTERED_READINGS";
export const NO_RESULTS_FOUND = "NO_RESULTS_FOUND";
export const LOADING_FILTERED_READINGS = "LOADING_FILTERED_READINGS";

export const getReadingWithParams = (type, params, page = 1) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/readings?${type}[gte]=${params[0]}&${type}[lte]=${params[1]}&page=${page}`
      );

      let {success, count, pagination} = res.data;

      if (success) {
        if (count > 0) {
          dispatch({type: "GET_FILTERED_READINGS", payload: res.data});
        } else {
          dispatch({type: "NO_RESULTS_FOUND", payload: true});
        }
      }
    } catch (err) {
      errorResponse(err);
    }
  };
};
