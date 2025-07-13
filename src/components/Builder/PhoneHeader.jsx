import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call"; // Import CallIcon
import VideoCallIcon from "@mui/icons-material/VideoCall"; // Import VideoCallIcon
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// Assuming PhoneHeader receives userName, userAvatar, onCall, onVideoCall, onBack, onMore
function PhoneHeader({
  title,
  userName,
  userAvatar,
  onBack,
  onCall,
  onVideoCall,
  onMore,
}) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#212424" }}>
      {" "}
      {/* Maintain existing background color */}
      <Toolbar>
        {!userAvatar && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, ml: 1 }}>
          {userAvatar && (
            // <Avatar
            //   src={userAvatar}
            //   alt={userName}
            //   sx={{ width: 24, height: 24, mr: 1 }}
            // />
            <Box
            sx={{
              // backgroundColor: '#1a1a1a', 
              backgroundColor: '#ffffff', 
              p: .4, // Padding around the icon
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '10px', // Just for demonstration
              borderRadius: '20px',
            }}
          >
            <LocalHospitalIcon
              sx={{
                fontSize: 20, // Larger size for better visibility
                color: '#1a1a1a', // Set the icon color to white
              }}
            />
          </Box>
          )}
          <Typography variant="h6" component="div"  fontSize={12} p={1}>
            {/* {userName || title}  */}
           { title || "Botspacehq"}
          </Typography>
        </Box>

        {/* Call and Video Call Icons */}
        {onCall && (
          <IconButton color="inherit" onClick={onCall}>
            <CallIcon />
          </IconButton>
        )}
        {onVideoCall && (
          <IconButton color="inherit" onClick={onVideoCall}>
            <VideoCallIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default PhoneHeader;
