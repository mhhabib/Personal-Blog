import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children}) => {
  const { username } = useContext(AuthContext);
  const location = useLocation()
  return username ? children : <Navigate to="/login" state={{path: location.pathname}} />;
};

export default PrivateRoute;