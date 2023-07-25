import Login from "./components/Login";
import Versions from "./components/Versions";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Typography } from "@mui/material";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Typography
          variant="h1"
          style={{
            textAlign: "center",
          }}
        >
          Discord Clone
        </Typography>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
