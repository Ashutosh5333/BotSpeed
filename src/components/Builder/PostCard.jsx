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
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function PostCard({
  post,
  onAddComment,
  commentText,
  onCommentTextChange,
  onViewComments,
}) {
  return (
    // Apply dark background to the StyledPostCard or its content wrapper
    <StyledPostCard
      sx={{
        backgroundColor: "#1a1a1a", // Da
        color: "#ffffff", // Defau
        borderRadius: "12px",
        width: "100%",
        height: "auto", //
        boxSizing: "border-box",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          {/* <Avatar
            src={post.avatar} // Use post.avatar for dynamic avatar
            alt={post.user}
            sx={{ bgcolor: "#25D366", mr: 1 }}
          /> */}
          <Box
            sx={{
              // backgroundColor: '#1a1a1a',
              backgroundColor: "#ffffff",
              p: 0.4, // Padding around the icon
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10px", // Just for demonstration
              borderRadius: "20px",
            }}
            mr={1}
          >
            <LocalHospitalIcon
              sx={{
                fontSize: 20, // Larger size for better visibility
                color: "#1a1a1a", // Set the icon color to white
              }}
            />
          </Box>
          <Typography variant="subtitle2" fontWeight="bold" color="#ffffff">
            {/* {post.user} */}
            {"Botspacehq"}
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

        <Box
          display="flex"
          justifyContent="space-between" // Changed to space-between
          alignItems="center"
          // mt={1}
        >
          <Box>
            <IconButton size="small" sx={{ color: "#ffffff", mr: 1 }}>
              {" "}
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
