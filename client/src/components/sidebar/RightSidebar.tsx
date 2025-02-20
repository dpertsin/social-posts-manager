import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../../api/posts";

function RightSidebar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  // Create mutation for populating posts
  const populatePostsMutation = useMutation({
    mutationFn: () => postsApi.populatePosts(),
    onSuccess: () => {
      // Invalidate and refetch posts after successful population
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("🎉 Posts populated successfully");
    },
    onError: (error) => {
      console.error("Failed to populate posts:", error);
      alert("Error populating posts");
    },
  });

  const handlePopulatePosts = () => {
    populatePostsMutation.mutate();
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ position: "fixed", width: "100%", maxWidth: 280 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          disabled={true}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "fixed", width: "100%", maxWidth: 280 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        disabled={true}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePopulatePosts}
        disabled={populatePostsMutation.isPending}
        sx={{ width: "100%", mt: 2 }}
      >
        {populatePostsMutation.isPending
          ? "Populating..."
          : "Populate 100 Posts"}
      </Button>
      <Box
        component="img"
        src={
          populatePostsMutation.isPending
            ? "/gifs/creating100posts.gif"
            : "/gifs/add100posts.gif"
        }
        alt="Saitama watching the power of the button"
        sx={{ width: "100%", mt: 2 }}
      />
      <Divider sx={{ mt: 2 }} />
      <Typography variant="body2" sx={{ textAlign: "left", mt: 2 }}>
        Powered by <strong>dpertsin</strong>
      </Typography>
    </Box>
  );
}

export default RightSidebar;
