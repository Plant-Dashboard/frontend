import axios from "axios";
import {errorResponse} from "../../util/errorResponse";
import moment from "moment";
export const GET_READINGS = "GET_READINGS";
export const LOADING_READINGS = "LOADING_READINGS";

export const getReadingsForToday = () => {
  return async dispatch => {
    dispatch({type: "LOADING_READINGS", payload: true});
    let today = moment().startOf("day");
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_API_ENDPOINT
        }/api/v1/readings?readingTime[gte]=${today.toDate()}&readingTime[lt]=${moment(today)
          .endOf("day")
          .toDate()}&limit=100`
      );

      let {data, success} = res.data;

      if (success) {
        // Reverse array so oldest values are first for the graph
        data = data.reverse();
        dispatch({type: "GET_READINGS", payload: data});
        dispatch({type: "LOADING_READINGS", payload: false});
      }
    } catch (err) {
      errorResponse(err);
      dispatch({type: "LOADING_READINGS", payload: false});
    }
  };
};
