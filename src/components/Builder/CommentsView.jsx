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

// Dummy data for comments - replace with your actual data structure
const commentsData = [
  {
    id: "c1",
    avatarBg: "#FFC107",
    initial: "U",
    username: "InstagramUser1",
    text: "This is a great comment! Loving the new features.",
  },
  {
    id: "c2",
    avatarBg: "#9C27B0",
    initial: "A",
    username: "AnotherUser",
    text: "I agree, very insightful. Keep up the good work!",
  },
  {
    id: "c3",
    avatarBg: "#2196F3",
    initial: "D",
    username: "DevMaster",
    text: "Looking forward to more updates! This is awesome.",
  },
  {
    id: "c4",
    avatarBg: "#E91E63",
    initial: "G",
    username: "GamerPro",
    text: "Nice post! What's next?",
  },
  {
    id: "c5",
    avatarBg: "#4CAF50",
    initial: "S",
    username: "SocialGuru",
    text: "Engaging content as always!",
  },
  {
    id: "c6",
    avatarBg: "#FF9800",
    initial: "T",
    username: "TechFan",
    text: "So true! This is exactly what I needed.",
  },
  {
    id: "c7",
    avatarBg: "#673AB7",
    initial: "C",
    username: "CreativeMind",
    text: "Inspiring! Thanks for sharing.",
  },
  {
    id: "c8",
    avatarBg: "#00BCD4",
    initial: "L",
    username: "LifeHacker",
    text: "Great tips, very helpful!",
  },
  {
    id: "c9",
    avatarBg: "#F44336",
    initial: "P",
    username: "PixelArt",
    text: "Love the visuals!",
  },
  {
    id: "c10",
    avatarBg: "#795548",
    initial: "R",
    username: "ReaderX",
    text: "Well written, captivating!",
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
}) {
  const [currentPostComments, setCurrentPostComments] = useState(
    commentsData // Initialize with dummy data
  );

  useEffect(() => {
    // In a real app, you'd fetch comments for `post.id` here
    if (post) {
      // Simulate loading comments for the selected post
      setCurrentPostComments(commentsData);
    } else {
      setCurrentPostComments([]);
    }
  }, [post]);

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
        borderRadius: "12px 12px 0 0", // Rounded top corners
        boxShadow: "0px -4px 20px rgba(0,0,0,0.5)",
        zIndex: 100, // Higher z-index to overlay
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Hide overflow for internal scrolling
      }}
    >
      {/* Modal Header */}
      <PhoneHeader
        title="Comments"
        onBack={onClose} // Use onClose prop to close the modal
        onMore={() => {}}
        sx={{
          borderBottom: "none", // Remove border from this header
          backgroundColor: "#1a1a1a", // Ensure header background is dark
          paddingTop: "10px", // Adjust padding for modal header
        }}
      />
      <Divider sx={{ borderColor: "#444", mx: 2 }} />{" "}
      {/* Divider below header */}
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
            sx={{ mt: 2 }}
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

// =================>  Prev Code <====================

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   TextField,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import SendIcon from "@mui/icons-material/Send";
// import PhoneHeader from "./PhoneHeader";
// import { StyledPhoneCommentsFooter, StyledPhoneFooter, StyledPhoneScreen } from "../Style/Styled";

// // Dummy data for comments - replace with your actual data structure
// const commentsData = [
//   {
//     avatarBg: "#FFC107",
//     initial: "U",
//     username: "Username",
//     text: "This is a great comment!",
//   },
//   {
//     avatarBg: "#9C27B0",
//     initial: "A",
//     username: "AnotherUser",
//     text: "I agree, very insightful.",
//   },
// ];

// function PhoneScreen({ children }) {
//   return <StyledPhoneScreen>{children}</StyledPhoneScreen>;
// }
// function PhoneFooter({ children }) {
//   return <StyledPhoneCommentsFooter>{children}</StyledPhoneCommentsFooter>;
// }

// function CommentsView({ setActiveSection, commentText, setCommentText }) {
//   //   const [commentText, setCommentText] = useState("");

//   const handleAddComment = () => {
//     console.log("Comment added:", commentText);
//     setCommentText("");
//   };

//   return (
//     <>
//       <PhoneHeader
//         title="Comments"
//         onBack={() => setActiveSection("posts")}
//         onMore={() => {}}
//       />
//       <PhoneScreen>

//         {commentsData.map((comment, index) => (
//           <Box key={index} display="flex" alignItems="flex-start" mb={2}>
//             <Avatar sx={{ bgcolor: comment.avatarBg, mr: 1.5 }}>
//               {comment.initial}
//             </Avatar>
//             <Box>
//               <Typography
//                 variant="subtitle2"
//                 fontWeight="bold"
//                 sx={{ color: "#ffffff" }}
//               >
//                 {comment.username}
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
//                 {comment.text}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{ color: "#bdbdbd", cursor: "pointer" }}
//               >
//                 Reply
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//       </PhoneScreen>
//       <PhoneFooter
//       mb={"20px"}
//     //    pb={"120px"}
//       py={20}
//       >
//         <TextField
//           fullWidth
//           variant="outlined"
//           size="small"
//           placeholder="Add a comment..." // This is your placeholder text
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           // --- FIX STARTS HERE ---
//           InputLabelProps={{
//             shrink: true, // This forces the label (if you had one) to always shrink
//           }}
//           // --- FIX ENDS HERE ---
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               backgroundColor: "#333333", // Dark background for the input field itself
//               color: "#ffffff", // White text color for user input
//               "& fieldset": {
//                 borderColor: "#555555", // Border color for the outline
//               },
//               "&:hover fieldset": {
//                 borderColor: "#777777",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "#ffffff",
//               },
//             },
//             // Ensure placeholder is visible and styled for dark mode
//             "& .MuiInputBase-input::placeholder": {
//               color: "#a0a0a0", // Lighter grey for placeholder text
//               opacity: 1, // Crucially, ensure full opacity for the placeholder
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EmojiEmotionsIcon sx={{ color: "#b0b0b0" }} />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => handleAddComment()}
//                   edge="end"
//                   sx={{ color: "#ffffff" }}
//                 >
//                   <SendIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </PhoneFooter>
//     </>
//   );
// }

// export default CommentsView;
