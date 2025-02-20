import { ChatBubbleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function CommentButton() {
  return (
    <IconButton>
      <ChatBubbleOutline fontSize="small" />
    </IconButton>
  );
}

export default CommentButton;
