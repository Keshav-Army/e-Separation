import React, { useState } from "react";
import axios from "axios";
import config from "../../../config/config";
import "./AddOneEmp.css";
import toast from "react-hot-toast";
import notificationSound from "../../../assets/sound/notification.mp3";
import empImage from "../../../assets/images/employee.png";

const AddOneEmp = ({ toggle, onEmployeeAdded }) => {
  const audio = new Audio(notificationSound);

  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    department: "",
    resign_date: "",
    last_working_date: "",
    has_critical_permissions: false,
  });

  const [loading, setLoading] = useState(false);
  const departments = [
    "Admin",
    "B2C Sales",
    "Finance",
    "HR",
    "IT",
    "Partnersales",
    "Tech",
    "Cataloging",
    "Central Operations",
    "Central Planning",
    "CS",
    "Customercare",
    "CXOs",
    "FP&A",
    "GT",
    "Legal",
    "Marketing",
    "Offline Sales",
    "Production",
    "Purchase",
    "Quality",
    "Warehouse",
  ];

  const handleFocus = (e) => {
    e.target.type = "date";
  };

  const handleBlur = (e) => {
    if (!e.target.value) e.target.type = "text";
  };

  const handleCheckboxChange = (value) => {
    setFormData({
      ...formData,
      has_critical_permissions: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        audio.play();
        // alert("Access token is missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${config.BASE_URL}/api/hr/upload_form/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Employee added successfully!");
        audio.play();
        // alert("Employee added successfully. Please wait for HR to verify.");
        onEmployeeAdded(); // Optional: Trigger any callback for parent component
        toggle(); // Close the popup
      } else {
        toast.error("Failed to add employee. Please try again.");
        audio.play();
        // alert("Failed to add employee. Please try again.");
      }
    } catch (error) {
      // console.error("Error adding employee:", error.response || error.message);
      // alert("Error adding employee. Please check the data and try again.");
      toggle(); // Close the popup
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-one-emp">
      <div className="popup animate__animated animate__fadeIn">
        <div className="popup-inner">
          <button className="close-popup-btn" onClick={toggle}>
            &times;
          </button>
          <h2>
            <img className="employeeimg" src={empImage} alt="employe img" />
            Add Employee
          </h2>
          <form onSubmit={handleSubmit}>
            {/* <label>
              User ID: */}
            <input
              placeholder="User ID"
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={(e) =>
                setFormData({ ...formData, user_id: e.target.value })
              }
              required
            />
            {/* </label> */}

            <div className="form-row">
              {/* <label>
                First Name: */}
              <input
                placeholder="First Name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
              />
              {/* </label> */}

              {/* <label>
                Last Name: */}
              <input
                placeholder="Last Name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
              />
              {/* </label> */}
            </div>

            {/* <label>
              Email: */}
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {/* </label> */}

            {/* <label>
              Department: */}
            <select
              className="department-option"
              name="department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {/* </label> */}

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
              {/* <button type="button" onClick={toggle} className="close-btn">
                Close
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOneEmp;
