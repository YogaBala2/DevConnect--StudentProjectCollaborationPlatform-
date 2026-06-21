import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getProjectById,
  updateProject,
} from "../api/projectApi";

import "../styles/project.css";

const ProjectEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    requiredSkills: "",
    teamSize: "",
    deadline: "",
  });

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const data = await getProjectById(id);

      setFormData({
        title: data.title || "",
        description:
          data.description || "",
        category: data.category || "",
        requiredSkills:
          data.requiredSkills?.join(
            ", "
          ) || "",
        teamSize: data.teamSize || "",
        deadline: data.deadline
          ? data.deadline.split("T")[0]
          : "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProject(id, {
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
        "Project Updated Successfully"
      );

      navigate(`/projects/${id}`);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">
          Edit Project
        </h1>

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >
          <div>
            <label>Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Skills</label>

            <input
              type="text"
              name="requiredSkills"
              value={
                formData.requiredSkills
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Team Size</label>

            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Deadline</label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Update Project
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectEdit;