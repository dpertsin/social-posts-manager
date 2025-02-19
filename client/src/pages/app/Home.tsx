import React from "react";
import RightSidebar from "../../components/layout/RightSidebar";
import Sidebar from "../../components/layout/Sidebar";
import MainLayout from "../../components/layout/MainLayout";
import { Container, Grid2 } from "@mui/material";

function Home() {
  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 0, sm: 3 }} sx={{display: {xs: 'none', sm: 'block'}}}>
          <Sidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MainLayout />
        </Grid2>
        <Grid2 size={{ xs: 0, sm: 3 }} sx={{display: {xs: 'none', sm: 'block'}}}>
          <RightSidebar />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Home;
