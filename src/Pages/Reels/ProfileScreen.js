import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ProfileScreen = ({ onClose }) => {
  const [userName, setUserName] = useState("Pratip Kayal");
  const [bio, setBio] = useState("Testing");

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSave = () => {
    // Handle save logic here, like updating data in the backend
    onClose(); // Close the profile screen after saving
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Typography variant="h5">Profile</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div style={styles.content}>
        <Avatar
          alt="Profile"
          src="/static/images/avatar/1.jpg"
          style={styles.avatar}
        />
        <TextField
          label="Name"
          variant="outlined"
          value={userName}
          onChange={handleNameChange}
          style={styles.input}
        />
        <TextField
          label="Bio"
          variant="outlined"
          multiline
          rows={4}
          value={bio}
          onChange={handleBioChange}
          style={styles.input}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)", // Shadow at the bottom
    padding: "20px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    zIndex: 1000, // Ensure it appears above other content
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    marginBottom: "10px",
  },
};

export default ProfileScreen;
