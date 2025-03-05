import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";


const Bookcard = ({ data, favourite}) => {
// console.log(data.title);

const headers = {
  id: localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
  bookid : data._id,
}

const handleunfav = async () => {
const response = await axios.put("http://localhost:3001/api/v1/remove-book-to-favourite" ,{}, {headers});
alert(response.data.message);
};


  return (
    <div className="card p-2 h-100 d-flex flex-column w-100" style={{backgroundColor:"#171717"}}>
      <Link className="text-decoration-none w-100" to={`/view-book-details/${data._id}`}>
        <div className="h-100  " >
          <div>
            <div className="w-100"> 
              <img src={data.url} className="img-fluid p-3 card-img-top w-100" alt="/"   style={{ height: "300px", objectFit: "cover" ,width: "100%"  }}/>
            </div>
           
            <div className="card-body text-start d-flex flex-column justify-content-between ">
              <h5 className="text-light fs-6 ">{data.title}</h5>
              <p className="text-light-emphasis ">{data.author}</p>
              <p className="text-light ">₹ {data.price}</p>
              </div>
            </div>
        </div>
      </Link>
      
      { favourite && (
         <button type="button" className="btn btn-outline-warning" onClick={handleunfav}>Unfavourite</button>
      )}


    </div>
  );
};

export default Bookcard;

