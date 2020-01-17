import React from "react";
import { Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import DescriptionCard from "./components/DescriptionCard";
import "./App.css";
import ProjectCard from "./components/ProjectCard";

function App() {
  return (
    <div className="App">
      <h1>Current Projects</h1>

      <Route exact path="/" component={ProjectList}></Route>
      <Route path="/project/:id" component={ProjectCard}></Route>
      <Route path="/description" component={DescriptionCard}></Route>
    </div>
  );
}

export default App;
