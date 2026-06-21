import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#5a7091",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#111827",
          }}
        >
          DevConnect
        </h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
          Student Collaboration Platform
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/login">
            <button>
              Login
            </button>
          </Link>

          <Link to="/register">
            <button>
              Register
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Landing;