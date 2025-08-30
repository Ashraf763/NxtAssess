import "./style.css";

const Imageoption = (props) => {
  const { question, onClickOption, activeAnswer, selectedAnswers } = props;

  const onCLickBtn = (each) => {
    onClickOption(each);
  };

  return (
    <ul className="options-container">
      {question.options.map((each) => (
        <li
          className={`image-option ${
            activeAnswer.id === each.id && "active img"
          } ${
            selectedAnswers.filter((item) => item.id === each.id)[0]
              ? "active img"
              : ""
          }`}
          onClick={() => onCLickBtn(each)}
          key={each.id}
        >
          <img src={each.image_url} alt={each.text} className="image" />
        </li>
      ))}
    </ul>
  );
};

export default Imageoption;
