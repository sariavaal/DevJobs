import "./App.css";

import UserContext from "./context/UserContext";
import { useState } from "react";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";


import Login from "./views/Login";
import Register from "./views/Register";
import EmailConfirmation from "./components/EmailConfirmation";
import ConfirmationEmailPage from "./components/ConfirmationEmailPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import LogoutComponent from "./components/DropdownItems/LogoutComponent";
import HomePage from "./components/HomePage";
import UpdateProfile from "./components/UpdateProfile";
import MyProfile from "./components/MyProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userInfo = userDetails ? userDetails : null;
  const [user, setUser] = useState(userInfo);

  const setUserKeyValue = (clave, valor) => {
    setUser({ ...user, [clave]: valor });
  };

  const objetoContexto = {
    user,
    setUser,
    setUserKeyValue,
  };

  return (
    <UserContext.Provider value={objetoContexto}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute redirectPath="/">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/verify/:userId/:token"
            element={
              <PublicRoute>
                <EmailConfirmation />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute redirectPath="/">
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/verify/:userId/:token"
            element={
              <PublicRoute>
                <EmailConfirmation />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute redirectPath="/">
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password/:userId/:token"
            element={
              <PublicRoute redirectPath="/">
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route path="/confirm/email" element={<ConfirmationEmailPage />} />

          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <LogoutComponent />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/myprofile/update/:id"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/myprofile/:id"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />

          

        

          
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
