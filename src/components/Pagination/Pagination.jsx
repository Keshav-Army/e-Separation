import React from "react";
import LeftArrow from "../../assets/images/leftarrow.png";
import RightArrow from "../../assets/images/rightarrow.png";
import "./Pagination.css";

// first simple Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination arrow-btn">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="left-arrow"
      >
        <img src={LeftArrow} alt="leftarrow" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={i + 1 === currentPage ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="right-arrow"
      >
        <img src={RightArrow} alt="rightarrow" />
      </button>
    </div>
  );
};
export default Pagination;
