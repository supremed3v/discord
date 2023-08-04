import Login from "./components/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Typography } from "@mui/material";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div
        className="container"
        style={{
          paddingTop: "10px",
          paddingLeft: "0px",
          paddingRight: "0px",
          paddingBottom: "0px",
          marginTop: "0px",
          marginLeft: "100px",
        }}
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
