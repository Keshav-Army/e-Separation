import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./EmpFeedback.css";
import axios from "axios";
import config from "../../config/config";

import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
import errorNotifiaction from "../../assets/sound/error.mp3";

import { useNavigate } from "react-router-dom";

const EmpFeedback = () => {
  const location = useLocation();

  const feedbackQuestions = location.state?.feedbackQuestions || [];
  const employeeDetails = location.state?.userId || [];

  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const successSound = new Audio(notificationSound);
  const errorSound = new Audio(errorNotifiaction);

  const navigate = useNavigate();
  const access = localStorage.getItem("access");
  const handleAnswerChange = (questionId, choiceId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== feedbackQuestions.length) {
      toast.error("Please answer all the questions before submitting.");
      errorSound.play();
      // setSubmitMessage("Please answer all the questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    const payload = Object.entries(answers).map(([questionId, choiceId]) => ({
      employee: employeeDetails,
      question: questionId,
      selected_choice: choiceId,
    }));

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/employee/submit_feedback/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log("Feedback submitted successfully!", response.details);
      toast.success("Feedback submitted successfully!");
      successSound.play();
      // setSubmitMessage("Feedback submitted successfully!");
      navigate(`/dashboard/Thankyou`);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      error.response?.data?.message ||
        toast.error("Failed to submit feedback. Please try again.");
      errorSound.play();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="empfeedback">
        <div className="container-fluid main-container employee ">
          <div className="row" style={{ marginBottom: "50px" }}>
            <div className="col-md-12 column-ph">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Employee Feedback</h3>
                </div>
                <div className="panel-body">
                  {feedbackQuestions.length > 0 ? (
                    <form>
                      <ul className="question-ul">
                        {feedbackQuestions.map((question) => (
                          <li key={question.id} type="I">
                            <h5 className="question-parson">
                              {question.question_text}
                            </h5>
                            <ul className="option-ul">
                              {Object.entries(question.choice).map(
                                ([choiceId, choiceText]) => (
                                  <li className="li2" key={choiceId}>
                                    <label className="choose-opt">
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={choiceId}
                                        onChange={() =>
                                          handleAnswerChange(
                                            question.id,
                                            choiceId
                                          )
                                        }
                                      />
                                      {choiceText}
                                    </label>
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className="btn btn-lg btn-pink"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                  ) : (
                    <p>No feedback questions available.</p>
                  )}
                  {submitMessage && (
                    <p
                      style={{
                        marginTop: "10px",
                        color: submitMessage.includes("successfully")
                          ? "green"
                          : "red",
                      }}
                    >
                      {submitMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmpFeedback;
