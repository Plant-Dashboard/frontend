export const errorResponse = err => {
  if (err.response) {
    console.log("firs if. Figure out how to parse");
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.data) {
      throw new Error(`${err.response.data.error} (Code: ${err.response.status})`);
    } else {
      throw new Error(`Error Code(${err.response.status})`);
    }
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("second if");
    console.log(err.request);
    if (err.request._timedOut) {
      throw new Error("Connection timed out. Please check your connection and try again.");
    } else {
      throw new Error(err.message);
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("third if.  Figure out how to parse");
    console.log(err.message);
    throw new Error("Connection timed out. Try again.");
  }
};
