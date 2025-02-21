import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { postsApi } from "../../api/posts";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import PostCard from "./post/PostCard";

function PostList() {
  const [limit, setLimit] = useState(30);

  const {
    data: posts,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["posts", limit],
    queryFn: () => postsApi.getAllPosts(limit).then((res) => res.data),
  });

  const handleLoadMore = () => {
    setLimit((prev) => prev + 30);
  };

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
      {posts?.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {posts?.metadata.hasMore && (
        <Box display="flex" justifyContent="center" p={2}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More Posts"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default PostList;
