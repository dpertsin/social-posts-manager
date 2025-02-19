/**
 * This is the main layout component that wraps the entire application.
 * It contains the main layout structure with the sidebar and the main content area.
 */
import { Box, Container, Grid2 } from "@mui/material";
import React from "react";
import RightSidebar from "../sidebar/RightSidebar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router";

function MainLayout() {
  const isAuthenticated = true; // TODO: here we are going to use the Global state

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 0, sm: 3 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              minHeight: "100vh",
              borderLeft: 1,
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <Outlet />
          </Box>
        </Grid2>
        {isAuthenticated && (
          <Grid2
            size={{ xs: 0, sm: 3 }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <RightSidebar />
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
}

export default MainLayout;
