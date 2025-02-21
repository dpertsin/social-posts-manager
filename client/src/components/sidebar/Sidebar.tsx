import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logo from "../../assets/logo";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

export default function Sidebar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const authenticatedMenuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
      dataTestid: "home-page-link",
    },
    {
      text: "Search",
      icon: <SearchIcon />,
      path: "/search",
      dataTestid: "search-page-link",
    },
    {
      text: "Liked Posts",
      icon: <FavoriteIcon />,
      path: "/liked-posts",
      dataTestid: "liked-page-link",
    },
    {
      text: "404 page",
      icon: <DynamicFormIcon />,
      path: "/404",
      dataTestid: "404-page-link",
    },
  ];

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          position: "fixed",
          height: "100%",
          width: "inherit",
          maxWidth: "280px",
        }}
      >
        <Box sx={{ width: 46, height: 46, cursor: "pointer" }}>
          <Logo />
        </Box>
        <Typography variant="h5" gutterBottom>
          <strong>Join the platform to have full access</strong>
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          data-testid="register-link"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        height: "100%",
        display: "flex",
        width: "inherit",
        maxWidth: "280px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ width: 46, height: 46, paddingLeft: 2, cursor: "pointer" }}>
          <Logo />
        </Box>
        {/* TODO: Add mobile navbar */}
        {/* Main Navbar */}
        <nav aria-label="main sidebar">
          <List>
            {authenticatedMenuItems.map((item) => (
              <ListItem disablePadding key={item.text}>
                <ListItemButton
                  data-testid={item?.dataTestid}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>

      <Box sx={{ padding: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
