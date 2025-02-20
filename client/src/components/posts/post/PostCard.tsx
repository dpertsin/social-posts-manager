import React, { useState } from "react";
import { postsApi } from "../../../api/posts";
import { Box, IconButton, Typography } from "@mui/material";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Repeat,
  Share,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "../../../types/post";
import { useAppSelector } from "../../../store/hooks";
import { formatDistanceToNow } from "date-fns";
import LoginModal from "../../common/LoginModal";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (post.isLiked) {
        await postsApi.unlikePost(post._id);
      } else {
        await postsApi.likePost(post._id);
      }
      // Invalidate and refetch posts
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
        refetchType: "active",
      });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1, px: 1 }}
        >
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleLike}>
              {post.isLiked ? (
                <Favorite color="error" fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.likesCount}
            </Typography>
          </Box>
          <IconButton>
            <ChatBubbleOutline fontSize="small" />
          </IconButton>
          <IconButton>
            <Repeat fontSize="small" />
          </IconButton>
          <IconButton>
            <Share fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default PostCard;
