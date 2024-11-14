import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { IoCameraOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { GiMoneyStack } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";

import Info3 from "../../../../assets/Info-Dp/img-3.jpg";
import PayPalButton from "./PayPalButton";
import ModelProfile from "../ModelProfile/ModelProfile";
import UserQRCode from "../../../../Pages/Profile/UserQRCode";
import "./Info.css";
import { useNavigate } from "react-router-dom";
const Info = ({
  userPostData,
  following,
  modelDetails,
  setModelDetails,
  profileImg,
  setProfileImg,
  name,
  setName,
  userName,
  setUserName,
}) => {
  const [coverImg, setCoverImg] = useState(Info3);
  const importProfileRef = useRef(null);
  const importCoverRef = useRef(null);

  const handleFileChange = (e, setImg) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImg(URL.createObjectURL(img));
    }
  };
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/reels");
  };
  const handleEditProfile = (e) => {
    e.preventDefault();
    setModelDetails({
      ModelName: name,
      ModelUserName: userName,
      ModelCountryName: countryName,
      ModelJobName: jobName,
      ModelUserId: userId,
    });
    setOpenEdit(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [jobName, setJobName] = useState("");
  const [userId, setUserId] = useState("");
  const qrCodeValue = `${name}-${userName}`;
  const loadPayPalSdk = () => {
    const paypalWindow = window.open("", "_blank", "width=600,height=600");

    if (paypalWindow) {
      const htmlContent = `
        <html>
          <head>
            <script src="https://www.paypal.com/sdk/js?client-id=Ae3Es36eFLC_jSRxuhVwe-5-JLvoQTaIvCRZeRAL8B0F5PnpFF3uFT-GIIGdHecGdTHmPwjL6fBppgMQ"></script>
          </head>
          <body>
            <div id="paypal-button-container"></div>
            <script>
              paypal.Buttons({
                createOrder: (data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: '0.01', // Replace with the actual amount
                      },
                    }],
                  });
                },
                onApprove: (data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    window.close(); // Close the window after the transaction is complete
                  });
                },
                onCancel: () => {
                  window.close(); // Close the window if the user cancels the transaction
                },
                onError: (err) => {
                  alert('An error occurred during the transaction');
                  window.close(); // Close the window if an error occurs
                }
              }).render('#paypal-button-container');
            </script>
          </body>
        </html>
      `;

      paypalWindow.document.write(htmlContent);
      paypalWindow.document.close();
    } else {
      alert(
        "Unable to open PayPal window. Please disable any popup blockers and try again."
      );
    }
  };

  // Function to handle icon click
  const handleIconClick = () => {
    loadPayPalSdk();
  };

  return (
    <div className="info">
      <div className="info-cover">
        <img src={coverImg} alt="Cover" />
        <img src={profileImg} alt="Profile" />
        <div className="coverDiv">
          <IoCameraOutline
            className="coverSvg"
            onClick={() => importCoverRef.current.click()}
          />
        </div>
        <div className="profileDiv">
          <IoCameraOutline
            className="profileSvg"
            onClick={() => importProfileRef.current.click()}
          />
        </div>
      </div>

      <input
        type="file"
        ref={importProfileRef}
        onChange={(e) => handleFileChange(e, setProfileImg)}
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={importCoverRef}
        onChange={(e) => handleFileChange(e, setCoverImg)}
        style={{ display: "none" }}
      />

      <div className="info-follow">
        <h1>{modelDetails.ModelName}</h1>
        <p>{modelDetails.ModelUserName}</p>
        <UserQRCode value={qrCodeValue} />
        <Link to="/" className="logout">
          <BiLogOut />
          Logout
        </Link>

        <button onClick={() => setOpenEdit(true)}>
          <LiaEdit />
          Edit Profile
        </button>
        <ModelProfile
          name={name}
          setName={setName}
          userName={userName}
          setUserName={setUserName}
          countryName={countryName}
          setCountryName={setCountryName}
          // jobName={jobName}
          setJobName={setJobName}
          setUserId={setUserId}
          handleModel={handleEditProfile}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
        />

        <div className="additional-info">
          <div className="balance-section">
            <h3>Account Balance: </h3>
            <p>$5,000</p> {/* Display the balance here */}
          </div>

          <div className="icons-row">
            <div className="icon-item" onClick={handleIconClick}>
              <FaMoneyBillTransfer
                className="icon"
                style={{ color: "green" }}
              />
              <span>Transfer</span>
            </div>
            <div className="icon-item" onClick={handleIconClick}>
              <BiMoneyWithdraw className="icon" style={{ color: "red" }} />
              <span>Withdraw</span>
            </div>
            <div className="icon-item" onClick={handleIconClick}>
              <GiMoneyStack className="icon" style={{ color: "blue" }} />
              <span>Stack</span>
            </div>
            <div className="icon-item" onClick={handleIconClick}>
              <MdHistory className="icon" style={{ color: "orange" }} />
              <span>History</span>
            </div>
          </div>
        </div>

        <div className="info-details">
          <div className="info-col-1">
            <div className="info-details-list">
              <LocationOnOutlinedIcon />
              <span>{modelDetails.ModelCountryName}</span>
            </div>

            <div className="info-details-list">
              <WorkOutlineRoundedIcon />
              <span>{modelDetails.ModelJobName}</span>
            </div>

            <div className="info-details-list">
              <WorkOutlineRoundedIcon />
              <span>{modelDetails.ModelUserId}</span>
            </div>

            <div className="info-details-list">
              <CalendarMonthRoundedIcon />
              <span>Joined in 2023-08-12</span>
            </div>
          </div>

          <div>
            <PayPalButton />
          </div>

          <div
            className="info-col-2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "flex-end",
            }}
          >
            <div>
              <h2>5,000</h2>
              <span>Followers</span>
            </div>
            <div>
              <h2>{userPostData.length}</h2>
              <span>Posts</span>
            </div>
            <div>
              <h2>{following}</h2>
              <span>Following</span>
            </div>
          </div>
        </div>

        {/* New div with four boxes */}
        <div className="info-boxes">
          <div className="box">
            <p>Profile</p>
          </div>
          <div className="box">
            <p>Social Media</p>
          </div>
          <div className="box" onClick={handleNavigation}>
            <p>Reels</p>
          </div>
          <div className="box">
            <p>Calling</p>
          </div>
        </div>
        <div className="info-boxes">
          <div
            className="box"
            onClick={() =>
              (window.location.href = "https://eshooop.netlify.app/")
            }
          >
            <p>Shop</p>
          </div>
          <div className="box">
            <p>Chat</p>
          </div>
          <div className="box">
            <p>Settings</p>
          </div>
          <div className="box">
            <p>Privacy & Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
