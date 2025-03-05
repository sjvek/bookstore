import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!values.username || !values.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("https://bookstore-yqad.onrender.com/api/v1/signin", values);

      // Dispatch actions for authentication
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      // Store auth data in localStorage
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center bg-dark  align-items-center vh-100">
      <div className=" p-4 w-auto rounded-3" style={{backgroundColor:"#171717"}}>
        <h3 className="text-center mb-4 text-light">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>} {/* Display error messages */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
        </form>

        <div className="text-center mt-4"> or
          <p className="text-light">
            Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
