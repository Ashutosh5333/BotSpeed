import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import {
  Send as SendIcon,
  EmojiEmotions as EmojiEmotionsIcon,
} from "@mui/icons-material";

import PhoneHeader from "./PhoneHeader";
import MessageBubble from "./MessageBubble";
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
  // Add these props to receive user information
  chattingWithUserName = "Jane Doe", // Example: Name of the person you're chatting with
  chattingWithUserAvatar = "https://via.placeholder.com/40?text=JD", // Example: Avatar of the person you're chatting with
  currentUserAvatar = "https://via.placeholder.com/40?text=You", // Example: Avatar of the current user
}) {
  return (
    <>
      <PhoneHeader
        userName={chattingWithUserName} // Pass the user's name
        userAvatar={chattingWithUserAvatar} // Pass the user's avatar for the header
        onBack={() => setActiveSection("posts")}
        onCall={() => console.log("Initiate voice call")} // Placeholder for voice call action
        onVideoCall={() => console.log("Initiate video call")} // Placeholder for video call action
        // onMore is already present if you're using it
      />
      <StyledPhoneScreen
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        p={1}
      >
        {/* Existing message bubbles, now with userImage prop */}
        <MessageBubble
          type="received"
          text={`Hey there! I'm so happy you're here, thanks so much for your interest 😊\n\nClick below and I'll send you the link in just a sec ✨`}
          userImage={chattingWithUserAvatar} // Avatar for the sender of these received messages
        />

        <MessageBubble type="received" userImage={chattingWithUserAvatar}>
          {/* Avatar for received messages */}
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#212424", // Maintain existing button color
            }}
          >
            Send me the link
          </Button>
        </MessageBubble>

        {/* Map through dmHistory, adding userImage based on message type */}
        {dmHistory.map((msg, index) => (
          <MessageBubble
            key={index}
            type={msg.type}
            text={msg.text}
            // Conditionally pass the avatar based on whether the message was sent or received
            userImage={
              msg.type === "sent" ? currentUserAvatar : chattingWithUserAvatar
            }
          />
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
