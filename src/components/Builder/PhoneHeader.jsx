import { IconButton, Typography } from "@mui/material";
import { StyledPhoneHeader } from "../Style/Styled";

import {
  EmojiEmotions as EmojiEmotionsIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

export default function PhoneHeader({ title, onBack, onMore }) {
  return (
    <StyledPhoneHeader>
      <IconButton size="small" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <IconButton size="small" onClick={onMore}>
        <MoreVertIcon />
      </IconButton>
    </StyledPhoneHeader>
  );
}
