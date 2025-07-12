import { styled } from '@mui/system';
import {
  Box,
  Card,
  Avatar,
  Typography,
} from '@mui/material';

export const StyledPhoneFrame = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '600px',
  backgroundColor: '#000',
  borderRadius: '36px',
  padding: '10px',
  boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '20px',
    backgroundColor: '#222',
    borderRadius: '0 0 10px 10px',
  },
}));

export const StyledPhoneScreen = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#fff',
  borderRadius: '26px',
  overflowY: 'auto',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledPhoneHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 0',
  color: '#000',
  borderBottom: '1px solid #eee',
}));

export const StyledPhoneFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingTop: '10px',
  borderTop: '1px solid #eee',
  backgroundColor: '#fff',
}));

export const StyledPostCard = styled(Card)(({ theme }) => ({
  marginBottom: '15px',
  borderRadius: '12px',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
}));

export const StyledMessageBubble = styled(Box)(({ theme, type }) => ({
  maxWidth: '80%',
  padding: '8px 12px',
  borderRadius: '15px',
  marginBottom: '8px',
  alignSelf: type === 'sent' ? 'flex-end' : 'flex-start',
  backgroundColor: type === 'sent' ? '#DCF8C6' : '#E0E0E0',
  color: '#000',
}));

export const StyledStoryCard = styled(Card)(({ theme }) => ({
  minWidth: '80px',
  height: '80px',
  marginRight: '10px',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid #25D366',
  flexShrink: 0,
  cursor: 'pointer',
}));

export const StyledStoryAvatar = styled(Avatar)(({ theme }) => ({
  width: '70px',
  height: '70px',
  border: '2px solid #fff',
  zIndex: 1,
}));

export const StyledStoryText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: '5px',
  color: '#fff',
  fontSize: '0.7rem',
  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
  zIndex: 2,
}));