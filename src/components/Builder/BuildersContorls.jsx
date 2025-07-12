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
  onStoryPreviewClick, // New prop for handling clicks on the hardcoded story previews
  commentText,
  onCommentTextChange,
  onAddComment,
  activeStoryId,
  currentStep, // New prop
  onNextStep,
  specificCommentWords, //  TextField value
  onSpecificCommentWordsChange, // Setter for the TextField value
  onAddSpecificWordAsComment,
}) {
  const handleChipClick = (word) => {
    // If the word is already in the text field, don't add it again or toggle
    const currentWords = specificCommentWords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!currentWords.includes(word)) {
      const newWords =
        currentWords.length > 0 ? `${specificCommentWords}, ${word}` : word;
      onSpecificCommentWordsChange(newWords);
      onAddSpecificWordAsComment(newWords);
    }
  };

  // const handleNextAndAddComment = () => {
  //   // Only add as comment if specific words input is active in current step
  //   if (currentStep === 1 && specificCommentWords.trim()) {
  //     const wordsArray = specificCommentWords
  //       .split(",")
  //       .map((word) => word.trim())
  //       .filter(Boolean);
  //     wordsArray.forEach((word) => {
  //       onAddSpecificWordAsComment(word); // Call the new handler from App.js for each word
  //     });
  //   }
  //   onNextStep(); // Always go to the next step
  // };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 1,
          borderRadius: "12px",
          overflowY: "auto",
          maxHeight: { xs: "50vh", md: "calc(100vh - 100px)" },
        }}
      >
        <Box mb={1} px={1}>
          <Typography
            variant="subtitle1"
            fontSize={16}
            fontWeight="bold"
            py={1}
          >
            When someone comments on:
          </Typography>
          {/* =======>  Post Stories  <======== */}
          <Box py={1} px={1} bgcolor="#f5f5f5" borderRadius="4px">
            <RadioGroup
              aria-label="specific-post-heading"
              name="specific-post-option"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                // mt:1,
              }}
            >
              <FormControlLabel
                value="specific"
                control={
                  <Radio
                    checked
                    sx={{
                      "&.Mui-checked": {
                        color: "#000", // Checked outer circle
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="h6"
                    alignContent={"center"}
                    fontSize={12}
                  >
                    A Specific Post or Reel
                  </Typography>
                }
              />
            </RadioGroup>

            {/* =========>   Storiesss list   <======== */}

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
                    mr: 0.1, // Spacing between stories
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
                </Box>
              ))}
            </Box>
            <Button
              variant="text"
              size={"small"}
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
            >
              Show All
            </Button>
          </Box>
        </Box>

        {/* ==========>   End  of  Stories  <=========== */}

        <Box mb={3} px={1}>
          <RadioGroup aria-label="post-or-reel" name="post-or-reel-options">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#f5f5f5"
              px={1}
              py={0.5}
              mb={1}
              borderRadius="8px"
            >
              <FormControlLabel
                value="any"
                control={
                  <Radio
                    bgcolor="#ffffff"
                    sx={{
                      "&.Mui-checked": {
                        color: "#000", // Checked outer circle
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                }
                label="Any post or reel"
              />
              <Box
                component="span"
                bgcolor="primary.light"
                color="white"
                p={0.6}
                px={2}
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
              py={0.5}
              borderRadius="8px"
            >
              <FormControlLabel
                value="next"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#000", // Checked outer circle
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                }
                label="Next post or reel"
              />
              <Box
                component="span"
                bgcolor="primary.light"
                color="white"
                p={0.6}
                px={2}
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
          <Box mb={3} px={1}>
            <Typography variant="subtitle1" mt={2} fontWeight="bold">
              And this comment has:
            </Typography>
            <Box bgcolor="#f5f5f5" px={1} py={1} borderRadius={2}>
              <Box display="flex" alignItems="center" mb={1}>
                <FormControlLabel
                  value="specific"
                  control={
                    <Radio
                      checked
                      sx={{
                        "&.Mui-checked": {
                          color: "#000", // Checked outer circle
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="A specific word or words"
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Price"
                size="small"
                sx={{ mb: 1 }}
                value={specificCommentWords} // Bind value
                onChange={(e) => onSpecificCommentWordsChange(e.target.value)} // Update state on change
              />
              <Typography variant="caption" color="textSecondary" mb={2}>
                Use commas to separate words. For example:{" "}
                <Chip
                  label="Price"
                  size="small"
                  sx={{ mr: 0.5, cursor: "pointer" }}
                  onClick={() => handleChipClick("Price")} // Add onClick
                />
                <Chip
                  label="Link"
                  size="small"
                  sx={{ mr: 0.5, cursor: "pointer" }}
                  onClick={() => handleChipClick("Link")} // Add onClick
                />
                <Chip
                  label="Shop"
                  size="small"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleChipClick("Shop")} // Add onClick
                />
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

        <Box px={1}>
          <Button
            variant="transparent"
            sx={{
              backgroundColor: "#e0e0e0", // light gray
              border: "2px solid #bdbdbd", // medium gray border
              color: "#000", // black text
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#d5d5d5",
              },
            }}
            onClick={onNextStep}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </>
  );
}
