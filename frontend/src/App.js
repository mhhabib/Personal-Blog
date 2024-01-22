import "./App.css";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Details from "./pages/Details";
import NotFound404 from "./pages/404_Not_Found";
import HeaderNav from "./components/Navbar";
import Footerbar from "./components/Footer";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthProvider>
          <HeaderNav />
          <div className="bg-gray-100 w-full h-full">
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route index element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/post/:id" element={<Details />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound404/>}/>
            </Routes>
          </div>
          <Footerbar />
        </AuthProvider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;