import "./style.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoadingView from "../LoadingView";
import FailureView from "../FailureView";
import DefaultOption from "../DefaultOption";
import ImageOption from "../ImageOption";
import SingleSelectOption from "../SingleSelectOption";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Assessment = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(numbers[0]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [time, setTime] = useState(600);

  // const history = useHistory();
  const navigate = useNavigate();

  const [activeAnswer, setActiveAnswer] = useState(
    // data.map(q => (q.options_type === 'SINGLE_SELECT' ? q.options[0] : {})),
    question.options_type === "SINGLE_SELECT" ? question.options[0] : {}
  );

  const fetchData = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/assess/questions";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      setData(responseData.questions);
      setQuestion(responseData.questions[0]);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitAssesment = () => {
    const score = selectedAnswers.filter(
      (each) => each.is_correct === "true"
    ).length;
    const timeTaken = 600 - time;
    navigate("/results", { state: { timeTaken, score } });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(intervalId);
        submitAssesment();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const checkifOptionIsSelected = (option) => {
    const filteredArr = selectedAnswers.filter(
      (each) => each.qNo === questionNumber
    );

    if (filteredArr[0] !== undefined) {
      if (filteredArr[0].qNo === questionNumber) {
        setSelectedAnswers((prevVal) =>
          prevVal.map((each) =>
            each.qNo === questionNumber
              ? {
                  ...each,
                  id: option.id,
                  is_correct: option.is_correct,
                  text: option.text,
                }
              : each
          )
        );
      }
    } else if (Object.keys(option).length !== 0) {
      setSelectedAnswers([
        ...selectedAnswers,
        { ...option, qNo: questionNumber },
      ]);
    }
  };

  const onClickOption = (option) => {
    setActiveAnswer(option);
    checkifOptionIsSelected(option);
  };

  const onClickNextQuestion = () => {
    if (questionNumber !== 10) {
      setQuestionNumber(questionNumber + 1);
      setQuestion(data[questionNumber]);
    }

    const filteredArr = selectedAnswers.filter(
      (each) => each.qNo === questionNumber + 1
    );

    if (
      data[questionNumber].options_type === "SINGLE_SELECT" &&
      filteredArr[0] === undefined
    ) {
      setSelectedAnswers([
        ...selectedAnswers,
        { ...data[questionNumber].options[0], qNo: questionNumber + 1 },
      ]);
    }

    setActiveAnswer({});
  };

  const onClickQnumber = (num) => {
    setQuestionNumber(num);
    setQuestion(data[num - 1]);

    const filteredArr = selectedAnswers.filter((each) => each.qNo === num);

    if (
      data[num - 1].options_type === "SINGLE_SELECT" &&
      filteredArr[0] === undefined
    ) {
      setSelectedAnswers([
        ...selectedAnswers,
        { ...data[num - 1].options[0], qNo: num },
      ]);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const onClickRetry = () => {
    fetchData();
  };

  const renderSUccessView = () => (
    <div className="assessment-container">
      <div className="question-container">
        <div className="question-container-2">
          <p className="question">
            {questionNumber}. {question.question_text}
          </p>
          <hr />

          {question.options_type === "DEFAULT" && (
            <DefaultOption
              question={question}
              activeAnswer={activeAnswer}
              onClickOption={onClickOption}
              selectedAnswers={selectedAnswers}
            />
          )}
          {question.options_type === "IMAGE" && (
            <ImageOption
              question={question}
              activeAnswer={activeAnswer}
              onClickOption={onClickOption}
              selectedAnswers={selectedAnswers}
            />
          )}

          {question.options_type === "SINGLE_SELECT" && (
            <SingleSelectOption
              question={question}
              activeAnswer={activeAnswer}
              onClickOption={onClickOption}
              selectedAnswers={selectedAnswers}
              questionNumber={questionNumber}
            />
          )}
        </div>

        <div className="next-btn-container">
          {questionNumber !== 10 && (
            <button
              className="next-btn"
              type="button"
              onClick={() => onClickNextQuestion()}
            >
              Next Question
            </button>
          )}
        </div>
      </div>

      <div className="question-numbers-container">
        <div className="timer-container">
          <p>Time Left</p>
          <p>{formatTime(time)}</p>
        </div>
        <div className="attempted-container">
          <div className="attempted-container-child">
            <p className="length">{selectedAnswers.length}</p>
            <p className="text">Answered Questions</p>
          </div>
          <div className="attempted-container-child">
            <p className="length remaining">{10 - selectedAnswers.length}</p>
            <p className="text">Unanswered Questions</p>
          </div>
        </div>
        <hr />

        <div className="numbers">
          <div className="numbers-container">
            <h1 className="q-length">Questions ({data.length})</h1>

            <ul className="q-numbers-container">
              {numbers.map((each) => (
                <li
                  className={`q-number ${
                    questionNumber === each && "activeQNo"
                  } ${
                    selectedAnswers.filter((item) => item.qNo === each)[0]
                      ? "attempted"
                      : ""
                  }`}
                  key={each}
                >
                  <button
                    className="num-btn"
                    onClick={() => onClickQnumber(each)}
                    type="button"
                  >
                    {each}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="submit-btn"
            onClick={submitAssesment}
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );

  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return <LoadingView />;
    case apiStatusConstants.success:
      return renderSUccessView();
    case apiStatusConstants.failure:
      return <FailureView onClickRetry={onClickRetry} />;
    default:
      return null;
  }
};

export default Assessment;
