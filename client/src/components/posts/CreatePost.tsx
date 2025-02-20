import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { CreatePostData } from "../../types/post";
import { postsApi } from "../../api/posts";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

function CreatePost() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreatePostData>({
    title: "",
    body: "",
  });
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostData) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormData({ title: "", body: "" });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate(formData);
  };

  // Ensure to show the post button only when the inputs aren't empty and isn't sending a request.
  const isButtonDisabled =
    formData.title === "" ||
    formData.body === "" ||
    createPostMutation.isPending;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{ padding: 2, borderBottom: 1, borderColor: "divider" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar alt="User Avatar" />
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
          placeholder="Type your title post..."
          size="small"
          sx={{ margin: "auto" }}
        />
      </Box>
      <TextField
        fullWidth
        label="What's happening?!"
        value={formData.body}
        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        margin="normal"
        multiline
        rows={3}
        placeholder="Type your body post..."
        size="small"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isButtonDisabled}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}

export default CreatePost;
