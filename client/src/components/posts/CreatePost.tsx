import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CreatePostData } from "../../types/post";
import { postsApi } from "../../api/posts";
import { Avatar, Box, Button, TextField, LinearProgress } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";

function CreatePost() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<CreatePostData>({ mode: "onChange" });

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostData) => {
      setProgress(60);
      await postsApi.createPost(data);
      setProgress(100);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
      setProgress(0);
    },
    onError: () => {
      setProgress(0);
    },
  });

  const onSubmit = (data: CreatePostData) => {
    setProgress(20);
    createPostMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {progress > 0 && progress < 100 && (
        <Box sx={{ padding: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ borderRadius: 5 }}
          />
        </Box>
      )}
      <Box
        sx={{ padding: 2, borderBottom: 1, borderColor: "divider" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar alt="User Avatar" />
          <TextField
            fullWidth
            label="Title"
            {...register("title", { required: "Title is required" })}
            margin="normal"
            placeholder="Type your title post..."
            size="small"
            sx={{ margin: "auto" }}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Box>
        <TextField
          fullWidth
          label="What's happening?!"
          {...register("body", { required: "Body is required" })}
          margin="normal"
          multiline
          rows={3}
          placeholder="Type your body post..."
          size="small"
          error={!!errors.body}
          helperText={errors.body?.message}
        />

        <Box display="flex" justifyContent="flex-end" marginTop={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isSubmitting || createPostMutation.isPending}
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CreatePost;
