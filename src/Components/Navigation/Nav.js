import React from "react";
import "../Navigation/Nav.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import applogo from "../../assets/roiid.png";
import homeicon from "../../assets/IMG1.png";
import Profile from "../../assets/profile.jpg";
import reelsicon from "../../assets/camera.png";
import notiicon from "../../assets/notification-bell.png";
import chat from "../../assets/speech-bubble.png";
import videocall from "../../assets/online-meeting.png";
import qr from "../../assets/bar.png";
const Nav = ({ search, setSearch, setShowMenu, profileImg }) => {
  const handleClick = () => {
    window.open("https://chat-app-ca.netlify.app/", "_blank");
  };
  const handlevideoClick = () => {
    window.open("https://meet-clone-d6071.web.app/", "_blank");
  };
  return (
    <nav>
      <div className="n-logo">
        <Link
          to="/home"
          className="logo"
          style={{ color: "black", textDecoration: "none" }}
        >
          <div>
            <img src={applogo} alt="Logo" style={{ width: "120px" }} />
          </div>
        </Link>
      </div>

      <div className="n-form-button">
        <form className="n-form" onSubmit={(e) => e.preventDefault()}>
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search post"
            id="n-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div
        className="social-icons"
        style={{
          width: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <img src={homeicon} alt="Home" width={30} height={30} />
        </Link>
        <Link
          to="/reels"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <img src={reelsicon} alt="Home" width={30} height={30} />
        </Link>
        <Link to="/notification" id="notifi" style={{ marginTop: "8px" }}>
          <img src={notiicon} alt="Home" width={30} height={30} />
          <span>5</span>
        </Link>
        {/* onClick={handlevideoClick} */}
        <img
          src={chat}
          alt="Home"
          width={30}
          height={30}
          onClick={handleClick}
        />
        <img
          src={videocall}
          alt="Home"
          width={30}
          height={30}
          onClick={handlevideoClick}
        />

        <img
          src={qr}
          alt="Home"
          width={30}
          height={30}
          onClick={() => setShowMenu(true)}
        />
      </div>

      <div className="n-profile">
        <Link to="/profile">
          <img
            src={profileImg ? profileImg : Profile}
            alt="profileImage"
            className="n-img"
            style={{ marginBottom: "-7px" }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
