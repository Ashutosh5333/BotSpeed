import React from "react";
import { Avatar, CardContent } from "@mui/material";
import { StyledPostCard } from "../Style/Styled"; // Assuming StyledPostCard is a styled component or a Paper
import {
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Send as SendIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
  MoreVert as MoreVertIcon, // Import the MoreVert icon
} from "@mui/icons-material";

export default function PostCard({
  post,
  onAddComment, // Keep if still used internally, but likely not directly for comment input on card
  commentText, // Keep if still used internally
  onCommentTextChange, // Keep if still used internally
  onViewComments, // NEW PROP: Function to call when comments are clicked
}) {
  return (
    // Apply dark background to the StyledPostCard or its content wrapper
    <StyledPostCard
      sx={{
        backgroundColor: "#1a1a1a", // Dark background for the card
        color: "#ffffff", // Default text color for the card
        borderRadius: "12px", // Ensure rounded corners
        width: "100%", // Ensure the card takes full width of its container
        // height: "100vh", // REMOVED: This was causing layout issues
        height: "auto", // Let content dictate height
        boxSizing: "border-box", // Include padding and border in the element's total width and height
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar
            src={post.avatar} // Use post.avatar for dynamic avatar
            alt={post.user}
            sx={{ bgcolor: "#25D366", mr: 1 }}
          />
          <Typography variant="subtitle2" fontWeight="bold" color="#ffffff">
            {post.user}
          </Typography>
          
          {/* Group time and MoreVertIcon, push to auto left margin */}

          <Box display="flex" alignItems="center" ml="auto" gap={0.5}>
            <IconButton size="small" sx={{ color: "#b0b0b0" }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Post Image */}
        <img
          src={post.image}
          alt="Post"
          style={{ width: "100%", borderRadius: "8px" }}
        />

        {/* Action Buttons: Likes, Comments, Share, Bookmark */}
        <Box
          display="flex"
          justifyContent="space-between" // Changed to space-between
          alignItems="center"
          // mt={1}
        >
          <Box>
            <IconButton size="small" sx={{ color: "#ffffff", mr: 1 }}>
              {" "}
              {/* Added mr={1} */}
              <FavoriteBorderIcon />{" "}
              <Typography variant="caption" ml={0.5}>
                {post.likes}
              </Typography>
            </IconButton>
           
            {/* MODIFIED: Add onClick to ChatBubbleOutlineIcon to view comments */}
           
            <IconButton
              size="small"
              sx={{ color: "#ffffff", mr: 1 }}
              onClick={() => onViewComments(post)} // Trigger view comments for this post
            >
              <ChatBubbleOutlineIcon />{" "}
              <Typography variant="caption" ml={0.5}>
                {post.comments}
              </Typography>
            </IconButton>
            <IconButton size="small" sx={{ color: "#ffffff" }}>
              <ShareIcon />
            </IconButton>
          </Box>

          <IconButton size="small" sx={{ color: "#ffffff" }}>
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
        {/* Post Caption */}
        <Typography variant="body2" mb={1} color="#ffffff">
          {post.caption || post.content}
        </Typography>
      </CardContent>
    </StyledPostCard>
  );
}


