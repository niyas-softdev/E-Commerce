import React from "react";
import AppNavbar from "./Component/common/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mens from "./Component/Pages/Mens";
import Womens from "./Component/Pages/Womens";
import Kids from "./Component/Pages/Kids";
import Login from "./Component/Pages/Login";
import Signup from "./Component/Pages/Signup";
import ProtectedRoute from "./Component/common/ProtectedRoute";
import Footer from "./Component/common/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddItems from "./Component/Pages/AddItems";
import UserController from "./Component/Pages/userController";
import UserUpdate from "./Component/Pages/userUpdate";
import ProductController from "./Component/Pages/productController";
import ProductUpdate from "./Component/Pages/productUpdate";

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
          <Route
            path="/userController"
            element={
              <ProtectedRoute>
                <UserController />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userUpdate"
            element={
              <ProtectedRoute>
                <UserUpdate />
              </ProtectedRoute>
            }
          />
           <Route
            path="/productController"
            element={
              <ProtectedRoute>
                <ProductController />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productUpdate"
            element={
              <ProtectedRoute>
                <ProductUpdate/>
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
