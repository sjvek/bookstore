import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  //console.log(isLoggedin);
  if(isLoggedin === false){
    links.splice(2,2);
  }


  return (
    <div
      className=" d-flex p-2 align-items-center justify-content-between navbar navbar-expand-lg"
      style={{ backgroundColor: "#3b3e3e" }}
    >
      <div className="ms-4">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://book-store-user-frontened.vercel.app/assets/logo-BMRLeQMx.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
        </Link>
      </div>
      <div className="me-4">
        {/* Navbar Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto ">
            {links.map((item, i) => (

              <li key={i} className="nav-item">
                <Link className="nav-link text-light fs-5 " to={item.link}>
                  {item.title}
                </Link>
              </li>
              
            ))}
             {!isLoggedin  && (
        <div className="navbar-nav">
            <Link to="/login" className="btn btn-outline-warning me-3 ms-2 my-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline-warning my-2">
              Sign up
            </Link>
          </div> 
          )}
          </ul>
         
    
        </div>
      </div>
    </div>
  );
}
