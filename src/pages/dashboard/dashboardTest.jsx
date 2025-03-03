import React from "react";
import "./dashboard.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import EmpDashboard from "../../components/EmpDashboard/EmpDashboard";
// import HodDashboard from "../../components/HodDashboard/HODDashboard";
// import HrDashboard from "../../components/HrDashboard/HrDashboard";

const Dashboard = () => {
  return (
    <>
      <div>
        <Header />
        <EmpDashboard />
        {/* <HodDashboard /> */}
        {/* <HrDashboard /> */}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
