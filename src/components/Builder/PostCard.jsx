import React, { useState } from "react";
import { Avatar, CardContent } from "@mui/material";
import { StyledPostCard } from "../Style/Styled";
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
} from "@mui/icons-material";

export default function PostCard({
  post,
  onAddComment,
  commentText,
  onCommentTextChange,
}) {
  return (
    <StyledPostCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ bgcolor: "#25D366", mr: 1 }}>B</Avatar>
          <Typography variant="subtitle2" fontWeight="bold">
            {post.user}
          </Typography>
          <Typography variant="caption" color="textSecondary" ml="auto">
            {post.time}
          </Typography>
        </Box>
        <img
          src={post.image}
          alt="Post"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
        />
        <Typography variant="body2" mb={1}>
          {post.caption}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          mt={1}
        >
          <IconButton size="small">
            <FavoriteBorderIcon /> {post.likes}
          </IconButton>
          <IconButton size="small">
            <ChatBubbleOutlineIcon /> {post.comments}
          </IconButton>
          <IconButton size="small">
            <ShareIcon />
          </IconButton>
          <IconButton size="small">
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment..."
          value={commentText}
          onChange={onCommentTextChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => onAddComment(post.id)} edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: 1 }}
        />
      </CardContent>
    </StyledPostCard>
  );
}
