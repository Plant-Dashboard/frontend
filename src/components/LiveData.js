import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import * as readingActions from "../store/actions/readings";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  readingTime: {
    fontSize: "26px",
    textAlign: "center",
  },
  container: {
    paddingTop: "40px",
    height: "100%",
    margin: "20px",
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  paper: {
    height: "450",

    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

const LiveData = () => {
  useEffect(() => {
    (async () => {
      await dispatch(readingActions.getReadingsForToday());
    })();
  }, []);

  const dispatch = useDispatch();
  const readingState = useSelector(state => state.readings);
  const currentReading = readingState.readings[0];
  const classes = useStyles();

  let tempSum = 0;
  let rhSum = 0;

  readingState.readings.map(reading => {
    tempSum += reading.temperature;
    rhSum += reading.humidity;
  });

  let avgTemp = Math.floor(tempSum / readingState.readings.length);
  let avgRh = Math.floor(rhSum / readingState.readings.length);

  return (
    <div className={classes.container}>
      <h1 className={classes.readingTime}>Last reading</h1>
      <h2 className={classes.readingTime}> {moment(currentReading.readingTime).format("lll")}</h2>
      <Grid container spacing={5} justify="center">
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Current Temp</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}>{Math.floor(currentReading.temperature)} °F</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Current RH</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}> {Math.floor(currentReading.temperature)} %</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Paper className={classes.paper}>
            <p className={classes.avg}>Average Temp</p>
            <div className={classes.dataContainer}>
              <p className={classes.data}>{avgTemp} °F</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
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
