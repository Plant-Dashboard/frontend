import React, {useState, useEffect} from "react";
import moment from "moment";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from "recharts";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector, useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as readingActions from "../store/actions/readings";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles(theme => ({
  paper: {
    margin: "25px",
    padding: "25px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper2: {
    margin: "25px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  slideMe: {
    trackColor: "yellow",
    selectionColor: "green"

  }
}));
const FilterData = () => {
  const classes = useStyles();
  const readingState = useSelector(state => state.readings);
  const [temperature, setTemperature] = useState([20, 37]);
  const [humidity, setHumidity] = useState([20, 37]);
  const [page, setPage] = useState(1);
  const [getTemp, setGetTemp] = useState(false);
  const [getRh, setGetRh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [readingState.filteredReadings]);

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const handleHumidityChange = (event, newValue) => {
    setHumidity(newValue);
  };

  const getFilteredData = async (type, params, page) => {
    try {
      await dispatch(readingActions.getReadingWithParams(type, params, page));
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePagination = (event, page) => {
    setPage(page);
    if (getTemp) {
      getFilteredData("temperature", temperature, page);
    } else {
      getFilteredData("humidity", humidity, page);
    }
  };
  return (
    <>

      <Grid container spacing={2} justify="center">
        <Grid item sm={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography id="range-slider" gutterBottom>
              Temperature range
            </Typography>
            <Slider
              value={temperature}
              style={{color: '#aa9340'}}
              onChange={handleTemperatureChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
            <Button
              variant="contained"
              onClick={() => {
                console.log(temperature);
                setGetTemp(true);
                setGetRh(false);
                setPage(1);
                getFilteredData("temperature", temperature);
              }}>
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography id="range-slider" gutterBottom>
              Humidity range
            </Typography>
            <Slider
              value={humidity}
              style={{color: '#24adb5'}}

              onChange={handleHumidityChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              
            />
            <Button
              variant="contained"
              onClick={() => {
                console.log(humidity);
                setGetRh(true);
                setGetTemp(false);
                setPage(1);
                getFilteredData("humidity", humidity);
              }}>
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography id="range-slider" gutterBottom>
              Date range
            </Typography>

            <Button variant="contained">Search</Button>
          </Paper>
        </Grid>
      </Grid>

      <Paper className={classes.paper2}>
        <Grid container spacing={2} justify="center">
          <div>
            {readingState.noResults ? (
              <h2>
                {getTemp && `No results for temperature range ${temperature[0]} - ${temperature[1]}`}
                {getRh && `No results for humidity range ${humidity[0]} - ${humidity[1]}`}
              </h2>
            ) : (
              <h2>
                {getTemp && `Results for temperature range ${temperature[0]} - ${temperature[1]}`}
                {getRh && `Results for humidity range ${humidity[0]} - ${humidity[1]}`}
              </h2>
            )}

            {(readingState.pagination.next || readingState.pagination.prev) && (
              <Pagination
                showFirstButton
                showLastButton
                count={readingState.pagination.totalPages}
                page={page}
                onChange={handlePagination}
                boundaryCount={5}
              />
            )}
          </div>
          {readingState.filteredReadings.length < 1 && !readingState.noResults ? (
            <h2>Search a filter to see results</h2>
          ) : (
            <ResponsiveContainer height={350} minWidth={200}>
              <LineChart
                data={readingState.filteredReadings}
                margin={{top: 15, right: 50, bottom: 15, left: 0}}>
                <Line type="monotone" dataKey="temperature" stroke="#e8ca5d" />
                <Line type="monotone" dataKey="humidity" stroke="#24adb5" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="readingTime" tickFormatter={tickItem => moment(tickItem).format("l")} />
                <YAxis />
                <Legend />
                <Tooltip labelFormatter={label => moment(label).format("LLL")}  contentStyle={{backgroundColor: '#303030'}}/>
              </LineChart>
            </ResponsiveContainer>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default FilterData;
