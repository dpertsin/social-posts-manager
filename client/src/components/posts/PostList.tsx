import { useQuery } from "@tanstack/react-query";
import React from "react";
import { postsApi } from "../../api/posts";
import { Box, CircularProgress, Typography } from "@mui/material";
import PostCard from "./post/PostCard";

function PostList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postsApi.getAllPosts().then((res) => res.data),
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
        <Typography color="error">🚨🆘🚨 Error loading posts 🚨🆘🚨</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Box>
  );
}

export default PostList;
