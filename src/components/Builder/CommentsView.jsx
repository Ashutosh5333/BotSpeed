import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import PhoneHeader from "./PhoneHeader";
import { StyledPhoneCommentsFooter, StyledPhoneFooter, StyledPhoneScreen } from "../Style/Styled";

// Dummy data for comments - replace with your actual data structure
const commentsData = [
  {
    avatarBg: "#FFC107",
    initial: "U",
    username: "Username",
    text: "This is a great comment!",
  },
  {
    avatarBg: "#9C27B0",
    initial: "A",
    username: "AnotherUser",
    text: "I agree, very insightful.",
  },
];


function PhoneScreen({ children }) {
  return <StyledPhoneScreen>{children}</StyledPhoneScreen>;
}
function PhoneFooter({ children }) {
  return <StyledPhoneCommentsFooter>{children}</StyledPhoneCommentsFooter>;
}

function CommentsView({ setActiveSection, commentText, setCommentText }) {
  //   const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    console.log("Comment added:", commentText);
    setCommentText("");
  };

  return (
    <>
      <PhoneHeader
        title="Comments"
        onBack={() => setActiveSection("posts")}
        onMore={() => {}}
      />
      <PhoneScreen>
        {/* <Typography variant="h6" sx={{ mb: 2, color: "#ffffff" }}>
          Comments on "WhatsApp Hits 3 Billion Users!"
        </Typography> */}

        {commentsData.map((comment, index) => (
          <Box key={index} display="flex" alignItems="flex-start" mb={2}>
            <Avatar sx={{ bgcolor: comment.avatarBg, mr: 1.5 }}>
              {comment.initial}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ color: "#ffffff" }}
              >
                {comment.username}
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                {comment.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#bdbdbd", cursor: "pointer" }}
              >
                Reply
              </Typography>
            </Box>
          </Box>
        ))}
      </PhoneScreen>
      <PhoneFooter 
      mb={"20px"}
    //    pb={"120px"} 
      py={20}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment..." // This is your placeholder text
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          // --- FIX STARTS HERE ---
          InputLabelProps={{
            shrink: true, // This forces the label (if you had one) to always shrink
          }}
          // --- FIX ENDS HERE ---
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
            // Ensure placeholder is visible and styled for dark mode
            "& .MuiInputBase-input::placeholder": {
              color: "#a0a0a0", // Lighter grey for placeholder text
              opacity: 1, // Crucially, ensure full opacity for the placeholder
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
                  onClick={() => handleAddComment()}
                  edge="end"
                  sx={{ color: "#ffffff" }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </PhoneFooter>
    </>
  );
}

export default CommentsView;
