import "./style.css";

import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { TbUrgent } from "react-icons/tb";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);

  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const onsubmitForm = async (e) => {
    e.preventDefault();
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      setErrMsg(false);
      // const { history } = props;

      Cookies.set("jwt_token", data.jwt_token, {
        expires: 30,
        path: "/",
      });
      // history.replace("/");
      navigate("/", { replace: true });
    } else {
      setErrMsg(data.error_msg);
    }
  };

  const onClickShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  return (
    <div className="login-main-container">
      <form className="login-container" onSubmit={onsubmitForm}>
        <div className="flex-container">
          <img
            src="https://res.cloudinary.com/ddzpowg4l/image/upload/v1731994053/Group_8005_er9sgg.png"
            alt="login website logo"
            className="website-logo"
          />

          <div className="username-container">
            <label htmlFor="username" className="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="USERNAME"
              className="username-input"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="username-container">
            <label htmlFor="password" className="username">
              PASSWORD
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="PASSWORD"
              className="username-input"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="show-password-container">
            <input
              type="checkbox"
              id="show-password"
              onChange={onClickShowPassword}
            />
            <label className="show-password" htmlFor="show-password">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {errorMsg && <p className="err-msg">{errorMsg}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
