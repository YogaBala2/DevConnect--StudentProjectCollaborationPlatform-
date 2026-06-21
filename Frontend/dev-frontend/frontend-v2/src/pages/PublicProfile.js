import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getUserById } from "../api/userApi";

const PublicProfile = () => {
  const { id } = useParams();

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data =
        await getUserById(id);

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>{user.name}</h1>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>College:</strong>{" "}
          {user.college}
        </p>

        <p>
          <strong>Branch:</strong>{" "}
          {user.branch}
        </p>

        <p>
          <strong>Year:</strong>{" "}
          {user.year}
        </p>

        <p>
          <strong>Bio:</strong>{" "}
          {user.bio}
        </p>

        <p>
          <strong>Skills:</strong>{" "}
          {user.skills?.join(", ")}
        </p>
      </div>
    </>
  );
};

export default PublicProfile;