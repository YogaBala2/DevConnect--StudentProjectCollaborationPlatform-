import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { getProjectById } from "../api/projectApi";
import { applyToProject } from "../api/requestApi";

import "../styles/project.css";

const ProjectDetail = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const data =
        await getProjectById(id);

      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async () => {
    try {
      await applyToProject(
        project._id,
        "Frontend Developer",
        "Interested in joining"
      );

      alert("Application Sent");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed To Apply"
      );
    }
  };

  if (!project) {
    return (
      <>
        <Navbar />
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />
<div className="project-detail-page">

  {/* HERO */}

  <div className="project-hero">

    <div className="project-icon">
      {"</>"}
    </div>

    <div>

      <div className="project-badges">

        <span className="category-badge">
          {project.category}
        </span>

        <span
          className={
            project.status === "Completed"
              ? "status-badge completed"
              : "status-badge open"
          }
        >
          {project.status}
        </span>

      </div>

      <h1>{project.title}</h1>

      <p>
        Created by{" "}
        {project.owner?.name}
      </p>

    </div>

  </div>

  {/* STATS */}

  <div className="project-stats">

    <div className="stat-card">
      <h2>
        {project.members?.length || 0}
      </h2>
      <p>Members</p>
    </div>

    <div className="stat-card">
      <h2>
        {project.requiredSkills?.length || 0}
      </h2>
      <p>Skills</p>
    </div>

    <div className="stat-card">
      <h2>
        {project.teamSize}
      </h2>
      <p>Team Size</p>
    </div>

  </div>

  <div className="project-layout">

    {/* LEFT */}

    <div>

      <div className="detail-card">

        <h2>About Project</h2>

        <p>
          {project.description}
        </p>

      </div>

      <div className="detail-card">

        <h2>
          Required Skills
        </h2>

        <div className="skills-wrap">

          {project.requiredSkills?.map(
            (skill, index) => (
              <span
                key={index}
                className="skill-tag"
              >
                {skill}
              </span>
            )
          )}

        </div>

      </div>

    </div>

    {/* RIGHT */}

    <div>

      <div className="detail-card">

        <h2>
          Join This Project
        </h2>

        <p>
          Collaborate with talented
          developers and build
          something amazing.
        </p>

        <button
          className="apply-btn"
          onClick={handleApply}
        >
          🚀 Apply To Join
        </button>

      </div>

      <div className="detail-card">

        <h2>
          Project Information
        </h2>

        <div className="info-row">
          <strong>
            Deadline
          </strong>

          <span>
            {project.deadline
              ? new Date(
                  project.deadline
                ).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="info-row">
          <strong>
            Category
          </strong>

          <span>
            {project.category}
          </span>
        </div>

        <div className="info-row">
          <strong>
            Team Size
          </strong>

          <span>
            {project.teamSize}
          </span>
        </div>

        <div className="info-row">
          <strong>
            Status
          </strong>

          <span>
            {project.status}
          </span>
        </div>

      </div>

      <div className="detail-card">

        <h2>
          Project Owner
        </h2>

        <p>
          👤{" "}
          {project.owner?.name}
        </p>

        <p>
          📧{" "}
          {project.owner?.email}
        </p>

      </div>

    </div>

  </div>

</div>
    


      
  </>
  );
};

export default ProjectDetail;