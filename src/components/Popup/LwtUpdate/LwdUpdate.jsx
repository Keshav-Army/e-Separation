import React, { useState } from "react";
import axios from "axios";
import config from "../../../config/config";
import "./LwdUpdate.css";
import toast from "react-hot-toast";
import notificationSound from "../../../assets/sound/notification.mp3";
import errorSound from "../../../assets/sound/error.mp3";

import { useLocation } from "react-router-dom";

const LwdUpdate = ({ toggle }) => {
  const SuccessAudio = new Audio(notificationSound);
  const ErrorAudio = new Audio(errorSound);
  const location = useLocation();
  const employeeId = location.state?.employeeId;

  const [formData, setFormData] = useState({
    emp_id: employeeId,
    lwd: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        SuccessAudio.play();
        setLoading(false); // Stop loading before returning
        return;
      }

      const response = await axios.post(
        `${config.BASE_URL}/api/update_lwd/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Last working date updated successfully!");
        SuccessAudio.play();
      }
      // if (response.status === 200 || response.status === 201) {
      //   toast.success("Last working date updated successfully!");
      //   SuccessAudio.play();
      //   toggle(); // Close the popup
      // } else {
      //   toast.error("Failed to update last working date. Please try again.");
      //   ErrorAudio.play();
      // }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      ErrorAudio.play();
    } finally {
      toggle(); // Close the popup
      setLoading(false);
    }
  };

  return (
    <div className="lwd-update">
      <div className="popup animate__animated animate__fadeIn">
        <div className="popup-inner">
          <button className="close-popup-btn" onClick={toggle}>
            &times;
          </button>
          <h2>LWD Update</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Update Last Working Date:
                <input
                  placeholder="Last Working Date"
                  type="date"
                  name="lwd"
                  value={formData.lwd} // Fixed incorrect value key
                  onChange={(e) =>
                    setFormData({ ...formData, lwd: e.target.value })
                  }
                  required
                />
              </label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LwdUpdate;
