import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Loading from "../../assets/images/a.gif";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://exit-emp-v2.onrender.com/api/request-otp/",
        { email }
      );
      console.log("OTP sent successfully:", response.data);

      // Navigate to OTP Verification page
      navigate("/OTP", { state: { email } });
    } catch (error) {
      console.error("Error requesting OTP:", error);
      setError("Failed to request OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRequestOtp}>
        <h2>Sign in</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <img src={Loading} alt="Loading..." /> : "Request OTP"}
        </button>
      </form>
    </div>
  );
};

export default Login;
