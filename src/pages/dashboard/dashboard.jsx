import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import config from "../../config/config";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import EmpDashboard from "../../components/EmpDashboard/EmpDashboard";
import HodDashboard from "../../components/HodDashboard/HODDashboard";
import HrDashboard from "../../components/HrDashboard/HrDashboard";

import toast from "react-hot-toast";

const Dashboard = () => {
  const role = localStorage.getItem("role") || "";
  const access = localStorage.getItem("access") || "";

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (access) {
      axios
        .get(`${config.BASE_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then((response) => {
          console.log("Protected data fetched successfully:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(
            "Error fetching protected data, please log in again:",
            error
          );
          toast.error("Error fetching protected data, please log in again.");
          // alert("Error fetching protected data, please log in again.");
        });
    } else {
      console.error("Access token is missing or invalid");
      toast.error("Access token is missing or invalid");
      // alert("Access token is missing or invalid");
    }
  }, [access]);

  return (
    <>
      <Header />
      {role === "Employee" && <EmpDashboard userData={userData} />}
      {role === "HoD" && <HodDashboard userData={userData} />}
      {role === "HR" && <HrDashboard userData={userData} />}
      <Footer />
    </>
  );
};

export default Dashboard;
