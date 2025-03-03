import React from "react";
import "./AboutUs.css";
import wallpaperImage from "../../assets/images/wallpaper.jpg";
import { useNavigate } from "react-router-dom";
import LinkedIn from "../../assets/images/linkedin-icon.png";

const RollCredits = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="about-us-container">
      <div
        className="credits-container"
        style={{
          backgroundImage: `url(${wallpaperImage})`,
        }}
      >
        <div className="credits">
          <h1> 🎬 Roll & Credits 🎬</h1>
          <p className="subtitle">
            {/* (Because even superheroes need a little applause!) */}
          </p>

          <section className="credit-section">
            <h2>Director 🎥 </h2>
            <p>
              <strong className="star">
                <span className="">Pushkar Aditya</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                The One who proclaimed "Avengers .. assemble !
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/pushkar-aditya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
          </section>

          <section className="credit-section">
            <h2>Star Casting 🛠</h2>
            {/* <p>
            <strong className="star">Vikas Kumar</strong> –{" "}
            <span className="message-text">
              The Doer maintaining backend with one hand and mobile app with
              other.
            </span>
            <span>
              <img
                className="linkedin-icon"
                src={LinkedIn}
                alt="linkedin-icon"
              />
              <a
                href="https://www.linkedin.com/in/vkas02/"
                target="_blank"
                rel="noopener noreferrer"
                title="Clink to open LinkedIn profile"
              >
                LinkedIn Profile...
              </a>
            </span>
          </p>
          <p>
            <strong className="star">Keshav Sharma</strong> –
            <span className="message-text">
              The one who converted the dreams into web pages.
            </span>
            <span>
              <img
                className="linkedin-icon"
                src={LinkedIn}
                alt="linkedin-icon"
              />
              <a
                href="https://www.linkedin.com/in/keshavcoder/"
                target="_blank"
                rel="noopener noreferrer"
                title="Clink to open LinkedIn profile"
              >
                LinkedIn Profile...
              </a>
            </span>
          </p> */}
            <p>
              {/* <strong className="star">
                <span className="text-shine">Vikas Kumar</span>
              </strong>{" "} */}
              <a
                href="https://www.linkedin.com/in/vkas02/"
                target="_blank"
                rel="noopener noreferrer"
                title="Clink to open LinkedIn profile"
              >
                <strong className="star">
                  <span className="text-shine">Vikas Kumar</span>
                </strong>{" "}
              </a>
              –{" "}
              <span className="message-text">
                The Doer maintaining backend with one hand and mobile app with
                other.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/vkas02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/keshavcoder/"
                target="_blank"
                rel="noopener noreferrer"
                title="Clink to open LinkedIn profile"
              >
                <strong className="star">
                  <span className="text-shine">Keshav Sharma</span>
                </strong>{" "}
              </a>
              –{" "}
              <span className="message-text">
                The one who converted the dreams into web pages.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/keshavcoder/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
          </section>

          <section className="credit-section">
            <h2>Code Whisperers 👨‍💻 </h2>
            <p>
              <strong className="star">
                <span>Amit Dutta</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Preaching the holy trinity of Margins, Padding, and Flexbox
                while battling misaligned divs.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href=" https://www.linkedin.com/in/amitdutta87/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Upendra Pratap Kushwaha</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Keeping the data flowing while resisting the urge to rewrite
                everything from scratch.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/upendra243/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Omkar Thouta</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Teaching the lost art of reading error logs like ancient
                prophecy.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/omkar-thouta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Suraj Yadav</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Dispensing wisdom, best practices, and occasional “Just cache
                it” advice or be Iron man!. !
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/suraj-yadav-3bb375a4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Shivam Prakash</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                The Bug Exorcist, clicking all the wrong buttons so users don’t
                have to. If it can break, they will find a way.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/iamshivamprakash/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Hemant Yadav</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Preventing servers from having an existential crisis and
                ensuring "It works on my machine" means every machine.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/hemant-kumar-yadav-4778175b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            {/* <p>
            <strong>Vikash Kumar Signh</strong> – */}
            <p>
              <strong className="star">
                <span>Vikash Kumar Singh</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Ensuring our servers don’t take impromptu naps.
              </span>
              <span className="linkedin-link">
                {/* <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                /> */}
                <a
                  href="vikash.ngp20@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email ID...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Shailendra Kumar</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Offering guidance, wisdom, and an occasional
              </span>
            </p>
          </section>

          <section className="credit-section">
            <h2>Visual Maestros 🎨</h2>
            <p>
              <strong className="star">
                <span>Sandeep Kumar</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Making sure everything is chef’s kiss perfection.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/sandeep-kumar-8827042a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Dheeraj Arora</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Turning confusion into clarity, one pixel at a time.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/dheeraj-arora-21603615/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
          </section>

          <section className="credit-section">
            <h2>Key Stakeholders 🔑 </h2>
            <p>
              <strong className="star">
                <span>Mayank Kulshreshtha</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                The one who started it all, the problem poser.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/mayank-kulshrestha-407897134/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
            <p>
              <strong className="star">
                <span>Akanksha Gupta</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                The honourable guest who will own the show, answering your “WHY
                ISN’T THIS WORKING?!” with a smile.
              </span>
              <span className="linkedin-link">
                <img
                  className="linkedin-icon"
                  src={LinkedIn}
                  alt="linkedin-icon"
                />
                <a
                  href="https://www.linkedin.com/in/akanksha-gupta-6554b062/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Clink to open LinkedIn profile"
                >
                  LinkedIn Profile...
                </a>
              </span>
            </p>
          </section>

          <section className="credit-section">
            <h2>Beta Testers 🧪 </h2>
            <p>
              <strong className="star">
                <span>The complete Tech team</span>
              </strong>{" "}
              –{" "}
              <span className="message-text">
                Thanks for clicking things until they broke so you didn’t have
                to!
              </span>
            </p>
          </section>

          <section className="credit-section">
            <h2>Our Users 👥</h2>
            <p>
              <span className="message-text">
                Without you, this app would just be a lonely chunk of code.
              </span>
            </p>
          </section>

          <section className="credit-section final-words">
            <h2>Final Words 🎤</h2>
            <p>
              <span className="message-text">
                No pixels were harmed in the making of this app. Maybe some
                keyboards were smashed, but that’s a story for another update...
              </span>
            </p>
          </section>

          <button
            className="dashboard-btn-about-us"
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RollCredits;
