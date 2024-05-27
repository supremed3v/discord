import Login from "./components/Login";
import { Route, Navigate, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import Home from "./pages/Home";
function App() {
  console.log("Rendering home");
  const { user, loadUser, isAuthenticated } = useAuth();

  console.log(user, isAuthenticated);

  return (
    <div
      className="container"
      style={{
        paddingTop: "10px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingBottom: "0px",
        marginTop: "0px",
        // marginLeft: "100px",
      }}
    >
      <Routes>
        <Route exact path="/login" element={

          isAuthenticated === true && user !== null ? <Navigate to="/" replace /> : <Login />

        } />
        <Route exact path="/*" element={
          isAuthenticated === true && user !== null ? <Dashboard /> : <Navigate to="/login" replace />
        } />

        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
