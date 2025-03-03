import React, { useState } from "react";
import "./OtpVerification.css";
import axios from "axios";
import Loading from "../../assets/images/a.gif";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Frame1 from "../../assets/images/loginframe1.png";
import Frame2 from "../../assets/images/loginframe2.png";
import CloviaPNG from "../../assets/images/CloviaWhiteLogo.png";

import config from "../../config/config";
import toast from "react-hot-toast";
import errorNotification from "../../assets/sound/error.mp3";

import { TextField } from "@mui/material";

const OtpVerification = () => {
  const errorSound = new Audio(errorNotification);

  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();
  console.log("Email received in OtpVerification:", email);

  // If person is not logged in , redirect to login page
  if (!localStorage.getItem("message")) {
    navigate("/");
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!otpCode) {
      // setError("Please enter your otp.");
      errorSound.play();
      toast.error("Please enter your otp.");

      setLoading(false);
      return;
    }

    try {
      const otpResponse = await axios.post(
        `${config.BASE_URL}/api/verify-otp/`,
        {
          email,
          otp_code: otpCode,
        }
      );

      const { access, refresh } = otpResponse.data.tokens;
      const role = otpResponse.data.role;
      console.log("OTP Verified. Access Token:", access);
      console.log("Refresh Token:", refresh);
      console.log("Role:", role);

      // Storeing tokens and role in local storage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", role);

      navigate("/dashboard"); // Redirect after success
    } catch (error) {
      console.error("Sign in failed:", error.response?.data || error.message);
      // setError("Invalid OTP or Verification Failed.");
      errorSound.play();
      toast.error("Invalid OTP or Verification Failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailId = () => {
    navigate("/");
  };

  return (
    <>
      <div className="OTP">
        <div className="logo-container">
          <div className="clovia-white-logo">
            <img src={CloviaPNG} alt="Clovia Logo" />
          </div>
          <div className="logo-text">
            <h1>Exit Employe Management</h1>
          </div>
        </div>
        <div className="login-container ">
          <form className="login-form">
            <h2>OTP Verification</h2>
            {error && <p className="error">{error}</p>}
            <div className="alert alert-success alert-message">
              {/* We've sent a verification code to your <br /> email -{" "} */}
              Send OTP on email - <strong>{email}</strong>
              <span className="edit-email" onClick={handleEmailId}>
                {" "}
                Edit
              </span>
            </div>
            {/* <div className="form-group">
              <input
                type="tel"
                placeholder="Enter verification code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                autoFocus
              />
            </div> */}

            <TextField
              label="Enter verification code"
              type="tel"
              variant="outlined"
              fullWidth
              className="otp-input"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
            />

            <button
              onClick={handleOtpVerification}
              disabled={loading}
              type="submit"
              className="verify-btn"
            >
              {loading ? (
                <img src={Loading} alt="Verifying..." />
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </div>
        <div className="frame">
          <div className="frame-left-image">
            <img src={Frame1} alt="frame" />
          </div>
          <div className="frame-right-image">
            <img src={Frame2} alt="frame" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
