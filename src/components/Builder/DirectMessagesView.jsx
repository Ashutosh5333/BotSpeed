// src/components/Builder/DirectMessagesView.js
import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button, // Make sure to import Button if it's used in the JSX below
} from "@mui/material";
import {
  Send as SendIcon,
  EmojiEmotions as EmojiEmotionsIcon,
} from "@mui/icons-material";

import PhoneHeader from "./PhoneHeader";
import MessageBubble from "./MessageBubble"; // Assuming this component exists
import {
  StyledPhoneCommentsFooter,
  StyledPhoneDMFooter,
  StyledPhoneFooter,
  StyledPhoneScreen,
} from "../Style/Styled";

function DirectMessagesView({
  setActiveSection,
  dmMessage,
  setDmMessage,
  dmHistory,
  handleSendDm,
}) {
  return (
    <>
      <PhoneHeader
        title="Chat with User"
        onBack={() => setActiveSection("posts")}
        onMore={() => {}}
      />
      <StyledPhoneScreen
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <MessageBubble
          type="received"
          text="Hey there! I'm so happy you're here, thanks so much for your interest 😊"
        />
        <MessageBubble
          type="received"
          text="Click below and I'll send you the link in just a sec ✨"
        />
        <MessageBubble type="received">
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#25D366",
              "&:hover": { backgroundColor: "#1DA851" },
            }}
          >
            Send me the link
          </Button>
        </MessageBubble>
        {dmHistory.map((msg, index) => (
          <MessageBubble key={index} type={msg.type} text={msg.text} />
        ))}
      </StyledPhoneScreen>

      {/* ============>  Footer message  <============== */}

      <StyledPhoneDMFooter>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Write a message"
          value={dmMessage}
          onChange={(e) => setDmMessage(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#333333", // Dark background for the input field itself
              color: "#ffffff", // White text color for user input
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
            startAdornment: (
              <InputAdornment position="start">
                <EmojiEmotionsIcon sx={{ color: "#b0b0b0" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSendDm}
                  edge="end"
                  sx={{ color: "#ffffff" }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </StyledPhoneDMFooter>
    </>
  );
}

export default DirectMessagesView;
