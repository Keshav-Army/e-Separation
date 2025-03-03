import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EmpFeedback.css";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import config from "../../config/config";
import toast from "react-hot-toast";
import notificationSound from "../../assets/sound/notification.mp3";
import errorNotifiaction from "../../assets/sound/error.mp3";

const EmpFeedback = () => {
  const navigate = useNavigate();
  const access = localStorage.getItem("access");

  const successSound = new Audio(notificationSound);
  const errorSound = new Audio(errorNotifiaction);

  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const { feedbackQuestions, userId } = location.state || {};

  if (!feedbackQuestions || !userId) {
    return <div>Error: Missing feedback questions or user ID.</div>;
  }

  const handleInputChange = (questionId, choice, isChecked) => {
    if (questionId === 2) {
      setResponses((prev) => {
        const currentSelections = prev[questionId] || [];

        if (isChecked) {
          if (!currentSelections.includes(choice)) {
            return {
              ...prev,
              [questionId]: [...currentSelections, choice],
            };
          }
          return prev;
        } else {
          return {
            ...prev,
            [questionId]: currentSelections.filter((item) => item !== choice),
          };
        }
      });
    } else {
      setResponses((prev) => ({
        ...prev,
        [questionId]: choice,
      }));
    }
  };

  // Handleing comment input here =>>>>>
  const handleCommentChange = (questionId, text) => {
    setComments((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleSubmit = async () => {
    // For now i have remvoe the condition to check if the all aswer is selected or not===================>>>>

    // if (Object.keys(responses).length !== feedbackQuestions.length) {
    //   toast.error("Please answer all the questions before submitting.");
    //   errorSound.play();
    //   return;
    // }

    const payload = feedbackQuestions.map((question) => {
      const selected = responses[question.id];
      return {
        employee: userId,
        question: question.id,
        selected_option: Array.isArray(selected)
          ? selected.join(",")
          : selected || "",
        comment: comments[question.id] || "",
      };
    });

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${config.BASE_URL}/api/employee/submit_feedback/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Feedback submitted successfully!", response.details);
        toast.success("Feedback submitted successfully!");
        successSound.play();
        navigate(`/dashboard/Thankyou`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
      errorSound.play();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="feedback-heading">EXIT INTERVIEW QUESTIONNAIRE</h2>
        <div className="empfeedback">
          <ul className="all-questions">
            {feedbackQuestions.map((question) => (
              <li key={question.id}>
                <p>
                  {question.question}
                  <span className="required-star">*</span>
                </p>
                <div className="answer-options">
                  {question.choices.map((choice, index) => (
                    <label key={index}>
                      <input
                        type={question.id === 2 ? "checkbox" : "radio"}
                        name={`question_${question.id}`}
                        value={choice}
                        onChange={(e) =>
                          handleInputChange(
                            question.id,
                            choice,
                            e.target.checked
                          )
                        }
                        required
                      />
                      {choice}
                    </label>
                  ))}
                </div>
                <textarea
                  name={`comment_${question.id}`}
                  placeholder="Please provide details if necessary..."
                  value={comments[question.id] || ""}
                  onChange={(e) =>
                    handleCommentChange(question.id, e.target.value)
                  }
                />
              </li>
            ))}
          </ul>
          <div className="submit-button">
            <button
              type="submit"
              className="btn btn-lg btn-pink"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmpFeedback;
