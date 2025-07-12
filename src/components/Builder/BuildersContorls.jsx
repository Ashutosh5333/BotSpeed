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
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio, // Added Avatar import
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { sampleStories } from "../Constant";

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
  currentStep, // New prop
  onNextStep,
}) {
  return (
    <>
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
        <Box mb={3} py={1} px={1}>
          <Typography variant="subtitle1" fontSize={20} fontWeight="bold">
            When someone comments on:
          </Typography>
          {/* =======>  Post Stories  <======== */}
          <Box py={1} px={1} bgcolor="#f5f5f5" borderRadius="4px">
            <RadioGroup
              aria-label="specific-post-heading"
              name="specific-post-option"
            >
              <FormControlLabel
                value="specific"
                control={<Radio checked />}
                label={
                  <Typography variant="h6" alignContent={"center"} gutterBottom>
                    A Specific Post or Reel
                  </Typography>
                }
              />
            </RadioGroup>
            {/*  Storiesss list */}
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
            <Button variant="text" size="small">
              Show All
            </Button>
          </Box>
        </Box>
        {/* End of  Storiess */}

        <Box mb={3}>
          <RadioGroup aria-label="post-or-reel" name="post-or-reel-options">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#f5f5f5"
              p={1}
              mb={1}
              borderRadius="8px"
            >
              <FormControlLabel
                value="any"
                control={<Radio bgcolor="#ffffff" />}
                label="Any post or reel"
              />
              <Box
                component="span"
                bgcolor="blue"
                color="white"
                p={1}
                ml={2}
                borderRadius="4px"
              >
                Pro
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#f5f5f5"
              p={1}
              borderRadius="8px"
            >
              <FormControlLabel
                value="next"
                control={<Radio />}
                label="Next post or reel"
              />
              <Box
                component="span"
                bgcolor="blue"
                color="white"
                p={1}
                ml={2}
                borderRadius="4px"
              >
                Pro
              </Box>
            </Box>
          </RadioGroup>
        </Box>

        {/* Comment Automation Settings Section */}

        {currentStep >= 1 && (
          <Box mb={3}>
            <Typography variant="subtitle1" mt={2} fontWeight="bold">
              And this comment has:
            </Typography>
            <Box bgcolor="#f5f5f5" px={1} py={1} borderRadius={2}>
              <Box display="flex" alignItems="center" mb={1}>
                <FormControlLabel
                  value="specific"
                  control={<Radio checked />}
                  label="A specific word or words"
                />
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
            </Box>

            <Box
              display="flex"
              alignItems="center"
              mb={2}
              bgcolor="#f5f5f5"
              borderRadius={2}
              px={1}
              py={1}
              mt={1}
            >
              <FormControlLabel
                value="any"
                control={<Radio />}
                label="Any word"
              />
            </Box>
          </Box>
        )}

        {/*  DIRECT MESSAGE Sections */}

        {currentStep >= 2 && (
          <Box mb={2}>
            <Typography variant="subtitle1" mt={2} fontWeight={"bold"}>
              They will get:
            </Typography>
            <Box bgcolor="#f5f5f5" py={1} px={2} borderRadius={2}>
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
            </Box>

            <Box bgcolor="#f5f5f5" py={1} px={2} borderRadius={2} mt={1}>
              <Box display="flex" alignItems="center" mb={2}>
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
            </Box>
          </Box>
        )}

        {/* Other Automation Settings Section */}
        {currentStep >= 3 && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
              Other things to automate
            </Typography>
            <Box borderRadius={2}>
              {" "}
              {/* Added padding and border-radius to the main gray box */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                bgcolor="#f5f5f5"
                p={1}
                borderRadius={2}
              >
                <Typography>
                  Reply under the post so people feel seen and special
                </Typography>
                <Switch defaultChecked />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                bgcolor="#f5f5f5"
                p={1}
                borderRadius={2}
              >
                <Typography>Follow up to re-engage and build trust</Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    component="span"
                    bgcolor="blue"
                    color="white"
                    px={1}
                    py={0.5}
                    mr={1} /* Margin right to separate from switch */
                    borderRadius="4px"
                    fontSize="0.75rem" /* Smaller font size for Pro tag */
                  >
                    Pro
                  </Box>
                  <Switch />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                bgcolor="#f5f5f5"
                p={1}
                borderRadius={2}
              >
                <Typography>
                  Automatically ask for a follow to build your audience
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    component="span"
                    bgcolor="blue"
                    color="white"
                    px={1}
                    py={0.5}
                    mr={1}
                    borderRadius="4px"
                    fontSize="0.75rem"
                  >
                    Pro
                  </Box>
                  <Switch />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                bgcolor="#f5f5f5"
                p={1}
                borderRadius={2}
              >
                <Typography>
                  Ask for emails in DMs to keep in touch beyond social
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    component="span"
                    bgcolor="blue"
                    color="white"
                    px={1}
                    py={0.5}
                    mr={1}
                    borderRadius="4px"
                    fontSize="0.75rem"
                  >
                    Pro
                  </Box>
                  <Switch />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        <Button variant="contained" onClick={onNextStep}>
          Next
        </Button>
      </Paper>
    </>
  );
}
