import "./style.css";

import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");

    navigate("/login", { replace: true });
  };

  return (
    <div className="header-bg">
      <div className="header-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/ddzpowg4l/image/upload/v1732030908/Group_8004_dvo4tx.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
