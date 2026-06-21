import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo + Brand */}

      <div className="nav-brand">
        <img
          src="/logo.png"
          alt="DevConnect"
          className="nav-logo"
        />

        <div>
          <div className="brand-title">
            DevConnect
          </div>

          <div className="brand-subtitle">
            Find Your Project Partner
          </div>
        </div>
      </div>

      {/* Navigation */}

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/team-dashboard">
          Dashboard
        </Link>

        <Link to="/projects">
          Browse Projects
        </Link>

        <Link to="/my-projects">
          My Projects
        </Link>

        <Link to="/create-project">
          Create Project
        </Link>

        <Link to="/my-requests">
          My Requests
        </Link>

        <Link to="/notifications">
          Notifications
        </Link>

        <Link to="/profile">
          Profile
        </Link>
        <Link to="/invitations">
  Invitations
</Link>

        <span className="navbar-user">
          {user?.name}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;