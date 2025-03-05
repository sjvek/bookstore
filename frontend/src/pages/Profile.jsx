import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
//import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
 // const isLoggedin = useSelector();
 const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetchData = async () => { 
      const response = await axios.get(
        "http://localhost:3001/api/v1/get-user-information",{headers}
      );
     // console.log(response.data);
      setProfile(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-dark p-5 py-5 text-light  d-flex gap-2 h-auto  ">
    {!Profile && ( 
      <div className="w-100 h-100 d-flex align-items-center justify-content-center border border-5 border-danger"> 
       <Loader/> 
         </div> )}
    { Profile && (
       <div className="row  w-100  ">
       <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3  vh-100 ">
          <Sidebar data={Profile} />
        </div>
        <div className=" col-xs-12 col-sm-12 col-md-8 col-lg-8 ">
          <Outlet />
          </div> 
       
        </div> 
    ) }
  
    </div>
  );
};

export default Profile;
