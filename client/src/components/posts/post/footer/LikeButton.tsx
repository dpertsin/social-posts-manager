import { Box, Typography } from "@mui/material";
import { Post } from "../../../../types/post";
import { useAppSelector } from "../../../../store/hooks";
import { useEffect, useState } from "react";
import { postsApi } from "../../../../api/posts";
import { useQuery } from "@tanstack/react-query";
import LoginModal from "../../../common/LoginModal";
import { useLikePost, useUnlikePost } from "../../../../hooks/useLikePost";
import AnimatedHeart from "../../../common/AnimatedHeart";

interface PostCardProps {
  post: Post;
}

function LikeButton({ post }: PostCardProps) {
  const { data: likedPosts = [] } = useQuery({
    queryKey: ["likedPosts"],
    queryFn: () => postsApi.getLikedPosts().then((res) => res.data),
  });

  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount); // we want to change the count without waiting for the server to return the req.
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const isPostLiked = likedPosts.some(
      (likedPost: Post) => likedPost._id === post._id
    );
    setIsLiked(isPostLiked);
  }, [likedPosts, post._id]);

  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (isLiked) {
      unlikeMutation.mutate(post._id);
      setLikesCount((prev) => prev - 1);
    } else {
      likeMutation.mutate(post._id);
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <AnimatedHeart
          isLiked={isLiked}
          onToggle={handleLikeToggle}
          size={36}
        />
        {/* <IconButton onClick={handleLikeToggle}>
          {isLiked ? (
            <Favorite color="error" fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton> */}
        <Typography variant="body2" color="text.secondary">
          {likesCount}
        </Typography>
      </Box>
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default LikeButton;
