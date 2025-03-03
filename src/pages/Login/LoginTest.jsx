import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Please fill out both fields.");
      setLoading(false);
      return;
    }

    try {
      const loginResponse = await axios.post(
        "https://exit-emp-project.onrender.com/api/token/",
        {
          username,
          password,
        }
      );

      const { access, role } = loginResponse.data;
      console.log("Login successful. Access Token:=>", access);
      // console.log("Refresh Token:", refresh);
      console.log("Role :", role);

      // Fetching the user dashboard data using the access token
      const userDataResponse = await axios.get(
        "https://exit-emp-project.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(
        "Protected data fetched successfully:",
        userDataResponse.data
      );
      //======================================================================================================>
      // Navigating to the dashboard page after successful login
      navigate("/dashboard", {
        state: { userData: userDataResponse.data },
      });
      //======================================================================================================>
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleLogin} disabled={loading} type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

// Your Next week task is to  implement the following functionality===========

// 1. After logged In you have to fetch data  from API and display it on the dashboard page
// 2. For Employee Logged IN by  username and password  you have to go on the emp-dashboard page
// 3. For Hod  Logged IN by  username and password  you have to go on the hod-dashboard page
// 4. For HR  Logged IN by  username and password  you have to go on the hr-dashboard page
// 5. Implement the logout functionality

// ===============================================================================================>
// ===============================================================================================>
// ===============================================================================================>
// you have to make only one dashboard page and use the conditional rendering to display the dashboard of the respective user
// If employee logged in  then you have to display the employee Component on the dashboard page
// If hod logged in  then you have to display the hod Component on the dashboard page
// If HR logged in  then you have to display the hr Component on the dashboard page

// you have to see the user type in the local storage and use the conditional rendering to display the dashboard of the respective user

// You have to check after logged in which token you are getting ==
// if you are getting the token of employee then you have to display the employee Conponent on the dashboard page
// if you are getting the token of hod then you have to display the hod Component on the dashboard
// if you are getting the  token of HR then you have to display the hr Component on the dashboard page
// ===============================================================================================>
// ===============================================================================================>
// ===============================================================================================>
// You can  use the following code to get the user type from the token ==
// const token = localStorage.getItem("token");
// const userType = token.split(".")[1];
// console.log(userType);
