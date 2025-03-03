import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Spinner from "../../assets/images/spinner.svg";
import "./AllEmployees.css";
import "./AllEmpTableResponsive.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TriggerPopup from "../../components/Popup/TriggerPopup/TriggerPopup";

import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
import errorNotification from "../../assets/sound/error.mp3";

import Pagination from "../../components/Pagination/Pagination";
import SearchIcon from "../../assets/images/search.png";

const AllEmployees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [seen, setSeen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [currentPage, setCurrentPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("page") || "1", 10);
  });
  const [totalPages, setTotalPages] = useState(1);
  const errorSound = new Audio(errorNotification);

  const togglePop = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setSeen(!seen);
  };
  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", currentPage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );

    const audio = new Audio(notificationSound);

    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/all_employee?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setTotalPages(response.data.total_pages);
        const employees = response.data.employees.map((e) => ({
          id: e.id,
          name: e.name,
          department_name: e.department_name,
          last_working_date: e.last_working_date,
          proceed_exit_formalities: e.proceed_exit_formalities,
        }));
        setFilteredData(employees);
        setData(response.data.employees);
      } catch (error) {
        console.error("Error fetching all employees:", error);
        toast.error("Failed to fetch employee data. Please try again.");
        audio.play();
        // alert("Failed to fetch employee data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllEmployees();
  }, [currentPage]);

  // First I have to make search bar with search button
  // Seccond I have to call the api to searching data
  // Third then have to set that data into setFilteredData
  const handleSearch = async () => {
    // if (!searchTerm.trim()) return;
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.BASE_URL}/api/hr/searchEmployee/?name=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const employees = response.data.employees.map((e) => {
        const approved = parseInt(e.approved_tasks, 10) || 0;
        const total = parseInt(e.total_tasks, 10) || 0;
        const percentage =
          total > 0 ? ((approved / total) * 100).toFixed(2) : 0;
        return {
          id: e.id,
          name: e.name,
          department_name: e.department_name,
          last_working_date: e.last_working_date,
          proceed_exit_formalities: e.proceed_exit_formalities,
          progress: `${approved}/${total}`,
          percentage,
        };
      });
      setFilteredData(employees);

      // setFilteredData(response.data.employees);
      // console.log(response.data.employees);
    } catch (error) {
      console.error("Error searching employees:", error);
      toast.error("Error searching employees. Please try again.");
      errorSound.play();
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <div className="all-employees">
        <div className="section-part-two">
          {/* <div className="searching">
            <div className="user-search">
              <input
                type="text"
                placeholder="Search Employees"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div> */}
          <div className="searching">
            <div className="user-search">
              <input
                type="text"
                placeholder="Search Employees"
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            <button type="button" className="search-btn" onClick={handleSearch}>
              <img src={SearchIcon} alt="Search-icon" />
            </button>
          </div>
        </div>

        <div className="container-fluid main-container">
          <div className="row" style={{ marginBottom: "50px" }}>
            <div className="col-md-12 column-ph">
              <div className="panel panel-default">
                <div className="limiter panel-body all-employees">
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
                                <th className="column2">Employee Name</th>
                                <th className="column3">Department</th>
                                <th className="column5">Last Working Date</th>
                                <th className="column4">Trigger Action</th>
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
                                    <td className="column5">
                                      {employee.last_working_date || "---"}
                                    </td>
                                    {/* <td>
                                      {employee.proceed_exit_formalities !==
                                        null &&
                                      employee.proceed_exit_formalities !==
                                        undefined
                                        ? employee.proceed_exit_formalities.toString()
                                        : "---"}
                                    </td> */}

                                    <td
                                      className="column4"
                                      style={{ textAlign: "center" }}
                                    >
                                      {employee.proceed_exit_formalities ===
                                      true ? (
                                        <span>---</span>
                                      ) : (
                                        <button
                                          type="button"
                                          className="btn btn-color btn-sm pulse"
                                          onClick={() => togglePop(employee.id)}
                                        >
                                          Trigger Employee
                                        </button>
                                      )}
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
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                  {/* <button
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
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {seen && (
          <TriggerPopup
            toggle={() => setSeen(false)}
            employeeId={selectedEmployeeId}
            onEmployeeAdded={(newData) => console.log("Data added:", newData)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllEmployees;
