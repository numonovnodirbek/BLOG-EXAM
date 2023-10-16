import { Fragment } from "react";

import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "../front/Footer";

const AdminLayout = () => {
  return (
    <Fragment>
      <AdminHeader />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default AdminLayout;
