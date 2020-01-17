import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import axios from "axios";

export default function ProjectList(props) {
  const [projects, setProjects] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projects")
      .then(res => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {projects.map(project => (
        <div>
          <Link to={`/project/${project.id}`} 
            color="textPrimary"
            className="project"
          >
            {project.name}
          </Link>
          {display ? 
            <ProjectCard key={project.id} project={project} />
           : 
            <div></div>
          }
        </div>
      ))}
    </div>
  );
}
