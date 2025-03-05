import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Signup() {
  const navigate = useNavigate();

  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("all input required");
      } else {
        const response = await axios.post(
          "https://bookstore-yqad.onrender.com/api/v1/signup",
          Values
        );
        alert(response.data.message);
       // console-log(response.data);
        navigate("/login");
      }
    } catch (error) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center  bg-dark p-1 vh-100">
        <div className=" w-auto ">
          <div
            className="card-body rounded-3 p-4"
            style={{ backgroundColor: "#171717" }}
          >
            <h3 className="text-center text-light mb-4">Sign up</h3>
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  required
                  value={Values.username}
                  onChange={change}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={Values.email}
                  onChange={change}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={Values.password}
                  onChange={change}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Your Address"
                  required
                  value={Values.address}
                  onChange={change}
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="d-grid">
                <Link
                  to="/login"
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={submit}
                >
                  Sign up
                </Link>
              </div>
            </form>
            <h5 className="my-4 text-center text-light">or</h5>
            <div className="text-center">
              <p className="text-light">
                Do you have an account?
                <Link to="/login" className="text-primary">
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
