import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { postsApi } from "../../api/posts";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import PostCard from "../../components/posts/post/PostCard";
import MainHeader from "../../components/common/MainHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../store/hooks";

function LikedPosts() {
  // Add QueryClient to invalidate queries after mutation
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Get liked posts query
  const {
    data: likedPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["liked-posts"],
    queryFn: () => postsApi.getLikedPosts().then((res) => res.data),
  });

  // Create mutation for clearing liked posts
  const clearLikesMutation = useMutation({
    // Define mutation function that calls the API
    mutationFn: () => postsApi.clearAllLikesOnLikedPosts(),
    onSuccess: () => {
      // After successful mutation, invalidate and refetch these queries
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} sx={{ textAlign: "center" }}>
        <Typography color="error">
          🚨🆘🚨 Error loading liked posts 🚨🆘🚨
        </Typography>
      </Box>
    );
  }

  const handleSubmit = () => {
    clearLikesMutation.mutate();
  };

  if (!isAuthenticated) {
    return (
      <>
        <MainHeader>Liked Posts</MainHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Please log in to view liked posts
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <MainHeader>Liked Posts</MainHeader>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Button
          onClick={handleSubmit}
          variant="outlined"
          startIcon={<DeleteIcon />}
          disabled={clearLikesMutation.isPending}
        >
          {clearLikesMutation.isPending
            ? "Removing..."
            : "Remove all liked posts"}
        </Button>
      </Box>
      <Box px={2}>
        {likedPosts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Box>
    </>
  );
}

export default LikedPosts;
