import "./style.css";

const NotFound = () => (
  <div className="failure-container">
    <img
      src="https://res.cloudinary.com/ddzpowg4l/image/upload/v1732996215/Group_7504_gtvbix.png"
      alt="not found"
      className="failre-image"
    />
    <h1 className="failure-heading">Page Not Found</h1>
    <p className="failure-text">
      We are sorry, the page you requested could not be found
    </p>
  </div>
);

export default NotFound;
