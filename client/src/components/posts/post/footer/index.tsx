import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import RePostButton from "./RePostButton";
import ShareButton from "./ShareButton";
import { Box } from "@mui/material";
import { Post } from "../../../../types/post";

interface PostCardProps {
  post: Post;
}

function FooterPost({post}: PostCardProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 1, px: 1 }}
    >
      <LikeButton post={post} />
      <CommentButton />
      <RePostButton />
      <ShareButton />
    </Box>
  );
}

export default FooterPost;
