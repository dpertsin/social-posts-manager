import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./components/common/MainLayout";
import Home from "./pages/app/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LikedPosts from "./pages/app/LikedPosts";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Route>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
