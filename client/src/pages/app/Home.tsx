import React from "react";
import { Box } from "@mui/material";
import CreatePost from "../../components/posts/CreatePost";
import PostList from "../../components/posts/PostList";

function Home() {
  const isAuthenticated = true; // TODO: Add the Global statement
  return (
    <Box>
      {isAuthenticated && <CreatePost />}
      <PostList />
    </Box>
  );
}

export default Home;
