import React from "react";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from "recharts";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: "25px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const HistoricalData = () => {
  const classes = useStyles();
  const readingState = useSelector(state => state.readings);

  return (
    <Paper className={classes.paper}>
      <h3 style={{padding: "15px"}}>
        Temperature and Humidity data for {moment(readingState.readings[0].readingTime).format("LL")}
      </h3>
      <ResponsiveContainer height={350} minWidth={200}>
        <LineChart data={readingState.readings} margin={{top: 5, right: 50, bottom: 25, left: 0}}>
          <Line type="monotone" dataKey="temperature" stroke="#a81313" />
          <Line type="monotone" dataKey="humidity" stroke="#134e91" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="readingTime" tickFormatter={tickItem => moment(tickItem).format("LT")} />
          <YAxis />
          <Legend />
          <Tooltip labelFormatter={label => moment(label).format("LLL")} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default HistoricalData;
