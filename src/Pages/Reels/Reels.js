import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { Container, Grid } from "@mui/material";
import "./reels.css";

const Reels = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Feed />
        <Sidebar />
      </div>
    </div>
  );
};

export default Reels;
