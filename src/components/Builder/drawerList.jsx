import React from 'react';
import { Box } from '@mui/material';
import {
  Home as HomeIcon,
  Chat as ChatIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
  Send as SendIcon,
} from '@mui/icons-material';

export const SidebarContent = ({ setActiveSection }) => {
  return (
    <Box
      sx={{
        width: 50,
        height: '100vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        // border: '1px solid rgba(0, 0, 0, 0.12)', // Only box border
        borderRadius: '8px', // Optional
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: 1,
      }}
      role="navigation"
    >
      <IconButtonBox onClick={() => setActiveSection('posts')}>
        <HomeIcon />
      </IconButtonBox>

      <IconButtonBox onClick={() => setActiveSection('stories')}>
        <StoreIcon />
      </IconButtonBox>

      <IconButtonBox onClick={() => setActiveSection('comments')}>
        <ChatIcon />
      </IconButtonBox>

      <IconButtonBox onClick={() => setActiveSection('dm')}>
        <SendIcon />
      </IconButtonBox>

      <IconButtonBox onClick={() => setActiveSection('settings')}>
        <SettingsIcon />
      </IconButtonBox>
    </Box>
  );
};

// Reusable icon box style
const IconButtonBox = ({ children, onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      width: '100%',
      cursor: 'pointer',
      '&:hover': {
        bgcolor: 'action.hover',
      },
    }}
  >
    {children}
  </Box>
);
