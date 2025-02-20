import { Box, Typography } from "@mui/material";
import { Post } from "../../../types/post";
import { formatDistanceToNow } from "date-fns";
import FooterPost from "./footer";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const timeAgo = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          mx: "auto",
          my: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1" fontWeight={600} color="text.primary">
            {post.userId.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{post.userId.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            · {timeAgo(post.createdAt)}
          </Typography>
        </Box>
        {/* Body */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
            <strong>{post.title}</strong>
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
            {post.body}
          </Typography>
        </Box>
        {/* Footer */}
        <FooterPost post={post} />
      </Box>
    </>
  );
}

export default PostCard;
