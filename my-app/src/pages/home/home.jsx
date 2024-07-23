import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../navBar/nav";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1>Home</h1>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
