import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Loading from "../../assets/images/a.gif";
import Google from "../../assets/images/google.png";
import { useNavigate } from "react-router-dom";

import CloviaPNG from "../../assets/images/CloviaWhiteLogo.png";
import Frame1 from "../../assets/images/loginframe1.png";
import Frame2 from "../../assets/images/loginframe2.png";

import config from "../../config/config";

import toast from "react-hot-toast";
import successNotification from "../../assets/sound/notification.mp3";
import errorNotification from "../../assets/sound/error.mp3";

import { TextField } from "@mui/material";

// import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const successSound = new Audio(successNotification);
  const errorSound = new Audio(errorNotification);

  // const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  // console.log("Google Current User= ", user);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      // setError("Please enter your email ...");
      errorSound.play();
      toast.error("Please enter your email ...");
      setLoading(false);
      document.getElementById("email-input").focus(); // Set focus back to input
      return;
    }

    // Which data we are getting from the api (Below)
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/request-otp/`,

        { email }
      );

      const { message } = response.data;
      console.log(message);
      localStorage.setItem("message", message);
      successSound.play();
      toast.success(message);
      // console.log("OTP sent successfully:", response.data);

      // Navigate to OTP Verification page
      navigate("/OTP", { state: { email } });
    } catch (error) {
      console.error("Error requesting OTP:", error);
      errorSound.play();
      toast.error("Please enter a valid email address");
      // setError("Failed to request OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="logo-container">
          <div className="clovia-white-logo">
            <img src={CloviaPNG} alt="Clovia Logo" />
          </div>
          <div className="logo-text">
            <h1>Exit Employe Management</h1>
            {/* <h1>e-separation system</h1> */}
          </div>
        </div>
        <div className="login-container login">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Sign in</h2>
            {error && <p className="error">{error}</p>}
            {/* <div className="form-group">
              <input
                type="email"
                placeholder="Please enter your email id"
                value={email}
                onKeyUp={(e) => setEmail(e.target.value.toLowerCase())}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}

            <TextField
              label="Email address"
              type="email"
              variant="outlined"
              fullWidth
              className="email-input"
              id="email-input"
              value={email}
              onKeyUp={(e) => setEmail(e.target.value.toLowerCase())}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              className="btn-signin"
              onClick={handleLogin}
              disabled={loading}
              type="submit"
            >
              {loading ? <img src={Loading} alt="Signing..." /> : "Sign in"}
            </button>

            {/* {isAuthenticated && (
              <h5>
                Hello ,{user.name},<p>{user.email}</p>
              </h5>
            )}
            {isAuthenticated ? (
              <button className="btn btn-danger" onClick={(e) => logout()}>
                Logout
              </button>
            ) : (
              <button
                onClick={(e) => loginWithRedirect()}
                className="btn-google"
              >
                <img className="google-img" src={Google} alt="google-img" />{" "}
                Sign in with Google
              </button>
            )} */}

            <button className="btn-google">
              <img className="google-img" src={Google} alt="google-img" /> Sign
              in with Google
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

export default Login;
