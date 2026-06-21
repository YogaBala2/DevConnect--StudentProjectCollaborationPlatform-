import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const TeamDashboard = () => {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Team Dashboard</h1>

        <p>
          Manage your projects and
          collaboration activities.
        </p>

        <br />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>My Projects</h3>

            <p>
              View and manage your
              projects.
            </p>

            <Link to="/my-projects">
              <button>Open</button>
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Create Project</h3>

            <p>
              Start a new project.
            </p>

            <Link to="/create-project">
              <button>Create</button>
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>My Requests</h3>

            <p>
              Check collaboration
              requests.
            </p>

            <Link to="/my-requests">
              <button>View</button>
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Notifications</h3>

            <p>
              View latest updates.
            </p>

            <Link to="/notifications">
              <button>Open</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDashboard;