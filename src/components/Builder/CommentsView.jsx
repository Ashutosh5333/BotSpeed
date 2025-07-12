import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import PhoneHeader from "./PhoneHeader"; // This header will be for the comments modal
import PostCard from "./PostCard"; // Keep PostCard for potential display within the modal if needed
import { StyledPhoneCommentsFooter, StyledPhoneScreen } from "../Style/Styled";
import CommentHeader from "./CommentHeader";

// Dummy data for comments - replace with your actual data structure
const commentsData = [
  {
    id: "c1",
    avatarBg: "#FFC107",
    initial: "U",
    username: "InstagramUser1",
    text: "This is a great comment! Loving the new features.",
  },
];

// Reusable component for the comments input footer
function CommentsInputFooter({ children }) {
  return (
    <StyledPhoneCommentsFooter
      sx={{
        height: "auto", // Allow content to dictate height
        minHeight: "50px", // Minimum height
        padding: "10px", // Add internal padding
        boxSizing: "border-box", // Include padding in element's total width and height
        // Position at the bottom of the modal, not the phone frame
        position: "relative", // Changed from absolute to relative to flow within the modal
        width: "100%",
        backgroundColor: "#1a1a1a", // Ensure background for the input area
        borderTop: "1px solid #444",
      }}
    >
      {children}
    </StyledPhoneCommentsFooter>
  );
}

// MODIFIED: CommentsView now acts as an overlay/modal
function CommentsView({
  setActiveSection,
  commentText,
  setCommentText,
  post,
  onAddComment,
  onClose,
  currentPostComments,
  setCurrentPostComments,
}) {
  // const [currentPostComments, setCurrentPostComments] = useState(
  //   commentsData // Initialize with dummy data
  // );

  // useEffect(() => {
  //   // In a real app, you'd fetch comments for `post.id` here
  //   if (post) {
  //     // Simulate loading comments for the selected post
  //     setCurrentPostComments(commentsData);
  //   } else {
  //     setCurrentPostComments([]);
  //   }
  // }, [post]);

  const handleLocalAddComment = () => {
    if (commentText.trim() && post) {
      const newComment = {
        id: Date.now().toString(),
        avatarBg: "#25D366",
        initial: "Y",
        username: "You",
        text: commentText.trim(),
      };
      setCurrentPostComments((prevComments) => [...prevComments, newComment]);
      onAddComment(commentText); // Clear the input field in App.js
    }
  };
  //  console.log("commentText=====>",commentText)

  if (!post) {
    return null; // Don't render the modal if no post is selected
  }

  return (
    <Box
      sx={{
        position: "absolute", // Position over the existing content
        bottom: 0, // Start from the bottom
        left: 0,
        right: 0,
        height: "60%", // Display over 60% of the phone screen (40% of post visible)
        backgroundColor: "#1a1a1a", // Dark background for the modal
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderRadius: "12px 12px 0 0", // Rounded top corners
        boxShadow: "0px -4px 20px rgba(0,0,0,0.5)",
        zIndex: 100, // Higher z-index to overlay
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Hide overflow for internal scrolling
      }}
    >
      {/* Modal Header */}
      <CommentHeader
        title="Comments"
        onMore={() => {}}
        sx={{
          borderBottom: "none",
          backgroundColor: "#1a1a1a",
          paddingTop: "10px",
        }}
      />

      {/* Scrollable Comments Section */}
      <Box
        sx={{
          flexGrow: 1, // Take all available space
          overflowY: "auto", // Enable scrolling for comments
          padding: "10px 0", // Vertical padding
          backgroundColor: "#1a1a1a", // Ensure background is dark
       
        }}
      >
        {currentPostComments.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 , color:"#ffffff"}}
          >
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          currentPostComments.map((comment) => (
            <Box
              key={comment.id}
              display="flex"
              alignItems="flex-start"
              mb={2}
              px={2}
            >
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
          ))
        )}
      </Box>
      {/* Comments Input Footer */}
      <CommentsInputFooter>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#333333",
              color: "#ffffff",
              borderRadius: "20px",
              "& fieldset": { borderColor: "#555555" },
              "&:hover fieldset": { borderColor: "#777777" },
              "&.Mui-focused fieldset": { borderColor: "#25D366" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#a0a0a0",
              opacity: 1,
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
                  onClick={handleLocalAddComment}
                  edge="end"
                  disabled={!commentText.trim()}
                  sx={{ color: "#25D366" }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CommentsInputFooter>
    </Box>
  );
}

export default CommentsView;
