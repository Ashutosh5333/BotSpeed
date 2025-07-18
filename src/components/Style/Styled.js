import { styled } from "@mui/system";
import { Box, Card, Avatar, Typography } from "@mui/material";

export const StyledPhoneFrame = styled(Box)(({ theme }) => ({
  width: "calc(100% - 40px)", // Take almost full width with some padding on small screens
  maxWidth: "300px", // But don't exceed 300px width
  height: "calc(100vh - 120px)", // Take most of the viewport height on small screens
  maxHeight: "600px",
  // width: "300px",
  // height: "600px",
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

  [theme.breakpoints.up("sm")]: {
    // For screens larger than 'sm' (small, 600px by default)
    // You can adjust these values if needed for tablets
    width: "300px", // Fixed width for tablet/desktop
    height: "600px", // Fixed height for tablet/desktop
  },
}));

export const StyledPhoneScreen = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: "#000", // This sets the main screen background to black
  borderRadius: "26px",
  overflowY: "auto",
  padding: "4",
  display: "flex",
  flexDirection: "column",
  // paddingTop: "20px",
  position: "relative", // ADDED: Make this the positioning context for absolute children
}));

export const StyledPhoneHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 10px",
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
  // padding: "0 10px",
  borderTop: "1px solid #444", // Darker border
  boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
  zIndex: 10, 
}));

//  Styled for dm
export const StyledPhoneDMFooter = styled(Box)(({ theme }) => ({
  bottom: 0,
  left: 0,
  right: 0,
  height: "50px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  // padding: "0 10px",
  // borderTop: "1px solid #444",
  backgroundColor: "#1a1a1a",
   borderRadius:"2px",
  boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
  zIndex: 10,
  flexShrink: 0,
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
  background: "black",
  borderTop: "1px solid #444", // Darker border
  boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
  zIndex: 50,
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
  backgroundColor: type === "sent" ? "#7346e3" : "#333333", 
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


// export const AntSwitch = styled(Switch)(({ theme }) => ({
//   width: 28,
//   height: 16,
//   padding: 0,
//   display: 'flex',
//   '&:active': {
//     '& .MuiSwitch-thumb': {
//       width: 15,
//     },
//     '& .MuiSwitch-switchBase.Mui-checked': {
//       transform: 'translateX(9px)',
//     },
//   },
//   '& .MuiSwitch-switchBase': {
//     padding: 2,
//     '&.Mui-checked': {
//       transform: 'translateX(12px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     transition: theme.transitions.create(['width'], {
//       duration: 200,
//     }),
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
//     boxSizing: 'border-box',
//   },
// }));