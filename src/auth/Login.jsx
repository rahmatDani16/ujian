import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Format email tidak valid.");
      setLoading(false);
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      sessionStorage.setItem("token", "admin-token");
      sessionStorage.setItem("role", "admin");
      navigate("/Admin");
      window.location.reload();
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.role);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMessage("Email atau password salah.");
      } else {
        setErrorMessage("Terjadi kesalahan. Coba lagi nanti.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f0f4f8;
          font-family: 'Segoe UI', sans-serif;
        }

        .auth-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 400px;
        }

        .auth-title {
          text-align: center;
          color: #0d6efd;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .form-group {
          position: relative;
          margin-bottom: 24px;
        }

        .form-control {
          width: 100%;
          padding: 12px 12px 12px 12px;
          font-size: 15px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          background-color: #fff;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #0d6efd;
          outline: none;
          box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
        }

        .floating-label {
          position: absolute;
          left: 12px;
          top: 12px;
          background: white;
          color: #6c757d;
          font-size: 14px;
          transition: 0.2s ease all;
          pointer-events: none;
        }

        .form-control:focus + .floating-label,
        .form-control:not(:placeholder-shown) + .floating-label {
          top: -9px;
          left: 10px;
          font-size: 12px;
          color: #0d6efd;
          background: #fff;
          padding: 0 5px;
        }

        .btn-primary {
          background-color: #0d6efd;
          border-color: #0d6efd;
          font-weight: 500;
        }

        .btn-primary:hover {
          background-color: #0b5ed7;
          border-color: #0b5ed7;
        }

        .alert-message {
          font-size: 14px;
          padding: 10px;
          margin-bottom: 16px;
        }
      `}</style>

      <div className="auth-card">
        <h3 className="auth-title">Login</h3>

        {errorMessage && (
          <div className="alert alert-danger alert-message">{errorMessage}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="floating-label">Email</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="floating-label">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "⏳ Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
