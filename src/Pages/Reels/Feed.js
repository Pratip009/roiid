import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Drawer, CircularProgress, Grid, Menu, MenuItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ReplyIcon from '@mui/icons-material/Reply'; // Added ReplyIcon
import './reels.css'; // Ensure this CSS file exists and styles are applied correctly
import { getVideos } from '../../GlobalApi'; // Adjust import path as per your project structure

const STRAPI_BASE_URL = "http://localhost:1337"; // Base URL for Strapi

const Feed = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await getVideos(); // Replace with actual API call

        if (response.data && Array.isArray(response.data.data)) {
          const fetchedReels = response.data.data.map(item => ({
            id: item.id,
            user: item.attributes.caption || 'Unknown',
            avatar: 'NV', // Replace with actual avatar logic
            videoUrl: `${STRAPI_BASE_URL}${item.attributes.reel?.data?.attributes?.url || ''}`,
            description: item.attributes.comments || 'No comments',
            caption: item.attributes.reel?.data?.attributes?.name || 'No caption',
            likes: item.attributes.likes || 0,
            comments: [ // Dummy comments for demo
              { id: 1, user: 'User1', text: 'This is a comment.', likes: 5 },
              { id: 2, user: 'User2', text: 'Another comment here.', likes: 10 },
              { id: 3, user: 'User3', text: 'Yet another comment.', likes: 3 }
            ]
          }));
          setReels(fetchedReels);
        } else {
          setError('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching reels:', error);
        setError('Error fetching reels');
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const handleLikeClick = () => {
    setClicked(!clicked);
    setClickCount(clickCount + 1);
    // Implement API call to update likes on the server
  };

  const toggleDrawer = (reel) => async () => {
    setSelectedReel(reel);
    setDrawerOpen(true); // Open the drawer
    // Set comments for the selected reel
    setComments(reel.comments); // Set comments for the selected reel
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (platform) => {
    const shareUrl = `https://example.com/share`; // Replace with your actual share URL
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'instagram':
        // Example of opening Instagram, usually requires a specific library or app integration
        console.log('Opening Instagram share...');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      default:
        break;
    }
    handleShareClose();
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress color="primary" />
      </Grid>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  return (
    <div className="feed">
      {reels.map((reel) => (
        <Card key={reel.id} className="feed-post">
          <CardContent className="post-content">
            <Avatar className="avatar">{reel.avatar}</Avatar>
            <Typography variant="h6">{reel.user}</Typography>
            <Typography variant="body2">{reel.description}</Typography>
          </CardContent>
          <video controls width="100%" style={{ marginBottom: '8px' }}>
            <source src={reel.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={{ padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <IconButton aria-label="add to favorites" onClick={handleLikeClick} color={clicked ? 'secondary' : 'default'}>
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" style={{ marginLeft: '4px' }}>Likes: {reel.likes}</Typography>
              </div>
              <div>
                <IconButton aria-label="comment" onClick={toggleDrawer(reel)}>
                  <CommentIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={handleShareClick}>
                  <ShareIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleShareClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={() => handleShare('facebook')}>Facebook</MenuItem>
                  <MenuItem onClick={() => handleShare('twitter')}>Twitter</MenuItem>
                  <MenuItem onClick={() => handleShare('instagram')}>Instagram</MenuItem>
                  <MenuItem onClick={() => handleShare('whatsapp')}>WhatsApp</MenuItem>
                </Menu>
              </div>
            </div>
            <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <div style={{ padding: '16px' }}>
                <Typography variant="h6">Comments</Typography>
                {comments.map((comment, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <Avatar className="avatar">{comment.user.charAt(0)}</Avatar>
                    <div style={{ marginLeft: '8px', flexGrow: 1 }}>
                      <Typography variant="body1">{comment.text}</Typography>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '4px' }}>
                        <IconButton aria-label="like comment" color="secondary">
                          <FavoriteIcon />
                        </IconButton>
                        <Typography variant="body2" style={{ marginLeft: '4px', marginRight: '8px' }}>{comment.likes}</Typography>
                        <IconButton aria-label="reply comment">
                          <ReplyIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && <Typography variant="body2">No comments yet</Typography>}
              </div>
            </Drawer>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
