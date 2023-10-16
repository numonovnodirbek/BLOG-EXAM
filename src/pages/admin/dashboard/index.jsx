import { useEffect } from "react";
import request from "../../../server";

const DashboardPage = () => {
  useEffect(() => {
    let getUsers = async () => {
      let { data } = await request.get("auth/me");
      console.log(data);
    };
    getUsers();
  });
  return (
    <section id="dashboardPage">
      <div className="container">
        <div className="hero">
          <h2>Dashboard</h2>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default DashboardPage;
