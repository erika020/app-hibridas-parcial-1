import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.rol !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
