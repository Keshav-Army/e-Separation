import React from "react";
import { useNavigate } from "react-router-dom";
import "./Thankyou.css";
// import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import ParticlesComponent from "../../components/Particles/particles";

const Thankyou = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="card-container">
      <ParticlesComponent id="particles" />
      {/* <Header  /> */}
      <div className="thankyou-container">
        <h1 className="thankyou-heading">Thank You!</h1>
        <p className="thankyou-message">Dear Employee,</p>
        <p className="thankyou-message">
          We sincerely appreciate the time and effort you put into providing us
          with your valuable feedback. Your insights will help us grow and
          improve as an organization.
        </p>
        <p className="thankyou-message">
          All your tasks and responsibilities have been reviewed and approved.
          You are now good to go, and we wish you great success in all your
          future endeavors.
        </p>
        <p className="thankyou-closing">
          Thank you once again for your dedication and contributions. We look
          forward to staying connected. Best wishes from the entire team!
        </p>
        <button className="dashboard-button" onClick={handleGoToDashboard}>
          Go to Dashboard
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyou;
