import React, { useState } from 'react';
import { Typography, Avatar, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import './Sidebar.css'; // Ensure correct path to Sidebar.css

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([
    { name: 'nikovirtanen', initials: 'NV', subscribed: false },
    { name: 'christianbardenhorst', initials: 'CB', subscribed: false },
    { name: 'derrickchan', initials: 'DC', subscribed: false },
    { name: 'jamesfraser', initials: 'JF', subscribed: false },
    { name: 'lauramartinez', initials: 'LM', subscribed: false },
    { name: 'emilykim', initials: 'EK', subscribed: false },
    { name: 'tomsimmons', initials: 'TS', subscribed: false },
    { name: 'rachelbaker', initials: 'RB', subscribed: false },
    { name: 'michaelhernandez', initials: 'MH', subscribed: false },
    { name: 'samanthasmith', initials: 'SS', subscribed: false }
  ]);

  const handleMenuClick = (event, account) => {
    setAnchorEl(event.currentTarget);
    setSelectedAccount(account);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAccount(null);
  };

  const handleSubscribeToggle = (index) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account, i) =>
        i === index ? { ...account, subscribed: !account.subscribed } : account
      )
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <Typography variant="h6" className="section-title">Suggested Accounts</Typography>
        <div className="accounts">
          {accounts.map((account, index) => (
            <div className="account" key={account.name}>
              <div className="account-details">
                <Avatar className="avatar">{account.initials}</Avatar>
                <Typography variant="subtitle1" className="account-name">{account.name}</Typography>
              </div>
              <IconButton onClick={(event) => handleMenuClick(event, account)}>
                <MoreVert style={{ color: "white" }} />
              </IconButton>
              <Button
                variant="contained"
                className="subscribe-button"
                sx={{
                  backgroundColor: account.subscribed ? '#399918' : '#1976d2',
                  '&:hover': {
                    backgroundColor: account.subscribed ? '#397B23' : '#115293',
                  },
                }}
                onClick={() => handleSubscribeToggle(index)}
              >
                {account.subscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Block</MenuItem>
      </Menu>
    </div>
  );
};

export default Sidebar;
