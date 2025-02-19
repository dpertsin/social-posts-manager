import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CreatePostData } from "../../types/post";
import { postsApi } from "../../api/posts";
import { Box, Button, Paper, TextField } from "@mui/material";

function CreatePost() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState<CreatePostData>({
    title: "",
    body: "",
  });

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostData) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormData({ title: "", body: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate(formData);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          margin="normal"
          multiline
          rows={3}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={createPostMutation.isPending}
        >
          Post
        </Button>
      </Box>
    </Paper>
  );
}

export default CreatePost;
