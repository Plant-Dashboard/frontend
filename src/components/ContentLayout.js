import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LiveData from "./LiveData";
import Camera from "./Camera";
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
          <Paper className={classes.paper}>
            <h1 style={{height: "300px", widht: "100%"}}>Graph Data</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentLayout;
