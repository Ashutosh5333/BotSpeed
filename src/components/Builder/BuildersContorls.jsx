import React from "react";
import {
  Typography,
  Box,
  Switch,
  TextField,
  Button,
  Chip,
  Paper,
  Divider,
  Avatar, // Added Avatar import
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

// Hardcoded sample stories for display as circular previews in BuilderControls
const sampleStories = [
  {
    id: "s1",
    user: "You",
    avatar: "https://via.placeholder.com/60/FF5733/FFFFFF?text=YOU",
    content: "Just posted about my new project! Check it out!",
    image: "https://picsum.photos/id/237/800/600", // Random image
  },
  {
    id: "s2",
    user: "TechDaily",
    avatar: "https://via.placeholder.com/60/33FF57/FFFFFF?text=TD",
    content: "Breaking news: AI advancements hit new heights!",
    image: "https://picsum.photos/id/238/800/600", // Random image
  },
  {
    id: "s3",
    user: "FoodieGuru",
    avatar: "https://via.placeholder.com/60/3357FF/FFFFFF?text=FG",
    content: "My latest recipe: Spicy Mango Salsa!",
    image: "https://picsum.photos/id/239/800/600", // Random image
  },
  {
    id: "s4",
    user: "TravelBug",
    avatar: "https://via.placeholder.com/60/FFFF33/000000?text=TB",
    content: "Dreaming of my next adventure in Bali.",
    image: "https://picsum.photos/id/240/800/600", // Random image
  },
  {
    id: "s5",
    user: "FitnessPro",
    avatar: "https://via.placeholder.com/60/FF33FF/FFFFFF?text=FP",
    content: "New workout routine for maximum gains!",
    image: "https://picsum.photos/id/241/800/600", // Random image
  },
];
export default function BuilderControls({
  postContent,
  onPostContentChange,
  onCreatePost,
  storyContent,
  onStoryContentChange,
  onCreateStory,
  onStoryPreviewClick, // New prop for handling clicks on the hardcoded story previews
  commentText,
  onCommentTextChange,
  onAddComment,
  activeStoryId, 
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        flex: 1,
        p: 3,
        borderRadius: "12px",
        overflowY: "auto",
        maxHeight: { xs: "50vh", md: "calc(100vh - 100px)" },
      }}
    >
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          a speific post or reel
        </Typography>
        <Box
          display="flex"
          overflow="auto"
          py={1}
          sx={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          {sampleStories.map((story) => (
            <Box
              key={story.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 2, // Spacing between stories
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => onStoryPreviewClick(story)} // Call the handler passed from App.js
            >
              <Avatar
                src={story.image}
                alt={story.user}
                variant="square" // This makes the Avatar square
                sx={{
                  width: 80,
                  height: 100,
                  borderRadius: "8px",
                  // Conditionally apply the blue border based on activeStoryId
                  border:
                    story.id === activeStoryId
                      ? "2px solid #2196F3" // Blue border for active story
                      : "2px solid transparent", // Transparent border for inactive stories
                }}
              />
              <Typography
                variant="caption"
                mt={0.5}
                sx={{ textAlign: "center" }}
              >
                {story.user.length > 8
                  ? story.user.substring(0, 7) + "..."
                  : story.user}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Optional: A "Show All" button if you had more stories */}
        <Button variant="text" size="small" sx={{ mt: 1 }}>
          Show All
        </Button>
      </Box>

      {/* Post Creation Section */}
      {/* <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Create a Post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="What's on your mind? (e.g., WhatsApp hits 3 Billion Users!)"
          value={postContent}
          onChange={onPostContentChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreatePost}
          sx={{
            backgroundColor: "#25D366",
            "&:hover": { backgroundColor: "#1DA851" },
          }}
        >
          Add Post
        </Button>
      </Box> */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* Story Creation Section */}
      {/* <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Create a Story
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          placeholder="Add story content..."
          value={storyContent}
          onChange={onStoryContentChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateStory}
          sx={{
            backgroundColor: "#25D366",
            "&:hover": { backgroundColor: "#1DA851" },
          }}
        >
          Add Story
        </Button>
      </Box> */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* Hardcoded Stories Display as Circular Previews */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* Comment Automation Settings Section */}
      {/* <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Comment Automation
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          When someone comments on:
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch defaultChecked />
          <Typography>A specific post or reel</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch />
          <Typography>Any post or reel</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Switch />
          <Typography>Next post or reel</Typography>
        </Box>

        <Typography variant="subtitle1" mt={2}>
          And this comment has:
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch defaultChecked />
          <Typography>A specific word or words</Typography>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Price"
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography variant="caption" color="textSecondary" mb={2}>
          Use commas to separate words. For example:{" "}
          <Chip label="Price" size="small" sx={{ mr: 0.5 }} />
          <Chip label="Link" size="small" sx={{ mr: 0.5 }} />
          <Chip label="Shop" size="small" />
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Switch />
          <Typography>Any word</Typography>
        </Box>

        <Typography variant="subtitle1" mt={2}>
          They will get:
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch defaultChecked />
          <Typography>An opening DM</Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          defaultValue="Hey there! I'm so happy you're here, thanks so much for your interest 😊 Click below and I'll send you the link in just a sec ✨"
          sx={{ mb: 1 }}
        />
        <Button variant="outlined" startIcon={<AddIcon />} sx={{ mb: 2 }}>
          Add a Link
        </Button>

        <Box display="flex" alignItems="center" mb={1}>
          <Switch />
          <Typography>A DM with the link</Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          placeholder="Write a message"
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add a Link
        </Button>
      </Box> */}

      {/* <Divider sx={{ my: 3 }} /> */}

      {/* Other Automation Settings Section */}
      {/* <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Other things to automate
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch defaultChecked />
          <Typography>
            Reply under the post so people feel seen and special
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch />
          <Typography>Follow up to re-engage and build trust</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch />
          <Typography>
            Automatically ask for a follow to build your audience
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Switch />
          <Typography>
            Ask for emails in DMs to keep in touch beyond social
          </Typography>
        </Box>
      </Box> */}
    </Paper>
  );
}
