import React from "react";
import SubscribedHeader from "./SubscribedHeader";


import "./reels.css";
import SubscribedFeed from "./SubscribedFeed";

const SubscribedVideos = () => {
  return (
    <div className="app-container">
      {/* <Header /> */}
      <SubscribedHeader />
      <div className="content-container">
        <SubscribedFeed />
      </div>
    </div>
  );
};

export default SubscribedVideos;
