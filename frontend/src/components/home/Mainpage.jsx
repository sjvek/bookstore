import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function Homemain() {
  return (
      <div className="row align-items-center  bg-dark text-center py-5 d-flex justify-content-center align-items-center min-vh-75">

        <div className="col-md-5 text-md-start text-center text-light p-4 mx-5 ">
          <h1 className="text-warning  mb-3 ms-3" style={{ fontSize: "60px" }}>Discover Your Next Great Road</h1>
          <p className='ms-3 fs-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque qui sed quo, sequi a neque provident doloremque, sint dicta expedita esse hic eum tempora explicabo, veritatis dolore voluptatum minus in!
          </p>
         <Link to="/all-books" > <button type="button" className="btn btn-outline-warning rounded-5 my-4 btn-lg ms-3">
            Discover Book
          </button>
          </Link>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://book-store-user-frontened.vercel.app/assets/discoverbook-DBO87Yfr.png"
            className="img-fluid " style={{ height: "600px", width: "300px" }}
            alt="Discover Book"
          />
        </div>
      </div>
  )
}

export default Homemain
