import "./style.css";
import { CgDanger } from "react-icons/cg";

const SingleSelect = (props) => {
  const {
    question,
    onClickOption,
    activeAnswer,
    selectedAnswers,
    questionNumber,
  } = props;

  const onCLickBtn = (e) => {
    const selectedOption = question.options.filter(
      (each) => each.id === e.target.value
    )[0];
    selectedOption.qNo = questionNumber;
    onClickOption(selectedOption);
  };

  return (
    <div className="single-select-a">
      <select
        name="options"
        id="options"
        className="select-options"
        onChange={onCLickBtn}
      >
        {question.options.map((each) => (
          <option
            className={`select-option ${
              activeAnswer.id === each.id && "active-single-option"
            } ${
              selectedAnswers.filter((item) => item.id === each.id)[0]
                ? "active-single-option"
                : ""
            }`}
            value={each.id}
            key={each.text}
          >
            {each.text}
          </option>
        ))}
      </select>

      <div className="message-container">
        <CgDanger size={25} />
        <p className="message">First option is selected by default</p>
      </div>
    </div>
  );
};
export default SingleSelect;
