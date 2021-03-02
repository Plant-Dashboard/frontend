import {GRANT_ACCESS} from "../actions/auth";

const initialState = {
  cameraAccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GRANT_ACCESS:
      return {
        cameraAccess: action.payload,
      };

    default:
      return {...state};
  }
};
