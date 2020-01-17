import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function ActionsCard(props) {
  const classes = useStyles();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/${props.id}`)
      .then(res => {
        console.log(res.data);
        setActions(res.data.actions);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.id]);

  return (
    <Card className={classes.card}>
      <div>
        {actions.map(action => (
          <CardContent key={action.id}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Action Description
            </Typography>
            <Typography variant="h5" component="h2">
              {" "}
              {action.description}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Notes
            </Typography>
            <Typography variant="body2" component="p">
              {action.notes}
            </Typography>
          </CardContent>
        ))}
      </div>
    </Card>
  );
}
