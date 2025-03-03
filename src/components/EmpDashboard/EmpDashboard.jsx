import React, { useEffect, useState } from "react";
import "./EmpDashboard.css";
import "./EmpDashboardResponsive.css";

import Spinner from "../../assets/images/spinner.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";

const EmpDashboard = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState(null); // State for employee details
  const [employeeLoading, setEmployeeLoading] = useState(true);

  const navigate = useNavigate();
  const userData = props.userData;

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/get_user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        setEmployeeDetails(response.data.user_data); // Use response.data directly
        setEmployeeLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setEmployeeLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, []);

  // Fetch tasks data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = userData.tasks
          ? userData.tasks.map((e) => ({
              id: e.id,
              name: e.task_name,
              hod: e.department_hod,
              department: e.department_name,
              status: e.status,
              comment: e.comment || "---",
            }))
          : null;
        setData(response);
        if (response) setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  const handleFeedback = () => {
    navigate(`/dashboard/EmpFeedback`, {
      // navigate(`/dashboard/ExitInterviewForm`, {
      state: {
        feedbackQuestions: userData.feedback_questions.map((q) => ({
          id: q.id,
          question: q.text,
          choices: q.options.map((option) => option.text),
        })),
        userId: employeeDetails?.id,
      },
    });
  };

  return (
    <>
      <div className="employee">
        <div className="container-fluid main-container ">
          <div className="row">
            <div className="col-md-12 column-ph">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    {employeeLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <span>{employeeDetails?.name} </span>
                    )}
                    Dashboard
                  </h3>
                  {/* <div className="employee-details">
                    {employeeLoading ? (
                      <div>Loading Employee Details...</div>
                    ) : (
                      <div>
                        <p>User ID: {employeeDetails?.id}</p>
                        <p>Name: {employeeDetails?.name}</p>
                        <p>Department: {employeeDetails?.department_name}</p>
                      </div>
                    )}
                  </div> */}
                  <button
                    onClick={handleFeedback}
                    className="btn btn-lg btn-pink"
                  >
                    Submit Your Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid main-container">
          <div className="row" style={{ marginBottom: "50px" }}>
            <div className="col-md-12 column-ph">
              <div className="panel panel-default">
                {/* <div className="panel-heading">
                  <div className="panel-top">
                    <h3 className="panel-title">Feedback Dashboard</h3>
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
                          <table>
                            <thead>
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
              </div>
            </div>
          </div>
        </div>
        {/* =================== */}
      </div>
    </>
  );
};

export default EmpDashboard;
