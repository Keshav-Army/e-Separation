import React, { useState } from "react";
import axios from "axios";
import config from "../../../config/config";
import "./TriggerPopup.css";

const TriggerPopup = ({ toggle, employeeId, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    emp_id: employeeId,
    resign_date: "",
    last_working_date: "",
    has_critical_permissions: true,
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (value) => {
    setFormData({
      ...formData,
      has_critical_permissions: value,
    });
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const handleFocus = (e) => {
    e.target.type = "date";
  };

  const handleBlur = (e) => {
    if (!e.target.value) e.target.type = "text";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        alert("Access token is missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${config.BASE_URL}/api/button_trigger/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Exit formalities initiated successfully!");
        onEmployeeAdded(response.data); // Notify the parent component
        toggle(); // Close the popup
      } else {
        alert("Failed to initiate exit formalities. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error submitting the form:",
        error.response || error.message
      );
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trigger">
      <div className="popup animate__animated animate__fadeIn">
        <div className="popup-inner">
          <h2>Proceed Exit Formality</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Employee ID:
              <input
                type="text"
                name="emp_id"
                value={formData.emp_id}
                disabled
              />
            </label>

            {/* <div className="form-row">
              <label>
                Resign Date:
                <input
                  type="date"
                  name="resign_date"
                  value={formData.resign_date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Last Working Date:
                <input
                  type="date"
                  name="last_working_date"
                  value={formData.last_working_date}
                  onChange={handleChange}
                  required
                />
              </label>
            </div> */}

            <div className="form-row">
              {/* <label>
                Resign Date: */}

              <input
                placeholder="Resign Date"
                type="text"
                name="resign_date"
                value={formData.resign_date}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) =>
                  setFormData({ ...formData, resign_date: e.target.value })
                }
                required
              />

              {/* </label> */}

              {/* <label>
                Last Working Date: */}
              <input
                placeholder="Last Working Date"
                type="text"
                name="last_working_date"
                value={formData.last_working_date}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_working_date: e.target.value,
                  })
                }
                required
              />
              {/* </label> */}
            </div>

            <div className="form-row critical-permissions">
              <span style={{ textAlign: "left", color: "#9c9a9a" }}>
                <strong>Critical Permissions Status:</strong>
                {/* <strong>
                  {formData.has_critical_permissions ? "Enabled" : "Disabled"}
                </strong> */}
              </span>{" "}
              <div className="toggle-switch">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.has_critical_permissions}
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button type="button" onClick={toggle} className="close-btn">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TriggerPopup;
