// import React, { useState } from "react";
// import "./OtpVerification.css";
// import axios from "axios";
// import Loading from "../../assets/images/a.gif";
// import { useNavigate } from "react-router-dom";

// const OtpVerification = () => {
//   const [otpCode, setOtpCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (!otpCode) {
//       setError("Please fill out the field.");
//       setLoading(false);
//       return;
//     }

//     // Which token we are getting from the backend through api
//     try {
//       const otpResponse = await axios.post(
//         "https://exit-emp-v2.onrender.com/api/verify-otp/",
//         {
//           // email,
//           otpCode,
//         }
//       );

//       const { access, refresh, role } = otpResponse.data;
//       console.log("OTP Verified. Access Token:=>", access);
//       console.log("Refresh Token:=>", refresh);
//       console.log("Role:=>", role);

//       // Store tokens and role in local storage
//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);
//       localStorage.setItem("role", role);

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Sign in failed:", error);
//       // setError("Invalid OTP");
//     } finally {
//       setLoading(false); // We are stoping the loader here okay sir
//     }
//   };

//   return (
//     <div className="login-container OTP">
//       <form className="login-form">
//         <h2>OTP Verifiaction</h2>
//         {error && <p className="error">{error}</p>}
//         <div className="alert alert-success alert-message">
//           We've send a verification code to your <br /> email -
//           <strong> {email}</strong>
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             placeholder="Enter verification code"
//             value={otpCode}
//             onChange={(e) => setOtpCode(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           onClick={handleOtpVerification}
//           disabled={loading}
//           type="submit"
//         >
//           {loading ? <img src={Loading} alt="Verifying..." /> : "Verify"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OtpVerification;
