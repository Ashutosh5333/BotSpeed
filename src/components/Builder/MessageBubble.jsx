import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { FaPlusSquare } from "react-icons/fa";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
function MessageBubble({ type, text, userImage, children }) {
  // console.log("type===>",type ,"userImage ====>,", userImage)
  const isReceived = type === "received";
  const alignment = isReceived ? "flex-start" : "flex-end";
  const bubbleColor = isReceived ? "#333333" : "#7346e3";
  const textColor = "#ffffff";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: alignment,
        mb: 1,
        alignItems: "flex-end",
      }}
    >
      {isReceived && (
        // <Avatar src={userImage} sx={{ width: 24, height: 24, mr: 0.5 }} />
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
          mr={0.4}
        >
          <LocalHospitalIcon
            sx={{
              fontSize: 20, // Larger size for better visibility
              color: "#1a1a1a", // Set the icon color to white
            }}
          />
        </Box>
      )}
      {/* <LocalHospitalIcon sx={{  mr: 0.5, color: 'text.secondary' }} />  */}

      <Box
        sx={{
          backgroundColor: bubbleColor,
          borderRadius: "15px",
          p: 1,
          maxWidth: "75%",
          wordBreak: "break-word",
          color: textColor,
        }}
      >
        {text && <Typography variant="body2">{text}</Typography>}
        {children}
      </Box>
    </Box>
  );
}

export default MessageBubble;

// Prev code
// import { StyledMessageBubble } from "../Style/Styled";
// export default function MessageBubble({ type, text, children }) {
//     return (
//       <StyledMessageBubble type={type}>
//         {text || children}
//       </StyledMessageBubble>
//     );
//   }
