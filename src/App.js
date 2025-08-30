import "./App.css";

import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Wrapper from "./components/Wrapper";
import NotFound from "./components/NotFound";

const App = () => (
  <Routes>
    <Route exact path="/login" element={<Login />} />
    <Route path="/*" element={<Wrapper />} />
    <Route path="/bad-path" element={<NotFound />} />
  </Routes>
);
export default App;
