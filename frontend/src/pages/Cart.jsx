import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";




function Cart() {
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/v1/get-user-cart",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deletItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:3001/api/v1/remove-to-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
    setCart(Cart.filter((item) => item._id !== bookid));  //////extra
  };
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
    //  total = 0;
    }
  }, [Cart]);

  const PlaceOrder = async () => {
      const response = await axios.post(
        "http://localhost:3001/api/v1/place-order",
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
   
  };

  return (
    <div className="bg-dark p-5 vh-100 ">
      {!Cart && <Loader />}
      {Cart && Cart.length === 0 && (
        <div className=" d-flex flex-column align-items-center justify-content-center">
          <h1 className="fw-bold text-light">Empty Cart</h1>
          <p className="text-light-emphasis">
            Looks like you haven't added anything yet.
          </p>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <div className=" ">
          <h1> Your Cart </h1>
          {Cart.map((items, i) => (
            <div
              className=" text-wrap overflow-hidden d-flex flex-column flex-md-row my-2 w-100 align-items-center justify-content-between p-2"
              key={i}
              style={{ backgroundColor: "#171717" }}
            >
              <img
                src={items.url}
                alt=""
                 className="img-fluid mb-3 mb-sm-0"
                style={{ height: "80px", width: "auto" }}
              />
              <div className="w-100  mx-3 mx-md-5 ">
                <h4 className="text-light">{items.title}</h4>
                <p className="text-light d-none d-md-block text-truncate"
                  style={{
                    // whiteSpace: "nowrap",
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    width: "550px",
                  }}
                >
                 
                  {items.desc}
                </p>
              
              </div>

              <div className="d-flex align-items-center justify-content-center gap-4 ">
                <h3 className="text-light-emphasis d-flex align-items-center">
                  {items.price}
                </h3>

                <button
                  type="button"
                  className="btn text-light fs-1 d-flex align-items-center "
                  onClick={() => deletItem(items._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <div className="w-100 d-flex align-items-center justify-content-end text-light">
          <div
            className=" p-3  rounded-3"
            style={{ backgroundColor: "#171717" }}
          >
            <h2> Total Amount</h2>
            <div className="d-flex justify-content-between">
              <h5>{Cart.length} books</h5>
              <h5> {Total}</h5>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-light w-100" onClick={PlaceOrder}>
                {" "}
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
