import { IconButton, Typography } from "@mui/material";
import { StyledPhoneHeader } from "../Style/Styled";
import {
  EmojiEmotions as EmojiEmotionsIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { FiSend } from "react-icons/fi";

export default function CommentHeader({ title, onBack, onMore }) {
  return (
    <StyledPhoneHeader>
      <IconButton size="small" onClick={onBack}>
        {/* <ArrowBackIcon color="#ffffff" sx={{ color: '#ffffff' }}/> */}
      </IconButton>
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <IconButton
        size="small"
        onClick={onMore}
        sx={{ color: "#ffffff", mr: 2 }}
      >
        {/* <MoreVertIcon /> */}
        <FiSend />
      </IconButton>
    </StyledPhoneHeader>
  );
}
