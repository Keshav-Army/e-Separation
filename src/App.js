import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Login from "./pages/Login/Login";
import OtpVerification from "./pages/OtpVerification/OtpVerification";

import Dashboard from "./pages/dashboard/dashboard";
import ViewTask from "./pages/ViewTask/ViewTask";
import EmpFeedback from "./pages/EmpFeedback/EmpFeedback";
// import ExitInterviewForm from "./pages/EmpFeedback/ExitInterviewForm";
import Thankyou from "./pages/ThankyouPage/Thankyou";
import AllEmployees from "./pages/AllEmployees/AllEmployees";

import AboutUs from "./pages/AboutUs/AboutUs";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="AboutUs" element={<AboutUs />} />

          <Route
            path="OTP"
            element={
              // <ProtectedRoute>
              <OtpVerification />
              // </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ViewTask/"
            element={
              <ProtectedRoute>
                <ViewTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/EmpFeedback"
            element={
              <ProtectedRoute>
                <EmpFeedback />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/dashboard/ExitInterviewForm"
            element={
              <ProtectedRoute>
                <ExitInterviewForm />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/dashboard/Thankyou"
            element={
              <ProtectedRoute>
                <Thankyou />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/AllEmployees"
            element={
              <ProtectedRoute>
                <AllEmployees />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
