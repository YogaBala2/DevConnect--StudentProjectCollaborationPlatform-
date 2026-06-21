import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getProjectRequests,
  acceptRequest,
  rejectRequest,
} from "../api/requestApi";

import "../styles/project.css";

const ProjectRequests = () => {
  const { projectId } = useParams();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data =
        await getProjectRequests(projectId);

      setRequests(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptRequest(id);

      alert("Request Accepted");

      loadRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);

      alert("Request Rejected");

      loadRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">
          Project Requests
        </h1>

        {requests.length === 0 ? (
          <p>No Requests Yet</p>
        ) : (
          <div className="request-grid">
            {requests.map((request) => (
              <div
                key={request._id}
                className="request-card"
              >
                <h3>
                  {request.applicant?.name}
                </h3>

                <p>
                  <strong>Email:</strong>{" "}
                  {request.applicant?.email}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {request.role}
                </p>

                <p>
                  <strong>Message:</strong>{" "}
                  {request.coverNote}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {request.status}
                </p>

                {request.status ===
                  "Pending" && (
                  <div className="request-actions">
                    <button
                      className="accept-btn"
                      onClick={() =>
                        handleAccept(
                          request._id
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleReject(
                          request._id
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectRequests;