import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";

function RightSidebar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handlePopulatePosts = () => {
    setIsLoading(true);
    // TODO: Add the logic to populate 100 posts

    setTimeout(() => {
      alert("100 Posts have been populated");
      setIsLoading(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ width: "100%", maxWidth: 280 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
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
        sx={{ width: "100%", mt: 2 }}
      >
        Populate 100 Posts
      </Button>
      {/* TODO: Add a Progress and a Text while loading https://mui.com/material-ui/react-progress/#linear-indeterminate */}
      <Box
        component="img"
        src={isLoading ? "/gifs/creating100posts.gif" : "/gifs/add100posts.gif"}
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
