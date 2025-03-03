import React, { useState, useEffect } from "react";
import "./HrDashboard.css";
import "./HrDashTableResponsive.css";
import Spinner from "../../assets/images/spinner.svg";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import AddOneEmp from "../Popup/FromPopup/AddOneEmp";
import UploadImg from "../../assets/images/upload-file-icon.png";
import SingleUserImage from "../../assets/images/add-user-icon.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from "../../assets/images/search.png";
import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
import errorNotification from "../../assets/sound/error.mp3";
import Pagination from "../Pagination/Pagination";

const HrDashboard = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [seen, setSeen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("page") || "1", 10);
  });
  const [totalPages, setTotalPages] = useState(1);

  const successSound = new Audio(notificationSound);
  const errorSound = new Audio(errorNotification);
  const navigate = useNavigate();

  // Toggle the "Add Single Employee" popup
  const togglePop = () => {
    setSeen((prev) => !prev);
  };

  // Fetch dashboard data for the current page
  const fetchDashboardData = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/dashboard?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setTotalPages(response.data.total_pages);
      const employees = response.data.employees.map((e) => {
        const approved = parseInt(e.approved_tasks, 10) || 0;
        const total = parseInt(e.total_tasks, 10) || 0;
        const percentage =
          total > 0 ? ((approved / total) * 100).toFixed(2) : 0;
        return {
          id: e.id,
          name: e.name,
          department_name: e.department_name,
          progress: `${approved}/${total}`,
          percentage,
        };
      });
      setData(employees);
      setFilteredData(employees);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
      toast.error("Error fetching data. Please try again.");
      errorSound.play();
    } finally {
      setLoading(false);
    }
  };

  // Update URL and fetch data when currentPage changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentPage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );
    fetchDashboardData(currentPage);
  }, [currentPage]);

  // Search employees based on the search term
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // Reset to full data if search term is empty
      setFilteredData(data);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/hr/searchEmployee/?name=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setFilteredData(response.data.employees);
    } catch (error) {
      console.error("Error searching employees:", error);
      toast.error("Error searching employees. Please try again.");
      errorSound.play();
    } finally {
      setLoading(false);
    }
  };

  // Trigger search on pressing Enter
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Validate that the uploaded file is an Excel file
  const validateFile = (file) => {
    const validExtensions = [".xlsx", ".xls"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload an Excel file.");
      errorSound.play();
      return false;
    }
    return true;
  };

  // Handle file upload to the server
  const handleUploadData = async (file) => {
    setUploading(true);
    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        errorSound.play();
        return;
      }
      const formData = new FormData();
      formData.append("excel_file", file);
      const response = await axios.post(
        `${config.BASE_URL}/api/hr/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Data uploaded successfully.");
        successSound.play();
        document.querySelector("input[type='file']").value = ""; // Reset file input
      } else {
        toast.error("Unexpected response from the server. Please try again.");
        errorSound.play();
      }
    } catch (error) {
      console.error("Error uploading file:", error.response || error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to upload file. Please try again."
      );
      errorSound.play();
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      // Optionally store or auto-upload the file here
    } else {
      event.target.value = ""; // Reset invalid file
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      handleUploadData(fileInput.files[0]);
    } else {
      toast.error("Please choose a file before uploading.");
      errorSound.play();
    }
  };

  const handleViewTask = (employeeId) => {
    navigate(`/dashboard/ViewTask`, { state: { employeeId } });
  };

  const handleAllEmployees = () => {
    navigate("/dashboard/AllEmployees");
  };

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  return (
    <div className="hr-dashboard">
      <div className="hr-dashboard-top">
        <div className="file-container">
          {/* Bulk Upload Section */}
          <div className="file-section">
            <div className="upload-img">
              <img src={UploadImg} alt="Upload" />
            </div>
            <div className="upload-section">
              <p>Upload Employees Details In Bulk</p>
              <div className="form-upload">
                <form>
                  <input
                    className="upload-select-input"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn-file-upload"
                    disabled={uploading}
                    onClick={handleUploadButtonClick}
                  >
                    {uploading ? "Uploading..." : "Upload Employees Details"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Single Employee Add Section */}
          <div className="file-section">
            <div className="upload-img upload-img-two">
              <img src={SingleUserImage} alt="Add Single Employee" />
            </div>
            <div className="upload-section upload-section-two">
              <p>Add Employee Details Manually</p>
              <div className="form-upload">
                <button
                  type="button"
                  className="btn-file-upload single-employe-add"
                  disabled={uploading}
                  onClick={togglePop}
                >
                  Add Single Employee
                </button>
                {seen && <AddOneEmp toggle={togglePop} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Navigation Section */}
      <div className="section-part-two">
        <div className="searching">
          <div className="user-search">
            <input
              type="text"
              placeholder="Search Employees..."
              value={searchTerm}
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button type="button" className="search-btn" onClick={handleSearch}>
              <img src={SearchIcon} alt="Search" />
            </button>
          </div>
        </div>

        <div className="right-part">
          <div className="export-details">
            {/* Additional export functionality can be added here */}
          </div>
          <div className="all-employee">
            <button
              type="button"
              className="all-employee-btn"
              onClick={handleAllEmployees}
            >
              All Employees Details
            </button>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="container-fluid main-container hr-table">
        <div className="row" style={{ marginBottom: "50px" }}>
          <div className="col-md-12 column-ph">
            <div className="panel panel-default">
              <div className="limiter panel-body">
                <div className="container-table100">
                  <div className="wrap-table100">
                    <div className="table100">
                      {loading ? (
                        <div className="loading-spinner-hr">
                          <img src={Spinner} alt="Loading" />
                          <p>Loading...</p>
                        </div>
                      ) : (
                        <table>
                          <thead>
                            <tr className="table100-head">
                              <th className="column1">ID</th>
                              <th className="column2">Employee Name</th>
                              <th className="column3">Department</th>
                              <th className="column4">Progress</th>
                              <th className="column6">Task View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.length > 0 ? (
                              filteredData.map((employee) => (
                                <tr key={employee.id}>
                                  <td className="column1">{employee.id}</td>
                                  <td className="column2">{employee.name}</td>
                                  <td className="column3">
                                    {employee.department_name}
                                  </td>
                                  <td className="column4">
                                    <CircularProgressbar
                                      value={employee.percentage}
                                      text={employee.progress}
                                      styles={buildStyles({
                                        textColor: "#808080",
                                        pathColor: "#4ab3c8",
                                        trailColor: "#d6d6d6",
                                      })}
                                    />
                                  </td>
                                  <td className="column6">
                                    <button
                                      onClick={() =>
                                        handleViewTask(employee.id)
                                      }
                                      className="btn btn-color btn-sm pulse"
                                    >
                                      View Task
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                  No employees found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
