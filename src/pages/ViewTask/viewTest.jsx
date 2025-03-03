import React, { useEffect, useState } from "react";
import config from "../../config/config";
import { useLocation } from "react-router-dom";
import Spinner from "../../assets/images/spinner.svg";
import EditIcon from "../../assets/images/edit.png";
import "./ViewTask.css";
import "./ViewTaskTableResponsive.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DownloadeData from "../../assets/images/download.png";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
// import errorNotification from "../../assets/sound/error.mp3";

import LwdUpdate from "../../components/Popup/LwtUpdate/LwdUpdate";

const ViewTask = () => {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [feedback, setFeedabck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(error);
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }

  const location = useLocation();
  const employeeId = location.state?.employeeId;
  const access = localStorage.getItem("access") || "";

  const successSound = new Audio(notificationSound);
  // const errorSound = new Audio(errorNotification);

  const doc = new jsPDF();

  const exportPdfHandler = () => {
    autoTable(doc, { html: "#employee_details" });
    doc.save("Employee-details.pdf");

    toast.success("Export clicked.");
    successSound.play();
  };

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  useEffect(() => {
    const fetchTaskData = async () => {
      if (!employeeId) {
        console.error("Employee ID is undefined");
        setError("Employee ID is missing. Please try again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${config.BASE_URL}/api/hr/${employeeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        const formattedData =
          result.tasks?.map((task) => ({
            id: task.id,
            name: task.task_name,
            hod: task.department_hod,
            department: task.department_name,
            status: task.status,
            comment: task.comment || "---",
          })) || [];

        const feedbackData =
          result.feedback_data?.map((feed) => ({
            question: feed.question_text,
            answer: feed.selected_option,
            comment: feed.comment || "",
          })) || [];

        setData(formattedData);
        setEmployee(result.employee || null);
        setFeedabck(feedbackData);
      } catch (err) {
        console.error("Error fetching task data:", err);
        setError("Failed to fetch task data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [employeeId, access]);

  // const handleLastWorkingDate = () => {
  //   toast.success("Last Working Date Update");
  //   successSound.play();
  // };

  return (
    <div>
      <Header />
      <div className="view">
        <div className="section-part-one">
          {/* Display employee details ================*/}
          <div>
            {employee ? (
              <div className="employee-info">
                <h4>Name: {employee.name}</h4>
                {/* <h4>employee id: {employee.id}</h4> */}
                <h4>Department: {employee.department}</h4>
                <h4>
                  Last Working Date:
                  {employee.last_working_date}
                  <img
                    src={EditIcon}
                    alt="Edit-Icon"
                    className="edit-icon-png"
                    onClick={togglePop}
                  />
                  {seen ? <LwdUpdate toggle={togglePop} /> : null}
                </h4>
                {/* <h4>Resign Date:{employee.resign_date}</h4> */}
              </div>
            ) : (
              !loading && (
                <p className="error-message">Employee details not available.</p>
              )
            )}
          </div>
          <div className="download-data">
            <button className="download-button" onClick={exportPdfHandler}>
              <img src={DownloadeData} alt="download-icon" />
              Download PDF
            </button>
          </div>
        </div>
        <div className="container-fluid main-container">
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
                          <div className="loading-spinner-all-employees">
                            <img src={Spinner} alt="loading..." />
                            <p>Loading...</p>
                          </div>
                        ) : (
                          <table id="employee_details">
                            <thead>
                              {/* <tr className="table100-head">
                                <th className="column1">ID</th>
                                <th className="column2">Task Name</th>
                                <th className="column3">HOD</th>
                                <th className="column4">Department</th>
                                <th className="column5">Status</th>
                              </tr> */}
                              <tr className="table100-head">
                                <th className="column1">ID</th>
                                <th className="column2">Task Name</th>
                                <th className="column3">HOD</th>
                                <th className="column4">Department</th>
                                <th className="column5">Status</th>
                                <th className="column6">Reject Reason</th>
                              </tr>
                            </thead>

                            <tbody>
                              {data.length > 0 ? (
                                data.map((task, index) => (
                                  <tr key={index}>
                                    <td className="column1">{task.id}</td>
                                    <td className="column2">{task.name}</td>
                                    <td className="column3">{task.hod}</td>
                                    <td className="column4">
                                      {task.department}
                                    </td>
                                    <td
                                      className="column5"
                                      style={{
                                        color:
                                          task.status === "approved"
                                            ? "green"
                                            : task.status === "rejected"
                                            ? "red"
                                            : task.status === "Not_Required"
                                            ? "#f0ad4e"
                                            : "black",
                                        // fontWeight: "600",
                                      }}
                                    >
                                      {task.status}
                                    </td>
                                    <td className="column6">{task.comment}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="no-data-message">
                                    No tasks available.
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
                  <div className="feedback-section">
                    <h2 className="text-center">Employee Feedback</h2>
                    {feedback.length > 0 ? (
                      <ul className="feedback-list">
                        {feedback.map((item, index) => {
                          return (
                            <li key={index} className="feedback-item">
                              <p className="feedback-question-text">
                                <strong> Question &#8680; </strong>{" "}
                                <span>{item.question}</span>
                                {/* <strong>Q{index + 1}:</strong> {item.question} */}
                              </p>
                              <p className="feedback-answer-text">
                                <strong> Answer &#8680;</strong>{" "}
                                <span>{item.answer}</span>
                                {/* <strong>Answer:</strong> {item.answer} */}
                              </p>
                              <p className="feedback-comment-text">
                                <strong> Comment &#8680;</strong>{" "}
                                <span>{item.comment}</span>
                                {/* <strong>Answer:</strong> {item.answer} */}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          color: "gray",
                        }}
                      >
                        No feedback available.
                      </p>
                    )}
                  </div>
                </div>
                {/* =================== */}
              </div>
            </div>
          </div>
        </div>
        {/* =================== */}
      </div>
      <Footer />
    </div>
  );
};

export default ViewTask;
