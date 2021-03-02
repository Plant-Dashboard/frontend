import axios from "axios";
import {errorResponse} from "../../util/errorResponse";

export const GRANT_ACCESS = "GRANT_ACCESS";

export const checkCameraAccess = password => {
  return async dispatch => {
    try {
      const res = await axios.post(`http://10.0.0.9:5000/api/v1/auth/camera`, {password});

      let {allowAccess} = res.data;
      console.log(res.data);
      if (allowAccess) {
        dispatch({type: "GRANT_ACCESS", payload: true});
      }
    } catch (err) {
      errorResponse(err);
    }
  };
};
