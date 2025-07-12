import React from 'react';
import { Box, List, ListItem } from '@mui/material';
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
        // Removed: borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        height: '100vh',
        overflow: 'auto',
        paddingTop: '64px',
        bgcolor: 'background.paper',
      }}
      role="navigation"
    >
      <List>
        {/* Home Icon */}
        <ListItem
          component="button"
          onClick={() => setActiveSection('posts')}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 48,
            paddingY: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <HomeIcon />
        </ListItem>

        {/* Stories Icon */}
        <ListItem
          component="button"
          onClick={() => setActiveSection('stories')}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 48,
            paddingY: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <StoreIcon />
        </ListItem>

        {/* Comments Icon */}
        <ListItem
          component="button"
          onClick={() => setActiveSection('comments')}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 48,
            paddingY: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ChatIcon />
        </ListItem>

        {/* Direct Messages Icon */}
        <ListItem
          component="button"
          onClick={() => setActiveSection('dm')}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 48,
            paddingY: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <SendIcon />
        </ListItem>

        {/* Settings Icon */}
        <ListItem
          component="button"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 48,
            paddingY: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <SettingsIcon />
        </ListItem>
      </List>
    </Box>
  );
};