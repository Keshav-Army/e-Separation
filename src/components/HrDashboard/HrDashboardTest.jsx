import React, { useState, useEffect } from "react";
// import CsvDownloadButton from "react-json-to-csv";

// import DataTable from "react-data-table-component";
import "./HrDashboard.css";
import "./HrDashTableResponsive.css";
import Spinner from "../../assets/images/spinner.svg";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import AddOneEmp from "../Popup/FromPopup/AddOneEmp";
// import DownloadeData from "../../assets/images/download.png";
import UploadImg from "../../assets/images/upload-file-icon.png";
import SingleUserImage from "../../assets/images/add-user-icon.png";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
import errorNotification from "../../assets/sound/error.mp3";

import LeftArrow from "../../assets/images/leftarrow.png";
import RightArrow from "../../assets/images/rightarrow.png";

const HrDashboard = (props) => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [seen, setSeen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const successSound = new Audio(notificationSound);
  const errorSound = new Audio(errorNotification);

  function togglePop() {
    setSeen(!seen);
  }

  // const handleExport = () => {};

  const navigate = useNavigate();
  const userData = props.userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = userData.employees
          ? userData.employees.map((e) => {
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
            })
          : null;
        setData(response);
        setFilteredData(response);
        if (response) setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [userData]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (data) {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.department_name.toLowerCase().includes(value) ||
          String(item.id).includes(value)
      );
      setFilteredData(filtered);
    }
  };

  const validateFile = (file) => {
    const validExtensions = [".xlsx", ".xls"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload an Excel file.");
      errorSound.play();
      // alert("Invalid file type. Please upload an Excel file.");
      return false;
    }
    return true;
  };

  const handleUploadData = async (file) => {
    setUploading(true);

    try {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        errorSound.play();
        // alert("Access token is missing. Please log in again.");
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
        // alert("File uploaded successfully!");
        document.querySelector("input[type='file']").value = ""; // Reset file input
      } else {
        toast.error("Unexpected response from the server. Please try again.");
        errorSound.play();

        // alert("Unexpected response from the server. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.response || error.message);
      error.response?.data?.message ||
        toast.error("Failed to upload file. Please try again.");
      errorSound.play();

      // alert(
      //   error.response?.data?.message ||
      //     "Failed to upload file. Please try again."
      // );
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      // Valid file, allow further actions
    } else {
      event.target.value = ""; // Reset invalid file
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      handleUploadData(fileInput.files[0]);
    } else {
      toast.error("Please Choose file before uploading.");
      errorSound.play();
      // alert("Please select a file before uploading.");
    }
  };

  const handleViewTask = (employeeId) => {
    navigate(`/dashboard/ViewTask`, { state: { employeeId } });
  };

  const handleAllEmployees = () => {
    navigate("/dashboard/AllEmployees");
  };

  // const handleRollCredits = () => {
  //   navigate("/dashboard/RollCredits");
  // };

  // useEffect(() => {
  //   // if currentpage is 2 then i have to append the query param and then fetch the data=>>>>>>>>>>
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${config.BASE_URL}/api/dashboard?page=${currentPage}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           },
  //         }
  //       );
  //       const employees = response.data.employees.map((e) => {
  //         const approved = parseInt(e.approved_tasks, 10) || 0;
  //         const total = parseInt(e.total_tasks, 10) || 0;
  //         return {
  //           id: e.id,
  //           name: e.name,
  //           department_name: e.department_name,
  //           progress: `${approved}/${total}`,
  //         };
  //       });
  //       setData(employees);
  //       setFilteredData(employees);
  //     } catch (error) {
  //       console.error("Error fetching paginated data:", error);
  //     } finally {
  //       setLoading(false); // Always set loading to false here
  //     }
  //   };

  //   fetchData();
  // }, [currentPage]);

  useEffect(() => {
    // Update URL query params without reloading
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentPage);
    // urlParams.set("order", "date");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/dashboard?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        const employees = response.data.employees.map((e) => {
          const approved = parseInt(e.approved_tasks, 10) || 0;
          const total = parseInt(e.total_tasks, 10) || 0;
          return {
            id: e.id,
            name: e.name,
            department_name: e.department_name,
            progress: `${approved}/${total}`,
          };
        });
        setData(employees);
        setFilteredData(employees);
      } catch (error) {
        console.error("Error fetching paginated data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="hr-dashboard">
        <div className="hr-dashboard-top">
          <div className="file-container">
            <div className="file-section">
              <div className="upload-img">
                <img src={UploadImg} alt="upload-img" />
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
                      {uploading ? "Uploading..." : "Upload  Employees Details"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="file-section">
              <div className="upload-img upload-img-two">
                <img src={SingleUserImage} alt="upload-img" />
              </div>
              <div className="upload-section upload-section-two ">
                <p>Add Employee Details Manually</p>
                <div className="form-upload">
                  <button
                    type="button"
                    className="btn-file-upload single-employe-add"
                    disabled={uploading}
                    onClick={togglePop}
                  >
                    Add Single Employee
                    {/* {uploading ? "Uploading..." : "Add Single Employee"} */}
                  </button>
                  {seen ? <AddOneEmp toggle={togglePop} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-part-two">
          <div className="searching">
            <div className="user-search">
              <input
                type="text"
                placeholder="Search Employees"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="right-part">
            {/* <div className="export-details">
              <button type="button" className="btn-file-upload">
                <img src={DownloadeData} alt="download-icon" />
                <CsvDownloadButton data={data} />
              </button>
            </div> */}

            <div className="export-details">
              {/* <button
                type="button"
                className="btn-file-upload"
                onClick={handleRollCredits}
              >
                roll and cradit
              </button> */}
            </div>

            <div className="all-employee">
              {/* <button onClick={handleAllEmployees}>All Employees</button> */}
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

        <div className="container-fluid main-container hr-table">
          <div className="row" style={{ marginBottom: "50px" }}>
            <div className="col-md-12 column-ph">
              <div className="panel panel-default">
                {/* <div className="panel-heading">
                  <div className="panel-top">
                    <h3 className="panel-title">HR Dashboard</h3>
                  </div>
                </div> */}
                <div className="limiter panel-body">
                  <div className="container-table100">
                    <div className="wrap-table100">
                      <div className="table100">
                        {loading ? (
                          <div className="loading-spinner-hr">
                            <img src={Spinner} alt="loading..." />
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
                              {filteredData && filteredData.length > 0 ? (
                                filteredData.map((employee) => (
                                  <tr key={employee.id}>
                                    <td className="column1">{employee.id}</td>
                                    <td className="column2">{employee.name}</td>
                                    <td className="column3">
                                      {employee.department_name}
                                    </td>
                                    <td className="column4">
                                      {/* {employee.progress} */}

                                      {/* <CircularProgressbar
                                        value={percentage}
                                        text={`${percentage}%`}
                                        styles={buildStyles({
                                          textColor: "#808080",
                                          pathColor: "#4ab3c8",
                                          trailColor: "#d6d6d6",
                                        })}
                                      /> */}

                                      {/* <CircularProgressbar
                                        value={employee.percentage}
                                        text={`${employee.percentage}%`}
                                        styles={buildStyles({
                                          textColor: "#808080",
                                          pathColor: "#4ab3c8",
                                          trailColor: "#d6d6d6",
                                        })}
                                      /> */}

                                      <CircularProgressbar
                                        value={employee.percentage}
                                        text={`${employee.progress}`}
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
                                  <td
                                    colSpan="6"
                                    style={{ textAlign: "center" }}
                                  >
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
                  <button
                    onClick={handlePrev}
                    className="btn btn-default arrow-btn"
                    disabled={currentPage === 1}
                  >
                    <img src={LeftArrow} alt="leftarrow" />
                  </button>
                  <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
                  <button
                    onClick={handleNext}
                    className="btn btn-default arrow-btn"
                    disabled={data && data.length === 0}
                  >
                    <img src={RightArrow} alt="rightarrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =================== */}
      </div>
    </>
  );
};

export default HrDashboard;
