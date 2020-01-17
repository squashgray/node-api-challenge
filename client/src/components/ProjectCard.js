import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ActionCard from "./ActionsCard";
import {Link} from "react-router-dom"
import axios from "axios"

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },

  title: {
    fontSize: 14,
    borderBottom: 1
  },
  pos: {
    marginBottom: 12
  }
});

export default function ProjectCard(props) {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const [project, setProject] = useState([])
  
   useEffect(() => {
     axios
       .get(`http://localhost:4000/api/projects/${props.match.params.id}`)
       .then(res => {
         console.log(res.data);
         setProject(res.data);
       })
       .catch(error => {
         console.log(error);
       });
   }, [props.match.params.id]);


  return (
    <div className="projectcontainer">
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Project Description
          </Typography>
          <Typography variant="body2" component="p">
            {project.description}
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => {
              setDisplay(!display);
            }}
            size="small"
          >
            {display ? "close Actions" : "Actions"}
          </Button>
          {display ? <ActionCard id={project.id} /> : <div></div>}
          <Button>
            <Link to="/" className="projects">
              Back to Project List
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
