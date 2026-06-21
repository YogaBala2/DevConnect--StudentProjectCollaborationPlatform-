import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getMyProfile } from "../api/userApi";

import "../styles/profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="profile-loading">
          <h2>Loading Profile...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">

        {/* HEADER */}

        <div className="profile-header">

          <div className="profile-banner"></div>

          <div className="profile-header-content">

            <div className="profile-avatar">
              {profile.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-main-info">
              <h1>{profile.name}</h1>

              <p>
                {profile.branch || "Student"} •{" "}
                {profile.college || "College"}
              </p>

              <p>{profile.email}</p>
            </div>

            <Link
              to="/edit-profile"
              className="edit-btn"
            >
              Edit Profile
            </Link>

          </div>
        </div>

        {/* CONTENT */}

        <div className="profile-grid">

          {/* LEFT */}

          <div className="left-column">

            <div className="profile-card">
              <h3>About</h3>

              <p>
                {profile.bio ||
                  "No bio added yet. Update your profile and tell other students about yourself."}
              </p>
            </div>

            <div className="profile-card">
              <h3>Skills</h3>

              <div className="skills-container">
                {profile.skills?.length > 0 ? (
                  profile.skills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p>No Skills Added</p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT */}

          <div className="right-column">

            <div className="profile-card">
              <h3>Academic Details</h3>

              <p>
                <strong>College:</strong>{" "}
                {profile.college ||
                  "Not Added"}
              </p>

              <p>
                <strong>Branch:</strong>{" "}
                {profile.branch ||
                  "Not Added"}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {profile.year ||
                  "Not Added"}
              </p>
            </div>

            <div className="profile-card">
              <h3>Links</h3>

              {profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-link"
                >
                  GitHub
                </a>
              ) : (
                <p>GitHub Not Added</p>
              )}

              <br />

              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-link"
                >
                  LinkedIn
                </a>
              ) : (
                <p>LinkedIn Not Added</p>
              )}
            </div>

            <div className="profile-card">
              <h3>Availability</h3>

              <div
                className={
                  profile.isOpenToCollaborate
                    ? "available"
                    : "not-available"
                }
              >
                ●{" "}
                {profile.isOpenToCollaborate
                  ? "Open To Collaborate"
                  : "Not Available"}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;