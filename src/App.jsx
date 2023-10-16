import { Suspense, lazy, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FrontLayout from "./components/layout/front";
import Loading from "./components/share/Loading";
import { AuthContext } from "./contexts/AuthContext";
import DashboardPage from "./pages/admin/dashboard";
import NotFoundPage from "./pages/notFound";

const HomePage = lazy(() => import("./pages/public/home"));
const CategoryPage = lazy(() => import("./pages/public/category"));
const AboutPage = lazy(() => import("./pages/public/about"));
const LoginPage = lazy(() => import("./pages/public/login"));
const RegisterPage = lazy(() => import("./pages/public/register"));
const BlogPage = lazy(() => import("./pages/public/blog"));
const BlogPostsPage = lazy(() => import("./pages/public/blogPost"));
const MyPostsPage = lazy(() => import("./pages/user"));
const AccountPage = lazy(() => import("./pages/account"));

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<FrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:cateId" element={<CategoryPage />} />
            <Route path="all-posts" element={<BlogPage />} />
            <Route path="blogpost/:blogId" element={<BlogPostsPage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route
              path="myposts"
              element={
                isAuthenticated ? <MyPostsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="account"
              element={
                isAuthenticated ? <AccountPage /> : <Navigate to="/login" />
              }
            />
          </Route>
          {isAuthenticated && role === "admin" ? (
            <Route path="dashboard" element={<DashboardPage />} />
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
