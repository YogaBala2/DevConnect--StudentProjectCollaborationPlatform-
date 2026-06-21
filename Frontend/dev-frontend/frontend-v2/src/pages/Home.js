import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import "../styles/home.css";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1 className="home-title">
          Welcome to DevConnect
        </h1>

        <h2 className="home-subtitle">
          {user?.name}
        </h2>

        <div className="home-grid">
          <div className="home-card">
            <h3>Projects</h3>
            <p>Explore student projects.</p>

            <Link to="/projects">
              <button className="home-btn">
                Browse Projects
              </button>
            </Link>
          </div>

          <div className="home-card">
            <h3>Create Project</h3>
            <p>Start your own team.</p>

            <Link to="/create-project">
              <button className="home-btn">
                Create
              </button>
            </Link>
          </div>

          <div className="home-card">
            <h3>My Projects</h3>
            <p>Manage your projects.</p>

            <Link to="/my-projects">
              <button className="home-btn">
                Open
              </button>
            </Link>
          </div>

          <div className="home-card">
            <h3>Notifications</h3>
            <p>Check updates.</p>

            <Link to="/notifications">
              <button className="home-btn">
                View
              </button>
            </Link>
          </div>

          <div className="home-card">
            <h3>Profile</h3>
            <p>Update your profile.</p>

            <Link to="/profile">
              <button className="home-btn">
                Open
              </button>
            </Link>
          </div>

          <div className="home-card">
            <h3>My Requests</h3>
            <p>Track join requests.</p>

            <Link to="/my-requests">
              <button className="home-btn">
                Open
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;