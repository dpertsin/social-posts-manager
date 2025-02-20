/**
 * This is the main layout component that wraps the entire application.
 * It contains the main layout structure with the sidebar and the main content area.
 */
import { Box, Container, Grid2 } from "@mui/material";
import RightSidebar from "../sidebar/RightSidebar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={2}>
        {/* Left Sidebar - Visible from sm (600px) and up */}
        <Grid2 size={{ sm: 3 }} sx={{ display: { xs: "none", sm: "block" } }}>
          <Sidebar />
        </Grid2>
        {/* Main Content - Takes available space */}
        <Grid2 size={{ xs: 12, sm: 9, lg: 6 }}>
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
        {/* Right Sidebar - Visible from lg (1200px) and up */}
        <Grid2
          size={{ lg: 3 }}
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
        >
          <RightSidebar />
        </Grid2>
      </Grid2>
    </Container>
  );
}

/*
Το δεξι το θέλω μονο πάνω απο 900px md
Το αρισττερο το θέλω πάνω απο 600px
το μεσαιο θα παιρνει ολο τον διαθεσιμο χωρο
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px
*/

export default MainLayout;
