import { Outlet, NavLink } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      
      <aside className="admin-sidebar">

        <h2 className="admin-title">ADMIN PANEL</h2>

        <nav>
          <NavLink to="/admin" end className="admin-link">Dashboard</NavLink>
          <NavLink to="/admin/users" className="admin-link">Users</NavLink>

          <h4 className="admin-section-title">Game Content</h4>

          <NavLink to="/admin/weapons" className="admin-link">Weapons</NavLink>
          <NavLink to="/admin/characters" className="admin-link">Characters</NavLink>
          <NavLink to="/admin/maps" className="admin-link">Maps</NavLink>
          <NavLink to="/admin/missions" className="admin-link">Missions</NavLink>
          <NavLink to="/admin/achievements" className="admin-link">Achievements</NavLink>
          <NavLink to="/admin/modes" className="admin-link">Modes</NavLink>
        </nav>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}
