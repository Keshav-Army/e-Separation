import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import "./HODDashboard.css";
import Spinner from "../../assets/images/spinner.svg";
import { Dropdown } from "react-bootstrap";
import CommentPopup from "../Popup/CommentPopup/CommentPopup";

import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
import errorNotification from "../../assets/sound/error.mp3";

const HODDashboard = (props) => {
  const [isOpen, setIsOpen] = useState(true); // default would be open
  const successSound = new Audio(notificationSound);
  const errorSound = new Audio(errorNotification);

  const [groupedData, setGroupedData] = useState({});
  const [modifiedTasks, setModifiedTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [seen, setSeen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // Storeing the task being rejected

  const userData = props.userData;
  const accessToken = localStorage.getItem("access");

  function togglePop() {
    setSeen(!seen);
  }

  useEffect(() => {
    if (!userData.grouped_tasks) return;

    const groupedTasks = Object.keys(userData.grouped_tasks).reduce(
      (acc, name) => {
        acc[name] = userData.grouped_tasks[name].map((task) => ({
          ...task,
          groupName: name,
        }));
        return acc;
      },
      {}
    );

    setGroupedData(groupedTasks);
    setLoading(false);
  }, [userData.grouped_tasks]);

  // will have to clean this code up okay keshav babu
  const GroupDropdown = ({ groupName, tasks }) => {
    // const [isOpen, setIsOpen] = useState(false); // default would be close
    const groupStatus = tasks.some((task) => task.status === "pending")
      ? "Pending"
      : "Completed";
    const lastWorkingDate = tasks.length
      ? tasks[tasks.length - 1].last_working_date || "No Last Working Date"
      : "No Last Working Date";

    // const lastWorkingDate = tasks.length
    //   ? tasks[tasks.length - 1].last_working_date || "No Last Working Date"
    //   : "No Last Working Date";

    return (
      <div className="group-dropdown">
        <div
          className="group-header"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* <h4>
            {groupName || "Unnamed"} ┃ {groupStatus} ┃ {lastWorkingDate}
          </h4> */}

          <h4>
            <span>
              {groupName || "Unnamed"}
              <span>┃</span>
              {groupStatus}
            </span>
            <span className="space-bar">┃</span>
            <span>{lastWorkingDate}</span>
          </h4>
        </div>
        {isOpen && (
          <div className="group-content">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <span className="task-id">{task.id}</span>
                <span className="task-name">{task.task_name}</span>
                {/* <span className="task-name task-last-working-date">
                  {task.last_working_date}
                </span> */}
                <span
                  className="task-status"
                  style={{
                    color:
                      task.status === "approved"
                        ? "green"
                        : task.status === "rejected"
                        ? "red"
                        : task.status === "Not_Required"
                        ? "#e38000"
                        : "black",
                    // fontWeight: "600",
                  }}
                >
                  {task.status}
                </span>

                {/* Dropdown Menu */}
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Action
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="dropdown-btn"
                      onClick={() =>
                        handleStatusUpdateLocally(groupName, task.id, "approve")
                      }
                    >
                      Approve
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-btn"
                      onClick={() =>
                        handleStatusUpdateLocally(groupName, task.id, "reject")
                      }
                    >
                      Reject
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-btn"
                      onClick={() =>
                        handleStatusUpdateLocally(
                          groupName,
                          task.id,
                          "Not Required"
                        )
                      }
                    >
                      N/R
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ))}
            <div className="group-actions">
              <button
                onClick={() => handleGroupSubmit(groupName)}
                className="btn btn-default btn-submit"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleStatusUpdateLocally = (groupName, taskId, newStatus) => {
    setGroupedData((prevData) => {
      const updatedGroup = prevData[groupName].map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      return { ...prevData, [groupName]: updatedGroup };
    });

    setModifiedTasks((prev) => {
      const updatedTasks = { ...prev };
      if (!updatedTasks[groupName]) {
        updatedTasks[groupName] = {};
      }
      updatedTasks[groupName][taskId] = { action: newStatus };
      return updatedTasks;
    });
    if (newStatus === "reject") {
      setCurrentTask({ groupName, taskId }); // Save task info for the popup
      setSeen(true); // Open the popup for entering a comment
    }
  };

  const handleCommentSubmit = (comment) => {
    // Store the comment in the modified tasks state
    setModifiedTasks((prev) => {
      const updatedTasks = { ...prev };
      const { groupName, taskId } = currentTask;
      if (updatedTasks[groupName] && updatedTasks[groupName][taskId]) {
        updatedTasks[groupName][taskId].comment = comment; // Add the comment
      }
      return updatedTasks;
    });

    setSeen(false); // Close the popup
  };

  const handleGroupSubmit = async (groupName) => {
    if (!modifiedTasks[groupName]) {
      errorSound.play();
      toast.error("No changes to submit.");

      // alert("No changes to submit.");
      return;
    }

    try {
      const tasksToUpdate = Object.entries(modifiedTasks[groupName]).map(
        ([taskId, taskData]) => ({
          employee_task_id: parseInt(taskId),
          action: taskData.action,
          ...(taskData.action === "reject" && taskData.comment
            ? { comment: taskData.comment }
            : {}),
        })
      );

      const response = await axios.post(
        `${config.BASE_URL}/api/hod/update_task/`,
        tasksToUpdate,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Tasks updated successfully.");
        successSound.play();

        // alert("All tasks updated successfully!");

        setModifiedTasks((prev) => {
          const updated = { ...prev };
          delete updated[groupName];
          return updated;
        });
      } else {
        toast.error("Failed to update tasks.");
        errorSound.play();

        // alert("Failed to update tasks.");
      }
    } catch (error) {
      console.error("Error details:", error);
      // toast.error("Failed to update tasks.");
      toast.error(
        "An error occurred while updating the tasks. Check console for details."
      );
      errorSound.play();

      // alert(
      //   "An error occurred while updating the tasks. Check console for details."
      // );
    }
  };

  return (
    <>
      <div className="hod">
        <div className="container-fluid main-container ">
          <div className="row hod-row">
            <div className="col-md-12 hod-column">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">HOD Dashboard</h3>
                </div>
                <div className="panel-body css-panel">
                  {loading ? (
                    <div className="loading-spinner-hod">
                      <img src={Spinner} alt="loading" />
                      <p>Loading...</p>
                    </div>
                  ) : Object.keys(groupedData).length > 0 ? (
                    Object.keys(groupedData).map((groupName) => (
                      <GroupDropdown
                        key={groupName}
                        groupName={groupName}
                        tasks={groupedData[groupName]}
                      />
                    ))
                  ) : (
                    <p className="no-task-message">Task not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {seen && (
            <CommentPopup
              toggle={togglePop}
              currentTask={currentTask}
              onCommentSubmit={handleCommentSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HODDashboard;
