import React from "react";
import "./ExitInterviewForm.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ExitInterviewForm = () => {
  return (
    <div className="exit-interview-form">
      <Header />
      <div className="container">
        <h2>EXIT INTERVIEW QUESTIONNAIRE</h2>
        <form id="exitInterviewForm">
          <label htmlFor="employeeName">Employee Name:</label>
          <input type="text" id="employeeName" name="employeeName" required />

          <label htmlFor="supervisorName">Supervisor Name:</label>
          <input
            type="text"
            id="supervisorName"
            name="supervisorName"
            required
          />

          <label htmlFor="employmentDate">Initial employment date:</label>
          <input
            type="date"
            id="employmentDate"
            name="employmentDate"
            required
          />

          <label htmlFor="lastDate">Last date of employment:</label>
          <input type="date" id="lastDate" name="lastDate" required />

          <label htmlFor="currentPosition">Current position:</label>
          <input
            type="text"
            id="currentPosition"
            name="currentPosition"
            required
          />

          <label>
            1. At approximately what point in time did you begin making your
            decision to resign?
          </label>
          <div className="options options-one">
            <label>
              <input
                type="radio"
                name="decisionTime"
                value="6-9 months ago"
                required
              />{" "}
              6-9 months ago
            </label>
            <label>
              <input type="radio" name="decisionTime" value="3-5 months ago" />{" "}
              3-5 months ago
            </label>
            <label>
              <input type="radio" name="decisionTime" value="1-2 months ago" />{" "}
              1-2 months ago
            </label>
            <label>
              <input
                type="radio"
                name="decisionTime"
                value="Less than a month"
              />{" "}
              Less than a month
            </label>
          </div>
          <textarea
            name="decisionTimeExplanation"
            placeholder="Please provide additional information if necessary..."
          />

          <label>
            2. Please indicate reason(s) below, which contributed to your
            decision to resign your current position?
          </label>
          <div className="options options-two">
            <label>
              <input type="checkbox" name="reason" value="Salary" /> Salary
            </label>
            <label>
              <input type="checkbox" name="reason" value="Job Advancement" />{" "}
              Job Advancement
            </label>
            <label>
              <input type="checkbox" name="reason" value="Personal" /> Personal
            </label>
            <label>
              <input
                type="checkbox"
                name="reason"
                value="Return to last company"
              />{" "}
              Return to last company
            </label>
            <label>
              <input type="checkbox" name="reason" value="Relocation" />{" "}
              Relocation
            </label>
            <label>
              <input type="checkbox" name="reason" value="Health issue" />{" "}
              Health issue
            </label>
            <label>
              <input
                type="checkbox"
                name="reason"
                value="Family Responsibilities"
              />{" "}
              Family Responsibilities
            </label>
            <label>
              <input
                type="checkbox"
                name="reason"
                value="Dissatisfied/Management"
              />{" "}
              Dissatisfied/Management
            </label>
            <label>
              <input type="checkbox" name="reason" value="Benefits" /> Benefits
            </label>
            <label>
              <input type="checkbox" name="reason" value="Job Eliminated" /> Job
              Eliminated
            </label>
            <label>
              <input type="checkbox" name="reason" value="Quality of work" />{" "}
              Quality of work
            </label>
            <label>
              <input type="checkbox" name="reason" value="Other" /> Other –
              (please explain)
            </label>
          </div>

          <label>
            3. Was there a specific event or issue that prompted your
            resignation?
          </label>
          <div className="options">
            <label>
              <input type="radio" name="specificEvent" value="Yes" required />{" "}
              Yes
            </label>
            <label>
              <input type="radio" name="specificEvent" value="No" /> No
            </label>
          </div>
          <textarea
            name="eventExplanation"
            placeholder="If yes, please briefly explain..."
          />

          <label>
            If yes, did you discuss this matter with your supervisor/manager?
          </label>
          <div className="options">
            <label>
              <input
                type="radio"
                name="discussedWithSupervisor"
                value="Yes"
                required
              />{" "}
              Yes
            </label>
            <label>
              <input type="radio" name="discussedWithSupervisor" value="No" />{" "}
              No
            </label>
          </div>
          <textarea
            name="discussionDetails"
            placeholder="Please provide details if necessary..."
          />

          <label style={{ color: "rgba(0, 0, 0, 0.878)" }}>
            On a scale of 1 to 5, with “1” being poor and “5” being outstanding,
            please rate the following:
          </label>
          <hr style={{ marginTop: "0px" }} />
          <label>
            4. Quality of training received for your position(s) here at Clovia.
          </label>
          <div className="options options-four">
            <label>
              1<input type="radio" name="rating4" value="1" />
            </label>
            <label>
              2<input type="radio" name="rating4" value="2" />
            </label>
            <label>
              3<input type="radio" name="rating4" value="3" />
            </label>
            <label>
              4<input type="radio" name="rating4" value="4" />
            </label>
            <label>
              5<input type="radio" name="rating4" value="5" />
            </label>
          </div>
          <textarea
            name="trainingExplanation"
            placeholder="Please provide details if necessary..."
          />

          <label>5. Working relationship with your current supervisor.</label>
          <div className="options options-five">
            <label>
              1<input type="radio" name="rating5" value="1" />
            </label>
            <label>
              2<input type="radio" name="rating5" value="2" />
            </label>
            <label>
              3<input type="radio" name="rating5" value="3" />
            </label>
            <label>
              4<input type="radio" name="rating5" value="4" />
            </label>
            <label>
              5<input type="radio" name="rating5" value="5" />
            </label>
          </div>
          <textarea
            name="supervisorExplanation"
            placeholder="Please provide details if necessary..."
          />

          <label>6. Working relationship with fellow employees.</label>
          <div className="options options-six">
            <label>
              1<input type="radio" name="rating6" value="1" />
            </label>
            <label>
              2<input type="radio" name="rating6" value="2" />
            </label>
            <label>
              3<input type="radio" name="rating6" value="3" />
            </label>
            <label>
              4<input type="radio" name="rating6" value="4" />
            </label>
            <label>
              5<input type="radio" name="rating6" value="5" />
            </label>
          </div>
          <textarea
            name="employeesExplanation"
            placeholder="Please provide details if necessary..."
          />

          <label>7. Salary for your position.</label>
          <div className="options options-seven">
            <label>
              1<input type="radio" name="rating7" value="1" />
            </label>
            <label>
              2<input type="radio" name="rating7" value="2" />
            </label>
            <label>
              3<input type="radio" name="rating7" value="3" />
            </label>
            <label>
              4<input type="radio" name="rating7" value="4" />
            </label>
            <label>
              5<input type="radio" name="rating7" value="5" />
            </label>
          </div>
          <textarea
            name="salaryExplanation"
            placeholder="Please provide details if necessary..."
          />

          <label>8. Overall workload for your position.</label>
          <div className="options options-eight">
            <label>
              1<input type="radio" name="rating8" value="1" />
            </label>
            <label>
              2<input type="radio" name="rating8" value="2" />
            </label>
            <label>
              3<input type="radio" name="rating8" value="3" />
            </label>
            <label>
              4<input type="radio" name="rating8" value="4" />
            </label>
            <label>
              5<input type="radio" name="rating8" value="5" />
            </label>
          </div>
          <textarea
            name="workloadExplanation"
            placeholder="Please provide details if necessary..."
          />

          <label>
            9. Overall satisfaction and enjoyment in your current position.
          </label>
          <div className="options options-nine">
            <label>
              1<input type="radio" name="rating9" value="1" />
            </label>
            <label>
              2<input type="radio" name="rating9" value="2" />
            </label>
            <label>
              3<input type="radio" name="rating9" value="3" />
            </label>
            <label>
              4<input type="radio" name="rating9" value="4" />
            </label>
            <label>
              5<input type="radio" name="rating9" value="5" />
            </label>
          </div>
          <textarea
            name="satisfactionExplanation"
            placeholder="Please provide details if necessary..."
          />

          <label>
            10. Did you encounter any problems in your current position?
          </label>
          <div className="options">
            <label>
              <input type="radio" name="anyProblem" value="Yes" required /> Yes
            </label>
            <label>
              <input type="radio" name="anyProblem" value="No" /> No
            </label>
          </div>
          <textarea
            name="problemExplanation"
            placeholder="If yes, please briefly explain..."
          />

          <label>
            11. What did you enjoy most about your employment with Clovia?
          </label>
          <textarea name="enjoyMost" placeholder="Write something..." />

          <label>
            12. What did you enjoy least about your employment with Clovia?
          </label>
          <textarea name="enjoyLeast" placeholder="Write something..." />

          <label>
            13. Based upon your experiences here, would you recommend Clovia as
            a potential employer for your friends, relatives, etc.?
          </label>
          <div className="options">
            <label>
              <input
                type="radio"
                name="potentialEmployer"
                value="Yes"
                required
              />{" "}
              Yes
            </label>
            <label>
              <input type="radio" name="potentialEmployer" value="No" /> No
            </label>
          </div>
          <textarea
            name="recommendationExplanation"
            placeholder="If no, please briefly explain..."
          />

          <label>
            14. Would you re-apply to Clovia if a future opportunity arose?
          </label>
          <div className="options">
            <label>
              <input
                type="radio"
                name="futureOpportunity"
                value="Yes"
                required
              />{" "}
              Yes
            </label>
            <label>
              <input type="radio" name="futureOpportunity" value="No" /> No
            </label>
          </div>
          <textarea
            name="reapplyExplanation"
            placeholder="If no, please briefly explain..."
          />

          <label>15. Please add any additional comments:</label>
          <textarea
            className="option12"
            name="additionalComments"
            placeholder="Write something..."
          />

          <label>Exit interview conducted by:</label>
          <input type="text" id="conductedBy" name="conductedBy" required />

          <label htmlFor="exitDate">Date/Time:</label>
          <input type="datetime-local" id="exitDate" name="exitDate" required />

          <input type="submit" value="Submit" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ExitInterviewForm;
