import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

import { getProjects } from "../api/projectApi";

import "../styles/project.css";

const ProjectBrowse = () => {
  const [projects, setProjects] =
    useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data =
        await getProjects();

      setProjects(
        data.projects || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        {/* HEADER */}
        <div className="browse-header">

          <h1 className="page-title">
            Browse Projects
          </h1>

          <p className="page-subtitle">
            Find exciting projects and
            collaborate with talented
            developers.
          </p>

        </div>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h2>
              {projects.length}
            </h2>
            <p>
              Active Projects
            </p>
          </div>

          <div className="stat-card">
            <h2>50+</h2>
            <p>
              Developers
            </p>
          </div>

          <div className="stat-card">
            <h2>10+</h2>
            <p>
              Technologies
            </p>
          </div>

        </div>

        {/* PROJECTS */}

        {projects.length === 0 ? (
          <div className="empty-state">
            <h2>
              No Projects Found
            </h2>
          </div>
        ) : (
          <div className="project-grid-modern">

            {projects.map(
              (project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              )
            )}

          </div>
        )}

      </div>
    </>
  );
};

export default ProjectBrowse;