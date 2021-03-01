import React from "react";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from "recharts";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: "25px",
    paddingRight: "50px",
    paddingBottom: "25px",
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));
const HistoricalData = () => {
  const classes = useStyles();
  const readingState = useSelector(state => state.readings);

  return (
    <Paper className={classes.paper}>
      <h1>Graph Data</h1>
      <ResponsiveContainer height={500} minWidth={340}>
        <LineChart
          width={1000}
          height={400}
          data={readingState.readings}
          margin={{top: 5, right: 20, bottom: 5, left: 0}}>
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
