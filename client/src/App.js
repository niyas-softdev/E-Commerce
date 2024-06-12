import React from "react";
import AppNavbar from "./Component/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mens from "./Component/Mens";
import Womens from "./Component/Womens";
import Kids from "./Component/Kids";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import ProtectedRoute from "./Component/common/ProtectedRoute";
import Footer from "./Component/common/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddItems from "./Component/AddItems";
import Card from "./Component/card";

function App() {
  return (
    <div>
      <AppNavbar />

      <BrowserRouter>
        <Routes>
          <Route
            path="/mens"
            element={
              <ProtectedRoute>
                <Mens />
              </ProtectedRoute>
            }
          />
          <Route
            path="/womens"
            element={
              <ProtectedRoute>
                <Womens />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kids"
            element={
              <ProtectedRoute>
                <Kids />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addItems"
            element={
              <ProtectedRoute>
                <AddItems />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/card" element={<Card />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
