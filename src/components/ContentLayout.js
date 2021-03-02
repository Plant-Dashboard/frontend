import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LiveData from "./LiveData";
import HistoricalData from "./HistoricalData";
import Camera from "./Camera";
import Header from "../components/Header";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "center",
  },

  paper: {
    height: "450",
    margin: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ContentLayout = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={1} justify="center">
        <Grid item lg={6} md={8}>
          <Camera />
        </Grid>
        <Grid item lg={6} md={4} sm={12}>
          <LiveData />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12} sm={12}>
          <HistoricalData />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentLayout;
