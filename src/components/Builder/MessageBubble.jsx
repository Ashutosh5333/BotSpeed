import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

function MessageBubble({ type, text, children, userImage }) {
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
      {isReceived && userImage && (
        <Avatar src={userImage} sx={{ width: 24, height: 24, mr: 0.5 }} />
      )}
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
