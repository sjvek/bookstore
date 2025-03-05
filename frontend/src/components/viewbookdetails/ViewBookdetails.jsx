import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ViewBookdetails = () => {
  const { id } = useParams();
  //console.log(id);
  const [Data, setData] = useState();

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/v1/get-book-by-id/${id}`
      );
     // console.log(response);
      setData(response.data.data);
    };
    fetchData();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid : id,
  }
  const handelFavourite = async() => {
    const response = await axios.put("http://localhost:3001/api/v1/add-book-to-favourite",{},{headers});
    alert(response.data.message);
  }

    const handelCart = async() => {
      const response = await axios.put("http://localhost:3001/api/v1/add-to-cart",{},{headers});
      alert(response.data.message);
    }

  return (
    <>
      {Data && (
        <div className="d-flex row gap-5 bg-dark p-5 align-items-center justify-content-evenly ">
          <div className="col-lg-4 col-md-6 p-5 justify-content-end d-flex  ">
            {/* <img src={Data.url} alt="/" className="img-fluid"/>   */}
            <img
              src={Data.url}
              alt="/"
              className="img-fluid p-2 shadow-sm "
              style={{
                height: "60%",
                objectFit: "contain",
                backgroundColor: "#121214",
              }}
            />
          </div>
          <div className=" col-lg-6 col-md-6   align-items-center justify-content-start">
            <h1 className="text-warning ">{Data.title}</h1>
            <p className="text-light">{Data.author}</p>
            <p className="text-light">{Data.desc}</p>
            <p className="text-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-globe"
                viewBox="0 0 16 16"
                className="me-2"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
              </svg>
              {Data.language}
            </p>
            <p className="text-warning">Price : ₹ {Data.price} </p>

            {isLoggedin === true &&  role === "user" && (
                  <div class="d-grid gap-3 col-3 mt-5">
                    <button className="btn btn-outline-warning" type="button" onClick={handelFavourite}>
                      <FaHeart /> Favourites
                    </button>
                    <button className="btn btn-outline-warning" type="button" onClick={handelCart}>
                      <IoCart /> Add to Cart
                    </button>
                  </div>
                )}


{isLoggedin === true &&  role === "admin" && (
                  <div class="d-grid gap-2 d-md-block mt-5">
                    <button className="btn btn-outline-warning" type="button">
                    <MdModeEditOutline /> Edit
                    </button>
                    <button className="btn btn-outline-warning" type="button">
                    <MdDelete /> Delete Book
                    </button>
                  </div>
                )}

          </div>
        </div>
      )}
      {!Data && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookdetails;
