import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // Import useHistory if you're using React Router
import tiktokLogo from '../../assets/name.png'; // Adjust the path as per your project structure
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProfileScreen from './ProfileScreen';
import axios from 'axios';

const BASE_URL = 'http://localhost:1337/api'; // Adjust if Strapi runs on a different port or host
const API_KEY = 'cf6fea057418accfbe588f223007bd786de9c42a6f55d987e4e167382074f748feb22209bf200239e6ad5c4e3e10c24aafa73cc78915bb327e68da3139507772dae880bd73ef5d33e0688229bf9d7f5fcfb8ae645ccc004ab1770142d6cd27c056e5b006e46f816e67c74ad2a82e9f51e05d1f0a690df7670340ab5e60f78409';

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const navigate = useNavigate(); // useHistory for navigation

  const toggleProfileScreen = () => {
    setShowProfile(!showProfile);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePost = async () => {
    setLoading(true);
    setUploadError('');
  
    try {
      const formData = new FormData();
      formData.append('files', videoFile);
      formData.append('data', JSON.stringify({ description }));
  
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
  
      setLoading(false);
      console.log('Video uploaded successfully:', response.data);
      alert('Video uploaded successfully!');
      toggleModal(); // Close modal after successful upload
      setVideoFile(null); // Clear selected video file
      setDescription(''); // Clear description input
    } catch (error) {
      setLoading(false);
      setUploadError('Failed to upload video. Please try again.');
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    }
  };

  const navigateToSubscribedVideos = () => {
    navigate('/subscribed-videos');// Navigate to the subscribed videos page
  };

  return (
    <header style={styles.header}>
      <div>
        <img src={tiktokLogo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.searchUploadContainer}>
        <input type="text" placeholder="Search..." style={styles.searchBar} />
        <div style={styles.spacer}></div> {/* Spacer to push items to the end */}
        <Avatar
          alt="Profile"
          src="/static/images/avatar/1.jpg"
          style={styles.profileButton}
          onClick={toggleProfileScreen}
        />
        <button style={styles.uploadButton} onClick={toggleModal}>
          Upload
        </button>
        <Button
          variant="contained"
          color="secondary"
          style={styles.subscribedButton}
          onClick={navigateToSubscribedVideos}
        >
          Subscribed Videos
        </Button>
        {showProfile && <ProfileScreen onClose={() => setShowProfile(false)} />}
      </div>
      <Modal open={showModal} onClose={toggleModal}>
        <div style={styles.modalContainer}>
          <Typography variant="h5" style={{ marginBottom: '20px' }}>
            Upload Video
          </Typography>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            style={{ marginBottom: '20px' }}
          />
           <TextField
            label="Title"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            multiline
            rows={1}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePost}
            disabled={loading || !videoFile}
          >
            {loading ? 'Uploading...' : 'Post'}
          </Button>
          {uploadError && (
            <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>
              {uploadError}
            </Typography>
          )}
        </div>
      </Modal>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundImage: 'linear-gradient(to right, orangered,orangered)',
    borderBottom: '1px solid #ddd',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: '100px',
    height: '80px',
    objectFit: 'contain',
  },
  searchUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center', // Center align the search bar and push items to the end
  },
  searchBar: {
    width: '400px',
    height: '40px',
    border: '2px solid #FFFFFF',
    borderRadius: '20px',
    padding: '0 15px',
    marginRight: '10px',
    marginLeft: '100px',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: '16px',
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    color: '#FF4500',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease-in-out',
  },
  profileButton: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    marginRight: '20px',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    minWidth: '300px',
    maxWidth: '600px',
    borderRadius: '10px',
    outline: 'none',
    textAlign: 'center',
  },
  spacer: {
    flex: 1, // This pushes the items to the end of the container
  },
  subscribedButton: {
    backgroundColor: '#00aaff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease-in-out',
    marginLeft: '10px',
  },
};

export default Header;
