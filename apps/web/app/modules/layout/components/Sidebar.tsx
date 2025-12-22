import { NavLink, useLocation } from "react-router";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../auth/context/auth.context";
import "./Sidebar.css";

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="brand-text">
          Projeto Porto Alegre
        </h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link inactive"}
          end
        >
          <LayoutDashboard className="nav-icon" size={20} />
          Dashboard
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link inactive"}
        >
          <Users className="nav-icon" size={20} />
          Funcionários
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link inactive"}
        >
          <Settings className="nav-icon" size={20} />
          Configurações
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <p className="user-name">{user?.name || 'User'}</p>
            <p className="user-email">{user?.email || 'email@example.com'}</p>
          </div>
          <button className="btn-logoff" title="Sair" onClick={logout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}