import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import * as authActions from "../store/actions/auth";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "600px",
    textAlign: "center",
  },
  media: {
    height: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Camera = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const doesHaveCameraAccess = useSelector(state => state.auth.cameraAccess);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const body = (
    <div className={classes.paper}>
      <TextField label="Password" type="password" value={password} onChange={handleChange} />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        style={{
          marginTop: "18px",
          marginLeft: " 15px",
        }}
        onClick={async () => {
          try {
            await dispatch(authActions.checkCameraAccess(password));
            alert("You have access! Keep that password safe, you have to re-enter it each refresh");
          } catch (err) {
            alert(err.message);
          }
        }}>
        Submit
      </Button>
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25px",
        paddingLeft: "5px",
        margin: "0px 20px",
      }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            src={doesHaveCameraAccess ? process.env.REACT_APP_AUTH : process.env.REACT_APP_UNAUTH}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            If you see an image of a dahlia, you do not have access to my camera. You can click below to enter
            the password if you have it.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary" onClick={handleOpen}>
            Enter password
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {body}
          </Modal>
        </CardActions>
      </Card>
    </div>
  );
};

export default Camera;
