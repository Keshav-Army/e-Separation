import React, { useState } from "react";
import "./CommentPopup.css";

const CommentPopup = ({ toggle, onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(comment);
  };

  return (
    <div className="comment-popup">
      <div className="popup animate__animated animate__fadeIn">
        <div className="popup-inner">
          <h2>Rejection Reason</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Reason*
              <input
                type="text"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </label>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button type="button" onClick={toggle} className="close-btn">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
