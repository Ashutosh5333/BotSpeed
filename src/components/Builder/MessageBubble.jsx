import { StyledMessageBubble } from "../Style/Styled";

export default function MessageBubble({ type, text, children }) {
    return (
      <StyledMessageBubble type={type}>
        {text || children}
      </StyledMessageBubble>
    );
  }
  