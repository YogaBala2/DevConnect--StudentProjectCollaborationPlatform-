import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getMyProfile, updateProfile } from "../api/userApi";

import "../styles/profile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    isOpenToCollaborate: true,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      setFormData({
        name: data.name || "",
        college: data.college || "",
        branch: data.branch || "",
        year: data.year || "",
        bio: data.bio || "",
        skills: data.skills
          ? data.skills.join(", ")
          : "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        isOpenToCollaborate:
          data.isOpenToCollaborate ?? true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        ...formData,
        year: Number(formData.year),

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      alert("Profile Updated Successfully");

      navigate("/profile");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed To Update Profile"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">

          <div className="profile-header">
            <h1>Edit Profile</h1>

            <p>
              Keep your profile updated so
              teammates can discover and
              collaborate with you.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-grid">

              <div className="profile-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-group">
                <label>College</label>

                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-group">
                <label>Branch</label>

                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-group">
                <label>Year</label>

                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-group profile-full">
                <label>Bio</label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell others about yourself..."
                />
              </div>

              <div className="profile-group profile-full">
                <label>Skills</label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="profile-group">
                <label>GitHub</label>

                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="profile-group">
                <label>LinkedIn</label>

                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="profile-group profile-full">
                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    name="isOpenToCollaborate"
                    checked={
                      formData.isOpenToCollaborate
                    }
                    onChange={handleChange}
                  />

                  <label>
                    Open To Collaborate
                  </label>
                </div>
              </div>

            </div>

            <div className="profile-actions">
              <button
                type="submit"
                className="profile-btn"
              >
                Update Profile
              </button>
            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default EditProfile;