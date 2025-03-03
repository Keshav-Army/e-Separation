import React, { useState, useEffect } from "react";

// import DataTable from "react-data-table-component";
import axios from "axios";
import Spinner from "../../assets/images/spinner.svg";
import "./AllEmployees.css";
import "./AllEmpTableResponsive.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import TriggerPopup from "../../components/Popup/TriggerPopup/TriggerPopup";

const AllEmployees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(
          `http://13.233.56.56:8002/api/all_employee?page=${currentPage}`,
          // `https://exit-emp-v3.onrender.com/api/all_employee?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        const employees = response.data.employees.map((e) => {
          return {
            id: e.id,
            name: e.name,
            department_name: e.department_name,
          };
        });
        setFilteredData(employees);
        if (response.data && response.data.employees) {
          setData(response.data.employees);
        }
      } catch (error) {
        console.error("Error fetching all employees:", error);
        alert("Failed to fetch employee data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllEmployees();
  }, [currentPage]);

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

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleTrigger = (id) => {
    alert(`Trigger button clicked for Employee ID: ${id}`);
    // Implement your trigger functionality here
  };

  return (
    <>
      <Header />
      <div className="all-employees">
        <div className="section-part-two">
          <div className="searching">
            <div className="user-search">
              {/* <img src={Searchicon} alt="seactch-icon" /> */}
              <input
                type="text"
                placeholder="Search Employees"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
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
                                    <td
                                      className="column4"
                                      style={{ textAlign: "center" }}
                                    >
                                      <button
                                        onClick={() =>
                                          handleTrigger(employee.id)
                                        }
                                        className="btn btn-color btn-sm pulse"
                                      >
                                        Trigger Employee
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
                    className="btn btn-default"
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
                  <button
                    onClick={handleNext}
                    className="btn btn-default"
                    disabled={data && data.length === 0}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =================== */}
      </div>
      <Footer />
    </>
  );
};

export default AllEmployees;
