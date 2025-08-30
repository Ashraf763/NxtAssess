import "./style.css";

const FailureView = (props) => {
  const { onClickRetry } = props;

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ddzpowg4l/image/upload/v1732994760/Group_7519_ahs3nk.png"
        alt="failure view"
        className="failre-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-text">We are having some trouble</p>
      <button
        type="button"
        className="failure-btn"
        onClick={() => onClickRetry()}
      >
        Retry
      </button>
    </div>
  );
};
export default FailureView;
