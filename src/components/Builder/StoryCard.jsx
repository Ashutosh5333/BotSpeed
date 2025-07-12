import { StyledStoryAvatar, StyledStoryCard, StyledStoryText } from "../Style/Styled";

export default function StoryCard({ story, onClick }) {

  return (
    <StyledStoryCard onClick={onClick}>
      {story.image && <img src={story.image} alt="Story" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', borderRadius: '50%' }} />}
      <StyledStoryAvatar src={story.avatar || `https://placehold.co/70x70/075E54/fff?text=${story.user.charAt(0)}`} />
      <StyledStoryText>{story.user}</StyledStoryText>
    </StyledStoryCard>
  );
}