import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { createProject } from "../api/projectApi";

import "../styles/project.css";

const ProjectCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    requiredSkills: "",
    teamSize: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProject({
        ...formData,
        teamSize: Number(
          formData.teamSize
        ),
        requiredSkills:
          formData.requiredSkills
            .split(",")
            .map((skill) =>
              skill.trim()
            ),
      });

      alert(
        "Project Created Successfully"
      );

      navigate("/projects");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed To Create Project"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="project-create-page">

        <div className="project-header">
          <h1>Create New Project</h1>

          <p>
            Fill in the details to start
            recruiting teammates
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="project-create-form"
        >
          {/* CARD 1 */}

          <div className="form-card">

            <h2>Project Details</h2>

            <div className="form-group">
              <label>
                Project Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="EduTrack AI Platform"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                placeholder="Describe your project..."
                value={
                  formData.description
                }
                onChange={handleChange}
                required
              />
            </div>

            <div className="two-column">

              <div className="form-group">
                <label>
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  placeholder="Web Development"
                  value={
                    formData.category
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Team Size
                </label>

                <input
                  type="number"
                  name="teamSize"
                  min="1"
                  value={
                    formData.teamSize
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={
                  formData.deadline
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

          </div>

          {/* CARD 2 */}

          <div className="form-card">

            <h2>Required Skills</h2>

            <p className="helper-text">
              Separate skills with commas
            </p>

            <input
              type="text"
              name="requiredSkills"
              placeholder="React, Node.js, MongoDB"
              value={
                formData.requiredSkills
              }
              onChange={handleChange}
              required
            />

          </div>

          {/* BUTTONS */}

          <div className="action-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/projects")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
            >
              Create Project
            </button>

          </div>

        </form>

      </div>
    </>
  );
};

export default ProjectCreate;