import "./style.css";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home-container">
    <div className="instructions-container">
      <h1 className="instructions">Instructions</h1>
      <ol className="ordered-instrucions">
        <li className="instruction">
          Total Questions: <span>10</span>
        </li>
        <li className="instruction">
          Types of Questions: <span>MCQs</span>
        </li>
        <li className="instruction">
          Duration: <span>10 Mins</span>
        </li>
        <li className="instruction">
          Marking Scheme: <span>Every Correct response, get 1 mark</span>
        </li>
        <li className="instruction">
          All the progress will be lost, if you reload during the assessment
        </li>
      </ol>

      <button type="button" className="start-btn">
        <Link to="/assessment" className="link">
          Start Assessment
        </Link>
      </button>
    </div>

    <img
      src="https://res.cloudinary.com/ddzpowg4l/image/upload/v1732038187/Group_v2pycp.png"
      alt="assessment"
      className="assessment-image"
    />
  </div>
);

export default Home;
