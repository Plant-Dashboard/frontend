import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SyncIcon from "@material-ui/icons/Sync";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import * as readingActions from "../store/actions/readings";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static"  color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={async () => await dispatch(readingActions.getReadingsForToday())}>
              <SyncIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
