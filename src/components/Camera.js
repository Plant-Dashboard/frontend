import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    maxWidth: "600px",
    textAlign: "center",
  },
  media: {
    height: "100%",
  },
});
const Camera = () => {
  const classes = useStyles();
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
            src="https://www.almanac.com/sites/default/files/image_nodes/dahlia-3598551_1920.jpg"
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            If you see an image of a dahlia, you do not have access to my camera. You can click below to
            request access but it is not guaranteed.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary">
            Request camera access
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Camera;
