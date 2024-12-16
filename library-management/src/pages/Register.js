import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }    

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        username,
        email,
        password,
      });

      if (response.data.message === "User registered successfully") {
        login({id: response.data.user.id,  email: response.data.user.email });
        setError(null);
        navigate("/books");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      setError("Failed to register");
      // alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center min-vh-100 text-center text-lg-start"
      style={{ backgroundColor: "#afafaf" }}
    >
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right bg-body-tertiary"
              style={{
                backdropFilter: "blur(30px)",
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Inscrivez-vous maintenant</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirmez le mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4 w-100"
                  >
                    S'inscrire
                  </button>
                  <Link to="/login" className="text-decoration-none">
                    Vous avez déjà un compte ? Connectez-vous
                  </Link>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              className="w-100 rounded-4 shadow-4"
              src="/images/background_auth.jpg"
              alt="Arrière-plan"
              style={{ objectFit: "cover", height: "700px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
