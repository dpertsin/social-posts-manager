import React from "react";
import { postsApi } from "../../../api/posts";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "../../../types/post";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const isAuthenticated = true; // TODO: Global state auth

  const handleLike = async () => {
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

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      {isAuthenticated && (
        <CardActions>
          <IconButton onClick={handleLike}>
            {post.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.likesCount} likes
          </Typography>
        </CardActions>
      )}
    </Card>
  );
}

export default PostCard;
