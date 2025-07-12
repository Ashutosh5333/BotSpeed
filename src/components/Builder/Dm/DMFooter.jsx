import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // Import Camera icon
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"; // Import Image upload icon (or use PhotoLibraryIcon)
import { StyledPhoneDMFooter } from "../../Style/Styled";

function DMFooter({ dmMessage, setDmMessage, handleSendDm }) {

    
  return (
    <StyledPhoneDMFooter>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Message"
        value={dmMessage}
        onChange={(e) => setDmMessage(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#333333", // Dark background for the input field itself
            color: "#ffffff", // White text color for user input
            borderRadius: "20px", // Make it rounded
            "& fieldset": {
              borderColor: "#555555", // Border color for the outline
            },
            "&:hover fieldset": {
              borderColor: "#777777",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#a0a0a0", // Lighter grey for placeholder
            opacity: 1, // Ensure full opacity
          },
        }}
        InputProps={{
          // Start Adornment (Left side icons)
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 1 }}>
              {" "}
              {/* Add some right margin */}
              <IconButton sx={{ color: "#e0e0e0" }}>
                <CameraAltIcon />
              </IconButton>
            </InputAdornment>
          ),
          // End Adornment (Right side icons)
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ color: "#e0e0e0" }}>
                {" "}
                {/* Cooler white for image upload */}
                <AddPhotoAlternateIcon />
              </IconButton>
              <IconButton sx={{ color: "#e0e0e0" }}>
                {" "}
                {/* Cooler white for emoji */}
                <EmojiEmotionsIcon />
              </IconButton>
              <IconButton
                onClick={handleSendDm}
                edge="end"
                sx={{ color: "#ffffff" }} // Keep send button white, or change to #e0e0e0 for consistency
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </StyledPhoneDMFooter>
  );
}

export default DMFooter;
