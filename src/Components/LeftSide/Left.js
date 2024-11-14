import React, { useState } from 'react'
import "../LeftSide/Left.css"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai"
import {FiTrendingUp} from "react-icons/fi"
import { Link } from 'react-router-dom';
import {BsBookmark} from "react-icons/bs"
import {RiFileListLine} from "react-icons/ri"
import {FiSettings} from "react-icons/fi"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import homeicon from "../../assets/3d-house.png"
import Profile from "../../assets/profile.jpg"
import star from "../../assets/3d-star.png"
import search from "../../assets/3d-magnifier.png";
import list from "../../assets/wishlist.png";
import download from "../../assets/download.png";
const Left = ({profileImg,
               modelDetails
              }) => {

  const [btnActive,setBtnActive] =useState("#")
  const [logOutExit,setLogOutExit] =useState(false)


  return (
    <div className="L-features">
      <Link to="/home" style={{textDecoration:"none",color:"black"}}>
        <div onClick={()=>setBtnActive("#")} id='L-box' className={btnActive === "#" ? "active" : ""} >
        <img src={homeicon} alt="Home" width={30} height={30} className='margin'/>
          <span>Home</span>
        </div>
      </Link>
    
      <div id='L-box' onClick={()=>setBtnActive("#explore")} className={btnActive === "#explore" ? "active" : ""}>
      <img src={search} alt="Home" width={30} height={30} className='margin'/>
         <span>Explore</span>
      </div>
          
      <div id='L-box'  onClick={()=>setBtnActive("#trending")} className={btnActive === "#trending" ? "active" : ""}>
       <h1 className='notifi'>
       <img src={star} alt="Home" width={30} height={30} className='margin'/>
        </h1> 
        <span>Trending</span>
      </div>

      <div id='L-box' onClick={()=>setBtnActive("#lists")} className={btnActive === "#lists" ? "active" : ""}>
      <img src={list} alt="Home" width={30} height={30} className='margin'/>
        <span>Lists</span>
      </div>

      <div id='L-box' onClick={()=>setBtnActive("#saved")} className={btnActive === "#saved" ? "active" : ""}>
      <img src={download} alt="Home" width={30} height={30} className='margin'/>
        <span>Saved</span>
      </div>

      <div id='L-box' onClick={()=>setBtnActive("#settings")} className={btnActive === "#settings" ? "active" : ""}>
      <img src={star} alt="Home" width={30} height={30} className='margin'/>
        <span>Settings</span>
      </div>
      <div id='L-box' onClick={()=>setBtnActive("#scanner")} className={btnActive === "#scanner" ? "active" : ""}>
      <img src={star} alt="Home" width={30} height={30} className='margin'/>
        <span>Scanner</span>
      </div>

      <div className="left-user">
        <Link to="/profile" style={{textDecoration:"none",color:"black"}}>
          <div className="user-name-userid">
            <img src={profileImg ? (profileImg) : Profile} alt="" />
              <div className='L-user'>
                <h1>{modelDetails ? (modelDetails.ModelName) : "Vijay"}</h1>
                <span>{modelDetails ? (modelDetails.ModelUserName) : "@vijay98"}</span>
            </div>
          </div>
        </Link>
        <MoreHorizIcon onClick={()=>setLogOutExit(!logOutExit)} className='vert'/>
          
          {logOutExit && (
            <div className="logOutExitContainer">
              <button>Add an existing account</button>
              <Link to="/" style={{width:"100%"}}><button>Log out @vijay98</button></Link>
            </div>
          )}
      </div>

    </div>
  )
}

export default Left