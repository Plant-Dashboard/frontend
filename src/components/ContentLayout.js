import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LiveData from "./LiveData";
import HistoricalData from "./HistoricalData";
import Header from "../components/Header";
import FilterData from "../components/FilterData";
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
      <Grid container spacing={1} >
        <Grid item lg={6} md={6} sm={12}>
          <LiveData />
        </Grid> 
        <Grid item lg={6} md={6} sm={12}>
          <HistoricalData />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12} sm={12}>
          <FilterData />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentLayout;
