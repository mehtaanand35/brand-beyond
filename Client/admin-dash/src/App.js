import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import  AdminDash  from "./Components/Home/AdminDash";
import { PublicDash } from "./Components/Home/PublicDash";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/public" element={<PublicDash />} />
      </Routes>
    </div>
  );
}

export default App;
