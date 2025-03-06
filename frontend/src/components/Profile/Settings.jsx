
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from 'react-toastify'; 

const Settings = () => {
  const [Value, setValue] = useState({ address: " " });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-yqad.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        toast.error("Failed to fetch profile data!");
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "https://bookstore-yqad.onrender.com/api/v1/update-address",
        Value,
        { headers }
      );
      toast.success(response.data.message); 
    } catch (error) {
      toast.error("Failed to update address!"); 
    }
  };

  return (
    <div className="w-100 p-3">
      {ProfileData && (
        <div>
          <h1>Settings</h1>
          <div className="">
            <div className="mt-5">
              <label htmlFor="">User name</label>
              <p
                className="p-2 rounded-1"
                style={{ backgroundColor: "#171717" }}
              >
                {ProfileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="" className="fw-semibold">Email</label>
              <p
                className="p-2 rounded-1"
                style={{ backgroundColor: "#171717", width: "100%", display: "inline-block" }}
              >
                {ProfileData.email}
              </p>
            </div>
          </div>

          <div className="w-100">
            <div className="form-floating w-100 mt-4">
              <textarea
                className="form-control"
                placeholder="Enter your address"
                name="address"
                value={Value.address}
                onChange={change}
                style={{ height: "100px" }}
              />
              <label className="text-dark">Address</label>
            </div>

            <div className="mt-3 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-warning w-auto"
                onClick={submitAddress}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Settings;
