import { styled } from "@mui/system";
import { Box, Card, Avatar, Typography } from "@mui/material";

export const StyledPhoneFrame = styled(Box)(({ theme }) => ({
  width: "300px",
  height: "600px",
  backgroundColor: "#000", // This sets the main frame background to black
  borderRadius: "36px",
  boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "20px",
    backgroundColor: "#222", // Dark notch
    borderRadius: "0 0 10px 10px",
    zIndex: 1,
  },
}));

export const StyledPhoneScreen = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: "#000", // This sets the main screen background to black
  borderRadius: "26px",
  overflowY: "auto",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
}));

export const StyledPhoneHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 10px",
  color: "#fff", // White text for header
  borderBottom: "1px solid #444", // Darker border
  marginTop: "0px",
  backgroundColor: "#1a1a1a", // Dark background for header
  zIndex: 1,
}));

//  comments
export const StyledPhoneCommentsFooter = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "50px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0 10px",
  borderTop: "1px solid #444", // Darker border
  // backgroundColor: '#1a1a1a', // Dark background for footer
  boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
  zIndex: 10,
}));

//  Styled for dm

export const StyledPhoneDMFooter = styled(Box)(({ theme }) => ({
  // REMOVE THIS LINE: position: 'absolute',
  bottom: 0, // This property is no longer relevant if not absolutely positioned
  left: 0, // This property is no longer relevant if not absolutely positioned
  right: 0, // This property is no longer relevant if not absolutely positioned
  height: "50px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0 10px", // Added padding to match typical footers
  borderTop: "1px solid #444",
  backgroundColor: "#1a1a1a", // Ensure it has a background color
  boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
  zIndex: 10,
  flexShrink: 0, // Prevents it from shrinking if content pushes
}));

export const StyledPhoneFooter = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "50px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0 10px",
  borderTop: "1px solid #444", // Darker border
  // backgroundColor: '#1a1a1a', // Dark background for footer
  boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
  zIndex: 10,
}));

export const StyledPostCard = styled(Card)(({ theme }) => ({
  marginBottom: "15px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
  width: "calc(100% - 20px)",
  margin: "10px auto",
  backgroundColor: "#1a1a1a", // Dark background for the post card
  color: "#ffffff", // Default text color for the post card
}));

export const StyledMessageBubble = styled(Box)(({ theme, type }) => ({
  maxWidth: "80%",
  padding: "8px 12px",
  borderRadius: "15px",
  marginBottom: "8px",
  alignSelf: type === "sent" ? "flex-end" : "flex-start",
  backgroundColor: type === "sent" ? "#25D366" : "#333333", // Darker theme colors for bubbles
  color: "#ffffff", // White text for message bubbles
}));

export const StyledStoryCard = styled(Card)(({ theme }) => ({
  minWidth: "80px",
  height: "80px",
  marginRight: "10px",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#333333", // Darker background for story cards
  position: "relative",
  overflow: "hidden",
  border: "2px solid #25D366",
  flexShrink: 0,
  cursor: "pointer",
}));

export const StyledStoryAvatar = styled(Avatar)(({ theme }) => ({
  width: "70px",
  height: "70px",
  border: "2px solid #1a1a1a", // Darker border for story avatars
  zIndex: 1,
}));

export const StyledStoryText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "5px",
  color: "#fff",
  fontSize: "0.7rem",
  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  zIndex: 2,
}));
