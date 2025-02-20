import { Box } from "@mui/material";
import CreatePost from "../../components/posts/CreatePost";
import PostList from "../../components/posts/PostList";
import MainHeader from "../../components/common/MainHeader";

function Home() {
  return (
    <Box>
      <MainHeader>Home</MainHeader>
      <CreatePost />
      <PostList />
    </Box>
  );
}

export default Home;
