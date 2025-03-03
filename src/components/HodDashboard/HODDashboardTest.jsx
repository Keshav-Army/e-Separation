// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import "./HODDashboard.css";
// import axios from "axios";
// import Spinner from "../../assets/images/spinner.svg";

// const HODDashboard = (props) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   console.log(props);

//   const userData = props.userData; //JSON.parse(localStorage.getItem("userData") || "{}");
//   const accessToken = localStorage.getItem("access");

//   useEffect(() => {
//     if (!userData.grouped_tasks) return;
//     // Process grouped_tasks into a single array
//     const allData = Object.keys(userData.grouped_tasks).flatMap((key) =>
//       userData.grouped_tasks[key].map((e) => ({
//         id: e.id,
//         name: e.emp_name,
//         task: e.task_name,
//         status: e.status,
//       }))
//     );
//     // Update state only if data has changed to avoid infinite re-renders
//     setData((prevData) => {
//       const isDataSame = JSON.stringify(prevData) === JSON.stringify(allData);
//       return isDataSame ? prevData : allData;
//     });
//     setLoading(false);
//   }, [userData.grouped_tasks]);

//   const handleStatusUpdate = async (taskId, action) => {
//     console.log("Updating task with:", { taskId, action });

//     try {
//       const response = await axios.post(
//         "https://exit-emp-project.onrender.com/api/hod/update_task/",
//         {
//           employee_task_id: taskId,
//           action: action,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (
//         response.data &&
//         response.data.message === "Task updated successfully"
//       ) {
//         console.log("Task status updated successfully:", response.data);

//         // Update the status and mark the task as updated in the local state
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.id === taskId
//               ? { ...item, status: action, isUpdated: true }
//               : item
//           )
//         );
//       } else {
//         console.error("Task update failed:", response.data.error);
//         alert("Task Update Failed");
//       }
//     } catch (error) {
//       console.error(
//         "Error updating task status:",
//         error.response?.data || error.message
//       );
//       alert("An error occurred while updating the task.");
//     }
//   };

//   const columns = [
//     { name: "ID", selector: (row) => row.id },
//     {
//       name: "Employee Name",
//       selector: (row) => row.name,
//       cell: (row) => <div>{row.name}</div>,
//     },
//     { name: "Task", selector: (row) => row.task },
//     { name: "Status", selector: (row) => row.status },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="action-btn">
//           {row.isUpdated ? (
//             <span>Status updated to: {row.status}</span>
//           ) : (
//             <>
//               <button
//                 onClick={() => handleStatusUpdate(row.id, "approve")}
//                 className="btn btn-success btn-sm"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(row.id, "reject")}
//                 className="btn btn-danger btn-sm"
//               >
//                 Reject
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(row.id, "NA")}
//                 className="btn btn-warning btn-sm"
//               >
//                 N/A
//               </button>
//             </>
//           )}
//         </div>
//       ),
//     },
//   ];

//   console.log("loading >>>>>", loading);

//   return (
//     <div className="container-fluid main-container hod">
//       <div className="row" style={{ marginBottom: "50px" }}>
//         <div className="col-md-12">
//           <div className="panel panel-default">
//             <div className="panel-heading">
//               <h3 className="panel-title">HOD Dashboard</h3>
//             </div>
//             <div className="panel-body">
//               {loading ? (
//                 <div className="loading-spinner-hod">
//                   <img src={Spinner} alt="loading..." />
//                   <p>Loading...</p>
//                 </div>
//               ) : (
//                 <DataTable
//                   columns={columns}
//                   data={data}
//                   responsive
//                   pagination
//                   highlightOnHover
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HODDashboard;

//============================================================================================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Spinner from "../../assets/images/spinner.svg";
// import "./HODDashboard.css";

// const HODDashboard = (props) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedDropdown, setExpandedDropdown] = useState(null); // Track expanded dropdown

//   const userData = props.userData;
//   const accessToken = localStorage.getItem("access");

//   useEffect(() => {
//     if (!userData.grouped_tasks) return;
//     const allData = Object.keys(userData.grouped_tasks).flatMap((key) =>
//       userData.grouped_tasks[key].map((e) => ({
//         id: e.id,
//         name: e.emp_name,
//         task: e.task_name,
//         status: e.status,
//       }))
//     );
//     setData(allData);
//     setLoading(false);
//   }, [userData.grouped_tasks]);

//   const handleStatusUpdate = async (taskId, action) => {
//     try {
//       const response = await axios.post(
//         "https://exit-emp-project.onrender.com/api/hod/update_task/",
//         { employee_task_id: taskId, action },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       if (response.data?.message === "Task updated successfully") {
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.id === taskId ? { ...item, status: action } : item
//           )
//         );
//         alert("Task updated successfully!");
//       } else {
//         alert("Task update failed");
//       }
//     } catch (error) {
//       alert("Error updating task status.");
//     }
//   };

//   const toggleDropdown = (id) => {
//     setExpandedDropdown((prev) => (prev === id ? null : id)); // Toggle dropdown
//   };

//   return (
//     <div className="container-fluid main-container hod">
//       <div className="row" style={{ marginBottom: "50px" }}>
//         <div className="col-md-12">
//           <div className="panel panel-default">
//             <div className="panel-heading">
//               <h3 className="panel-title">HOD Dashboard</h3>
//             </div>
//             <div className="panel-body">
//               {loading ? (
//                 <div className="loading-spinner-hod">
//                   <img src={Spinner} alt="loading..." />
//                   <p>Loading...</p>
//                 </div>
//               ) : (
//                 <div className="dropdown-container">
//                   {data.map((item) => (
//                     <div key={item.id} className="dropdown-item">
//                       {/* Dropdown Header */}
//                       <div
//                         className="dropdown-header"
//                         onClick={() => toggleDropdown(item.id)}
//                       >
//                         <span>{item.name}</span>
//                         <span>{item.status}</span>
//                         <span>Action</span>
//                       </div>

//                       {/* Dropdown Body */}
//                       {expandedDropdown === item.id && (
//                         <div className="dropdown-body">
//                           <p>ID: {item.id}</p>
//                           <p>Task: {item.task}</p>
//                           <p>Status: {item.status}</p>
//                           <div className="dropdown-actions">
//                             <button
//                               onClick={() =>
//                                 handleStatusUpdate(item.id, "approve")
//                               }
//                               className="btn btn-success btn-sm"
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleStatusUpdate(item.id, "reject")
//                               }
//                               className="btn btn-danger btn-sm"
//                             >
//                               Reject
//                             </button>
//                             <button
//                               onClick={() => handleStatusUpdate(item.id, "NA")}
//                               className="btn btn-warning btn-sm"
//                             >
//                               N/A
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HODDashboard;

//===============================================================================================================
// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import "./HODDashboard.css";
// import axios from "axios";
// import Spinner from "../../assets/images/spinner.svg";

// const HODDashboard = (props) => {
//   const [groupedData, setGroupedData] = useState({});
//   const [loading, setLoading] = useState(true);
//   console.log(props);

//   const userData = props.userData;
//   const accessToken = localStorage.getItem("access");

//   useEffect(() => {
//     if (!userData.grouped_tasks) return;

//     // Process data into grouped format
//     const groupedTasks = Object.keys(userData.grouped_tasks).reduce(
//       (acc, groupId) => {
//         acc[groupId] = userData.grouped_tasks[groupId].map((task) => ({
//           ...task,
//           groupId, // Include the group ID for reference
//         }));
//         return acc;
//       },
//       {}
//     );

//     setGroupedData(groupedTasks);
//     setLoading(false);
//   }, [userData.grouped_tasks]);

//   const handleStatusUpdate = async (taskId, action) => {
//     console.log("Updating task with:", { taskId, action });

//     try {
//       const response = await axios.post(
//         "https://exit-emp-project.onrender.com/api/hod/update_task/",
//         {
//           employee_task_id: taskId,
//           action: action,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (
//         response.data &&
//         response.data.message === "Task updated successfully"
//       ) {
//         console.log("Task status updated successfully:", response.data);

//         // Update the status in the grouped data state
//         setGroupedData((prevGroupedData) => {
//           const updatedGroupedData = { ...prevGroupedData };
//           for (const groupId in updatedGroupedData) {
//             updatedGroupedData[groupId] = updatedGroupedData[groupId].map(
//               (task) =>
//                 task.id === taskId ? { ...task, status: action } : task
//             );
//           }
//           return updatedGroupedData;
//         });
//       } else {
//         console.error("Task update failed:", response.data.error);
//         alert("Task Update Failed");
//       }
//     } catch (error) {
//       console.error(
//         "Error updating task status:",
//         error.response?.data || error.message
//       );
//       alert("An error occurred while updating the task.");
//     }
//   };

//   const columns = [
//     { name: "ID", selector: (row) => row.id },
//     {
//       name: "Employee Name",
//       selector: (row) => row.emp_name,
//     },
//     { name: "Task", selector: (row) => row.task_name },
//     { name: "Status", selector: (row) => row.status },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="action-btn">
//           <button
//             onClick={() => handleStatusUpdate(row.id, "approve")}
//             className="btn btn-success btn-sm"
//           >
//             Approve
//           </button>
//           <button
//             onClick={() => handleStatusUpdate(row.id, "reject")}
//             className="btn btn-danger btn-sm"
//           >
//             Reject
//           </button>
//           <button
//             onClick={() => handleStatusUpdate(row.id, "NA")}
//             className="btn btn-warning btn-sm"
//           >
//             N/A
//           </button>
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="loading-spinner-hod">
//         <img src={Spinner} alt="loading..." />
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid main-container hod">
//       <div className="row" style={{ marginBottom: "50px" }}>
//         <div className="col-md-12">
//           <div className="panel panel-default">
//             <div className="panel-heading">
//               <h3 className="panel-title">HOD Dashboard</h3>
//             </div>
//             <div className="panel-body">
//               {Object.keys(groupedData).map((groupId) => (
//                 <div key={groupId} className="group-container">
//                   <h4>Group ID: {groupId}</h4>
//                   <DataTable
//                     columns={columns}
//                     data={groupedData[groupId]}
//                     responsive
//                     pagination
//                     highlightOnHover
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HODDashboard;

//===============================================================================================================
//===============================================================================================================

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HODDashboard.css";

const HODDashboard = (props) => {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);

  const userData = props.userData;
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (!userData.grouped_tasks) return;

    // Process data into grouped format
    const groupedTasks = Object.keys(userData.grouped_tasks).reduce(
      (acc, groupId) => {
        acc[groupId] = userData.grouped_tasks[groupId].map((task) => ({
          ...task,
          groupId, // Include the group ID for reference
        }));
        return acc;
      },
      {}
    );

    setGroupedData(groupedTasks);
    setLoading(false);
  }, [userData.grouped_tasks]);

  const handleStatusUpdate = async (taskId, action) => {
    try {
      const response = await axios.post(
        "https://exit-emp-project.onrender.com/api/hod/update_task/",
        {
          employee_task_id: taskId,
          action: action,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (
        response.data &&
        response.data.message === "Task updated successfully"
      ) {
        // Update the status in the grouped data state
        setGroupedData((prevGroupedData) => {
          const updatedGroupedData = { ...prevGroupedData };
          for (const groupId in updatedGroupedData) {
            updatedGroupedData[groupId] = updatedGroupedData[groupId].map(
              (task) =>
                task.id === taskId ? { ...task, status: action } : task
            );
          }
          return updatedGroupedData;
        });
      } else {
        alert("Task Update Failed");
      }
    } catch (error) {
      alert("An error occurred while updating the task.");
    }
  };

  const GroupDropdown = ({ groupId, tasks }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Get employee name from the first task in the group
    const empName = tasks.length > 0 ? tasks[0].emp_name : "Unknown";

    // Determine group status: "Pending" if any task is pending, otherwise "Completed"
    const groupStatus = tasks.some((task) => task.status === "pending")
      ? "Pending"
      : "Completed";

    return (
      <div className="group-dropdown">
        <div
          className="group-header"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <h4>
            {isOpen ? "▼" : "▶"} Group ID: {groupId} | Employee: {empName} |
            Status: {groupStatus}
          </h4>
        </div>
        {isOpen && (
          <div className="group-content">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <span className="task-id">{task.id}</span>
                <span className="task-name">{task.task_name}</span>
                <span className="task-status">{task.status}</span>
                <div className="task-actions">
                  <button
                    onClick={() => handleStatusUpdate(task.id, "approve")}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(task.id, "reject")}
                    className="btn btn-danger btn-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(task.id, "NA")}
                    className="btn btn-warning btn-sm"
                  >
                    N/A
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid main-container hod">
      <div className="row" style={{ marginBottom: "50px" }}>
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">HOD Dashboard</h3>
            </div>
            <div className="panel-body">
              {Object.keys(groupedData).map((groupId) => (
                <GroupDropdown
                  key={groupId}
                  groupId={groupId}
                  tasks={groupedData[groupId]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./HODDashboard.css";
// import Spinner from "../../assets/images/spinner.svg";

// const HODDashboard = (props) => {
//   const [groupedData, setGroupedData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const userData = props.userData;
//   const accessToken = localStorage.getItem("access");

//   useEffect(() => {
//     if (!userData.grouped_tasks) return;

//     // Process data into grouped format
//     const groupedTasks = Object.keys(userData.grouped_tasks).reduce(
//       (acc, groupId) => {
//         acc[groupId] = userData.grouped_tasks[groupId].map((task) => ({
//           ...task,
//           groupId, // Include the group ID for reference
//         }));
//         return acc;
//       },
//       {}
//     );

//     setGroupedData(groupedTasks);
//     setLoading(false);
//   }, [userData.grouped_tasks]);
//   //=========================================================================================================>>>>>>>>>>
//   //=========================================================================================================>>>
//   //=========================================================================================================>>>>>>>>>>
//   const handleStatusUpdate = async (taskId, action) => {
//     try {
//       const response = await axios.post(
//         "https://exit-emp-v2.onrender.com/api/hod/update_task/",
//         {
//           employee_task_id: taskId,
//           action: action,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (
//         response.data &&
//         response.data.message === "Task updated successfully"
//       ) {
//         // Update the status in the grouped data state
//         setGroupedData((prevGroupedData) => {
//           const updatedGroupedData = { ...prevGroupedData };
//           for (const groupId in updatedGroupedData) {
//             updatedGroupedData[groupId] = updatedGroupedData[groupId].map(
//               (task) =>
//                 task.id === taskId ? { ...task, status: action } : task
//             );
//           }
//           return updatedGroupedData;
//         });
//       } else {
//         alert("Task Update Failed");
//       }
//     } catch (error) {
//       alert("An error occurred while updating the task.");
//     }
//   };
//   //=========================================================================================================>>>>>>>>>>
//   //=========================================================================================================>>>
//   //=========================================================================================================>>>>>>>>>>

//   const GroupDropdown = ({ groupId, tasks, empName }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     // Get employee name from the first task in the group
//     // const empName = tasks.length > 0 ? tasks[0].emp_name : "Unknown";

//     // Determine group status: "Pending" if any task is pending, otherwise "Completed"
//     const groupStatus = tasks.some((task) => task.status === "pending")
//       ? "Pending"
//       : "Completed";

//     return (
//       <div className="group-dropdown">
//         <div
//           className="group-header"
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           <h4>
//             {/* {isOpen ? "▼" : "▶"} Group ID: {groupId} ┃ Employee: {empName} ┃
//             Status: {groupStatus} */}
//             {/* {isOpen ? "▼" : "▶"}Group ID: {groupId} ┃ Employee: {empName} ┃
//             Status: {groupStatus} */}
//             {isOpen ? "▼" : "▶"} {groupId} ┃ {groupStatus}
//           </h4>
//         </div>
//         {isOpen && (
//           <div className="group-content">
//             {tasks.map((task) => (
//               <div key={task.id} className="task-item">
//                 <span className="task-id">{task.id}</span>
//                 <span className="task-name">{task.task_name}</span>
//                 <span className="task-status">{task.status}</span>
//                 <div className="task-actions">
//                   <button
//                     onClick={() => handleStatusUpdate(task.id, "approve")}
//                     className="btn btn-success btn-sm"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleStatusUpdate(task.id, "reject")}
//                     className="btn btn-danger btn-sm"
//                   >
//                     Reject
//                   </button>
//                   <button
//                     onClick={() => handleStatusUpdate(task.id, "NA")}
//                     className="btn btn-warning btn-sm"
//                   >
//                     N/A
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div className="group-actions">
//               <button className="sumbit-action">Sumbit</button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="container-fluid main-container hod">
//       <div className="row hod-row">
//         <div className="col-md-12 hod-column">
//           <div className="panel panel-default">
//             <div className="panel-heading">
//               <h3 className="panel-title">HOD Dashboard</h3>
//             </div>
//             <div className="panel-body">
//               {loading ? (
//                 <div className="loading-spinner-hod">
//                   <img src={Spinner} alt="loading" />
//                   <p>Loading...</p>
//                 </div>
//               ) : (
//                 Object.keys(groupedData).map((groupId) => (
//                   <GroupDropdown
//                     key={groupId}
//                     groupId={groupId}
//                     tasks={groupedData[groupId]}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HODDashboard;
