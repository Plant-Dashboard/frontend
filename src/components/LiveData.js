import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import * as readingActions from "../store/actions/readings";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";

const useStyles = makeStyles(theme => ({
  readingTime: {
    fontSize: "26px",
    textAlign: "center",
  },
  container: {
    height: "100%",
    margin: "0px 20px",
    minHeight: "390px",
  },
  data: {
    fontSize: "40px",
    textAlign: "center",
  },
  avg: {
    fontSize: "15px",
    textAlign: "center",
    margin: 0,
    paddingTop: "5px",
  },
  dataContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

const LiveData = () => {
  const dispatch = useDispatch();
  const readingState = useSelector(state => state.readings);

  useEffect(() => {
    (async () => {
      await dispatch(readingActions.getReadingsForToday());
    })();
  }, []);

  const currentReading = readingState.readings[readingState.readings.length - 1];
  console.log(readingState);
  const classes = useStyles();
  let tempSum = 0;
  let rhSum = 0;

  readingState.readings.map(reading => {
    tempSum += reading.temperature;
    rhSum += reading.humidity;
  });

  let avgTemp = Math.floor(tempSum / readingState.readings.length);
  let avgRh = Math.floor(rhSum / readingState.readings.length);
  if (readingState.loading) {
   return <Loader type="TailSpin" color="white" height={80} width={80}/>
  }
  if (currentReading == undefined) {
    return <h2>Error loading current readings</h2>;
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.readingTime}>
        Last reading was {moment(currentReading.readingTime).fromNow()} at{" "}
        {moment(currentReading.readingTime).format("LT")}
      </h1>
      <Grid container spacing={5} justify="center">
        <Grid item xl={5} md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Current Temp</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}>{Math.floor(currentReading.temperature)} °F</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={5}  md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Current RH</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}> {Math.floor(currentReading.humidity)} %</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={5}  md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Average Temp</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}>{avgTemp} °F</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={5}  md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Average RH</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}>{avgRh} %</p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LiveData;
