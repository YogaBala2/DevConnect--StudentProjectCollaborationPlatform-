import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getMyInvitations,
  acceptInvitation,
  declineInvitation,
} from "../api/invitationApi";

import "../styles/project.css";

const Invitations = () => {
  const [invitations, setInvitations] =
    useState([]);

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations =
    async () => {
      try {
        const data =
          await getMyInvitations();

        setInvitations(data || []);
      } catch (error) {
        console.log(error);
      }
    };

  const handleAccept =
    async (id) => {
      try {
        await acceptInvitation(id);

        alert(
          "Invitation Accepted"
        );

        loadInvitations();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDecline =
    async (id) => {
      try {
        await declineInvitation(id);

        alert(
          "Invitation Declined"
        );

        loadInvitations();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">
          Invitations
        </h1>

        {invitations.length === 0 ? (
          <p>
            No Invitations Found
          </p>
        ) : (
          <div className="request-grid">
            {invitations.map(
              (invitation) => (
                <div
                  key={
                    invitation._id
                  }
                  className="request-card"
                >
                  <h3>
                    {
                      invitation.project
                        ?.title
                    }
                  </h3>

                  <p>
                    <strong>
                      Role:
                    </strong>{" "}
                    {
                      invitation.role
                    }
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {
                      invitation.status
                    }
                  </p>

                  {invitation.status ===
                    "Pending" && (
                    <div className="request-actions">
                      <button
                        className="accept-btn"
                        onClick={() =>
                          handleAccept(
                            invitation._id
                          )
                        }
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleDecline(
                            invitation._id
                          )
                        }
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Invitations;