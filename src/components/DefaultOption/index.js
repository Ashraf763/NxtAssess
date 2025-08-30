import "./style.css";

const DefaultOption = (props) => {
  const { question, onClickOption, activeAnswer, selectedAnswers } = props;

  const onCLickBtn = (each) => {
    onClickOption(each);
  };

  return (
    <ul className="options-container">
      {question.options.map((each) => (
        <li
          className={`option ${activeAnswer.id === each.id && "active"} ${
            selectedAnswers.filter((item) => item.id === each.id)[0]
              ? "active"
              : ""
          }`}
          key={each.id}
        >
          <button
            type="button"
            className="num-btn"
            onClick={() => onCLickBtn(each)}
          >
            {each.text}
          </button>
        </li>
      ))}
    </ul>
  );
};
//   const {data, qNo, activeAnswer, onClickOption} = props

//   return (
//     <ol className="def-container">
//       {data[qNo].options.map(each => (
//         <li
//           className={`option-item ${
//             activeAnswer.id === each.id ? 'activeAns' : ''
//           }`}
//           key={each.id}
//         >
//           <button
//             type="button"
//             className={`option-btn ${
//               activeAnswer.id === each.id ? 'activeAns' : ''
//             }`}
//             key={each.id}
//             onClick={onClickOption(each)}
//           >
//             {each.text}
//           </button>
//         </li>
//       ))}
//     </ol>
//   )
// }

export default DefaultOption;
