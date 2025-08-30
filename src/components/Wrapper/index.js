import "./style.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "../Header";
import Home from "../Home";
import Assessment from "../Assessment";
import Results from "../Results";
import NotFound from "../NotFound";

const Wrapper = () => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/assessment" element={<Assessment />} />
        <Route exact path="/results" element={<Results />} />
        <Route path="/bad-path" element={<NotFound />} />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Wrapper;
