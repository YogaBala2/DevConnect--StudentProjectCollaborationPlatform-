import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyRequests } from "../api/requestApi";
import { Link } from "react-router-dom";
import "../styles/project.css";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getMyRequests();
      setRequests(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "status-active";
      case "rejected":
        return "status-closed";
      default:
        return "status-recruiting";
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              My Requests
            </h1>

            <p className="page-subtitle">
              Track all project applications.
            </p>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="empty-state">
            <h3>No Requests Found</h3>
            <p>
              Apply to projects and your
              requests will appear here.
            </p>
          </div>
        ) : (
          <div className="my-projects-list">
            {requests.map((request) => (
              <div
                key={request._id}
                className="my-project-card"
              >
                <div className="project-icon">
                  {"</>"}
                </div>

                <div className="project-info">
                  <div className="project-top">
                    <h3>
                      {request.project?.title ||
                        "Project"}
                    </h3>

                    <span
                      className={`project-status ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="project-meta">
                    <span>
                      Applied on{" "}
                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {request.message && (
                    <p className="project-description">
                      {request.message}
                    </p>
                  )}
                </div>

                <div className="project-actions">
                 <Link
  to={`/projects/${request.project?._id}`}
>
  <button className="view-btn">
    View Project
  </button>
</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyRequests;