import { Route, Routes } from "react-router";
import MainLayout from "./components/common/MainLayout";
import Home from "./pages/app/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LikedPosts from "./pages/app/LikedPosts";
import NotFound from "./pages/NotFound";
import Search from "./pages/app/Search";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
