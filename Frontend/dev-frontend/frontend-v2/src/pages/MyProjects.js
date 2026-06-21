import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getMyProjects,
  deleteProject,
} from "../api/projectApi";

import "../styles/project.css";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getMyProjects();

      setProjects(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    projectId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProject(projectId);

      alert("Project Deleted");

      loadProjects();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">
          My Projects
        </h1>

        {projects.length === 0 ? (
          <p>No Projects Found</p>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <div
                key={project._id}
                className="project-card"
              >
                <h3>
                  {project.title}
                </h3>

                <p>
                  {
                    project.description
                  }
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {
                    project.status
                  }
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop:
                      "15px",
                  }}
                >
                  <Link
                    to={`/projects/${project._id}`}
                  >
                    <button className="project-btn">
                      View
                    </button>
                  </Link>
                  <Link
  to={`/workspace/${project._id}`}
>
  <button className="project-btn">
    Workspace
  </button>
</Link>
 <Link
  to={`/projects/${project._id}/requests`}
>
  <button className="request-btn">
    Requests
  </button>
</Link>
                  <Link
                    to={`/projects/edit/${project._id}`}
                  >
                    <button className="project-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="project-btn"
                    onClick={() =>
                      handleDelete(
                        project._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjects;