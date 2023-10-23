import { Suspense, lazy, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FrontLayout from "./components/layout/front";
import Loading from "./components/share/Loading";
import { AuthContext } from "./contexts/AuthContext";
// import DashboardPage from "./pages/admin/dashboard";
import NotFoundPage from "./pages/notFound";
import { Fragment } from "react";

const HomePage = lazy(() => import("./pages/public/home"));
const CategoryPage = lazy(() => import("./pages/public/category"));
const AboutPage = lazy(() => import("./pages/public/about"));
const LoginPage = lazy(() => import("./pages/public/login"));
const RegisterPage = lazy(() => import("./pages/public/register"));
const BlogPage = lazy(() => import("./pages/public/blog"));
const BlogPostsPage = lazy(() => import("./pages/public/blogPost"));
const MyPostsPage = lazy(() => import("./pages/user"));
const AccountPage = lazy(() => import("./pages/account"));

const AdminLayout = lazy(() => import("./components/layout/admin/AdminLayout"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const UsersPage = lazy(() => import("./pages/admin/usersPage/UsersPage"));
const CategoriesPage = lazy(() => import("./pages/admin/CategoriesPage"));
const AllPosts = lazy(() => import("./pages/admin/AllPosts"));

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={1500} />
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
            <Fragment>
              <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="all-posts" element={<AllPosts />} />
              </Route>
            </Fragment>
          ) : null}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
