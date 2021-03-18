/* eslint-disable no-unused-vars */
import React from "react"
import "./App.css"
import {BrowserRouter as Router} from "react-router-dom"
import Navigation from "./Components/navigation"
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "./ModelContext/UserContext";

function App() {
  return (
    <Router>
      <UserContext>
        <Navigation />
      </UserContext>
    </Router>
  );
}

export default App;
