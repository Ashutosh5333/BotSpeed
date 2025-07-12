import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call"; // Import CallIcon
import VideoCallIcon from "@mui/icons-material/VideoCall"; // Import VideoCallIcon
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Assuming PhoneHeader receives userName, userAvatar, onCall, onVideoCall, onBack, onMore
function PhoneHeader({ userName, userAvatar, onBack, onCall, onVideoCall, onMore }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#212424" }}> {/* Maintain existing background color */}
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 1 }}>
          {userAvatar && (
            <Avatar src={userAvatar} alt={userName} sx={{ width: 32, height: 32, mr: 1 }} />
          )}
          <Typography variant="h6" component="div">
            {userName || "Chat"} {/* Display the user's name */}
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
        {onMore && (
          <IconButton edge="end" color="inherit" onClick={onMore}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default PhoneHeader;



// Prev Code 
// import { IconButton, Typography } from "@mui/material";
// import { StyledPhoneHeader } from "../Style/Styled";

// import {
//   EmojiEmotions as EmojiEmotionsIcon,
//   MoreVert as MoreVertIcon,
//   ArrowBack as ArrowBackIcon,
// } from "@mui/icons-material";

// export default function PhoneHeader({ title, onBack, onMore }) {
//   return (
//     <StyledPhoneHeader>
//       <IconButton size="small" onClick={onBack}>
//         <ArrowBackIcon color="#ffffff" sx={{ color: '#ffffff' }}/>
//       </IconButton>
//       <Typography variant="subtitle1" fontWeight="bold">
//         {title}
//       </Typography>
//       <IconButton size="small" onClick={onMore}>
//         <MoreVertIcon />
//       </IconButton>
//     </StyledPhoneHeader>
//   );
// }
