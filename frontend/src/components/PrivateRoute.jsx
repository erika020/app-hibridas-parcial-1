import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PrivateRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;
  
  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
