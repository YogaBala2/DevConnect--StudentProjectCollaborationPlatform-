import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">

      <div className="project-card-top">
        <h3>{project.title}</h3>

        <span className="status-badge">
          {project.status}
        </span>
      </div>

      <p className="project-description">
        {project.description?.length > 120
          ? `${project.description.substring(
              0,
              120
            )}...`
          : project.description}
      </p>

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

      <div className="project-info">
        <div>
          <strong>👥 Members</strong>
          <p>
            {project.members?.length ||
              0}
          </p>
        </div>

        <div>
          <strong>📅 Status</strong>
          <p>{project.status}</p>
        </div>
      </div>

      <Link
        to={`/projects/${project._id}`}
      >
        <button className="view-btn">
          View Project →
        </button>
      </Link>

    </div>
  );
};

export default ProjectCard;